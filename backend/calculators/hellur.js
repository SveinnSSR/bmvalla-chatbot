// calculators/hellur.js
// Paving stone calculator for BM Vallá chatbot

/**
 * Calculates the number of paving stones needed for a given area
 * @param {number} length - Area length in meters
 * @param {number} width - Area width in meters
 * @param {string} stoneType - Type of stone (e.g., "hella", "fornsteinn")
 * @param {Object} stoneSize - Size of stone in cm {length, width}
 * @returns {Object} - Calculation result
 */
export function calculatePavingStones(length, width, stoneType, stoneSize = null) {
  // Debug logging
  console.log(`calculatePavingStones called with:`, {
    length,
    width,
    stoneType,
    stoneSize
  });
  
  // Input validation
  if (length <= 0 || width <= 0) {
    throw new Error("Lengd og breidd verða að vera jákvæðar tölur");
  }
  
  // Calculate area in square meters
  const areaM2 = length * width;
  console.log(`Calculated area: ${areaM2}m²`);
  
  // Get stone dimensions based on type if not provided
  if (!stoneSize) {
    stoneSize = getDefaultStoneDimensions(stoneType);
    console.log(`Using default stone dimensions:`, stoneSize);
  }
  
  // If it's a multi-stone system (like Fornsteinn), calculate differently
  if (isMultiStoneSystem(stoneType)) {
    console.log(`${stoneType} is a multi-stone system`);
    return calculateMultiStoneSystem(areaM2, stoneType);
  }
  
  // Calculate stone area in square meters
  const stoneAreaM2 = (stoneSize.length / 100) * (stoneSize.width / 100);
  console.log(`Stone area: ${stoneAreaM2}m²`);
  
  // Calculate number of stones needed
  const numberOfStones = Math.ceil(areaM2 / stoneAreaM2);
  console.log(`Number of stones before waste: ${numberOfStones}`);
  
  // Add 5% for waste and cuts
  const totalStones = Math.ceil(numberOfStones * 1.05);
  console.log(`Number of stones after 5% waste factor: ${totalStones}`);
  
  // Get price information
  const priceInfo = getStonePriceInfo(stoneType, stoneSize);
  
  return {
    area: areaM2,
    stoneType: stoneType,
    stoneDimensions: stoneSize,
    numberOfStones: totalStones,
    pricePerUnit: priceInfo.pricePerUnit,
    totalPrice: totalStones * priceInfo.pricePerUnit,
    pricePerM2: priceInfo.pricePerM2,
    totalPriceByM2: areaM2 * priceInfo.pricePerM2,
    note: `Tekið hefur verið tillit til 5% afganga og afskurða.`
  };
}

/**
 * Calculates the price for a specific quantity of paving stones
 * Provides a simple price calculation without area measurements
 * @param {string} stoneType - Type of stone (e.g., "hella", "modena")
 * @param {number} quantity - Number of stones requested
 * @returns {Object} - Calculation result with pricing details
 */
export function calculatePrice(stoneType, quantity = 1) {
  console.log(`calculatePrice called with:`, {
    stoneType,
    quantity
  });
  
  // Input validation
  if (quantity <= 0) {
    throw new Error("Fjöldi verður að vera jákvæð tala");
  }
  
  // Get price information for the stone type
  const priceInfo = getStonePriceInfo(stoneType);
  const unitPrice = priceInfo.pricePerUnit;
  const totalPrice = quantity * unitPrice;
  
  console.log(`Price calculation for ${quantity} ${stoneType}:`, {
    unitPrice,
    totalPrice,
    pricePerM2: priceInfo.pricePerM2
  });
  
  // Get stone dimensions for additional information
  const stoneDimensions = getDefaultStoneDimensions(stoneType);
  
  return {
    calculationType: 'price',
    productType: stoneType,
    stoneDimensions,
    quantity: quantity,
    unitPrice: unitPrice,
    totalPrice: totalPrice,
    pricePerM2: priceInfo.pricePerM2,
    currency: 'ISK',
    explanation: `Verð fyrir ${quantity} stykki af ${stoneType} er ${totalPrice.toLocaleString('is-IS')} ISK (${unitPrice.toLocaleString('is-IS')} ISK per stykki).`
  };
}

/**
 * Recommends appropriate stone thickness based on usage
 * @param {string} usage - Intended usage ("gangstétt", "innkeyrsla", "bílastæði", "þungaumferð")
 * @returns {Object} - Recommendation with explanation
 */
export function recommendStoneThickness(usage) {
  const recommendations = {
    "gangstétt": {
      thickness: 6,
      explanation: "Fyrir göngustíga og gangstéttir hentar 6 cm þykkt vel, þar sem álag er lítið."
    },
    "gangstett": {
      thickness: 6,
      explanation: "Fyrir göngustíga og gangstéttir hentar 6 cm þykkt vel, þar sem álag er lítið."
    },
    "innkeyrsla": {
      thickness: 8,
      explanation: "Fyrir innkeyrslur mælum við með 8 cm þykkt til að þola álag frá bifreiðum."
    },
    "bílastæði": {
      thickness: 8,
      explanation: "Fyrir bílastæði er mælt með 8 cm þykkt til að tryggja endingu og stöðugleika."
    },
    "bilastadi": {
      thickness: 8,
      explanation: "Fyrir bílastæði er mælt með 8 cm þykkt til að tryggja endingu og stöðugleika."
    },
    "þungaumferð": {
      thickness: 8,
      explanation: "Fyrir svæði með þungaumferð þarf að lágmarki 8 cm þykkt, og sums staðar þarf að nota sérstyrktar hellur."
    },
    "thungaumferd": {
      thickness: 8,
      explanation: "Fyrir svæði með þungaumferð þarf að lágmarki 8 cm þykkt, og sums staðar þarf að nota sérstyrktar hellur."
    }
  };
  
  // Default recommendation if usage not specified
  const defaultRecommendation = {
    thickness: 6,
    explanation: "Staðalþykkt á hellum frá BM Vallá er 6 cm þykkt og hentar sú þykkt fyrir flest svæði með létta umferð. Fyrir innkeyrslur, bílastæði eða svæði með þunga umferð mælum við með 8 cm þykkt."
  };
  
  return recommendations[usage.toLowerCase()] || defaultRecommendation;
}

/**
 * Recommends appropriate stone size based on usage
 * @param {string} usage - Intended usage ("gangstétt", "innkeyrsla", "bílastæði", etc.)
 * @returns {Object} - Recommendation with explanation
 */
export function recommendStoneSize(usage) {
  const recommendations = {
    "innkeyrsla": {
      maxSize: {
        length: 30,
        width: 30
      },
      minThickness: 8,
      explanation: "Fyrir innkeyrslur skulu stærð hellna ekki vera meiri en 30x30 cm, nema þær séu í 8 cm þykkt."
    },
    "bílastæði": {
      maxSize: {
        length: 30,
        width: 30
      },
      minThickness: 8,
      explanation: "Fyrir bílastæði er mælt með að stærð hellna sé ekki meiri en 30x30 cm, nema þær séu í 8 cm þykkt."
    },
    "þungaumferð": {
      recommendation: "slitsterkur",
      explanation: "Fyrir svæði með þunga umferð mælum við með Slitsterki, sem er sérstaklega hannaður fyrir aukið álag."
    }
  };
  
  // Default recommendation
  const defaultRecommendation = {
    explanation: "Fyrir göngustíga og verandir ganga allar stærðir, en fyrir innkeyrslur og bílastæði skulu stærðir ekki vera meiri en 30x30 cm nema þær séu í 8 cm þykkt."
  };
  
  return recommendations[usage.toLowerCase()] || defaultRecommendation;
}

/**
 * Calculates total project materials and costs
 * @param {number} length - Area length in meters
 * @param {number} width - Area width in meters
 * @param {string} stoneType - Type of stone
 * @param {number} stoneThickness - Thickness in cm
 * @returns {Object} - Complete calculation with stones, sand, and edging
 */
export function calculateCompleteProject(length, width, stoneType, stoneThickness) {
  console.log(`calculateCompleteProject called with:`, {
    length,
    width,
    stoneType,
    stoneThickness
  });
  
  // Get stone dimensions
  const stoneDimensions = getDefaultStoneDimensions(stoneType);
  
  // Calculate stones needed
  const stonesCalculation = calculatePavingStones(length, width, stoneType, stoneDimensions);
  
  // Calculate sand needs (importing from sandur.js would be ideal here)
  // This is a simplified version - in production we would import the function from sandur.js
  const baseSandThickness = stoneThickness === 8 ? 5 : 3; // Thicker base for thicker stones
  const areaM2 = length * width;
  const baseSandVolume = areaM2 * (baseSandThickness / 100); // m³
  const baseSandCost = baseSandVolume * 9592; // Price from knowledge base
  
  // Joint sand calculation (simplified)
  const averageJointWidth = 3; // mm
  const averageStoneSize = (stoneDimensions.length + stoneDimensions.width) / 2;
  const jointSandCoverage = averageJointWidth * 0.5; // kg per m² (simplified calculation)
  const jointSandAmount = areaM2 * jointSandCoverage;
  const jointSandBags = Math.ceil(jointSandAmount / 25); // 25kg bags
  const jointSandCost = jointSandBags * 1306; // Price from knowledge base
  
  // Calculate edging materials if needed
  const perimeterMeters = 2 * (length + width);
  const edgingNeeded = isEdgingRecommended(stoneType);
  const edgingCost = edgingNeeded ? perimeterMeters * 1500 : 0; // Simplified cost estimate
  
  // Calculate total costs
  const totalMaterialCost = stonesCalculation.totalPrice + baseSandCost + jointSandCost + edgingCost;
  
  return {
    projectDimensions: {
      length: length,
      width: width,
      area: areaM2,
      perimeter: perimeterMeters
    },
    stones: {
      type: stoneType,
      thickness: stoneThickness,
      dimensions: stoneDimensions,
      quantity: stonesCalculation.numberOfStones,
      cost: stonesCalculation.totalPrice
    },
    baseSand: {
      thickness: baseSandThickness,
      volume: baseSandVolume,
      product: "Hellusandur í sekkjum",
      quantity: Math.ceil(baseSandVolume), // 1 m³ bags
      cost: baseSandCost
    },
    jointSand: {
      product: "Pússningarsandur í poka | 25kg",
      bags: jointSandBags,
      cost: jointSandCost
    },
    edging: {
      needed: edgingNeeded,
      length: edgingNeeded ? perimeterMeters : 0,
      cost: edgingCost
    },
    totalCost: totalMaterialCost,
    notes: [
      `Mælt er með ${baseSandThickness} cm þykku undirlagi fyrir hellur.`,
      edgingNeeded ? "Kantsteinar eru mikilvægir til að halda hellulögninni stöðugri." : "",
      "Jarðvegsdúkur er mælt með til að hindra illgresi.",
      "Áætlað er 5% umframmagn af hellum vegna afskurða."
    ].filter(note => note !== "")
  };
}

// ================ HELPER FUNCTIONS ================

/**
 * Gets default dimensions for a given stone type
 * @param {string} stoneType - Type of stone
 * @returns {Object} - Dimensions {length, width} in cm
 */
function getDefaultStoneDimensions(stoneType) {
  const dimensions = {
    "hella": { length: 40, width: 40 },
    "arena": { length: 25, width: 25 },
    "borgarhella": { length: 50, width: 50 },
    "grassteinn": { length: 40, width: 40 },
    "herragarðssteinn": { length: 10, width: 10 }, // Smallest variant used
    "jötunsteinn": { length: 30, width: 30 },
    "rómarsteinn": { length: 16, width: 16 }, // Average size
    "veranda": { length: 60, width: 40 },
    "vínarsteinn": { length: 15, width: 15 }, // Approximate average size
    "modena": { length: 10, width: 10 } // Added dimensions for Modena
  };
  
  // Normalize the stone type name by removing non-alphanumeric characters
  const normalizedType = stoneType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics (á,é,í,ó,ú,ý,þ,æ,ö)
  
  // Return the dimensions if found, otherwise a default size
  return dimensions[normalizedType] || { length: 30, width: 30 };
}

/**
 * Determines if a stone type is a multi-stone system
 * @param {string} stoneType - Type of stone
 * @returns {boolean} - True if it's a multi-stone system
 */
function isMultiStoneSystem(stoneType) {
  const multiStoneSystems = [
    "fornsteinn", 
    "fornssteinn", 
    "torgsteinn", 
    "rómarsteinn", 
    "romarsteinn", 
    "óðalssteinn", 
    "odalssteinn"
  ];
  
  const normalizedType = stoneType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    
  return multiStoneSystems.includes(normalizedType);
}

/**
 * Calculates materials for a multi-stone system
 * @param {number} areaM2 - Area in square meters
 * @param {string} stoneType - Type of stone system
 * @returns {Object} - Calculation result
 */
function calculateMultiStoneSystem(areaM2, stoneType) {
  let pricePerM2 = 0;
  let stoneDescription = "";
  
  // Get price information based on stone type
  switch(stoneType.toLowerCase()) {
    case "fornsteinn":
    case "fornssteinn":
      pricePerM2 = 8551;
      stoneDescription = "Fornsteinn 6 cm (fimm steina kerfi)";
      break;
    case "torgsteinn":
      pricePerM2 = 8753;
      stoneDescription = "Torgsteinn 6 cm (þriggja steina kerfi)";
      break;
    case "rómarsteinn":
    case "romarsteinn":
      pricePerM2 = 8410;
      stoneDescription = "Rómarsteinn 6 cm (þriggja steina kerfi)";
      break;
    case "óðalssteinn":
    case "odalssteinn":
      pricePerM2 = 8753;
      stoneDescription = "Óðalssteinn 6 cm (þriggja steina kerfi)";
      break;
    default:
      pricePerM2 = 8500; // Average price if specific type not found
      stoneDescription = "Hellur (kerfi af blönduðum stærðum)";
  }
  
  // Add 5% for waste and cuts
  const areaWithWaste = areaM2 * 1.05;
  
  // Calculate total price
  const totalPrice = areaWithWaste * pricePerM2;
  
  return {
    area: areaM2,
    stoneType: stoneType,
    stoneDescription: stoneDescription,
    pricePerM2: pricePerM2,
    totalPrice: totalPrice,
    note: `${stoneType} er selt í fermetrum, ekki stykkjatali. Tekið hefur verið tillit til 5% afganga.`
  };
}

/**
 * Gets price information for a specific stone type and size
 * @param {string} stoneType - Type of stone
 * @param {Object} stoneSize - Size of stone {length, width}
 * @returns {Object} - Price information
 */
function getStonePriceInfo(stoneType, stoneSize) {
  // This would typically look up the actual price from the knowledge base
  // For now, we'll use simplified logic based on a few common types
  
  const priceInfo = {
    "hella": {
      pricePerUnit: 1122,
      pricePerM2: 7008
    },
    "arena": {
      pricePerUnit: 629,
      pricePerM2: 10074
    },
    "borgarhella": {
      pricePerUnit: 5839,
      pricePerM2: 11678
    },
    "grassteinn": {
      pricePerUnit: 1592,
      pricePerM2: 9949
    },
    "herragarðssteinn": {
      pricePerUnit: 93, 
      pricePerM2: 9295
    },
    "jötunsteinn": {
      pricePerUnit: 1062,
      pricePerM2: 11794
    },
    "veranda": {
      pricePerUnit: 2808,
      pricePerM2: 11680
    },
    "modena": {  // Added Modena pricing
      pricePerUnit: 80,
      pricePerM2: 8009
    }
  };
  
  // Normalize the stone type name
  const normalizedType = stoneType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  // Return the price information if found, otherwise a default price
  return priceInfo[normalizedType] || { 
    pricePerUnit: 1000, 
    pricePerM2: 10000
  };
}

/**
 * Determines if edging is recommended for a stone type
 * @param {string} stoneType - Type of stone
 * @returns {boolean} - True if edging is recommended
 */
function isEdgingRecommended(stoneType) {
  // Generally edging is recommended for all paving projects
  // but some types absolutely require it
  
  const definitelyNeedsEdging = [
    "vínarsteinn",
    "vinarsteinn",
    "fornsteinn",
    "grassteinn"
  ];
  
  const normalizedType = stoneType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    
  // Return true if it's in the definite list, but generally true anyway
  return definitelyNeedsEdging.includes(normalizedType) || true;
}