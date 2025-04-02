// calculators/huseiningar.js
// Prefabricated housing units calculator for BM Vallá chatbot

/**
 * Estimates construction time savings with prefabricated units
 * @param {number} floorArea - Floor area in square meters
 * @param {string} buildingType - Type of building (e.g., "einbýlishús", "fjölbýlishús")
 * @param {boolean} fullPrefabrication - Whether using full prefabrication or partial
 * @returns {Object} - Estimation of time savings and benefits
 */
export function estimateTimeSavings(floorArea, buildingType, fullPrefabrication = true) {
  // Input validation
  if (floorArea <= 0) {
    throw new Error("Flatarmál verður að vera jákvæð tala");
  }
  
  // Base construction time in days for traditional methods (per 100 m²)
  const traditionalTimeBase = getBuildingTypeBaseTime(buildingType);
  
  // Prefabricated construction typically saves 30-50% of time
  const prefabricationFactor = fullPrefabrication ? 0.5 : 0.7; // 50% or 30% of traditional time
  
  // Calculate total construction time (scaled by area)
  const areaFactor = floorArea / 100; // Base times are per 100 m²
  const traditionalTime = Math.ceil(traditionalTimeBase * areaFactor);
  const prefabricatedTime = Math.ceil(traditionalTime * prefabricationFactor);
  
  // Time saved
  const timeSaved = traditionalTime - prefabricatedTime;
  const percentageSaved = Math.round((timeSaved / traditionalTime) * 100);
  
  // Cost savings estimation (rough approximation)
  // Assuming daily construction costs (labor, equipment, etc.)
  const dailyCosts = 80000; // 80,000 ISK per day
  const costSavings = timeSaved * dailyCosts;
  
  // Weather impact reduction
  const weatherImpactReduction = fullPrefabrication ? "Veruleg minnkun á áhrifum veðurs" : "Nokkur minnkun á áhrifum veðurs";
  
  return {
    buildingType: getBuildingTypeDisplay(buildingType),
    floorArea: floorArea,
    constructionTime: {
      traditional: traditionalTime,
      prefabricated: prefabricatedTime,
      daysSaved: timeSaved,
      percentageSaved: percentageSaved
    },
    estimatedSavings: {
      costs: costSavings,
      weatherImpact: weatherImpactReduction,
      qualityImprovement: fullPrefabrication ? "Há" : "Meðal",
      laborNeeds: fullPrefabrication ? "Verulega minnkuð" : "Nokkuð minnkuð"
    },
    additionalBenefits: [
      "Minni byggingarsóðasköpun",
      "Betri gæðastýring á verksmiðjuframleiddum einingum",
      "Minni áhrif veðurs á byggingartíma",
      "Hægt að vinna að öðrum þáttum byggingar samhliða framleiðslu eininga"
    ]
  };
}

/**
 * Calculates material requirements for a prefabricated building
 * @param {number} floorArea - Floor area in square meters
 * @param {number} floors - Number of floors
 * @param {string} buildingType - Type of building (e.g., "einbýlishús", "fjölbýlishús")
 * @returns {Object} - Material requirements calculation
 */
export function calculateMaterialRequirements(floorArea, floors = 1, buildingType) {
  // Input validation
  if (floorArea <= 0 || floors <= 0) {
    throw new Error("Flatarmál og fjöldi hæða verða að vera jákvæðar tölur");
  }
  
  // Calculate exterior wall area (rough estimation)
  // Assuming square floor plan for simplicity
  const floorSideLength = Math.sqrt(floorArea);
  const wallHeight = 2.7; // Standard height per floor in meters
  const exteriorWallPerimeter = floorSideLength * 4;
  const totalExteriorWallArea = exteriorWallPerimeter * wallHeight * floors;
  
  // Calculate roof area (slightly larger than floor area for overhangs)
  const roofArea = floorArea * 1.1;
  
  // Calculate interior walls (rough estimation)
  // Assuming interior walls are about 0.8 linear meters per m² of floor area
  const interiorWallLength = floorArea * 0.8;
  const interiorWallArea = interiorWallLength * wallHeight * floors;
  
  // Calculate floor/ceiling elements
  const floorCeilingArea = floorArea * (floors > 1 ? floors : 0); // Only for multi-story buildings
  
  // Foundation/sökklar (linear meters, assuming square building)
  const foundationLength = exteriorWallPerimeter;
  
  // Calculate units based on building type and dimensions
  const precastUnits = calculatePrecastUnits(buildingType, {
    floorArea,
    exteriorWallArea: totalExteriorWallArea,
    interiorWallArea,
    floorCeilingArea,
    foundationLength,
    roofArea,
    floors
  });
  
  return {
    buildingDimensions: {
      floorArea: floorArea,
      estimatedPerimeter: exteriorWallPerimeter,
      floors: floors,
      wallHeight: wallHeight
    },
    materialAreas: {
      exteriorWalls: Math.ceil(totalExteriorWallArea),
      interiorWalls: Math.ceil(interiorWallArea),
      floorCeilingElements: Math.ceil(floorCeilingArea),
      foundation: Math.ceil(foundationLength),
      roof: Math.ceil(roofArea)
    },
    precastUnits: precastUnits,
    recommendations: getRecommendationsByBuildingType(buildingType)
  };
}

/**
 * Estimates building cost with prefabricated elements
 * @param {number} floorArea - Floor area in square meters
 * @param {string} buildingType - Type of building
 * @param {boolean} highEndFinish - Whether high-end finishes are desired
 * @returns {Object} - Cost estimation
 */
export function estimateCost(floorArea, buildingType, highEndFinish = false) {
  // Input validation
  if (floorArea <= 0) {
    throw new Error("Flatarmál verður að vera jákvæð tala");
  }
  
  // Base cost per square meter (in ISK) varies by building type
  let baseCostPerM2 = getBaseCostByBuildingType(buildingType);
  
  // Adjust for high-end finish if requested
  if (highEndFinish) {
    baseCostPerM2 *= 1.2; // 20% premium for high-end finishes
  }
  
  // Scale cost slightly by size (economies of scale for larger buildings)
  const sizeFactor = floorArea > 200 ? 0.95 : floorArea > 100 ? 0.98 : 1;
  const adjustedCostPerM2 = baseCostPerM2 * sizeFactor;
  
  // Calculate total base building cost
  const totalBaseCost = adjustedCostPerM2 * floorArea;
  
  // Foundation costs (approximately 10% of total)
  const foundationCost = totalBaseCost * 0.1;
  
  // Exterior elements (approximately 35% of total)
  const exteriorElementsCost = totalBaseCost * 0.35;
  
  // Interior elements (approximately 20% of total)
  const interiorElementsCost = totalBaseCost * 0.2;
  
  // Roof and ceiling elements (approximately 15% of total)
  const roofCeilingCost = totalBaseCost * 0.15;
  
  // Installation and assembly (approximately 20% of total)
  const installationCost = totalBaseCost * 0.2;
  
  // Traditional construction cost comparison (typically 10-20% higher)
  const traditionalConstructionCost = totalBaseCost * 1.15;
  
  return {
    buildingType: getBuildingTypeDisplay(buildingType),
    floorArea: floorArea,
    finishLevel: highEndFinish ? "Hágæða" : "Staðal",
    costBreakdown: {
      foundationElements: Math.round(foundationCost),
      exteriorElements: Math.round(exteriorElementsCost),
      interiorElements: Math.round(interiorElementsCost),
      roofAndCeilingElements: Math.round(roofCeilingCost),
      installationAndAssembly: Math.round(installationCost)
    },
    costSummary: {
      totalEstimatedCost: Math.round(totalBaseCost),
      costPerSquareMeter: Math.round(adjustedCostPerM2),
      traditionalMethodCost: Math.round(traditionalConstructionCost),
      estimatedSavings: Math.round(traditionalConstructionCost - totalBaseCost)
    },
    notes: [
      "Þetta er gróf áætlun byggt á meðaltölum.",
      "Nákvæm verð fást með fyrirspurn til BM Vallá.",
      "Kostnaður við lóð, hönnun, gatnagerðargjöld og annað utan byggingarinnar sjálfrar er ekki innifalinn.",
      "Lokaverð getur verið breytilegt eftir séróskum, staðsetningu og fleiri þáttum."
    ]
  };
}

/**
 * Evaluates the environmental impact of using prefabricated elements
 * @param {number} floorArea - Floor area in square meters
 * @param {string} buildingType - Type of building
 * @returns {Object} - Environmental impact assessment
 */
export function evaluateEnvironmentalImpact(floorArea, buildingType) {
  // Input validation
  if (floorArea <= 0) {
    throw new Error("Flatarmál verður að vera jákvæð tala");
  }
  
  // Base concrete volume estimation (cubic meters per m² of floor area)
  const concreteVolumePerM2 = getBuildingTypeConcreteUsage(buildingType);
  const totalConcreteVolume = floorArea * concreteVolumePerM2;
  
  // Waste reduction compared to traditional methods
  // Prefabrication typically reduces waste by 50-70%
  const traditionalWastePercentage = 0.15; // 15% waste in traditional construction
  const prefabWastePercentage = 0.05; // 5% waste in prefabrication
  
  const traditionalWasteVolume = totalConcreteVolume * traditionalWastePercentage;
  const prefabWasteVolume = totalConcreteVolume * prefabWastePercentage;
  const wasteReduction = traditionalWasteVolume - prefabWasteVolume;
  
  // Carbon footprint calculation
  // Average CO₂ emissions per cubic meter of concrete: ~250 kg
  const co2PerM3Concrete = 250; // kg CO₂ per m³
  
  // Prefabrication can reduce carbon footprint by optimizing concrete usage
  const traditionalCarbonFootprint = totalConcreteVolume * co2PerM3Concrete;
  const prefabCarbonFootprint = traditionalCarbonFootprint * 0.85; // 15% reduction
  const carbonSavings = traditionalCarbonFootprint - prefabCarbonFootprint;
  
  return {
    buildingType: getBuildingTypeDisplay(buildingType),
    floorArea: floorArea,
    materialUsage: {
      concreteVolume: Math.round(totalConcreteVolume * 10) / 10, // m³, rounded to 1 decimal
      traditionalWaste: Math.round(traditionalWasteVolume * 10) / 10, // m³
      prefabricatedWaste: Math.round(prefabWasteVolume * 10) / 10, // m³
      wasteReduction: Math.round(wasteReduction * 10) / 10, // m³
      wasteReductionPercentage: Math.round(100 * (1 - prefabWastePercentage / traditionalWastePercentage))
    },
    carbonFootprint: {
      traditional: Math.round(traditionalCarbonFootprint), // kg CO₂
      prefabricated: Math.round(prefabCarbonFootprint), // kg CO₂
      savings: Math.round(carbonSavings), // kg CO₂
      savingsPercentage: Math.round(100 * carbonSavings / traditionalCarbonFootprint)
    },
    additionalBenefits: [
      "Betri orkunýting vegna nákvæmari frágangs eininga",
      "Minni efnisnotkun og betri nýting hráefna",
      "Stýrðar aðstæður við framleiðslu minnka úrgang",
      "Möguleiki á að endurvinna steypumót margoft"
    ]
  };
}

/**
 * Estimates the timing and logistics of a building project
 * @param {number} floorArea - Floor area in square meters
 * @param {string} buildingType - Type of building
 * @param {boolean} includeSitePreparation - Whether to include site preparation in the timeline
 * @returns {Object} - Project timing and logistics
 */
export function estimateProjectTimeline(floorArea, buildingType, includeSitePreparation = true) {
  // Input validation
  if (floorArea <= 0) {
    throw new Error("Flatarmál verður að vera jákvæð tala");
  }
  
  // Base production time in weeks (varying by building type and size)
  const productionTimeBase = Math.ceil(floorArea / 100) * 2; // 2 weeks per 100 m²
  
  // Adjust by building type complexity
  const complexityFactor = getBuildingTypeComplexityFactor(buildingType);
  const adjustedProductionTime = Math.ceil(productionTimeBase * complexityFactor);
  
  // Site preparation (if included)
  const sitePreparationTime = includeSitePreparation ? 2 : 0; // 2 weeks
  
  // Foundation time
  const foundationTime = 1; // 1 week
  
  // Assembly/installation time (1 week per 100 m²)
  const assemblyTime = Math.ceil(floorArea / 100);
  
  // Finishing work (varies by size and type)
  const finishingTime = Math.ceil(floorArea / 50); // 1 week per 50 m²
  
  // Calculate total project time
  const totalProjectTime = sitePreparationTime + foundationTime + adjustedProductionTime + assemblyTime + finishingTime;
  
  // Calculate traditional construction time for comparison
  const traditionalConstructionTime = Math.ceil(totalProjectTime * 1.5); // 50% longer
  
  // For delivery planning, assume standard truck can carry about 24 tons
  const elementsPerTruck = 4; // Average number of wall elements per truck
  // Rough estimate of number of elements based on floor area
  const totalElements = Math.ceil(floorArea / 10); // Approximately 1 element per 10 m²
  const truckloads = Math.ceil(totalElements / elementsPerTruck);
  
  return {
    buildingType: getBuildingTypeDisplay(buildingType),
    floorArea: floorArea,
    timeline: {
      productionPhase: {
        duration: adjustedProductionTime,
        description: "Framleiðsla eininga í verksmiðju"
      },
      sitePhases: [
        {
          name: "Lóðarvinna og undirbúningur",
          duration: sitePreparationTime,
          included: includeSitePreparation
        },
        {
          name: "Sökklar og undirstöður",
          duration: foundationTime
        },
        {
          name: "Uppsetning og samsetning eininga",
          duration: assemblyTime
        },
        {
          name: "Frágangur og lokavinna",
          duration: finishingTime
        }
      ],
      totalDuration: totalProjectTime,
      comparisonWithTraditional: {
        traditional: traditionalConstructionTime,
        saved: traditionalConstructionTime - totalProjectTime,
        percentageSaved: Math.round(100 * (traditionalConstructionTime - totalProjectTime) / traditionalConstructionTime)
      }
    },
    logistics: {
      estimatedElements: totalElements,
      estimatedTruckloads: truckloads,
      notes: [
        "Flutningur eininga þarf að vera vel skipulagður",
        "Krani þarf að vera til staðar við uppsetningu",
        "Aðgengi að byggingarstað þarf að vera gott fyrir stóra flutningabíla",
        "Uppsetningartími getur verið háður veðri"
      ]
    },
    keyMilestones: [
      {
        name: "Hönnun og verkáætlun",
        description: "Samþykkt hönnunar og teikninga fyrir framleiðslu"
      },
      {
        name: "Framleiðsla hefst",
        description: "Framleiðsla eininga hefst í verksmiðju"
      },
      {
        name: "Sökklar klárir",
        description: "Sökklar tilbúnir og hægt að hefja uppsetningu eininga"
      },
      {
        name: "Afhending eininga",
        description: "Einingar afhentar á byggingarstað"
      },
      {
        name: "Lok uppsetningar",
        description: "Uppsetning eininga lokið og hægt að hefja frágang"
      },
      {
        name: "Verkefni lokið",
        description: "Allt innra og ytra frágangi lokið"
      }
    ]
  };
}

// ================ HELPER FUNCTIONS ================

/**
 * Gets base construction time by building type
 * @param {string} buildingType - Type of building
 * @returns {number} - Base construction time in days per 100 m²
 */
function getBuildingTypeBaseTime(buildingType) {
  const buildingTimes = {
    "einbýlishús": 90,
    "raðhús": 75,
    "fjölbýlishús": 60,
    "sumarbústaður": 70,
    "atvinnuhúsnæði": 60,
    "iðnaðarhús": 50,
    "hótel": 80,
    "default": 70
  };
  
  const normalizedType = normalizeBuildingType(buildingType);
  return buildingTimes[normalizedType] || buildingTimes.default;
}

/**
 * Gets complexity factor by building type for production time
 * @param {string} buildingType - Type of building
 * @returns {number} - Complexity factor
 */
function getBuildingTypeComplexityFactor(buildingType) {
  const complexityFactors = {
    "einbýlishús": 1.2,
    "raðhús": 1.0,
    "fjölbýlishús": 1.1,
    "sumarbústaður": 1.3,
    "atvinnuhúsnæði": 1.0,
    "iðnaðarhús": 0.9,
    "hótel": 1.2,
    "default": 1.0
  };
  
  const normalizedType = normalizeBuildingType(buildingType);
  return complexityFactors[normalizedType] || complexityFactors.default;
}

/**
 * Gets base cost per square meter by building type
 * @param {string} buildingType - Type of building
 * @returns {number} - Base cost per square meter in ISK
 */
function getBaseCostByBuildingType(buildingType) {
  const baseCosts = {
    "einbýlishús": 320000,
    "raðhús": 280000,
    "fjölbýlishús": 260000,
    "sumarbústaður": 290000,
    "atvinnuhúsnæði": 240000,
    "iðnaðarhús": 200000,
    "hótel": 300000,
    "default": 250000
  };
  
  const normalizedType = normalizeBuildingType(buildingType);
  return baseCosts[normalizedType] || baseCosts.default;
}

/**
 * Gets concrete usage per square meter by building type
 * @param {string} buildingType - Type of building
 * @returns {number} - Concrete volume per square meter
 */
function getBuildingTypeConcreteUsage(buildingType) {
  const concreteUsage = {
    "einbýlishús": 0.5,
    "raðhús": 0.45,
    "fjölbýlishús": 0.6,
    "sumarbústaður": 0.4,
    "atvinnuhúsnæði": 0.55,
    "iðnaðarhús": 0.65,
    "hótel": 0.5,
    "default": 0.5
  };
  
  const normalizedType = normalizeBuildingType(buildingType);
  return concreteUsage[normalizedType] || concreteUsage.default;
}

/**
 * Gets display name for building type
 * @param {string} buildingType - Type of building
 * @returns {string} - Display name
 */
function getBuildingTypeDisplay(buildingType) {
  const displayNames = {
    "einbýlishús": "Einbýlishús",
    "raðhús": "Raðhús",
    "fjölbýlishús": "Fjölbýlishús",
    "sumarbústaður": "Sumarbústaður",
    "atvinnuhúsnæði": "Atvinnuhúsnæði",
    "iðnaðarhús": "Iðnaðarhús",
    "hótel": "Hótel/gistihús",
    "default": "Bygging"
  };
  
  const normalizedType = normalizeBuildingType(buildingType);
  return displayNames[normalizedType] || buildingType || displayNames.default;
}

/**
 * Gets recommendations by building type
 * @param {string} buildingType - Type of building
 * @returns {Array} - Recommendations
 */
function getRecommendationsByBuildingType(buildingType) {
  const recommendations = {
    "einbýlishús": [
      "Forsteyptir útveggir með einangrun",
      "Filigran loftaplötur",
      "Forsteyptir sökklar",
      "Forsteyptir innveggir fyrir góða hljóðvist"
    ],
    "raðhús": [
      "Forsteyptir brandveggir milli íbúða",
      "Forsteyptir útveggir með einangrun",
      "Filigran loftaplötur",
      "Forsteyptir sökklar"
    ],
    "fjölbýlishús": [
      "Forsteyptir útveggir með einangrun",
      "Forsteyptar svalir",
      "Filigran loftaplötur",
      "Forsteyptir brunaveggir milli íbúða"
    ],
    "sumarbústaður": [
      "Forsteyptir útveggir með einangrun",
      "Forsteyptir sökklar",
      "Mikilvægt að taka tillit til aðgengis fyrir flutninga"
    ],
    "atvinnuhúsnæði": [
      "Forsteyptir útveggir, einangraðir eða óeinangraðir",
      "Filigran loftaplötur fyrir milligólf",
      "Forsteyptir sökklar"
    ],
    "iðnaðarhús": [
      "Óeinangraðir útveggir með klæðningu",
      "Forsteyptir sökklar",
      "Sérstyrkt gólf fyrir þunga umferð"
    ],
    "hótel": [
      "Forsteyptir brunaveggir milli herbergja",
      "Forsteyptar svalir",
      "Filigran loftaplötur fyrir milligólf",
      "Forsteyptir útveggir með einangrun"
    ],
    "default": [
      "Forsteyptir útveggir",
      "Forsteyptir sökklar",
      "Filigran loftaplötur"
    ]
  };
  
  const normalizedType = normalizeBuildingType(buildingType);
  return recommendations[normalizedType] || recommendations.default;
}

/**
 * Calculates precast units based on building type and dimensions
 * @param {string} buildingType - Type of building
 * @param {Object} dimensions - Building dimensions
 * @returns {Object} - Precast unit counts
 */
function calculatePrecastUnits(buildingType, dimensions) {
  // Default unit sizes
  const exteriorWallUnitSize = 3 * 2.7; // 3m width x 2.7m height = 8.1 m²
  const interiorWallUnitSize = 3 * 2.7; // 3m width x 2.7m height = 8.1 m²
  const floorCeilingUnitSize = 5; // Approx 5 m² per unit
  
  // Calculate number of units
  const exteriorWallUnits = Math.ceil(dimensions.exteriorWallArea / exteriorWallUnitSize);
  const interiorWallUnits = Math.ceil(dimensions.interiorWallArea / interiorWallUnitSize);
  const floorCeilingUnits = Math.ceil(dimensions.floorCeilingArea / floorCeilingUnitSize);
  
  // Foundation units (typically 2m per unit)
  const foundationUnits = Math.ceil(dimensions.foundationLength / 2);
  
  // Total units
  const totalUnits = exteriorWallUnits + interiorWallUnits + floorCeilingUnits + foundationUnits;
  
  return {
    exteriorWallUnits,
    interiorWallUnits,
    floorCeilingUnits,
    foundationUnits,
    totalUnits,
    estimatedTruckloads: Math.ceil(totalUnits / 4) // Approximately 4 units per truck
  };
}

/**
 * Normalizes building type string
 * @param {string} buildingType - Type of building
 * @returns {string} - Normalized building type
 */
function normalizeBuildingType(buildingType) {
  if (!buildingType) return "default";
  
  const normalized = buildingType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
  
  // Map common variants to standard types
  if (normalized.includes("einbyli") || normalized.includes("einbyl")) {
    return "einbýlishús";
  } else if (normalized.includes("radhus") || normalized.includes("rad")) {
    return "raðhús";
  } else if (normalized.includes("fjolbyli") || normalized.includes("fjolbyl")) {
    return "fjölbýlishús";
  } else if (normalized.includes("sumar") || normalized.includes("busta")) {
    return "sumarbústaður";
  } else if (normalized.includes("atvinnu")) {
    return "atvinnuhúsnæði";
  } else if (normalized.includes("idnad") || normalized.includes("iðnað")) {
    return "iðnaðarhús";
  } else if (normalized.includes("hotel") || normalized.includes("gisti") || normalized.includes("hótel")) {
    return "hótel";
  }
  
  return "default";
}