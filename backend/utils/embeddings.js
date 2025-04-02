// utils/embeddings.js
import pg from 'pg';
const { Pool } = pg;
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize database connection pool
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Generate an embedding for a text using OpenAI
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} - Embedding vector
 */
export async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Store a text and its embedding in the database
 * @param {string} content - Text content
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} - Result of the insertion
 */
export async function storeEmbedding(content, metadata = {}) {
  try {
    const embedding = await generateEmbedding(content);
    const client = await pool.connect();
    
    try {
      // Format the embedding array as a string
      const embeddingString = `[${embedding.join(',')}]`;
      
      const result = await client.query(
        'INSERT INTO knowledge_embeddings (content, metadata, embedding) VALUES ($1, $2, $3::vector) RETURNING id',
        [content, metadata, embeddingString]
      );
      
      return {
        id: result.rows[0].id,
        content,
        metadata
      };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error storing embedding:', error);
    throw error;
  }
}

/**
 * Search for similar content based on a query
 * @param {string} query - Query text
 * @param {number} limit - Maximum number of results
 * @param {number} similarityThreshold - Minimum similarity score (0-1)
 * @returns {Promise<Array>} - Array of matching results
 */
export async function searchSimilarContent(query, limit = 5, similarityThreshold = 0.7) {
  try {
    const queryEmbedding = await generateEmbedding(query);
    const client = await pool.connect();
    
    try {
      // Format the embedding array as a string
      const embeddingString = `[${queryEmbedding.join(',')}]`;
      
      const result = await client.query(
        `SELECT id, content, metadata, 
         1 - (embedding <=> $1::vector) AS similarity
         FROM knowledge_embeddings
         WHERE 1 - (embedding <=> $1::vector) > $3
         ORDER BY similarity DESC
         LIMIT $2`,
        [embeddingString, limit, similarityThreshold]
      );
      
      return result.rows;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error searching similar content:', error);
    throw error;
  }
}

/**
 * Bulk store multiple entries with their embeddings
 * @param {Array<Object>} entries - Array of {content, metadata} objects
 * @returns {Promise<Array>} - Result of the insertions
 */
export async function bulkStoreEmbeddings(entries) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const results = [];
    for (const entry of entries) {
      const embedding = await generateEmbedding(entry.content);
      
      // Format the embedding array as a string in the format that pgvector expects
      const embeddingString = `[${embedding.join(',')}]`;
      
      const result = await client.query(
        'INSERT INTO knowledge_embeddings (content, metadata, embedding) VALUES ($1, $2, $3::vector) RETURNING id',
        [entry.content, entry.metadata || {}, embeddingString]
      );
      
      results.push({
        id: result.rows[0].id,
        content: entry.content,
        metadata: entry.metadata
      });
    }
    
    await client.query('COMMIT');
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error bulk storing embeddings:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Export all functions
export default {
  generateEmbedding,
  storeEmbedding,
  searchSimilarContent,
  bulkStoreEmbeddings,
};