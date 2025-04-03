// index.js - Main entry point for BM Vallá chatbot backend
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { constructFullSystemPrompt } from './systemPrompts.js';
import { getRelevantKnowledge } from './knowledgeBase.js';
import { detectCalculationIntent, processCalculation } from './calculators/index.js';
import pg from 'pg';
const { Pool } = pg;

// Load environment variables
dotenv.config();

// Enhanced startup logging
console.log('🚀 SERVER STARTING - ' + new Date().toISOString());
console.log('📋 Environment check - NODE_ENV:', process.env.NODE_ENV);
console.log('🔑 API_KEY configured:', !!process.env.API_KEY);
console.log('🔑 OPENAI_API_KEY configured:', !!process.env.OPENAI_API_KEY);

// Determine database connection string based on environment
let dbConnectionString;
if (process.env.POSTGRES_URL) {
  // Vercel deployment uses POSTGRES_URL
  dbConnectionString = process.env.POSTGRES_URL;
  console.log('💾 Using Vercel Postgres connection string');
} else if (process.env.NEON_DATABASE_URL) {
  // Local development uses NEON_DATABASE_URL
  dbConnectionString = process.env.NEON_DATABASE_URL;
  console.log('💾 Using local Neon database connection string');
} else {
  console.error('⚠️ No database connection string found in environment variables');
}

// Initialize database connection pool
const pool = new Pool({
  connectionString: dbConnectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('🚨 Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
console.log('🤖 OpenAI client initialized');

// Initialize Express
const app = express();

// Cache for responses
const responseCache = new Map();

// Session storage for conversation context
const sessions = new Map();
console.log('🧠 Context tracking system initialized');

// Middleware
app.use(cors({
  origin: [
    'https://bmv-interactive-module.vercel.app',
    'https://bmv-ai-service.vercel.app',
    'https://www.bmvalla.is',
    'http://localhost:3000'
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));
app.use(express.json());
app.use(express.static('public')); // For serving static files if needed

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`⚡ REQUEST: ${req.method} ${req.path}`);
  next();
});

// Enhanced API Key verification with better logging
const verifyApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  console.log('🔑 API Key Check:', {
    receivedKey: apiKey ? 'Provided (not showing value)' : 'Not provided',
    expectedKey: process.env.API_KEY ? 'Configured (not showing value)' : 'Not configured',
    matches: apiKey === process.env.API_KEY
  });
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    console.error('🚨 Invalid or missing API key');
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
};

// Root endpoint for basic connectivity check
app.get('/', (req, res) => {
  console.log('📋 Root endpoint accessed');
  res.send(`
    <!DOCTYPE html>
    <html lang="is">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BM Vallá AI Service</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #CB3727; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .status { display: inline-block; padding: 5px 10px; border-radius: 4px; background: #4CAF50; color: white; }
      </style>
    </head>
    <body>
      <h1>BM Vallá AI Service</h1>
      <div class="card">
        <p><span class="status">✓ Online</span> Server time: ${new Date().toISOString()}</p>
        <p>This is the API server for the BM Vallá AI Assistant.</p>
        <p>The API is running and ready to handle requests from the chat widget.</p>
      </div>
      <div class="card">
        <h2>API Endpoints</h2>
        <ul>
          <li><strong>/chat</strong> - Main chat endpoint (requires API key)</li>
          <li><strong>/health</strong> - Health check endpoint</li>
          <li><strong>/test</strong> - Test endpoint</li>
          <li><strong>/diagnostic</strong> - Detailed diagnostic endpoint (requires API key)</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// Simple test endpoint for connectivity testing
app.get('/test', (req, res) => {
  console.log('📋 Test endpoint hit');
  res.status(200).json({ 
    message: "API server is running", 
    time: new Date().toISOString() 
  });
});

// Main chat endpoint - Enhanced with context tracking
app.post('/chat', verifyApiKey, async (req, res) => {
  try {
    const startTime = Date.now();
    const { message, sessionId } = req.body;
    
    // Log the incoming request details
    console.log(`📝 Processing request:`, {
      sessionId: sessionId ? sessionId.substring(0, 8) + '...' : 'undefined',
      messageLength: message ? message.length : 0,
      timestamp: new Date().toISOString()
    });
    
    // Get or create session context with enhanced structure
    const sessionContext = getSessionContext(sessionId);
    console.log(`🧠 Session context ${sessions.has(sessionId) ? 'retrieved' : 'created'} for ${sessionId.substring(0, 8)}...`);
    
    // Add user message to context
    updateContext(sessionContext, { role: 'user', content: message });
    console.log(`🧠 User message added to context, total messages: ${sessionContext.messages.length}`);
    
    // Update topic tracking
    const oldTopics = [...sessionContext.topics];
    updateConversationTopics(sessionContext, message);
    const newTopics = sessionContext.topics.filter(t => !oldTopics.includes(t));
    
    if (newTopics.length > 0) {
      console.log(`🧠 New topics detected: ${newTopics.join(', ')}`);
    } else {
      console.log(`🧠 No new topics detected. Current topics: ${sessionContext.topics.join(', ') || 'none'}`);
    }
    
    // Detect project intent
    const prevGoal = sessionContext.userIntent.mainGoal;
    const prevDetailsCount = Object.keys(sessionContext.userIntent.projectDetails).length;
    
    detectProjectIntent(message, sessionContext);
    
    if (prevGoal !== sessionContext.userIntent.mainGoal) {
      console.log(`🧠 Project intent detected: ${sessionContext.userIntent.mainGoal}`);
    }
    
    const currentDetailsCount = Object.keys(sessionContext.userIntent.projectDetails).length;
    if (currentDetailsCount > prevDetailsCount) {
      console.log(`🧠 New project details detected:`, 
        JSON.stringify(sessionContext.userIntent.projectDetails)
      );
    }
    
    // Check cache for identical request
    const cacheKey = `${sessionId}-${message}`;
    if (responseCache.has(cacheKey)) {
      console.log('💾 Using cached response');
      return res.json(responseCache.get(cacheKey));
    }
    
    console.log(`📋 Processing new request for session ${sessionId.substring(0, 8)}...`);
    console.log(`🧠 Current topics:`, sessionContext.topics);
    console.log(`🧠 User intent:`, sessionContext.userIntent);
    
    // Get relevant knowledge from the knowledge base
    console.log('🔍 Retrieving relevant knowledge...');
    const relevantKnowledge = await getRelevantKnowledge(message);
    console.log(`🔍 Found ${relevantKnowledge.length} relevant knowledge items`);
    if (relevantKnowledge.length > 0) {
      console.log(`🔍 Top match (${Math.round(relevantKnowledge[0].similarity * 100)}%): ${relevantKnowledge[0].text.substring(0, 100)}...`);
    }
    
    // Check for calculation intent
    console.log('🧮 Checking for calculation intent...');
    const calculationIntent = detectCalculationIntent(message);
    let calculationResult = null;
    
    if (calculationIntent) {
      try {
        console.log(`🧮 Detected calculation intent: ${calculationIntent.calculationType}`);
        console.log(`🧮 Calculation parameters:`, calculationIntent.parameters);
        
        calculationResult = processCalculation(
          calculationIntent.calculationType, 
          calculationIntent.parameters
        );
        
        // Add calculation info to context
        sessionContext.lastCalculation = {
          type: calculationIntent.calculationType,
          parameters: calculationIntent.parameters,
          result: calculationResult
        };
        
        console.log('🧮 Calculation completed successfully');
        console.log('🧮 Result summary:', JSON.stringify(calculationResult).substring(0, 200) + '...');
      } catch (error) {
        console.error('🚨 Error in calculation:', error);
        // Continue without calculation results
      }
    } else {
      console.log('🧮 No calculation intent detected');
    }
    
    // Generate contextual instruction based on conversation context
    const contextualInstruction = generateContextualInstruction(sessionContext);
    console.log('🧠 Contextual instruction:', contextualInstruction);
    
    // Generate response using OpenAI
    console.log('🤖 Generating AI response...');
    const aiStartTime = Date.now();
    
    const aiResponse = await generateAIResponse(message, sessionContext, relevantKnowledge, calculationResult, contextualInstruction);
    
    const aiEndTime = Date.now();
    console.log(`🕒 AI response generated in ${aiEndTime - aiStartTime}ms`);
    console.log(`🤖 Response preview: ${aiResponse.content.substring(0, 100)}...`);
    
    // Update context with AI response
    updateContext(sessionContext, { role: 'assistant', content: aiResponse.content });
    console.log(`🧠 AI response added to context, total messages: ${sessionContext.messages.length}`);
    
    // Periodically update conversation summary after every 5 messages
    if (sessionContext.messages.length % 5 === 0) {
      console.log(`🧠 Generating conversation summary...`);
      await updateConversationSummary(sessionContext);
      console.log(`🧠 Conversation summary updated: ${sessionContext.conversationSummary.substring(0, 100)}...`);
    }
    
    // Save to cache
    const responseObject = {
      message: aiResponse.content,
      calculationResult: calculationResult
    };
    responseCache.set(cacheKey, responseObject);
    console.log(`💾 Response cached with key: ${cacheKey.substring(0, 20)}...`);
    
    // Clean old cache entries
    if (responseCache.size > 100) {
      const oldestKey = responseCache.keys().next().value;
      responseCache.delete(oldestKey);
      console.log(`💾 Cache cleanup: removed oldest entry ${oldestKey.substring(0, 20)}...`);
    }
    
    const endTime = Date.now();
    console.log(`✅ Response generated successfully in ${endTime - startTime}ms`);
    
    // Return response
    return res.json(responseObject);
    
  } catch (error) {
    console.error('🚨 Error handling chat request:', error);
    console.error('🚨 Stack trace:', error.stack);
    
    return res.status(500).json({ 
      message: "Því miður kom upp villa. Vinsamlegast reyndu aftur síðar.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    console.log('📋 Health check endpoint accessed');
    // Check database connection
    const dbResult = await pool.query('SELECT NOW()');
    
    res.status(200).json({ 
      status: 'ok',
      database: 'connected',
      timestamp: dbResult.rows[0].now
    });
  } catch (error) {
    console.error('🚨 Health check error:', error);
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Add a detailed diagnostic endpoint (protected by API key)
app.get('/diagnostic', verifyApiKey, async (req, res) => {
  try {
    console.log('📋 Diagnostic endpoint accessed');
    // Basic system info
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    };
    
    // Check database
    const dbResult = await pool.query('SELECT NOW()');
    
    // Check OpenAI connection with a simple test
    console.log('🤖 Testing OpenAI connection...');
    const aiTest = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: "Test response (answer with only 'OK')" }],
      max_tokens: 10
    });
    
    // Get sample session information
    const sessionSample = Array.from(sessions.entries()).slice(0, 2).map(([id, session]) => ({
      id: id.substring(0, 8) + '...',
      messagesCount: session.messages.length,
      topics: session.topics,
      createdAt: session.createdAt
    }));
    
    res.status(200).json({
      status: 'ok',
      system: systemInfo,
      database: {
        status: 'connected',
        timestamp: dbResult.rows[0].now
      },
      openai: {
        status: 'connected',
        response: aiTest.choices[0].message.content
      },
      sessions: {
        count: sessions.size,
        sample: sessionSample
      },
      cache: {
        size: responseCache.size
      },
      environment: {
        apiKeyConfigured: !!process.env.API_KEY,
        openaiKeyConfigured: !!process.env.OPENAI_API_KEY,
        dbConfigured: !!dbConnectionString
      }
    });
  } catch (error) {
    console.error('🚨 Diagnostic error:', error);
    res.status(500).json({ 
      status: 'error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Add these near your other endpoints
app.get('/public-test', (req, res) => {
  console.log('📋 Public test endpoint hit');
  res.status(200).json({ 
    message: "Public test endpoint is running", 
    time: new Date().toISOString(),
    env: {
      apiKeyExists: !!process.env.API_KEY,
      openAIKeyExists: !!process.env.OPENAI_API_KEY
    }
  });
});

app.get('/api-test', (req, res) => {
  console.log('📋 API test endpoint hit');
  const apiKey = req.header('x-api-key');
  res.status(200).json({
    message: "API test endpoint",
    apiKeyProvided: !!apiKey,
    apiKeyMatches: apiKey === process.env.API_KEY,
    time: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔑 API Key configured: ${!!process.env.API_KEY}`);
  console.log(`🔑 OpenAI API Key configured: ${!!process.env.OPENAI_API_KEY}`);
  console.log(`💾 Database connection string configured: ${!!dbConnectionString}`);
  console.log(`🧠 Context tracking system active with ${sessions.size} active sessions`);
  console.log(`💾 Response cache initialized with capacity for 100 entries`);
});

// ================ HELPER FUNCTIONS ================

/**
 * Gets or creates a session context with enhanced structure
 * @param {string} sessionId - Unique session ID
 * @returns {Object} - Session context
 */
function getSessionContext(sessionId) {
  if (!sessions.has(sessionId)) {
    console.log(`🧠 Creating new session context for ${sessionId.substring(0, 8)}...`);
    sessions.set(sessionId, {
      messages: [],
      lastCalculation: null,
      topics: [], // Track main conversation topics
      userIntent: {
        mainGoal: null, // e.g., "building_patio", "concrete_selection"
        projectDetails: {} // Store specifics like dimensions, materials, etc.
      },
      conversationSummary: "", // Periodically updated summary
      createdAt: new Date(),
      lastUpdated: new Date()
    });
    
    // Schedule cleanup for inactive sessions
    setTimeout(() => {
      if (sessions.has(sessionId)) {
        console.log(`🧠 Cleaning up inactive session ${sessionId.substring(0, 8)}...`);
        sessions.delete(sessionId);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
  }
  
  return sessions.get(sessionId);
}

/**
 * Updates the session context with a new message
 * @param {Object} sessionContext - Session context
 * @param {Object} message - Message to add
 */
function updateContext(sessionContext, message) {
  sessionContext.messages.push(message);
  sessionContext.lastUpdated = new Date();
  
  // Keep only last 10 messages for context
  if (sessionContext.messages.length > 10) {
    console.log(`🧠 Context window full, removing oldest message`);
    sessionContext.messages = sessionContext.messages.slice(-10);
  }
}

/**
 * Detects and updates conversation topics
 * @param {Object} sessionContext - Session context
 * @param {string} userMessage - User message
 */
function updateConversationTopics(sessionContext, userMessage) {
  const topicPatterns = {
    hellur: /(hellur|hellulögn|gangstétt|bílastæði|verönd)/i,
    steypa: /(steyp|steypumót|sjónsteypa|C25|C30|C35|sökkull|sökkla)/i,
    sandur: /(sand|fúg|fug|vario|pússning)/i,
    huseiningar: /(húseiningar|Smellinn|einbýli|fjölbýli|útveggir)/i,
    steyptarEiningar: /(sorptunnuskýli|tunnu|staur|bekkur|blómaker)/i,
    umhverfisvænt: /(umhverfis|kolefni|vistvæn|EPD|Svan)/i,
    verð: /(kostar|verð|tilboð|bjóða)/i
  };
  
  // Check for topics in the message
  let topicsFound = 0;
  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(userMessage) && !sessionContext.topics.includes(topic)) {
      sessionContext.topics.push(topic);
      topicsFound++;
      console.log(`🧠 New topic detected: "${topic}" from pattern "${pattern}"`);
    }
  }
  
  if (topicsFound === 0) {
    console.log(`🧠 No new topics found in message`);
  }
}

/**
 * Detects user's project intent
 * @param {string} userMessage - User message
 * @param {Object} sessionContext - Session context
 */
function detectProjectIntent(userMessage, sessionContext) {
  // Simple pattern matching for project intent
  const intentPatterns = {
    building_patio: /(verönd|helluleggja garð|hellulögn|gangstétt)/i,
    concrete_project: /(steypa|steypuvinna|steypun|múr)/i,
    remodeling: /(endurgerð|endurnýja|viðbygging)/i,
    waste_management: /(sorptunn|sorpíl|rusla)/i
  };
  
  // Check for intent in message
  let intentFound = false;
  for (const [intent, pattern] of Object.entries(intentPatterns)) {
    if (pattern.test(userMessage) && !sessionContext.userIntent.mainGoal) {
      sessionContext.userIntent.mainGoal = intent;
      intentFound = true;
      console.log(`🧠 Project intent detected: "${intent}" from pattern "${pattern}"`);
      break;
    }
  }
  
  if (!intentFound && !sessionContext.userIntent.mainGoal) {
    console.log(`🧠 No project intent detected yet`);
  }
  
  // Extract project details like dimensions
  const dimensionsPattern = /(\d+(?:[,.]\d+)?)\s*(?:x|sinnum|\*)\s*(\d+(?:[,.]\d+)?)/i;
  const match = userMessage.match(dimensionsPattern);
  
  if (match) {
    sessionContext.userIntent.projectDetails.dimensions = {
      length: parseFloat(match[1].replace(',', '.')),
      width: parseFloat(match[2].replace(',', '.'))
    };
    console.log(`🧠 Extracted dimensions: ${match[1]}x${match[2]} meters`);
  }
  
  // Extract thickness if mentioned
  const thicknessPattern = /(\d+)(?:\s*|-)?(?:cm)?\s*(?:þykk|þykkur|þykkt)/i;
  const thicknessMatch = userMessage.match(thicknessPattern);
  
  if (thicknessMatch) {
    sessionContext.userIntent.projectDetails.thickness = parseInt(thicknessMatch[1], 10);
    console.log(`🧠 Extracted thickness: ${thicknessMatch[1]} cm`);
  }
}

/**
 * Generates contextual instructions based on conversation context
 * @param {Object} sessionContext - Session context
 * @returns {string} - Contextual instruction
 */
function generateContextualInstruction(sessionContext) {
  let instruction = '';
  
  // Add topic-specific instructions
  if (sessionContext.topics.includes('hellur') && sessionContext.topics.includes('verð')) {
    instruction += 'Þegar þú svarar um verð á hellum, vertu nákvæm(ur) um hvort verðið er per fermetra eða per stykki. ';
    console.log(`🧠 Adding price clarity instruction for paving stones`);
  }
  
  // Add project-specific instructions
  if (sessionContext.userIntent.mainGoal === 'building_patio') {
    instruction += 'Þessi notandi er að skipuleggja verandarverkefni. Hafðu það í huga. ';
    console.log(`🧠 Adding patio project instruction`);
  } else if (sessionContext.userIntent.mainGoal === 'concrete_project') {
    instruction += 'Þessi notandi er að vinna með steypu. Beindu ráðleggingum að því. ';
    console.log(`🧠 Adding concrete project instruction`);
  }
  
  // Add instructions based on project details
  if (sessionContext.userIntent.projectDetails.dimensions) {
    const { length, width } = sessionContext.userIntent.projectDetails.dimensions;
    instruction += `Notandinn hefur nefnt svæði sem er ${length}x${width} metrar. Taktu tillit til þess. `;
    console.log(`🧠 Adding dimension-specific instruction: ${length}x${width}m`);
  }
  
  // Add verbosity control based on previous interactions
  const messageCount = sessionContext.messages.length;
  if (messageCount <= 2) {
    instruction += 'Þetta er byrjun samtals. Vertu skýr og gagnlegur. ';
    console.log(`🧠 Adding first-response clarity instruction`);
  } else if (messageCount > 6) {
    instruction += 'Þetta er framhald lengra samtals. Vertu hnitmiðaður og forðastu endurtekningar. ';
    console.log(`🧠 Adding follow-up brevity instruction`);
  }
  
  // If user has environmental interests
  if (sessionContext.topics.includes('umhverfisvænt')) {
    instruction += 'Notandinn hefur áhuga á umhverfissjónarmiðum. Bentu á umhverfisvottaðar vörur þegar við á. ';
    console.log(`🧠 Adding environmental focus instruction`);
  }
  
  if (instruction) {
    console.log(`🧠 Final contextual instruction created: ${instruction}`);
  } else {
    console.log(`🧠 No contextual instructions generated`);
  }
  
  return instruction;
}

/**
 * Periodically updates conversation summary for better context
 * @param {Object} sessionContext - Session context
 */
async function updateConversationSummary(sessionContext) {
  try {
    // Only summarize if there are enough messages
    if (sessionContext.messages.length < 4) {
      console.log(`🧠 Not enough messages to summarize (${sessionContext.messages.length})`);
      return;
    }
    
    console.log(`🧠 Generating conversation summary from ${sessionContext.messages.length} messages`);
    
    // Prepare messages for summary generation
    const messagesToSummarize = sessionContext.messages.slice(-8); // Last 8 messages
    
    const summarizationMessages = [
      {
        role: 'system',
        content: 'Þú ert hjálpsamt kerfi sem býr til stuttar og hnitmiðaðar samantektir á samtölum. Samantektin á að vera í 1-3 setningum og lýsa aðalefni samtalsins, áhuga notandans og þörfum.'
      },
      {
        role: 'user',
        content: `Gerðu samantekt á eftirfarandi samtali:\n\n${messagesToSummarize.map(m => `${m.role}: ${m.content}`).join('\n\n')}`
      }
    ];
    
    console.log(`🧠 Sending summarization request to OpenAI`);
    
    // Call the OpenAI API for summarization
    const summaryStartTime = Date.now();
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: summarizationMessages,
      temperature: 0.3,
      max_tokens: 100
    });
    const summaryEndTime = Date.now();
    
    console.log(`🕒 Summary generated in ${summaryEndTime - summaryStartTime}ms`);
    
    // Update the conversation summary
    sessionContext.conversationSummary = response.choices[0].message.content;
    console.log(`🧠 Updated conversation summary: ${sessionContext.conversationSummary}`);
  } catch (error) {
    console.error('🚨 Error updating conversation summary:', error);
    // Continue without updating summary
  }
}

/**
 * Enhanced generateAIResponse function with comprehensive character correction
 * @param {string} message - User message
 * @param {Object} context - Session context
 * @param {Array} relevantKnowledge - Relevant knowledge from knowledge base
 * @param {Object|null} calculationResult - Calculation result if available
 * @param {string} contextualInstruction - Contextual instruction
 * @returns {Object} - AI response
 */
async function generateAIResponse(message, context, relevantKnowledge, calculationResult, contextualInstruction) {
  // Get the system message from the dedicated module
  const systemMessage = constructFullSystemPrompt(relevantKnowledge, calculationResult);
  console.log(`🤖 Base system prompt generated (${systemMessage.length} characters)`);
  
  // Simple length control based on conversation stage
  let lengthControl = '';
  if (context.messages.length <= 2) {
    lengthControl = 'Gefðu stutt og hnitmiðað svar, um 200-250 orð. ';
  } else if (context.messages.length > 6) {
    lengthControl = 'Þetta er framhald samtals, hafðu svarið þitt um 150-200 orð. ';
  } else {
    lengthControl = 'Haltu svari þínu um 200 orð. ';
  }
  
  // Extremely simple formatting instructions
  const formattingInstructions = `
MIKILVÆGT: 
- Notaðu einfaldan texta án flókinna uppsetningaratriða
- Notaðu * fyrir staka lista
- EKKI nota 1. 2. 3. fyrir listaatriði nema það sé í raunverulegri röð
- Forðastu að hafa mörg bil á milli textablokka
- Notaðu EINGÖNGU eftirfarandi emoji: 🏡 🏠 🧱 🔨 🛠️ 🌿`;

  // Combined instructions
  const finalInstructions = `${contextualInstruction || ''} ${lengthControl} ${formattingInstructions}`;
  
  // Construct messages array for the API call
  const messages = [
    { role: 'system', content: systemMessage },
    { role: 'system', content: finalInstructions },
    ...context.messages
  ];
  
  // If we have a conversation summary, include it
  if (context.conversationSummary) {
    console.log(`🧠 Including conversation summary in prompt`);
    messages.splice(2, 0, { 
      role: 'system', 
      content: `Samtalssamantekt: ${context.conversationSummary}` 
    });
  }
  
  console.log('🤖 Sending to OpenAI with context length:', context.messages.length);
  console.log(`🤖 Total message count: ${messages.length}`);
  
  // Call OpenAI API
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    });
    
    // Apply comprehensive post-processing to fix character issues
    let processedResponse = postProcessIcelandicText(completion.choices[0].message.content);
    
    console.log(`🤖 Response processed and characters corrected`);
    
    // Create new message with processed content
    const processedMessage = {
      ...completion.choices[0].message,
      content: processedResponse
    };
    
    return processedMessage;
  } catch (error) {
    console.error('🚨 Error generating AI response:', error);
    throw error;
  }
}

/**
 * Post-processes Icelandic text to fix character encoding and formatting issues
 * @param {string} text - Original response text
 * @returns {string} - Corrected text
 */
function postProcessIcelandicText(text) {
  // Step 1: Fix character encoding issues
  let processedText = text
    // Fix lowercase Icelandic characters
    .replace(/đ/g, 'ð')
    .replace(/ɖ/g, 'ð')
    .replace(/ţ/g, 'þ')
    .replace(/ŧ/g, 'þ')
    
    // Fix uppercase Icelandic characters
    .replace(/Đ/g, 'Ð')
    .replace(/Ţ/g, 'Þ')
    .replace(/Ŧ/g, 'Þ')
    
    // Fix some common word boundary issues
    .replace(/veranda(þitt|þín)/g, 'veröndin þín')
    .replace(/heimilið þitt/g, 'heimilið þitt')
    .replace(/garðinn þinn/g, 'garðinn þinn')
    
    // Fix additional special character errors
    .replace(/\bviargang/g, 'viðbótarefni')
    .replace(/\bovejar/g, 'óska')
    .replace(/\bvaƌ/g, 'það')
    .replace(/\baƌ/g, 'að');
  
  // Step 2: Fix formatting issues
  processedText = processedText
    // Remove excessive blank lines (more than 2 consecutive newlines)
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    
    // Fix incorrect list numbering where it's just being used for emphasis
    .replace(/^(\s*)1\.\s+(.*?)$/gm, function(match, spacing, content) {
      // Don't replace if it looks like an actual numbered list item
      if (match.includes('2.') || match.includes('Undirbúningur') || 
          match.includes('Bygging') || match.includes('Viðhald')) {
        return match;
      }
      return spacing + '* ' + content;
    })
    
    // Ensure proper spacing after asterisks in lists
    .replace(/\*(\S)/g, '* $1');
  
  // Step 3: Check emojis - but we're keeping a wide range now
  // Just make sure no excessive emojis occur together (more than 3 in a row)
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}]{4,}/gu;
  processedText = processedText.replace(emojiRegex, (match) => match.substring(0, 2));
  
  return processedText;
}