// utils/testVectorSearch.js
import { getRelevantKnowledge } from '../knowledgeBase.js';
import dotenv from 'dotenv';

dotenv.config();

async function testSearch() {
  try {
    // Test queries
    const queries = [
      "Hvaða hellur eru bestar fyrir innkeyrslu?",
      "Hvernig velur maður þykkt á hellum?",
      "Hvar get ég keypt steypuefni í Reykjavík?",
      "Hvað er VarioSand og hvernig á að nota það?"
    ];
    
    for (const query of queries) {
      console.log(`\nQuery: "${query}"`);
      const results = await getRelevantKnowledge(query);
      
      if (results.length === 0) {
        console.log("No relevant knowledge found.");
      } else {
        console.log(`Found ${results.length} relevant chunks:`);
        for (const [i, result] of results.entries()) {
          console.log(`\n#${i+1} (${Math.round(result.similarity * 100)}% match):`);
          console.log(`Type: ${result.metadata?.type || 'unknown'}`);
          console.log(`Text: ${result.text.substring(0, 150)}...`);
        }
      }
    }
  } catch (error) {
    console.error('Error testing vector search:', error);
  }
}

testSearch().catch(console.error);
