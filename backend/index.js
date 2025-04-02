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

// Determine database connection string based on environment
let dbConnectionString;
if (process.env.POSTGRES_URL) {
  // Vercel deployment uses POSTGRES_URL
  dbConnectionString = process.env.POSTGRES_URL;
  console.log('Using Vercel Postgres connection string');
} else if (process.env.NEON_DATABASE_URL) {
  // Local development uses NEON_DATABASE_URL
  dbConnectionString = process.env.NEON_DATABASE_URL;
  console.log('Using local Neon database connection string');
} else {
  console.error('No database connection string found in environment variables');
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
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Express
const app = express();

// Cache for responses
const responseCache = new Map();

// Session storage for conversation context
const sessions = new Map();

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

// API Key verification
const verifyApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// Main chat endpoint
app.post('/chat', verifyApiKey, async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    // Get or create session context
    const sessionContext = getSessionContext(sessionId);
    
    // Add user message to context
    updateContext(sessionContext, { role: 'user', content: message });
    
    // Check cache for identical request
    const cacheKey = `${sessionId}-${message}`;
    if (responseCache.has(cacheKey)) {
      console.log('Using cached response');
      return res.json(responseCache.get(cacheKey));
    }
    
    console.log(`Processing new request for session ${sessionId.substring(0, 8)}...`);
    
    // Get relevant knowledge from the knowledge base
    console.log('Retrieving relevant knowledge...');
    const relevantKnowledge = await getRelevantKnowledge(message);
    console.log(`Found ${relevantKnowledge.length} relevant knowledge items`);
    
    // Check for calculation intent
    console.log('Checking for calculation intent...');
    const calculationIntent = detectCalculationIntent(message);
    let calculationResult = null;
    
    if (calculationIntent) {
      try {
        console.log(`Detected calculation intent: ${calculationIntent.calculationType}`);
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
        
        console.log('Calculation completed successfully');
      } catch (error) {
        console.error('Error in calculation:', error);
        // Continue without calculation results
      }
    } else {
      console.log('No calculation intent detected');
    }
    
    // Generate response using OpenAI
    console.log('Generating AI response...');
    const aiResponse = await generateAIResponse(message, sessionContext, relevantKnowledge, calculationResult);
    
    // Update context with AI response
    updateContext(sessionContext, { role: 'assistant', content: aiResponse.content });
    
    // Save to cache
    const responseObject = {
      message: aiResponse.content,
      calculationResult: calculationResult
    };
    responseCache.set(cacheKey, responseObject);
    
    // Clean old cache entries
    if (responseCache.size > 100) {
      const oldestKey = responseCache.keys().next().value;
      responseCache.delete(oldestKey);
    }
    
    console.log('Response generated successfully');
    
    // Return response
    return res.json(responseObject);
    
  } catch (error) {
    console.error('Error handling chat request:', error);
    return res.status(500).json({ 
      error: "Villa kom upp við vinnslu fyrirspurnar. Vinsamlegast reyndu aftur.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbResult = await pool.query('SELECT NOW()');
    
    res.status(200).json({ 
      status: 'ok',
      database: 'connected',
      timestamp: dbResult.rows[0].now
    });
  } catch (error) {
    console.error('Health check error:', error);
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
    const aiTest = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: "Test response (answer with only 'OK')" }],
      max_tokens: 10
    });
    
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
        oldestCreatedAt: Array.from(sessions.values())[0]?.createdAt || null
      },
      cache: {
        size: responseCache.size
      }
    });
  } catch (error) {
    console.error('Diagnostic error:', error);
    res.status(500).json({ 
      status: 'error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ================ HELPER FUNCTIONS ================

/**
 * Gets or creates a session context
 * @param {string} sessionId - Unique session ID
 * @returns {Object} - Session context
 */
function getSessionContext(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      messages: [],
      lastCalculation: null,
      createdAt: new Date()
    });
    
    // Schedule cleanup for inactive sessions
    setTimeout(() => {
      if (sessions.has(sessionId)) {
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
  
  // Keep only last 10 messages for context
  if (sessionContext.messages.length > 10) {
    sessionContext.messages = sessionContext.messages.slice(-10);
  }
}

/**
 * Generates a response using OpenAI
 * @param {string} message - User message
 * @param {Object} context - Session context
 * @param {Array} relevantKnowledge - Relevant knowledge from knowledge base
 * @param {Object|null} calculationResult - Calculation result if available
 * @returns {Object} - AI response
 */
async function generateAIResponse(message, context, relevantKnowledge, calculationResult) {
  // Get the system message from the dedicated module
  const systemMessage = constructFullSystemPrompt(relevantKnowledge, calculationResult);
  
  // Construct messages array for the API call
  const messages = [
    { role: 'system', content: systemMessage },
    ...context.messages
  ];
  
  // Add debug logging
  console.log('Sending to OpenAI with context length:', context.messages.length);
  
  // Call OpenAI API
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Latest available GPT-4 model
      messages: messages,
      temperature: 0.7,
      max_tokens: 800 // Increased from 500 to allow more comprehensive responses
    });
    
    return completion.choices[0].message;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}