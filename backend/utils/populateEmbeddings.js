// utils/populateEmbeddings.js
import { knowledgeBase } from '../knowledgeBase.js';
import { bulkStoreEmbeddings } from './embeddings.js';
import dotenv from 'dotenv';

dotenv.config();

// Function to extract text chunks from the knowledge base
function extractTextChunks() {
  const chunks = [];
  
  // Process products
  if (knowledgeBase.products) {
    // Extract from Hellur
    if (knowledgeBase.products.hellur) {
      // Extract from main category
      chunks.push({
        content: knowledgeBase.products.hellur.description,
        metadata: {
          type: 'category',
          category: 'hellur',
          path: knowledgeBase.products.hellur.path
        }
      });
      
      // Extract from subcategories and products
      for (const [subCatKey, subCat] of Object.entries(knowledgeBase.products.hellur.subcategories)) {
        // Add subcategory description
        if (subCat.description) {
          chunks.push({
            content: subCat.description,
            metadata: {
              type: 'subcategory',
              category: 'hellur',
              subcategory: subCatKey,
              path: subCat.path
            }
          });
        }
        
        // Add products
        if (subCat.products) {
          for (const product of subCat.products) {
            // Combine product information into a single text
            const productText = `${product.name}. ${product.description || ''} ${product.shortDescription || ''}`;
            
            chunks.push({
              content: productText,
              metadata: {
                type: 'product',
                category: 'hellur',
                subcategory: subCatKey,
                productName: product.name,
                productSku: product.sku,
                path: product.path
              }
            });
          }
        }
      }
    }
    
    // Extract from Sandur
    if (knowledgeBase.products.sandur) {
      chunks.push({
        content: knowledgeBase.products.sandur.description,
        metadata: {
          type: 'category',
          category: 'sandur',
          path: knowledgeBase.products.sandur.path
        }
      });
      
      // Add products
      if (knowledgeBase.products.sandur.products) {
        for (const product of knowledgeBase.products.sandur.products) {
          const productText = `${product.name}. ${product.description || ''} ${product.shortDescription || ''}`;
          
          chunks.push({
            content: productText,
            metadata: {
              type: 'product',
              category: 'sandur',
              productName: product.name,
              productSku: product.sku,
              path: product.path
            }
          });
        }
      }
    }
    
    // Extract from Steypa
    if (knowledgeBase.products.steypa) {
      chunks.push({
        content: knowledgeBase.products.steypa.description,
        metadata: {
          type: 'category',
          category: 'steypa',
          path: knowledgeBase.products.steypa.path
        }
      });
      
      // Add products
      if (knowledgeBase.products.steypa.products) {
        for (const product of knowledgeBase.products.steypa.products) {
          const productText = `${product.name}. ${product.description || ''} ${product.shortDescription || ''}`;
          
          chunks.push({
            content: productText,
            metadata: {
              type: 'product',
              category: 'steypa',
              productName: product.name,
              productSku: product.sku,
              path: product.path
            }
          });
        }
      }
    }
    
    // Extract from Húseiningar
    if (knowledgeBase.products.huseiningar) {
      chunks.push({
        content: knowledgeBase.products.huseiningar.description,
        metadata: {
          type: 'category',
          category: 'huseiningar',
          path: knowledgeBase.products.huseiningar.path
        }
      });
      
      // Add products
      if (knowledgeBase.products.huseiningar.products) {
        for (const product of knowledgeBase.products.huseiningar.products) {
          const productText = `${product.name}. ${product.description || ''} ${product.shortDescription || ''}`;
          
          chunks.push({
            content: productText,
            metadata: {
              type: 'category',
              category: 'huseiningar',
              productName: product.name,
              productSku: product.sku,
              path: product.path
            }
          });
        }
      }
    }
    
    // Extract from Steyptar einingar
    if (knowledgeBase.products.steyptarEiningar) {
      chunks.push({
        content: knowledgeBase.products.steyptarEiningar.description,
        metadata: {
          type: 'category',
          category: 'steyptarEiningar',
          path: knowledgeBase.products.steyptarEiningar.path
        }
      });
      
      // Extract from subcategories and products
      for (const [subCatKey, subCat] of Object.entries(knowledgeBase.products.steyptarEiningar.subcategories)) {
        // Add subcategory description
        if (subCat.description) {
          chunks.push({
            content: subCat.description,
            metadata: {
              type: 'subcategory',
              category: 'steyptarEiningar',
              subcategory: subCatKey,
              path: subCat.path
            }
          });
        }
        
        // Add products
        if (subCat.products) {
          for (const product of subCat.products) {
            const productText = `${product.name}. ${product.description || ''} ${product.shortDescription || ''}`;
            
            chunks.push({
              content: productText,
              metadata: {
                type: 'product',
                category: 'steyptarEiningar',
                subcategory: subCatKey,
                productName: product.name,
                productSku: product.sku,
                path: product.path
              }
            });
          }
        }
      }
    }
  }
  
  // Process FAQs
  if (knowledgeBase.faqs) {
    for (const [category, questions] of Object.entries(knowledgeBase.faqs)) {
      for (const faq of questions) {
        chunks.push({
          content: `Q: ${faq.question} A: ${faq.answer}`,
          metadata: {
            type: 'faq',
            category: category
          }
        });
      }
    }
  }
  
  // Process Store Information
  if (knowledgeBase.storeInfo) {
    if (knowledgeBase.storeInfo.locations) {
      for (const location of knowledgeBase.storeInfo.locations) {
        chunks.push({
          content: `BM Vallá location: ${location.name}. Address: ${location.address}. Phone: ${location.phone}. Hours: ${location.hours}`,
          metadata: {
            type: 'storeInfo',
            subtype: 'location',
            locationName: location.name
          }
        });
      }
    }
    
    if (knowledgeBase.storeInfo.steypupantanir) {
      chunks.push({
        content: `Steypupantanir. Phone: ${knowledgeBase.storeInfo.steypupantanir.phone}. Hours: ${knowledgeBase.storeInfo.steypupantanir.hours}`,
        metadata: {
          type: 'storeInfo',
          subtype: 'steypupantanir'
        }
      });
    }
  }
  
  return chunks;
}

// Main function to populate embeddings
async function populateEmbeddings() {
  console.log('Starting to extract text chunks from knowledge base...');
  const chunks = extractTextChunks();
  console.log(`Extracted ${chunks.length} text chunks.`);
  
  console.log('Starting to generate and store embeddings...');
  try {
    const results = await bulkStoreEmbeddings(chunks);
    console.log(`Successfully stored ${results.length} embeddings.`);
  } catch (error) {
    console.error('Error storing embeddings:', error);
  }
}

// Run the population script
populateEmbeddings().catch(console.error);