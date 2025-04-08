// calculators/index.js
// Central entry point for all calculator functions

import * as hellurCalculator from './hellur.js';
import * as sandurCalculator from './sandur.js';
import * as steypaCalculator from './steypa.js';
import * as huseiningarCalculator from './huseiningar.js';
import * as steyptarEiningarCalculator from './steyptarEiningar.js';  // Import the new calculator

/**
 * Detects calculation intent from user query with enhanced context awareness
 * @param {string} query - User's natural language query
 * @param {Object|null} sessionContext - Session context for reference resolution
 * @param {Array} relevantKnowledge - Knowledge from vector search
 * @returns {Object|null} - Detected calculation type and parameters, or null if no calculation intent found
 */
export function detectCalculationIntent(query, sessionContext = null, relevantKnowledge = []) {
  console.log(`🔍 Detecting calculation intent from: "${query}"`);
  
  // Normalize the query for easier pattern matching
  const normalizedQuery = query.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, " "); // Normalize whitespace

  // Try to extract entities from the query
  const extractedEntities = {
    stoneType: extractStoneType(query),
    dimensions: extractSizeSpecification(query),
    quantity: extractQuantity(query)
  };
  
  // Log extracted entities
  console.log(`📝 Extracted entities from query:`, extractedEntities);
  
  // Check if we have referential terms (like "slíkt", "það", etc.)
  const hasReferentialTerms = /\b(slikt|slik|slíkt|það|thad|þetta|thetta)\b/i.test(normalizedQuery);
  
  // If we have referential terms, try to resolve them from context
  if (hasReferentialTerms && sessionContext && sessionContext.entities) {
    console.log(`🔄 Detected referential terms, resolving from context`);
    
    // If no product was detected but there are previous products in context, use the most recent one
    if (!extractedEntities.stoneType && sessionContext.entities.products && sessionContext.entities.products.length > 0) {
      extractedEntities.stoneType = sessionContext.entities.products[sessionContext.entities.products.length - 1];
      console.log(`🔄 Resolved product from context: ${extractedEntities.stoneType}`);
    }
    
    // If no quantity was detected but there are previous quantities in context, use the most recent one
    if (!extractedEntities.quantity && sessionContext.entities.quantities && sessionContext.entities.quantities.length > 0) {
      extractedEntities.quantity = sessionContext.entities.quantities[sessionContext.entities.quantities.length - 1];
      console.log(`🔄 Resolved quantity from context: ${extractedEntities.quantity}`);
    }
    
    // If no dimensions were detected but there are previous dimensions in context, use the most recent one
    if (!extractedEntities.dimensions && sessionContext.entities.dimensions && sessionContext.entities.dimensions.length > 0) {
      extractedEntities.dimensions = sessionContext.entities.dimensions[sessionContext.entities.dimensions.length - 1];
      console.log(`🔄 Resolved dimensions from context:`, extractedEntities.dimensions);
    }
  }
  
  // If we have relevant knowledge, try to extract product information from it
  if (relevantKnowledge && relevantKnowledge.length > 0 && relevantKnowledge[0].similarity > 0.5) {
    console.log(`📚 Examining knowledge item with similarity: ${relevantKnowledge[0].similarity}`);
    
    // Extract product type from knowledge if present and not already extracted
    const knowledgeProduct = extractProductFromKnowledge(relevantKnowledge[0]);
    if (knowledgeProduct && !extractedEntities.stoneType) {
      extractedEntities.stoneType = knowledgeProduct;
      console.log(`📚 Extracted product from knowledge: ${knowledgeProduct}`);
    }
  }

  // Patterns for different calculation types
  // TODO: As we expand pricing functionality to other product categories (steypa, sandur, etc.),
  // add specific price calculation patterns for each product type here, following the same approach as priceCalculation
  const patterns = {
    // Paving stone patterns
    pavingStones: [
      /(?:hversu margar|hvað margar|fjöldi) hellur/i,
      /(?:hversu mikið af|hvað mikið af) hellum/i,
      /hellur (?:fyrir|á|í) (\d+)[\s]*(?:fermetra|m2|m²)/i,
      /reikna (?:út )?hellur/i
    ],
    baseSand: [
      /(?:hversu mikill|hvað mikill|magn af) hellusand/i,
      /sand(?:ur)? (?:undir|fyrir) hellur/i,
      /undirlag (?:fyrir|undir) hellur/i,
      /(?:hversu mikið|hvað mikið) undirlag/i
    ],
    jointSand: [
      /(?:hversu mikill|hvað mikill|magn af) pússningarsand/i,
      /fúgusand(?:ur)?/i,
      /sand(?:ur)? (?:í|fyrir) fúgur/i,
      /(?:hversu mikill|hvað mikill) variosand/i
    ],
    stoneThickness: [
      /(?:hvaða|hvernig) þykkt/i,
      /þykkt á hellum/i,
      /(?:þykkar|þykk) hellur/i
    ],
    completeProject: [
      /(?:heildarkostnaður|kostnaður) við hellulögn/i,
      /(?:allt efni|öll efni|allt) fyrir hellulögn/i,
      /hvað þarf ég (?:mikið|margt|allt)/i,
      /efnisþörf (?:fyrir|í) hellulögn/i
    ],

    // Price calculation patterns
    // Price calculation patterns for hellur products
    priceCalculation: [
      // Patterns with quantities
      /(?:hvað|hve) (?:kostar|kosta) (\d+) (?:stykki af |stk af |stk\. af |)?([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /verð(?:ið)? fyrir (\d+) ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /(?:hvað|hve) (?:kosta(?:r)?) (\d+) ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /(\d+) stykki af ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /(\d+) (?:stk\.|stk|stykki) ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      
      // Patterns for questions without specific quantities
      /(?:hvað|hve) (?:kostar|kosta) ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /(?:hvað|hvert) er verð(?:ið)? (?:á|fyrir) ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /(?:hvað|hvert) væri verð(?:ið)? fyrir ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      /verð(?:ið)? (?:á|fyrir) ([a-zðþæöáéíóúý\s]+)(?:hellur|hellum|)/i,
      
      // Reference patterns (for "slíkt", "það", etc.)
      /(?:hvað|hvert) (?:kostar|kosta|er verð(?:ið)?|væri verð(?:ið)?) (?:á |fyrir |)(?:slíkt|slikt|slik|það|thad|þetta|thetta)/i,
      /verð(?:ið)? (?:á |fyrir |)(?:slíkt|slikt|slik|það|thad|þetta|thetta)/i,
      /(?:hvað|hve) (?:kostar|kosta) (?:það|thad|þetta|thetta)/i
    ],    
    
    // Concrete calculation patterns
    concreteVolume: [
      /(?:hversu mikil|hvað mikil|magn af) steyp[au]/i,
      /steypa (?:fyrir|á|í) (\d+)[\s]*(?:fermetra|m2|m²)/i,
      /reikna (?:út )?steypu/i,
      /rúmmál steypu/i,
      /(?:hversu mikið|hvað mikið) af steypu/i
    ],
    columnVolume: [
      /(?:hversu mikil|hvað mikil) steypa í súlu/i,
      /steypa (?:fyrir|á|í) súlu/i,
      /steypusúla/i,
      /steypa í stoð/i,
      /rúmmál súlu/i
    ],
    concreteType: [
      /(?:hvaða|hver|hvernig) steyp[au]/i,
      /(?:hvaða|hver|hvernig) gerð af steypu/i,
      /(?:mæla með|ráðleggja) steypu/i,
      /(?:hvaða|hvernig) steypugerð/i
    ],
    carbonFootprint: [
      /kolefnisspor/i,
      /umhverfisáhrif steypu/i,
      /vistvæn[a]? steyp[au]/i,
      /loftslagsáhrif steypu/i
    ],
    completeConcreteProject: [
      /(?:heildarkostnaður|kostnaður) við steypun/i,
      /(?:allt efni|öll efni|allt) fyrir steypun/i,
      /steypuprojekt/i,
      /efnisþörf (?:fyrir|í) steypun/i
    ],
    
    // Housing units calculation patterns
    constructionTime: [
      /(?:hversu|hvað) (?:fljótt|fljótlega|langan tíma)/i,
      /(?:hversu|hvað) (?:langur|lengi) (?:byggingartími|verktími)/i,
      /tímasparnaður með (?:húseiningu|húseiningum|Smellinn)/i,
      /(?:hraða|flýta) byggingu/i
    ],
    materialRequirements: [
      /(?:hversu|hvað) (?:mikið|mikil) efni/i,
      /efnisþörf (?:fyrir|í) (?:húseiningu|húseiningar|Smellinn)/i,
      /efnisnotkun fyrir hús/i,
      /magn húseininga/i
    ],
    housingCost: [
      /(?:hvað kostar|kostnaður á|verð á) (?:húseiningu|húseiningum|Smellinn)/i,
      /(?:kostnaðaráætlun|kostnaðarmat) (?:fyrir|á) (?:hús|íbúðarhús|byggingu)/i,
      /(?:hversu|hvað) (?:dýrt|ódýrt) (?:er að|að) byggja/i,
      /fjárfesting í (?:húseiningu|Smellinn)/i
    ],
    environmentalImpact: [
      /(?:umhverfisáhrif|umhverfisvænna) (?:húseininga|Smellinn)/i,
      /kolefnisspor (?:húseininga|byggingar)/i,
      /(?:vistvænni|vistvænt) (?:byggingarmáti|húsnæði)/i,
      /umhverfissjónarmið (?:í|við) byggingu/i
    ],
    projectTimeline: [
      /(?:verkáætlun|tímalína) (?:fyrir|við) byggingu/i,
      /(?:hvenær|hvaða tíma) (?:er hægt að|getur|má) byrja/i,
      /(?:hvenær|hvaða tíma) (?:verður|er) tilbúið/i,
      /skipulag (?:byggingarframkvæmda|verkefnis)/i
    ],
    
    // Steyptar einingar (Precast concrete elements) calculation patterns
    binShelterRequirements: [
      /(?:sorptunnu|ruslatunnu|ruslaskýli|rusla\s*skýli|sorptunnu\s*skýli)/i,
      /(?:hvaða|hvernig|hvers\s*konar) (?:skýli|skyli) (?:fyrir|með|handa) (?:sorptunnu|ruslatunnu|ruslagám|sorpgám)/i,
      /(?:hversu stórt|hvað stórt|stærð á) (?:sorptunnu|ruslatunnu)(?:skýli|skyli)/i,
      /(?:mæla með|ráðleggja) (?:sorptunnu|ruslatunnu|rusla)(?:skýli|skyli)/i
    ],
    postSpacing: [
      /(?:staura|staurar|hvernig staura|hvaða staura|staura uppröðun)/i,
      /(?:borgarstaur|hafnarstaur|hverfisstaur|haki staur|búlki)/i,
      /(?:hversu langt|hvað langt|bil|millibil) (?:á milli|milli) staura/i,
      /(?:hversu marga|hvað marga|fjöldi) (?:staura|staurur)/i,
      /(?:afmörkun|afmarka|hindra|stýra) (?:með staurum|umferð)/i
    ],
    benchPlacement: [
      /(?:bekk|bekkur|bekkir|bekki|garðbekkur|garðbekk|bekkjum)/i,
      /(?:hvar|hvernig|hvaða) (?:staðsetja|setja|raða|uppröðun) (?:bekk|bekki|bekkjum)/i,
      /(?:bekk|bekkur|bekkir) (?:staðsetning|uppröðun|bil)/i,
      /(?:hversu marga|hvað marga|fjöldi) (?:bekki|bekk|bekkjar|bekkjum)/i
    ],
    planterCalculation: [
      /(?:blómakeri|blómakör|blómakar|blómaker|borgarker|menningarborgarker)/i,
      /(?:hversu mörg|hvað mörg|fjöldi) (?:blómakeri|blómakör|blómakar|ker)/i,
      /(?:hvaða|hvernig|hvers\s*konar) (?:ker|blómakeri|blómaker) (?:fyrir|á|í) (?:svæði|garð|flöt)/i
    ],
    stepConfiguration: [
      /(?:þrep|tröppur|stigi|stigar|trappa|steypt þrep)/i,
      /(?:hversu mörg|hvað mörg|fjöldi) (?:þrep|tröppur|trappa|tröppum)/i,
      /(?:hæð|hæðarmunur|upp) (?:á|í) (?:þrepum|tröppum|stiga)/i,
      /(?:reikna|mæla|útreikningur) (?:þrep|tröppur|stiga)/i
    ],
    barrierRequirements: [
      /(?:vegrið|vegriðs|umferðartálma|hraðahindranir|koddi|rebloc)/i,
      /(?:hversu mikið|hvað mikið|lengd á) (?:vegrið|vegriði|umferðartálma)/i,
      /(?:umferðaröryggi|hindra umferð|stýra umferð)/i
    ]
  };

  // Special handling for direct price inquiries with known product
  const isPriceInquiry = /\b(?:verð|kosta|kostar|price)\b/i.test(normalizedQuery);
  if (isPriceInquiry && extractedEntities.stoneType) {
    console.log(`💰 Direct price inquiry detected for ${extractedEntities.stoneType}`);
    return {
      calculationType: 'priceCalculation',
      parameters: {
        stoneType: extractedEntities.stoneType,
        quantity: extractedEntities.quantity || 1,
        dimensions: extractedEntities.dimensions
      }
    };
  }

  // Check for matches in patterns
  for (const [calculationType, patternList] of Object.entries(patterns)) {
    for (const pattern of patternList) {
      if (pattern.test(normalizedQuery)) {
        // Special handling for price calculation patterns
        if (calculationType === 'priceCalculation') {
          const match = normalizedQuery.match(pattern);
          
          // Extract quantity and product type from the pattern match
          let quantity = extractedEntities.quantity || 1; // Default to extracted or 1
          let productType = extractedEntities.stoneType || ''; // Default to extracted
          
          // Check for referential terms
          const isReferential = /(?:slíkt|slikt|slik|það|thad|þetta|thetta)/i.test(normalizedQuery);
          
          if (match && !isReferential) {
            if (match.length >= 3 && !isNaN(parseInt(match[1], 10))) {
              // This is a pattern with quantity specified (e.g., "hvað kosta 50 modena hellur")
              quantity = parseInt(match[1], 10);
              productType = match[2]?.trim() || productType;
            } else if (match.length >= 2) {
              // This is a pattern without quantity (e.g., "hvað kosta modena hellur")
              productType = match[1]?.trim() || productType;
            }
          }
          
          // Special case for Modena which is often mentioned specifically
          if (productType.includes('modena')) {
            productType = 'modena';
          }
          
          // Store the extracted entities in session context if available
          if (sessionContext && sessionContext.entities) {
            if (productType) {
              sessionContext.entities.products = sessionContext.entities.products || [];
              sessionContext.entities.products.push(productType);
              console.log(`💾 Stored product in session context: ${productType}`);
            }
            
            if (quantity) {
              sessionContext.entities.quantities = sessionContext.entities.quantities || [];
              sessionContext.entities.quantities.push(quantity);
              console.log(`💾 Stored quantity in session context: ${quantity}`);
            }
            
            if (extractedEntities.dimensions) {
              sessionContext.entities.dimensions = sessionContext.entities.dimensions || [];
              sessionContext.entities.dimensions.push(extractedEntities.dimensions);
              console.log(`💾 Stored dimensions in session context:`, extractedEntities.dimensions);
            }
          }
          
          console.log(`✅ Detected ${calculationType} calculation intent for ${quantity} ${productType}${extractedEntities.dimensions ? ` size ${extractedEntities.dimensions.length}x${extractedEntities.dimensions.width}${extractedEntities.dimensions.thickness ? 'x'+extractedEntities.dimensions.thickness : ''}` : ''}`);
          
          return {
            calculationType,
            parameters: {
              quantity: quantity,
              stoneType: productType,
              dimensions: extractedEntities.dimensions
            }
          };
        }  
        
        // Extract dimensions if present
        const dimensions = extractDimensions(query);
        
        // Extract stone type if present
        const stoneType = extractedEntities.stoneType || extractStoneType(query);
        
        // Extract thickness if present
        const thickness = extractThickness(query);
        
        // Extract usage type if present
        const usage = extractUsage(query);
        
        // Extract concrete-specific parameters
        const concreteParams = extractConcreteParameters(query);
        
        // Extract environmental focus
        const environmentalFocus = detectEnvironmentalFocus(query);
        
        // Extract parameters specific to steyptarEiningar
        const steyptarEiningarParams = extractSteyptarEiningarParameters(query, calculationType);
        
        // Combine all parameters
        const parameters = {
          ...dimensions,
          ...concreteParams,
          stoneType,
          thickness,
          usage,
          environmentalFocus,
          ...steyptarEiningarParams
        };
        
        // Store the extracted entities in session context if available
        if (sessionContext && sessionContext.entities) {
          if (stoneType) {
            sessionContext.entities.products = sessionContext.entities.products || [];
            sessionContext.entities.products.push(stoneType);
          }
          
          if (dimensions && (dimensions.length || dimensions.width)) {
            sessionContext.entities.dimensions = sessionContext.entities.dimensions || [];
            sessionContext.entities.dimensions.push(dimensions);
          }
        }
        
        console.log(`✅ Detected ${calculationType} calculation intent`);
        console.log(`📊 Extracted parameters:`, parameters);
        
        return {
          calculationType,
          parameters
        };
      }
    }
  }

  // If no intent was detected but it might be price-related, try fallback detection
  const fallbackIntent = detectFallbackPriceIntent(query, sessionContext, relevantKnowledge);
  if (fallbackIntent) {
    return fallbackIntent;
  }

  console.log(`⚠️ No calculation intent detected`);
  // No calculation intent detected
  return null;
}

/**
 * Routes calculation request to the appropriate calculator
 * @param {string} calculationType - Type of calculation to perform
 * @param {Object} parameters - Calculation parameters
 * @returns {Object} - Calculation result
 */
export function processCalculation(calculationType, parameters) {
  console.log(`🧮 Processing ${calculationType} calculation with parameters:`, parameters);
  
  // TODO: As you add price calculation functions to other calculator modules
  // (steypa, sandur, etc.), add corresponding cases here to handle those product types
  switch (calculationType) {
    // Price calculation for paving stones
    case 'priceCalculation':
      // Extract any size specifications in the query
      return hellurCalculator.calculatePrice(
        parameters.stoneType || 'hella',
        parameters.quantity || 1,
        parameters.dimensions  // Pass the dimensions from parameters
      );

    // Paving stone calculations
    case 'pavingStones':
      const result = hellurCalculator.calculatePavingStones(
        parameters.length || 5, // Default 5m if not specified
        parameters.width || 5,   // Default 5m if not specified
        parameters.stoneType || 'hella'
      );
      console.log(`✅ Paving stones calculation result:`, result);
      return result;
    
    case 'baseSand':
      return sandurCalculator.calculateBaseSand(
        parameters.length || 5,
        parameters.width || 5,
        parameters.thickness || 3
      );
    
    case 'jointSand':
      return sandurCalculator.calculateJointSand(
        parameters.area || parameters.length * parameters.width || 25,
        parameters.jointWidth || 3,
        parameters.stonePattern || 'regular',
        parameters.stoneSize || 30,
        parameters.thickness || 6,
        parameters.usePolymerSand || false
      );
    
    case 'stoneThickness':
      return hellurCalculator.recommendStoneThickness(
        parameters.usage || 'default'
      );
    
    case 'completeProject':
      return hellurCalculator.calculateCompleteProject(
        parameters.length || 5,
        parameters.width || 5,
        parameters.stoneType || 'hella',
        parameters.thickness || 6
      );
    
    // Concrete calculations
    case 'concreteVolume':
      return steypaCalculator.calculateConcreteVolume(
        parameters.length || 5,
        parameters.width || 5,
        parameters.thickness || 15
      );
      
    case 'columnVolume':
      if (parameters.postWidth && parameters.postHeight) {
        return steypaCalculator.calculateColumnWithPostVolume(
          parameters.diameter || 30,
          parameters.height || 100,
          parameters.postWidth,
          parameters.postHeight,
          parameters.postCount || 1
        );
      } else {
        return steypaCalculator.calculateColumnVolume(
          parameters.diameter || 30,
          parameters.height || 100
        );
      }
      
    case 'concreteType':
      return steypaCalculator.recommendConcreteType(
        parameters.usage || 'default',
        parameters.environmentalFocus || false
      );
      
    case 'carbonFootprint':
      return steypaCalculator.estimateCarbonFootprint(
        parameters.volume || 1,
        parameters.concreteType || 'default'
      );
      
    case 'completeConcreteProject':
      const concreteDimensions = {
        length: parameters.length,
        width: parameters.width,
        thickness: parameters.thickness,
        diameter: parameters.diameter,
        height: parameters.height,
        postWidth: parameters.postWidth,
        postHeight: parameters.postHeight,
        postCount: parameters.postCount
      };
      
      return steypaCalculator.calculateCompleteConcreteProject(
        concreteDimensions,
        parameters.usage || 'default',
        parameters.environmentalFocus || false
      );
      
    // Housing units calculations
    case 'constructionTime':
      return huseiningarCalculator.estimateTimeSavings(
        parameters.floorArea || parameters.area || parameters.length * parameters.width || 100,
        parameters.buildingType || extractBuildingType(query) || "default",
        parameters.fullPrefabrication !== false
      );
      
    case 'materialRequirements':
      return huseiningarCalculator.calculateMaterialRequirements(
        parameters.floorArea || parameters.area || parameters.length * parameters.width || 100,
        parameters.floors || 1,
        parameters.buildingType || extractBuildingType(query) || "default"
      );
      
    case 'housingCost':
      return huseiningarCalculator.estimateCost(
        parameters.floorArea || parameters.area || parameters.length * parameters.width || 100,
        parameters.buildingType || extractBuildingType(query) || "default",
        parameters.highEndFinish || false
      );
      
    case 'environmentalImpact':
      return huseiningarCalculator.evaluateEnvironmentalImpact(
        parameters.floorArea || parameters.area || parameters.length * parameters.width || 100,
        parameters.buildingType || extractBuildingType(query) || "default"
      );
      
    case 'projectTimeline':
      return huseiningarCalculator.estimateProjectTimeline(
        parameters.floorArea || parameters.area || parameters.length * parameters.width || 100,
        parameters.buildingType || extractBuildingType(query) || "default",
        parameters.includeSitePreparation !== false
      );
    
    // Steyptar einingar (Precast concrete elements) calculations
    case 'binShelterRequirements':
      return steyptarEiningarCalculator.calculateBinShelterRequirements(
        parameters.binCount || 2,
        parameters.binType || "medium",
        parameters.withAccessories !== false
      );
      
    case 'postSpacing':
      return steyptarEiningarCalculator.calculatePostSpacing(
        parameters.postType || "borgarstaur",
        parameters.count || Math.ceil(parameters.length / 1.5),
        parameters.spacing || 1.5
      );
      
    case 'benchPlacement':
      return steyptarEiningarCalculator.calculateBenchPlacement(
        parameters.benchType || "garðbekkur með baki",
        parameters.count || 2,
        parameters.arrangement || "line"
      );
      
    case 'planterCalculation':
      return steyptarEiningarCalculator.calculatePlanters(
        parameters.length || 5,
        parameters.width || 3,
        parameters.planterType || "Borgarker"
      );
      
    case 'stepConfiguration':
      return steyptarEiningarCalculator.calculateStepConfiguration(
        parameters.heightDifference || 100,
        parameters.availableSpace || 200
      );
      
    case 'barrierRequirements':
      return steyptarEiningarCalculator.calculateBarrierRequirements(
        parameters.length || 10,
        parameters.barrierType || "Rebloc",
        parameters.permanentInstallation || false
      );
    
    default:
      throw new Error(`Óþekkt tegund útreiknings: ${calculationType}`);
  }
}

// ================ HELPER FUNCTIONS ================

/**
 * Extracts dimensions from a query
 * @param {string} query - User's natural language query
 * @returns {Object} - Extracted dimensions
 */
function extractDimensions(query) {
  const dimensions = {};
  console.log(`🔍 Extracting dimensions from: "${query}"`);
  
  // Match length x width pattern (e.g. "5x3 metra", "5 sinnum 3 metra")
  const dimensionsPattern = /(\d+(?:[,.]\d+)?)\s*(?:x|sinnum|\*)\s*(\d+(?:[,.]\d+)?)\s*(?:metra|m|fermetra|m2|m²)?/i;
  const dimensionsMatch = query.match(dimensionsPattern);
  
  if (dimensionsMatch) {
    dimensions.length = parseFloat(dimensionsMatch[1].replace(',', '.'));
    dimensions.width = parseFloat(dimensionsMatch[2].replace(',', '.'));
    dimensions.area = dimensions.length * dimensions.width;
    console.log(`📏 Matched dimensions pattern: length=${dimensions.length}, width=${dimensions.width}, area=${dimensions.area}`);
    return dimensions;
  }
  
  // Match natural language format (e.g. "6 metrar á lengd og 3 metrar á breidd")
  const naturalLengthPattern = /(\d+(?:[,.]\d+)?)\s*(?:metra|m|metrar)\s*(?:á|a|í|i)?\s*(?:lengd)/i;
  const naturalWidthPattern = /(\d+(?:[,.]\d+)?)\s*(?:metra|m|metrar)\s*(?:á|a|í|i)?\s*(?:breidd)/i;
  
  const naturalLengthMatch = query.match(naturalLengthPattern);
  const naturalWidthMatch = query.match(naturalWidthPattern);
  
  if (naturalLengthMatch && naturalWidthMatch) {
    dimensions.length = parseFloat(naturalLengthMatch[1].replace(',', '.'));
    dimensions.width = parseFloat(naturalWidthMatch[1].replace(',', '.'));
    dimensions.area = dimensions.length * dimensions.width;
    console.log(`📏 Matched natural language pattern: length=${dimensions.length}, width=${dimensions.width}, area=${dimensions.area}`);
    return dimensions;
  }
  
  // Match area pattern (e.g. "30 fermetra", "30m²")
  const areaPattern = /(\d+(?:[,.]\d+)?)\s*(?:fermetra|fermetrar|m2|m²)/i;
  const areaMatch = query.match(areaPattern);
  
  if (areaMatch) {
    const area = parseFloat(areaMatch[1].replace(',', '.'));
    dimensions.area = area;
    
    // Assume square area if only area is provided
    dimensions.length = Math.sqrt(area);
    dimensions.width = Math.sqrt(area);
    console.log(`📏 Matched area pattern: area=${dimensions.area}, assumed length=${dimensions.length}, width=${dimensions.width}`);
    return dimensions;
  }
  
  // Match individual length and width patterns
  const lengthPattern = /(?:lengd|längt|langt)?\s*(\d+(?:[,.]\d+)?)\s*(?:metra|m)/i;
  const widthPattern = /(?:breidd|breitt)?\s*(\d+(?:[,.]\d+)?)\s*(?:metra|m)/i;
  
  const lengthMatch = query.match(lengthPattern);
  const widthMatch = query.match(widthPattern);
  
  if (lengthMatch) {
    dimensions.length = parseFloat(lengthMatch[1].replace(',', '.'));
    console.log(`📏 Matched length: ${dimensions.length}m`);
  }
  
  if (widthMatch) {
    dimensions.width = parseFloat(widthMatch[1].replace(',', '.'));
    console.log(`📏 Matched width: ${dimensions.width}m`);
  }
  
  // Calculate area if both length and width are available
  if (dimensions.length && dimensions.width) {
    dimensions.area = dimensions.length * dimensions.width;
    console.log(`📏 Calculated area: ${dimensions.area}m²`);
  }
  
  // If no dimensions were found, log it
  if (Object.keys(dimensions).length === 0) {
    console.log(`⚠️ No dimensions found in the query`);
  }
  
  return dimensions;
}

/**
 * Extracts quantity from a query
 * @param {string} query - User's natural language query
 * @returns {number|null} - Extracted quantity or null if not found
 */
function extractQuantity(query) {
  const normalizedQuery = query.toLowerCase();
  console.log(`🔍 Extracting quantity from query`);
  
  // Various patterns to match quantity expressions
  const patterns = [
    /(\d+)\s*(?:stykki|stk|stk\.|pcs)/i,  // 20 stykki, 30 stk, 50 pcs
    /(\d+)\s*(?:hellur|hellum)/i,  // 100 hellur, 200 hellum
    /(\d+)\s*(?:af|fyrir)/i,      // 500 af, 1000 fyrir
  ];
  
  for (const pattern of patterns) {
    const match = normalizedQuery.match(pattern);
    if (match && match[1]) {
      const quantity = parseInt(match[1], 10);
      console.log(`🔢 Found quantity: ${quantity}`);
      return quantity;
    }
  }
  
  // Look for standalone numbers that might represent quantities
  const standaloneNumberPattern = /\b(\d+)\b/;
  const standaloneMatch = normalizedQuery.match(standaloneNumberPattern);
  
  if (standaloneMatch && standaloneMatch[1]) {
    // Only consider it a quantity if it's a reasonably sized number (to avoid confusing with dimensions)
    const potentialQuantity = parseInt(standaloneMatch[1], 10);
    if (potentialQuantity > 10 && potentialQuantity < 100000) {  // Arbitrary range for reasonable quantities
      console.log(`🔢 Found potential quantity from standalone number: ${potentialQuantity}`);
      return potentialQuantity;
    }
  }
  
  console.log(`⚠️ No quantity found`);
  return null;
}

/**
 * Extracts stone type from a query
 * @param {string} query - User's natural language query
 * @returns {string|null} - Extracted stone type or null if not found
 */
function extractStoneType(query) {
  const normalizedQuery = query.toLowerCase();
  console.log(`🔍 Extracting stone type from query`);
  
  // Prioritize modena in the stone types list
  const stoneTypes = [
    { pattern: /modena/i, type: "modena" }, // Moved to top for priority
    { pattern: /fornstein/i, type: "fornsteinn" },
    { pattern: /herragarðsstein/i, type: "herragarðssteinn" },
    { pattern: /jötunstein/i, type: "jötunsteinn" },
    { pattern: /óðalsstein/i, type: "óðalssteinn" },
    { pattern: /rómarstein/i, type: "rómarsteinn" },
    { pattern: /torgstein/i, type: "torgsteinn" },
    { pattern: /vínarstein/i, type: "vínarsteinn" },
    { pattern: /grassstein/i, type: "grassteinn" },
    { pattern: /borgarhellu/i, type: "borgarhella" },
    { pattern: /hellu[^r]/i, type: "hella" } // Match "hellu" but not "hellur"
  ];
  
  for (const { pattern, type } of stoneTypes) {
    if (pattern.test(normalizedQuery)) {
      console.log(`🧱 Found stone type: ${type}`);
      return type;
    }
  }
  
  // Default to "hella" if "hellur" is mentioned
  if (/hellur/i.test(normalizedQuery)) {
    console.log(`🧱 Defaulting to stone type: hella (from "hellur")`);
    return "hella";
  }
  
  console.log(`⚠️ No specific stone type found`);
  return null;
}

/**
 * Extracts dimensions from a size specification string like "10x10x6"
 * @param {string} query - User's query containing size specification
 * @returns {Object|null} - Dimensions object or null if not found
 */
function extractSizeSpecification(query) {
  // Look for patterns like "10x10x6", "10 x 10 x 6", "10x10", "stærð 10x10", etc.
  const sizePattern = /(\d+)\s*x\s*(\d+)(?:\s*x\s*(\d+))?/i;
  const match = query.match(sizePattern);
  
  if (match) {
    const dimensions = {
      length: parseInt(match[1], 10),
      width: parseInt(match[2], 10)
    };
    
    // Include thickness if present
    if (match[3]) {
      dimensions.thickness = parseInt(match[3], 10);
    }
    
    console.log(`📏 Extracted size specification:`, dimensions);
    return dimensions;
  }
  
  return null;
}

/**
 * Extracts thickness from a query
 * @param {string} query - User's natural language query
 * @returns {number|null} - Extracted thickness in cm or null if not found
 */
function extractThickness(query) {
  console.log(`🔍 Extracting thickness from query`);
  
  const thicknessPattern = /(\d+)(?:\s*|-)?(?:cm)?\s*(?:þykk|þykkur|þykkt)/i;
  const match = query.match(thicknessPattern);
  
  if (match) {
    const thickness = parseInt(match[1], 10);
    console.log(`📏 Found thickness: ${thickness}cm`);
    return thickness;
  }
  
  // Try alternative pattern (e.g. "þykkt 6 cm")
  const altPattern = /þykkt\s*(\d+)(?:\s*|-)?(?:cm)?/i;
  const altMatch = query.match(altPattern);
  
  if (altMatch) {
    const thickness = parseInt(altMatch[1], 10);
    console.log(`📏 Found thickness (alt pattern): ${thickness}cm`);
    return thickness;
  }
  
  console.log(`⚠️ No thickness found`);
  return null;
}

/**
 * Extracts usage type from a query
 * @param {string} query - User's natural language query
 * @returns {string|null} - Extracted usage type or null if not found
 */
function extractUsage(query) {
  const normalizedQuery = query.toLowerCase();
  console.log(`🔍 Extracting usage type from query`);
  
  const usageTypes = [
    { pattern: /(?:innkeyrslu|innkeyrsla)/i, type: "innkeyrsla" },
    { pattern: /(?:bílastæði|bilastaedi)/i, type: "bílastæði" },
    { pattern: /(?:gangstétt|gangstett)/i, type: "gangstétt" },
    { pattern: /(?:þungaumferð|thungaumferd)/i, type: "þungaumferð" },
    { pattern: /göngustíg/i, type: "gangstétt" },
    // Concrete-specific usage types
    { pattern: /(?:innanhúss|innanhus|innandyra)/i, type: "innanhúss" },
    { pattern: /(?:utanhúss|utanhus|utandyra)/i, type: "utanhúss" },
    { pattern: /(?:sökkul|sokkul)/i, type: "sökkull" },
    { pattern: /(?:vegg|veggi)/i, type: "veggur" },
    { pattern: /(?:plötu|plata)/i, type: "plata" },
    { pattern: /(?:bílaplön|bílaplan|bilaplan)/i, type: "bílaplön" },
    { pattern: /(?:sjó|sjor)/i, type: "sjóvari" },
    { pattern: /(?:gólf|golf)/i, type: "gólf" }
  ];
  
  for (const { pattern, type } of usageTypes) {
    if (pattern.test(normalizedQuery)) {
      console.log(`🏗️ Found usage type: ${type}`);
      return type;
    }
  }
  
  console.log(`⚠️ No usage type found`);
  return null;
}

/**
 * Extracts concrete-specific parameters from a query
 * @param {string} query - User's natural language query
 * @returns {Object} - Extracted concrete parameters
 */
function extractConcreteParameters(query) {
  const params = {};
  const normalizedQuery = query.toLowerCase();
  console.log(`🔍 Extracting concrete parameters from query`);
  
  // Extract column diameter (e.g., "30 cm í þvermál", "súla með 40 cm þvermál")
  const diameterPattern = /(\d+)(?:\s*|-)?(?:cm)?\s*(?:í þvermál|þvermál|diameter)/i;
  const diameterMatch = query.match(diameterPattern);
  if (diameterMatch) {
    params.diameter = parseInt(diameterMatch[1], 10);
    console.log(`📏 Found column diameter: ${params.diameter}cm`);
  }
  
  // Extract height (e.g., "200 cm há", "hæð 150 cm")
  const heightPattern = /(\d+)(?:\s*|-)?(?:cm)?\s*(?:há|hár|hæð)/i;
  const heightMatch = query.match(heightPattern);
  if (heightMatch) {
    params.height = parseInt(heightMatch[1], 10);
    console.log(`📏 Found height: ${params.height}cm`);
  }
  
  // Extract post dimensions (e.g., "10x10 cm staur", "staur 15x15 cm")
  const postPattern = /(\d+)(?:\s*|-)?(?:x|sinnum)(\d+)(?:\s*|-)?(?:cm)?\s*(?:staur|staurar)/i;
  const postMatch = query.match(postPattern);
  if (postMatch) {
    params.postWidth = parseInt(postMatch[1], 10);
    params.postHeight = parseInt(postMatch[2], 10);
    console.log(`📏 Found post dimensions: ${params.postWidth}x${params.postHeight}cm`);
  }
  
  // Extract post count (e.g., "3 staurar", "með 2 staurum")
  const postCountPattern = /(\d+)\s*(?:staur|staurar|staurum)/i;
  const postCountMatch = query.match(postCountPattern);
  if (postCountMatch) {
    params.postCount = parseInt(postCountMatch[1], 10);
    console.log(`🔢 Found post count: ${params.postCount}`);
  }
  
  // Extract concrete volume if directly specified (e.g., "2 rúmmetrar af steypu")
  const volumePattern = /(\d+(?:[,.]\d+)?)\s*(?:rúmmetra|rúmmetrar|m3|m³)/i;
  const volumeMatch = query.match(volumePattern);
  if (volumeMatch) {
    params.volume = parseFloat(volumeMatch[1].replace(',', '.'));
    console.log(`📊 Found concrete volume: ${params.volume}m³`);
  }
  
  // Extract concrete type if specified
  if (/aflsteypa/i.test(normalizedQuery)) {
    params.concreteType = "Aflsteypa | C35";
    console.log(`🧱 Found concrete type: Aflsteypa | C35`);
  } else if (/berglind\s+svan/i.test(normalizedQuery)) {
    params.concreteType = "Berglind | Svan | C30";
    console.log(`🧱 Found concrete type: Berglind | Svan | C30`);
  } else if (/berglind/i.test(normalizedQuery)) {
    params.concreteType = "Berglind | Vistvænni steypa | C30";
    console.log(`🧱 Found concrete type: Berglind | Vistvænni steypa | C30`);
  } else if (/perluílögn|perlulogn/i.test(normalizedQuery)) {
    params.concreteType = "Gólfsteypa | Perluílögn";
    console.log(`🧱 Found concrete type: Gólfsteypa | Perluílögn`);
  }
  
  if (Object.keys(params).length === 0) {
    console.log(`⚠️ No concrete parameters found`);
  }
  
  return params;
}

/**
 * Detects if there is environmental focus in the query
 * @param {string} query - User's natural language query
 * @returns {boolean} - True if environmental focus is detected
 */
function detectEnvironmentalFocus(query) {
  const normalizedQuery = query.toLowerCase();
  console.log(`🔍 Checking for environmental focus in query`);
  
  const environmentalTerms = [
    /vistvæn/i,
    /umhverfisvæn/i,
    /kolefnisspor/i,
    /umhverfisáhrif/i,
    /loftslagsáhrif/i,
    /umhverfissjónarmið/i,
    /umhverfisvottun/i,
    /svansvott/i,
    /epd/i,
    /umhverfisyfirlýsing/i
  ];
  
  const hasEnvironmentalFocus = environmentalTerms.some(pattern => pattern.test(normalizedQuery));
  
  if (hasEnvironmentalFocus) {
    console.log(`🌱 Environmental focus detected`);
  } else {
    console.log(`🌱 No environmental focus detected`);
  }
  
  return hasEnvironmentalFocus;
}

/**
 * Extracts building type from a query for housing units
 * @param {string} query - User's natural language query
 * @returns {string|null} - Extracted building type or null if not found
 */
function extractBuildingType(query) {
  const normalizedQuery = query.toLowerCase();
  console.log(`🔍 Extracting building type from query`);
  
  const buildingTypes = [
    { pattern: /einbýli/i, type: "einbýlishús" },
    { pattern: /raðhús/i, type: "raðhús" },
    { pattern: /fjölbýli/i, type: "fjölbýlishús" },
    { pattern: /sumarbústað/i, type: "sumarbústaður" },
    { pattern: /sumarhús/i, type: "sumarbústaður" },
    { pattern: /atvinnuhúsnæði/i, type: "atvinnuhúsnæði" },
    { pattern: /iðnaðarhús/i, type: "iðnaðarhús" },
    { pattern: /hótel/i, type: "hótel" }
  ];
  
  for (const { pattern, type } of buildingTypes) {
    if (pattern.test(normalizedQuery)) {
      console.log(`🏠 Found building type: ${type}`);
      return type;
    }
  }
  
  console.log(`⚠️ No building type found`);
  return null;
}

/**
 * Extracts parameters specific to steyptarEiningar calculations
 * @param {string} query - User's natural language query
 * @param {string} calculationType - Type of calculation
 * @returns {Object} - Extracted parameters
 */
function extractSteyptarEiningarParameters(query, calculationType) {
  const normalizedQuery = query.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
  
  const params = {};
  console.log(`🔍 Extracting steyptarEiningar parameters for ${calculationType}`);
  
  switch (calculationType) {
    case 'binShelterRequirements':
      // Extract bin count
      const binCountPattern = /(\d+)\s*(?:sorptunn|ruslatunn|gám)/i;
      const binCountMatch = normalizedQuery.match(binCountPattern);
      if (binCountMatch) {
        params.binCount = parseInt(binCountMatch[1], 10);
        console.log(`🔢 Found bin count: ${params.binCount}`);
      }
      
      // Extract bin type
      if (normalizedQuery.includes("lítil") || normalizedQuery.includes("litil") || 
          normalizedQuery.includes("120") || normalizedQuery.includes("140")) {
        params.binType = "small";
        console.log(`🗑️ Found bin type: small`);
      } else if (normalizedQuery.includes("stór") || normalizedQuery.includes("stor") || 
                normalizedQuery.includes("360")) {
        params.binType = "large";
        console.log(`🗑️ Found bin type: large`);
      } else if (normalizedQuery.includes("660") || normalizedQuery.includes("gám")) {
        params.binType = "gám660";
        console.log(`🗑️ Found bin type: gám660`);
      } else if (normalizedQuery.includes("1100") || normalizedQuery.includes("stór gám")) {
        params.binType = "gám1100";
        console.log(`🗑️ Found bin type: gám1100`);
      } else {
        params.binType = "medium"; // Default to medium
        console.log(`🗑️ Defaulting to bin type: medium`);
      }
      
      // Extract accessories preference
      if (normalizedQuery.includes("án fylgihluta") || normalizedQuery.includes("ekki fylgihluti")) {
        params.withAccessories = false;
        console.log(`🔧 Not including accessories`);
      } else {
        console.log(`🔧 Including accessories (default)`);
      }
      break;
      
    case 'postSpacing':
      // Extract post type
      if (normalizedQuery.includes("borgar")) {
        params.postType = "borgarstaur";
        console.log(`🏛️ Found post type: borgarstaur`);
      } else if (normalizedQuery.includes("hafnar")) {
        params.postType = "hafnarstaur";
        console.log(`🏛️ Found post type: hafnarstaur`);
      } else if (normalizedQuery.includes("hverfis")) {
        params.postType = "hverfisstaur";
        console.log(`🏛️ Found post type: hverfisstaur`);
      } else if (normalizedQuery.includes("haki")) {
        params.postType = "haki";
        console.log(`🏛️ Found post type: haki`);
      } else if (normalizedQuery.includes("búlk") || normalizedQuery.includes("bulk")) {
        params.postType = "búlki";
        console.log(`🏛️ Found post type: búlki`);
      } else {
        console.log(`🏛️ No specific post type found`);
      }
      
      // Extract count
      const postCountPattern = /(\d+)\s*(?:staur|staurar|staurur)/i;
      const postCountMatch = normalizedQuery.match(postCountPattern);
      if (postCountMatch) {
        params.count = parseInt(postCountMatch[1], 10);
        console.log(`🔢 Found post count: ${params.count}`);
      }
      
      // Extract spacing
      const spacingPattern = /(\d+(?:[,.]\d+)?)\s*(?:metr(?:a|ar)|m)\s*(?:bil|millibil|á milli|milli)/i;
      const spacingMatch = normalizedQuery.match(spacingPattern);
      if (spacingMatch) {
        params.spacing = parseFloat(spacingMatch[1].replace(',', '.'));
        console.log(`📏 Found spacing: ${params.spacing}m`);
      }
      break;
      
    case 'benchPlacement':
      // Extract bench type
      if (normalizedQuery.includes("bak")) {
        if (normalizedQuery.includes("án bak") || normalizedQuery.includes("an bak")) {
          params.benchType = "garðbekkur án baks";
          console.log(`🪑 Found bench type: garðbekkur án baks`);
        } else {
          params.benchType = "garðbekkur með baki";
          console.log(`🪑 Found bench type: garðbekkur með baki`);
        }
      } else if (normalizedQuery.includes("límtré") || normalizedQuery.includes("limtre")) {
        params.benchType = "garðbekkur með límtréssetu";
        console.log(`🪑 Found bench type: garðbekkur með límtréssetu`);
      } else if (normalizedQuery.includes("kubb")) {
        params.benchType = "kubbur";
        console.log(`🪑 Found bench type: kubbur`);
      } else if (normalizedQuery.includes("piano")) {
        params.benchType = "piano bekkur";
        console.log(`🪑 Found bench type: piano bekkur`);
      } else if (normalizedQuery.includes("setbekk")) {
        params.benchType = "setbekkur";
        console.log(`🪑 Found bench type: setbekkur`);
      } else {
        console.log(`🪑 No specific bench type found`);
      }
      
      // Extract count
      const benchCountPattern = /(\d+)\s*(?:bekk|bekki|bekkir|bekkja|bekkjum)/i;
      const benchCountMatch = normalizedQuery.match(benchCountPattern);
      if (benchCountMatch) {
        params.count = parseInt(benchCountMatch[1], 10);
        console.log(`🔢 Found bench count: ${params.count}`);
      }
      
      // Extract arrangement
      if (normalizedQuery.includes("hring") || normalizedQuery.includes("kring")) {
        params.arrangement = "circle";
        console.log(`📐 Found arrangement: circle`);
      } else if (normalizedQuery.includes("andspænis") || normalizedQuery.includes("á móti") || 
                normalizedQuery.includes("gegnt")) {
        params.arrangement = "facing";
        console.log(`📐 Found arrangement: facing`);
      } else if (normalizedQuery.includes("tilviljun") || normalizedQuery.includes("handa")) {
        params.arrangement = "random";
        console.log(`📐 Found arrangement: random`);
      } else {
        params.arrangement = "line"; // Default
        console.log(`📐 Defaulting to arrangement: line`);
      }
      break;
      
    case 'planterCalculation':
      // Extract planter type
      if (normalizedQuery.includes("menningar") || normalizedQuery.includes("menninga")) {
        params.planterType = "Menningarborgarker";
        console.log(`🌱 Found planter type: Menningarborgarker`);
      } else {
        params.planterType = "Borgarker"; // Default
        console.log(`🌱 Defaulting to planter type: Borgarker`);
      }
      break;
      
    case 'stepConfiguration':
      // Extract height difference
      const heightPattern = /(\d+(?:[,.]\d+)?)\s*(?:cm|centímetr(?:a|ar)|sentimetr(?:a|ar))\s*(?:hæð|upp|niður|hæðarmunur)/i;
      const heightMatch = normalizedQuery.match(heightPattern) || normalizedQuery.match(/(\d+(?:[,.]\d+)?)\s*(?:cm|centímetr(?:a|ar)|sentimetr(?:a|ar))/i);
      if (heightMatch) {
        params.heightDifference = parseFloat(heightMatch[1].replace(',', '.'));
        console.log(`📏 Found height difference: ${params.heightDifference}cm`);
      }
      
      // Extract available space
      const spacePattern = /(\d+(?:[,.]\d+)?)\s*(?:cm|centímetr(?:a|ar)|sentimetr(?:a|ar))\s*(?:láréttur|lárétt|plás|pláss|til ráðstöfunar)/i;
      const spaceMatch = normalizedQuery.match(spacePattern);
      if (spaceMatch) {
        params.availableSpace = parseFloat(spaceMatch[1].replace(',', '.'));
        console.log(`📏 Found available space: ${params.availableSpace}cm`);
      }
      break;
      
    case 'barrierRequirements':
      // Extract barrier type
      if (normalizedQuery.includes("kodd") || normalizedQuery.includes("hraðahindrun")) {
        params.barrierType = "Koddi";
        console.log(`🚧 Found barrier type: Koddi`);
      } else {
        params.barrierType = "Rebloc"; // Default
        console.log(`🚧 Defaulting to barrier type: Rebloc`);
      }
      
      // Extract installation type
      if (normalizedQuery.includes("varanlegt") || normalizedQuery.includes("varanleg") || 
          normalizedQuery.includes("fastan") || normalizedQuery.includes("fasta")) {
        params.permanentInstallation = true;
        console.log(`🏗️ Permanent installation: true`);
      } else {
        params.permanentInstallation = false; // Default
        console.log(`🏗️ Permanent installation: false (default)`);
      }
      break;
  }
  
  if (Object.keys(params).length === 0) {
    console.log(`⚠️ No steyptarEiningar parameters found`);
  }
  
  return params;
}

/**
 * Extracts product information from a knowledge item
 * @param {Object} knowledgeItem - Knowledge item from vector search
 * @returns {string|null} - Product name or null if not found
 */
function extractProductFromKnowledge(knowledgeItem) {
  if (!knowledgeItem || !knowledgeItem.text) {
    return null;
  }
  
  console.log(`🔍 Extracting product from knowledge item`);
  
  // If the knowledge item has metadata with product information, use that
  if (knowledgeItem.metadata && knowledgeItem.metadata.productType) {
    console.log(`📚 Found product in metadata: ${knowledgeItem.metadata.productType}`);
    return knowledgeItem.metadata.productType;
  }
  
  // Try to extract product name from the text
  const normalizedText = knowledgeItem.text.toLowerCase();
  
  // Check for product names in the text
  const productNames = [
    "modena",
    "fornsteinn", 
    "herragarðssteinn", 
    "jötunsteinn",
    "óðalssteinn",
    "rómarsteinn",
    "torgsteinn",
    "vínarsteinn",
    "grassteinn",
    "borgarhella",
    "hella"
  ];
  
  for (const productName of productNames) {
    if (normalizedText.includes(productName.toLowerCase())) {
      console.log(`📚 Found product in text: ${productName}`);
      return productName;
    }
  }
  
  // Try to extract from possible title patterns
  const titlePattern = /^([A-ZÁÉÍÓÚÝÞÆÖa-záéíóúýþæö]+)(?:\.|:|\s-)/;
  const titleMatch = knowledgeItem.text.match(titlePattern);
  
  if (titleMatch && titleMatch[1]) {
    const possibleProduct = titleMatch[1].trim().toLowerCase();
    console.log(`📚 Possible product from title: ${possibleProduct}`);
    
    // Verify it's actually a product we know about
    if (productNames.some(p => possibleProduct.includes(p.toLowerCase()))) {
      console.log(`📚 Verified product from title: ${possibleProduct}`);
      return possibleProduct;
    }
  }
  
  console.log(`⚠️ No product found in knowledge item`);
  return null;
}

/**
 * Performs a fallback check to detect price-related queries
 * @param {string} query - User's query
 * @param {Object|null} sessionContext - Session context for reference resolution
 * @param {Array} relevantKnowledge - Knowledge from vector search
 * @returns {Object|null} - Calculation intent or null
 */
function detectFallbackPriceIntent(query, sessionContext = null, relevantKnowledge = []) {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for common price-related keywords
  const priceKeywords = ['verð', 'kosta', 'kostar', 'price'];
  const containsPriceKeyword = priceKeywords.some(keyword => normalizedQuery.includes(keyword));
  
  if (!containsPriceKeyword) {
    return null;
  }
  
  console.log(`🔍 Price-related term detected, trying fallback detection`);
  
  // Try to extract a product name from the query
  let productType = extractStoneType(query);
  
  // If no product type is found in the query, try to get it from context
  if (!productType && sessionContext && sessionContext.entities && sessionContext.entities.products && sessionContext.entities.products.length > 0) {
    productType = sessionContext.entities.products[sessionContext.entities.products.length - 1];
    console.log(`🔄 Using product from context: ${productType}`);
  }
  
  // If still no product type, try to get it from knowledge
  if (!productType && relevantKnowledge && relevantKnowledge.length > 0 && relevantKnowledge[0].similarity > 0.5) {
    productType = extractProductFromKnowledge(relevantKnowledge[0]);
    console.log(`📚 Using product from knowledge: ${productType}`);
  }
  
  // If we still don't have a product type, we can't proceed
  if (!productType) {
    console.log(`⚠️ No product type found for price calculation`);
    return null;
  }
  
  // Try to extract quantity
  let quantity = extractQuantity(query);
  
  // If no quantity in query, try to get it from context
  if (!quantity && sessionContext && sessionContext.entities && sessionContext.entities.quantities && sessionContext.entities.quantities.length > 0) {
    quantity = sessionContext.entities.quantities[sessionContext.entities.quantities.length - 1];
    console.log(`🔄 Using quantity from context: ${quantity}`);
  }
  
  // Default to 1 if no quantity found
  if (!quantity) {
    quantity = 1;
    console.log(`📊 Using default quantity: 1`);
  }
  
  // Extract any size specifications
  let dimensions = extractSizeSpecification(query);
  
  // If no dimensions in query, try to get them from context
  if (!dimensions && sessionContext && sessionContext.entities && sessionContext.entities.dimensions && sessionContext.entities.dimensions.length > 0) {
    dimensions = sessionContext.entities.dimensions[sessionContext.entities.dimensions.length - 1];
    console.log(`🔄 Using dimensions from context:`, dimensions);
  }
  
  console.log(`🔍 Fallback price detection found product: ${productType}, quantity: ${quantity}`);
  
  return {
    calculationType: 'priceCalculation',
    parameters: {
      quantity: quantity,
      stoneType: productType,
      dimensions: dimensions
    }
  };
}