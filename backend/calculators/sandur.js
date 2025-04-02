// calculators/sandur.js
// Sand calculator for BM Vallá chatbot

/**
 * Calculates base sand needs for paving stone installations
 * @param {number} length - Area length in meters
 * @param {number} width - Area width in meters
 * @param {number} thickness - Desired sand layer thickness in cm (default: 3)
 * @returns {Object} - Calculation result
 */
export function calculateBaseSand(length, width, thickness = 3) {
  // Input validation
  if (length <= 0 || width <= 0 || thickness <= 0) {
    throw new Error("Allar stærðir verða að vera jákvæðar tölur");
  }
  
  // Calculate area in square meters
  const areaM2 = length * width;
  
  // Calculate volume in cubic meters (thickness in cm converted to m)
  const volumeM3 = areaM2 * (thickness / 100);
  
  // Sand weighs approximately 1600 kg per cubic meter
  const weightKg = volumeM3 * 1600;
  
  // Calculate number of 1m³ bags needed
  const bigBagsNeeded = Math.ceil(volumeM3);
  
  return {
    area: areaM2,
    volume: volumeM3,
    weight: weightKg,
    bigBags: bigBagsNeeded,
    recommendation: {
      product: "Hellusandur í sekkjum",
      sku: "40-671",
      quantity: bigBagsNeeded,
      estimatedPrice: bigBagsNeeded * 9592 // Price from the knowledge base
    }
  };
}

/**
 * Calculates joint filling sand needs for paving stones
 * @param {number} areaM2 - Area in square meters
 * @param {number} jointWidth - Width of joints in mm (default: 3)
 * @param {string} stonePattern - Pattern of stones ("regular", "mixed", "irregular")
 * @param {number} stoneSize - Average stone size in cm (default: 30x30)
 * @param {number} stoneThickness - Stone thickness in cm (default: 6)
 * @param {boolean} usePolymerSand - Whether to use polymer sand (VarioSand) instead of regular sand
 * @returns {Object} - Calculation result
 */
export function calculateJointSand(areaM2, jointWidth = 3, stonePattern = "regular", stoneSize = 30, stoneThickness = 6, usePolymerSand = false) {
  // Input validation
  if (areaM2 <= 0 || jointWidth <= 0 || stoneSize <= 0 || stoneThickness <= 0) {
    throw new Error("Allar stærðir verða að vera jákvæðar tölur");
  }
  
  // Calculate joint length per square meter based on pattern
  let jointLengthPerM2;
  
  switch(stonePattern) {
    case "regular": // Regular square or rectangular stones
      // For a square stone of size x size cm, there are (100/size) stones per meter in each direction
      jointLengthPerM2 = 2 * (100 / stoneSize) * 100; // in cm (both horizontal and vertical joints)
      break;
    case "mixed": // Mixed sizes like Fornsteinn
      // Mixed patterns typically have about 20% more joints
      jointLengthPerM2 = 2.2 * (100 / stoneSize) * 100;
      break;
    case "irregular": // Irregular patterns like Vínarsteinn
      // Irregular patterns can have up to 40% more joints
      jointLengthPerM2 = 2.4 * (100 / stoneSize) * 100;
      break;
    default:
      jointLengthPerM2 = 2 * (100 / stoneSize) * 100;
  }
  
  // Total joint length for the entire area
  const totalJointLength = jointLengthPerM2 * areaM2; // in cm
  
  // Calculate joint volume: length * width * depth
  const jointVolumeInCm3 = totalJointLength * (jointWidth / 10) * stoneThickness; // width in mm converted to cm
  
  // Convert to cubic meters
  const jointVolumeInM3 = jointVolumeInCm3 / 1000000;
  
  // Sand weighs approximately 1600 kg per cubic meter
  const weightKg = jointVolumeInM3 * 1600;
  
  // Calculate number of 25kg bags needed
  const bagsNeeded = Math.ceil(weightKg / 25);
  
  // Product recommendation based on joint width and user preference
  let recommendedProduct;
  let pricePerBag;
  
  if (jointWidth <= 2) {
    // Very narrow joints - VarioSand recommended
    recommendedProduct = {
      product: "VarioSand",
      sku: "42-541",
      note: "Mælt með fyrir mjög þröng samskeyti"
    };
    pricePerBag = 12717;
  } else if (usePolymerSand || jointWidth <= 4) {
    // Narrow joints or user preference - VarioSand
    recommendedProduct = {
      product: "VarioSand",
      sku: "42-541",
      note: "Hentar vel fyrir þröng samskeyti og kemur í veg fyrir illgresi"
    };
    pricePerBag = 12717;
  } else {
    // Regular joints - Pússningarsandur
    recommendedProduct = {
      product: "Pússningarsandur í poka | 25kg",
      sku: "40-600",
      note: "Hefðbundinn fúgusandur fyrir hellulagnir"
    };
    pricePerBag = 1306;
  }
  
  return {
    area: areaM2,
    jointVolume: jointVolumeInM3,
    weight: weightKg,
    bagsNeeded: bagsNeeded,
    recommendation: {
      ...recommendedProduct,
      quantity: bagsNeeded,
      estimatedPrice: bagsNeeded * pricePerBag
    },
    alternatives: usePolymerSand 
      ? [{
          product: "Pússningarsandur í poka | 25kg",
          sku: "40-600",
          quantity: bagsNeeded,
          estimatedPrice: bagsNeeded * 1306,
          note: "Ódýrari kostur en gefur minni vörn gegn illgresi"
        }]
      : [{
          product: "VarioSand",
          sku: "42-541",
          quantity: bagsNeeded,
          estimatedPrice: bagsNeeded * 12717,
          note: "Dýrari en hindrar vöxt illgresis og er stöðugri"
        }]
  };
}

/**
 * Combined calculator for complete paving projects
 * @param {number} length - Area length in meters
 * @param {number} width - Area width in meters
 * @param {string} stoneType - Type of paving stone (e.g., "hella", "fornsteinn")
 * @param {number} stoneThickness - Stone thickness in cm
 * @param {boolean} usePolymerSand - Whether to use polymer sand
 * @returns {Object} - Comprehensive calculation results
 */
export function calculateCompletePavingProject(length, width, stoneType, stoneThickness = 6, usePolymerSand = false) {
  // Get stone characteristics based on type
  let stoneSize = 30; // Default size in cm
  let jointWidth = 3; // Default joint width in mm
  let stonePattern = "regular"; // Default pattern
  let baseSandThickness = 3; // Default thickness in cm
  
  // Adjust parameters based on stone type
  switch(stoneType.toLowerCase()) {
    case "hella":
    case "hellur":
      stoneSize = 40; // 40x40 cm standard
      break;
    case "fornsteinn":
      stoneSize = 15; // Average of mixed sizes
      stonePattern = "mixed";
      jointWidth = 3;
      break;
    case "vínarsteinn":
    case "vinarsteinn":
      stoneSize = 14; // Average size
      stonePattern = "irregular";
      jointWidth = 5; // Typically wider joints
      break;
    case "grassteinn":
      stoneSize = 40; // 40x40 cm
      baseSandThickness = 5; // Needs thicker base
      break;
    case "óðalssteinn":
    case "odalssteinn":
      stoneSize = 16; // Average size
      stonePattern = "mixed";
      break;
    case "torgsteinn":
      stoneSize = 17; // Average of mixed sizes
      stonePattern = "mixed";
      break;
    case "herragarðssteinn":
    case "herragardssteinn":
      stoneSize = 16; // Average size
      jointWidth = 3;
      break;
    case "jötunsteinn":
    case "jotunsteinn":
      stoneSize = 20; // Average size
      break;
  }
  
  // For driveways or parking areas, increase base sand thickness
  const isDriveway = false; // This could be a parameter in a more complex function
  if (isDriveway) {
    baseSandThickness = 5;
  }
  
  // Calculate area
  const area = length * width;
  
  // Calculate base sand
  const baseSand = calculateBaseSand(length, width, baseSandThickness);
  
  // Calculate joint sand
  const jointSand = calculateJointSand(area, jointWidth, stonePattern, stoneSize, stoneThickness, usePolymerSand);
  
  // Total material costs
  const totalCost = baseSand.recommendation.estimatedPrice + jointSand.recommendation.estimatedPrice;
  
  return {
    projectDetails: {
      area: area,
      stoneType: stoneType,
      stoneThickness: stoneThickness,
      jointWidth: jointWidth
    },
    baseSand: baseSand,
    jointSand: jointSand,
    totalCost: totalCost,
    summary: {
      totalSandWeight: baseSand.weight + jointSand.weight,
      products: [
        baseSand.recommendation,
        jointSand.recommendation
      ]
    },
    tips: [
      "Mælt er með að kaupa 5-10% meira efni til að tryggja að nægilegt efni sé til staðar.",
      "Áður en sandur er settur undir hellur, þarf að þjappa jarðveginn og setja jarðvegsdúk.",
      `Fyrir ${stoneType} er mælt með ${baseSandThickness} cm þykku sandlagi undir hellur.`,
      usePolymerSand ? "Muna að vökva VarioSand vel eftir lagningu til að virkja bindieiginleikana." : "",
      "Ef um er að ræða mikið notað svæði eða innkeyrslu, má íhuga að nota þykkara sandlag fyrir aukinn stöðugleika."
    ].filter(tip => tip !== "")
  };
}