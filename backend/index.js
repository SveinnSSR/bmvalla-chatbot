import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRelevantKnowledge } from './knowledgeBase.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://bmv-interactive-module.vercel.app',
    'https://www.bmvalla.is',
    'http://localhost:3000'
  ],
  methods: ['POST', 'OPTIONS'],
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
    
    // Placeholder response
    return res.json({
      message: "This is a placeholder response from the BM Vallá chatbot."
    });
    
  } catch (error) {
    console.error('Error handling chat request:', error);
    return res.status(500).json({ 
      error: "Villa kom upp við vinnslu fyrirspurnar. Vinsamlegast reyndu aftur."
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
