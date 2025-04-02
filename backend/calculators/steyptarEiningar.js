// calculators/steyptarEiningar.js
// Precast concrete elements calculator for BM Vallá chatbot

/**
 * Calculates waste bin shelter requirements based on number of bins
 * @param {number} binCount - Number of waste bins needed
 * @param {string} binType - Type of bins ("small", "medium", "large", "gám660", "gám1100")
 * @param {boolean} withAccessories - Whether to include accessories in the calculation
 * @returns {Object} - Recommended shelter and installation requirements
 */
export function calculateBinShelterRequirements(binCount, binType = "medium", withAccessories = true) {
  // Input validation
  if (binCount <= 0 || !Number.isInteger(binCount)) {
    throw new Error("Fjöldi tunna verður að vera jákvæð heiltala");
  }
  
  // Set appropriate container type for wheeled bins vs. larger containers
  let containerType = binType;
  if (binType === "gám660" || binType === "gam660") {
    containerType = "gám660";
  } else if (binType === "gám1100" || binType === "gam1100") {
    containerType = "gám1100";
  } else if (!["small", "medium", "large"].includes(binType)) {
    containerType = "medium"; // Default to medium if not specified correctly
  }
  
  // Determine appropriate shelter type based on bin count and type
  let recommendedShelter;
  let accessoriesCount = 0;
  
  if (containerType === "gám660") {
    recommendedShelter = {
      type: "Sorptunnuskýli fyrir gáma (660L)",
      sku: "38-640",
      dimensions: {
        length: 158,
        width: 97,
        height: 135
      },
      capacity: 1,
      price: 196315
    };
    accessoriesCount = 2; // 2 doors typically for container shelters
  } else if (containerType === "gám1100") {
    recommendedShelter = {
      type: "Sorptunnuskýli fyrir gáma (1100L)",
      sku: "38-640",
      dimensions: {
        length: 158,
        width: 130,
        height: 150
      },
      capacity: 1,
      price: 196315
    };
    accessoriesCount = 2; // 2 doors typically for container shelters
  } else {
    // For regular bins
    switch (binCount) {
      case 1:
        recommendedShelter = {
          type: "Sorptunnuskýli | Einfalt | U-eining",
          sku: "38-600-Grátt",
          dimensions: {
            length: 89,
            width: 92,
            height: 115
          },
          capacity: 1,
          price: 99263
        };
        accessoriesCount = 1;
        break;
      case 2:
        recommendedShelter = {
          type: "Sorptunnuskýli | Tvöfalt | E-eining",
          sku: "38-610",
          dimensions: {
            length: 169,
            width: 92,
            height: 115
          },
          capacity: 2,
          price: 168507
        };
        accessoriesCount = 2;
        break;
      case 3:
        recommendedShelter = {
          type: "Sorptunnuskýli | Þrefalt | E-eining",
          sku: "38-630",
          dimensions: {
            length: 249,
            width: 92,
            height: 115
          },
          capacity: 3,
          price: 252759
        };
        accessoriesCount = 3;
        break;
      case 4:
        recommendedShelter = {
          type: "Sorptunnuskýli | Fjórfalt | E-eining",
          sku: "38-635-Grár",
          dimensions: {
            length: 329,
            width: 92,
            height: 115
          },
          capacity: 4,
          price: 337010
        };
        accessoriesCount = 4;
        break;
      default:
        // For more than 4 bins, recommend multiple shelters
        if (binCount <= 8) {
          // For 5-8 bins, recommend one 4-bin shelter and appropriate additional shelter
          const remainingBins = binCount - 4;
          const additionalShelter = calculateBinShelterRequirements(remainingBins, binType, false);
          
          return {
            recommendation: `Fyrir ${binCount} tunnur mælum við með einu fjórföldu skýli og ${additionalShelter.shelterDetails.type}`,
            shelterOptions: [
              {
                type: "Sorptunnuskýli | Fjórfalt | E-eining",
                sku: "38-635-Grár",
                capacity: 4,
                price: 337010
              },
              additionalShelter.shelterDetails
            ],
            totalCapacity: binCount,
            accessoriesNeeded: withAccessories ? calculateAccessoriesForBinShelter(4 + additionalShelter.shelterDetails.capacity) : null,
            foundationRequirements: calculateFoundationForBinShelter(4 + additionalShelter.shelterDetails.capacity, binType),
            totalPrice: withAccessories ? 
              337010 + additionalShelter.shelterDetails.price + calculateAccessoriesForBinShelter(4 + additionalShelter.shelterDetails.capacity).totalPrice : 
              337010 + additionalShelter.shelterDetails.price
          };
        } else {
          // For more than 8 bins, recommend multiple 4-bin shelters
          const fourBinShelterCount = Math.ceil(binCount / 4);
          
          return {
            recommendation: `Fyrir ${binCount} tunnur mælum við með ${fourBinShelterCount} fjórföldum skýlum`,
            shelterDetails: {
              type: "Sorptunnuskýli | Fjórfalt | E-eining",
              sku: "38-635-Grár",
              count: fourBinShelterCount,
              capacity: 4 * fourBinShelterCount,
              priceEach: 337010,
              totalPrice: 337010 * fourBinShelterCount
            },
            totalCapacity: 4 * fourBinShelterCount,
            accessoriesNeeded: withAccessories ? calculateAccessoriesForBinShelter(4 * fourBinShelterCount) : null,
            foundationRequirements: calculateFoundationForBinShelter(4 * fourBinShelterCount, binType),
            totalPrice: withAccessories ? 
              (337010 * fourBinShelterCount) + calculateAccessoriesForBinShelter(4 * fourBinShelterCount).totalPrice : 
              337010 * fourBinShelterCount
          };
        }
    }
  }
  
  // Calculate weight based on shelter dimensions (approximate)
  const weight = recommendedShelter.dimensions.length * recommendedShelter.dimensions.width * recommendedShelter.dimensions.height * 0.0007; // Rough estimate
  
  // Calculate foundation requirements
  const foundationRequirements = calculateFoundationForBinShelter(binCount, containerType);
  
  // Calculate accessories if requested
  const accessories = withAccessories ? calculateAccessoriesForBinShelter(accessoriesCount) : null;
  
  // Calculate total price
  const totalPrice = withAccessories ? 
    recommendedShelter.price + accessories.totalPrice : 
    recommendedShelter.price;
  
  return {
    recommendation: `Fyrir ${binCount} ${getBinTypeInIcelandic(containerType)} mælum við með ${recommendedShelter.type}`,
    shelterDetails: {
      ...recommendedShelter,
      weight: Math.round(weight)
    },
    totalCapacity: recommendedShelter.capacity,
    accessoriesNeeded: accessories,
    foundationRequirements,
    totalPrice
  };
}

/**
 * Calculates accessories needed for bin shelter
 * @param {number} binCount - Number of waste bins/doors needed
 * @returns {Object} - Required accessories and their prices
 */
function calculateAccessoriesForBinShelter(binCount) {
  const doorPrice = 39222;  // Price per door
  const lidPrice = 39222;   // Price per lid
  const pumpPrice = 17384;  // Price per pump
  const magnetPrice = 8520; // Price per magnet
  
  const doors = binCount;
  const lids = binCount;
  const pumps = binCount;
  const magnets = binCount;
  
  const doorCost = doors * doorPrice;
  const lidCost = lids * lidPrice;
  const pumpCost = pumps * pumpPrice;
  const magnetCost = magnets * magnetPrice;
  
  const totalPrice = doorCost + lidCost + pumpCost + magnetCost;
  
  return {
    doors: {
      count: doors,
      priceEach: doorPrice,
      totalPrice: doorCost,
      description: "Hurð á Sorptunnuskýli | Timbur"
    },
    lids: {
      count: lids,
      priceEach: lidPrice,
      totalPrice: lidCost,
      description: "Lok á sorptunnuskýli | Timbur"
    },
    pumps: {
      count: pumps,
      priceEach: pumpPrice,
      totalPrice: pumpCost,
      description: "Pumpa á lok | Sorptunnuskýli"
    },
    magnets: {
      count: magnets,
      priceEach: magnetPrice,
      totalPrice: magnetCost,
      description: "Segull á lok | Sorptunnuskýli"
    },
    totalPrice
  };
}

/**
 * Calculates foundation requirements for bin shelter
 * @param {number} binCount - Number of waste bins
 * @param {string} binType - Type of bins
 * @returns {Object} - Foundation requirements
 */
function calculateFoundationForBinShelter(binCount, binType) {
  // Determine base dimensions based on bin count and type
  let foundationLength, foundationWidth;
  
  if (binType === "gám660") {
    foundationLength = 178; // cm, 20cm larger than shelter
    foundationWidth = 117;  // cm, 20cm larger than shelter
  } else if (binType === "gám1100") {
    foundationLength = 178; // cm, 20cm larger than shelter
    foundationWidth = 150;  // cm, 20cm larger than shelter
  } else {
    // For standard bins, calculate based on bin count
    switch (binCount) {
      case 1:
        foundationLength = 109; // 89cm + 20cm
        foundationWidth = 112;  // 92cm + 20cm
        break;
      case 2:
        foundationLength = 189; // 169cm + 20cm
        foundationWidth = 112;  // 92cm + 20cm
        break;
      case 3:
        foundationLength = 269; // 249cm + 20cm
        foundationWidth = 112;  // 92cm + 20cm
        break;
      case 4:
        foundationLength = 349; // 329cm + 20cm
        foundationWidth = 112;  // 92cm + 20cm
        break;
      default:
        // For more than 4 bins, calculate based on required shelters
        if (binCount <= 8) {
          // One 4-bin shelter plus additional shelter
          const remainingBins = binCount - 4;
          let additionalLength;
          
          switch (remainingBins) {
            case 1: additionalLength = 109; break;
            case 2: additionalLength = 189; break;
            case 3: additionalLength = 269; break;
            case 4: additionalLength = 349; break;
            default: additionalLength = 0;
          }
          
          foundationLength = 349 + additionalLength + 50; // Main shelter + additional + spacing
          foundationWidth = 112;
        } else {
          // Multiple 4-bin shelters
          const shelterCount = Math.ceil(binCount / 4);
          foundationLength = 349 * shelterCount + 50 * (shelterCount - 1); // Multiple shelters + spacing
          foundationWidth = 112;
        }
    }
  }
  
  // Calculate concrete volume (10cm thick)
  const foundationThickness = 10; // cm
  const foundationArea = foundationLength * foundationWidth / 10000; // m²
  const concreteVolume = foundationArea * (foundationThickness / 100); // m³
  
  return {
    dimensions: {
      length: foundationLength,
      width: foundationWidth,
      thickness: foundationThickness
    },
    area: Math.round(foundationArea * 100) / 100, // m², rounded to 2 decimal places
    concreteVolume: Math.round(concreteVolume * 100) / 100, // m³, rounded to 2 decimal places
    requirements: [
      "Frostfrír jarðvegur",
      "Hellulagt eða steypt undirlag",
      "Undirlag þarf að vera slétt og í lóð",
      "Gott er að hafa að minnsta kosti 10 cm af möl undir steypu"
    ]
  };
}

/**
 * Calculates spacing and foundation requirements for precast concrete posts
 * @param {string} postType - Type of post (borgarstaur, hafnarstaur, hverfisstaur, etc.)
 * @param {number} count - Number of posts
 * @param {number} spacing - Spacing between posts in meters (default: 1.5)
 * @returns {Object} - Spacing and foundation recommendations
 */
export function calculatePostSpacing(postType, count, spacing = 1.5) {
  // Input validation
  if (count <= 0 || !Number.isInteger(count)) {
    throw new Error("Fjöldi staura verður að vera jákvæð heiltala");
  }
  
  if (spacing <= 0) {
    throw new Error("Bil á milli staura verður að vera jákvæð tala");
  }
  
  // Normalize post type
  const normalizedPostType = postType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
  
  // Get post properties based on type
  let postProperties;
  
  if (normalizedPostType.includes("borgar")) {
    postProperties = {
      type: "Borgarstaur",
      width: 20, // cm
      aboveGround: 80, // cm
      belowGround: 40, // cm
      foundationDiameter: 40, // cm
      foundationDepth: 60, // cm
      weight: 80 // kg
    };
  } else if (normalizedPostType.includes("hafnar")) {
    postProperties = {
      type: "Hafnarstaur á fæti",
      diameter: 20, // cm
      height: 80, // cm
      footDiameter: 60, // cm
      foundationDiameter: 80, // cm
      foundationDepth: 20, // cm
      weight: 150 // kg
    };
  } else if (normalizedPostType.includes("hverfis")) {
    postProperties = {
      type: "Hverfisstaur",
      diameter: 26, // cm
      aboveGround: 84, // cm
      belowGround: 60, // cm
      foundationDiameter: 50, // cm
      foundationDepth: 80, // cm
      weight: 135 // kg
    };
  } else if (normalizedPostType.includes("haki")) {
    postProperties = {
      type: "Haki",
      width: 12, // cm
      aboveGround: 70, // cm
      belowGround: 30, // cm
      foundationDiameter: 30, // cm
      foundationDepth: 50, // cm
      weight: 40 // kg
    };
  } else if (normalizedPostType.includes("bulk")) {
    // Búlki doesn't need foundation as it sits on top of surface
    postProperties = {
      type: "Búlki",
      length: 150, // cm
      width: 25, // cm
      height: 15, // cm
      foundationNeeded: false,
      weight: 90 // kg
    };
  } else {
    // Default to Borgarstaur if post type not recognized
    postProperties = {
      type: "Borgarstaur",
      width: 20, // cm
      aboveGround: 80, // cm
      belowGround: 40, // cm
      foundationDiameter: 40, // cm
      foundationDepth: 60, // cm
      weight: 80 // kg
    };
  }
  
  // Calculate total length
  const totalLength = (count - 1) * spacing * 100; // Convert meters to cm
  
  // Calculate concrete required for foundations
  let totalConcreteVolume = 0;
  
  if (postProperties.foundationNeeded !== false) {
    // Foundation is typically a cylinder: π × r² × h
    const foundationRadius = postProperties.foundationDiameter / 2;
    const foundationVolume = Math.PI * Math.pow(foundationRadius, 2) * postProperties.foundationDepth / 1000000; // m³
    totalConcreteVolume = foundationVolume * count;
  }
  
  return {
    postDetails: {
      type: postProperties.type,
      count: count,
      totalWeight: count * postProperties.weight
    },
    spacing: {
      betweenPosts: spacing,
      totalLength: totalLength / 100, // Convert back to meters
      layout: `${count} staurar með ${spacing} m millibili`
    },
    foundationRequirements: postProperties.foundationNeeded === false ? 
      "Engrar undirstöðu þörf, staðsett beint á hellulagt eða malbikað yfirborð" : 
      {
        diameter: postProperties.foundationDiameter,
        depth: postProperties.foundationDepth,
        concreteVolumePerPost: Math.round(Math.PI * Math.pow(postProperties.foundationDiameter / 2, 2) * postProperties.foundationDepth / 1000000 * 1000) / 1000, // m³, rounded to 3 decimal places
        totalConcreteVolume: Math.round(totalConcreteVolume * 1000) / 1000, // m³, rounded to 3 decimal places
        requirements: [
          "Grafa holu með fyrirhuguðum þvermáli og dýpt",
          "Setja steypustyrktarnet ef uppgefin dýpt er meiri en 50 cm",
          "Steypa undirstöðu og setja staur niður í blautri steypu",
          "Halda staur lóðréttum þar til steypa er hörðnuð"
        ]
      },
    installationTips: [
      "Staðsettu staura í beinni línu með að minnsta kosti 1m frá innkeyrslum eða gangstígum",
      "Gættu þess að grafa dýpra en frostdýpi",
      "Notaðu hallamál til að tryggja að staurar séu lóðréttir",
      "Ef þörf er á vegna öryggis, íhugaðu endurskinsborða á staura"
    ]
  };
}

/**
 * Calculates bench placement and foundation requirements
 * @param {string} benchType - Type of bench
 * @param {number} count - Number of benches
 * @param {string} arrangement - Arrangement pattern ("line", "facing", "circle", "random")
 * @returns {Object} - Placement and foundation recommendations
 */
export function calculateBenchPlacement(benchType, count, arrangement = "line") {
  // Input validation
  if (count <= 0 || !Number.isInteger(count)) {
    throw new Error("Fjöldi bekkja verður að vera jákvæð heiltala");
  }
  
  // Normalize bench type
  const normalizedBenchType = benchType.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
  
  // Get bench properties based on type
  let benchProperties;
  
  if (normalizedBenchType.includes("bak")) {
    benchProperties = {
      type: "Garðbekkur með baki",
      length: 200, // cm
      width: 50, // cm
      height: 79, // cm
      seatHeight: 47, // cm
      weight: 385, // kg
      requiresClearanceAtBack: true
    };
  } else if (normalizedBenchType.includes("an bak")) {
    benchProperties = {
      type: "Garðbekkur án baks",
      length: 200, // cm
      width: 50, // cm
      seatHeight: 47, // cm
      weight: 320, // kg
      requiresClearanceAtBack: false
    };
  } else if (normalizedBenchType.includes("limtre") || normalizedBenchType.includes("límtré")) {
    benchProperties = {
      type: "Garðbekkur með límtréssetu",
      length: 200, // cm
      width: 50, // cm
      seatHeight: 47, // cm
      weight: 160, // kg
      requiresClearanceAtBack: false,
      requiresWoodTreatment: true
    };
  } else if (normalizedBenchType.includes("kubb")) {
    benchProperties = {
      type: "Kubbur | Stór bekkur",
      length: 150, // cm
      width: 50, // cm
      height: 45, // cm
      weight: 520, // kg
      requiresClearanceAtBack: false,
      canBeArrangedFreely: true
    };
  } else if (normalizedBenchType.includes("piano")) {
    benchProperties = {
      type: "Piano bekkur",
      length: 210, // cm
      width: 52, // cm
      height: 70, // cm
      weight: 475, // kg
      requiresClearanceAtBack: true,
      hasWoodComponent: true
    };
  } else if (normalizedBenchType.includes("setbekk")) {
    benchProperties = {
      type: "Setbekkur",
      length: 210, // cm
      width: 40, // cm
      seatHeight: 47, // cm
      weight: 390, // kg
      hasPlanter: true,
      canFormCorner: true
    };
  } else {
    // Default to standard bench if type not recognized
    benchProperties = {
      type: "Garðbekkur með baki",
      length: 200, // cm
      width: 50, // cm
      height: 79, // cm
      seatHeight: 47, // cm
      weight: 385, // kg
      requiresClearanceAtBack: true
    };
  }
  
  // Calculate spacing and area requirements based on arrangement
  let spacingRecommendation;
  let totalArea;
  let concreteVolume;
  
  switch (arrangement) {
    case "line":
      spacingRecommendation = {
        betweenBenches: 150, // cm
        clearanceInFront: 200, // cm
        clearanceBehind: benchProperties.requiresClearanceAtBack ? 50 : 0, // cm
        totalLength: benchProperties.length * count + 150 * (count - 1) // cm
      };
      totalArea = spacingRecommendation.totalLength * (benchProperties.width + spacingRecommendation.clearanceInFront + spacingRecommendation.clearanceBehind) / 10000; // m²
      break;
    case "facing":
      spacingRecommendation = {
        betweenFacingBenches: 400, // cm, facing benches should have 4m between them
        betweenSets: 200, // cm, spacing between sets of facing benches
        clearanceSides: 100, // cm
        totalLength: Math.ceil(count / 2) * benchProperties.length + (Math.ceil(count / 2) - 1) * 200 // cm
      };
      totalArea = spacingRecommendation.totalLength * (2 * benchProperties.width + spacingRecommendation.betweenFacingBenches + 2 * spacingRecommendation.clearanceSides) / 10000; // m²
      break;
    case "circle":
      // For circle, calculate diameter based on bench width and reasonable inner circle
      const innerCircleDiameter = 300; // cm
      const circleDiameter = innerCircleDiameter + 2 * benchProperties.width;
      const circumference = Math.PI * circleDiameter;
      // Check if benches will fit around circle
      const maxBenchesInCircle = Math.floor(circumference / benchProperties.length);
      
      if (count > maxBenchesInCircle) {
        return {
          error: `Of margir bekkir fyrir hringuppröðun. Hámark ${maxBenchesInCircle} bekkir miðað við ${circleDiameter} cm þvermál.`,
          recommendation: `Mælt er með að nota færri bekki eða velja aðra uppröðun.`
        };
      }
      
      spacingRecommendation = {
        circleDiameter: circleDiameter,
        innerCircleDiameter: innerCircleDiameter,
        outerClearance: 200, // cm
        totalDiameter: circleDiameter + 2 * 200 // cm, including clearance
      };
      totalArea = Math.PI * Math.pow(spacingRecommendation.totalDiameter / 200, 2); // m²
      break;
    case "random":
      // For random placement, estimate based on count
      spacingRecommendation = {
        minSpaceBetween: 150, // cm
        clearanceAround: 100, // cm
        estimatedAreaPerBench: (benchProperties.length + 2 * 100) * (benchProperties.width + 2 * 100) / 10000 // m²
      };
      totalArea = spacingRecommendation.estimatedAreaPerBench * count * 1.5; // m², with 50% additional for pathways
      break;
    default:
      // Default to line arrangement
      spacingRecommendation = {
        betweenBenches: 150, // cm
        clearanceInFront: 200, // cm
        clearanceBehind: benchProperties.requiresClearanceAtBack ? 50 : 0, // cm
        totalLength: benchProperties.length * count + 150 * (count - 1) // cm
      };
      totalArea = spacingRecommendation.totalLength * (benchProperties.width + spacingRecommendation.clearanceInFront + spacingRecommendation.clearanceBehind) / 10000; // m²
  }
  
  // Calculate concrete needed for foundations (10cm thickness)
  concreteVolume = (benchProperties.length + 40) * (benchProperties.width + 40) * 10 * count / 1000000; // m³
    
  return {
    benchDetails: {
      type: benchProperties.type,
      dimensions: {
        length: benchProperties.length,
        width: benchProperties.width,
        height: benchProperties.height || benchProperties.seatHeight,
        seatHeight: benchProperties.seatHeight
      },
      count: count,
      totalWeight: count * benchProperties.weight
    },
    arrangementDetails: {
      type: arrangement,
      spacing: spacingRecommendation,
      totalArea: Math.round(totalArea * 100) / 100, // m², rounded to 2 decimal places
    },
    foundationRequirements: {
      recommendedType: "Steypt plata eða hellulögn á þjöppuðu undirlagi",
      individualSize: {
        length: benchProperties.length + 40, // cm, 20cm extra on each side
        width: benchProperties.width + 40, // cm, 20cm extra on each side
        thickness: 10 // cm
      },
      concreteVolume: Math.round(concreteVolume * 1000) / 1000, // m³, rounded to 3 decimal places
      requirements: [
        "Undirlag þarf að vera alveg slétt",
        "Tryggja frostfrítt undirlag með þjappaðri möl",
        "Bekkir þurfa að standa stöðugir á yfirborði",
        "Mælt er með 10cm þykkri steyptri plötu undir hvern bekk"
      ]
    },
    maintenanceRecommendations: benchProperties.hasWoodComponent || benchProperties.requiresWoodTreatment ? 
      ["Olíubera timbrið árlega til að viðhalda útliti og endingu",
       "Hreinsa bekki reglulega, sérstaklega eftir vetur",
       "Tryggja að vatn sitji ekki á timbrinu"] : 
      ["Hreinsa bekki reglulega, sérstaklega eftir vetur",
       "Steyptir bekkir eru viðhaldslitlir en gott að þrífa af og til"]
  };
}

/**
 * Calculates planter requirements for a given area
 * @param {number} length - Length of planting area in meters
 * @param {number} width - Width of planting area in meters
 * @param {string} planterType - Type of planter ("Borgarker", "Menningarborgarker")
 * @returns {Object} - Planter recommendations
 */
export function calculatePlanters(length, width, planterType = "Borgarker") {
  // Input validation
  if (length <= 0 || width <= 0) {
    throw new Error("Lengd og breidd verða að vera jákvæðar tölur");
  }
  
  // Convert dimensions to cm
  const lengthCm = length * 100;
  const widthCm = width * 100;
  const areaCm2 = lengthCm * widthCm;
  
  // Get planter properties based on type
  let planterProperties;
  
  if (planterType.toLowerCase().includes("menningar")) {
    planterProperties = {
      type: "Menningarborgarker",
      variants: [
        { dimensions: { length: 45, width: 45, height: 90 }, area: 45 * 45, weight: 120 },
        { dimensions: { length: 51, width: 51, height: 110 }, area: 51 * 51, weight: 150 },
        { dimensions: { length: 60, width: 60, height: 130 }, area: 60 * 60, weight: 180 }
      ],
      price: 82641
    };
  } else {
    // Default to Borgarker
    planterProperties = {
      type: "Borgarker",
      variants: [
        { dimensions: { length: 43, width: 43, height: 52 }, area: 43 * 43, weight: 145 }
      ],
      price: 31419
    };
  }
  
  // Calculate number of planters needed
  // This is a complex calculation that depends on aesthetic considerations
  // Here we'll use a simple area-based approach with spacing
  
  const spacing = 40; // cm between planters
  
  // For perimeter placement
  const perimeterLength = 2 * (lengthCm + widthCm);
  
  // Calculate planter area with spacing
  const selectedVariant = planterProperties.variants[0]; // Default to first variant
  const planterWidth = selectedVariant.dimensions.width + spacing;
  
  // Calculate max number of planters along perimeter
  const maxPlantersPerimeter = Math.floor(perimeterLength / planterWidth);
  
  // Calculate number of planters based on area
  const areaCoverage = 0.15; // 15% coverage is aesthetically pleasing
  const areaPerPlanter = selectedVariant.area;
  const plantersForArea = Math.ceil((areaCm2 * areaCoverage) / areaPerPlanter);
  
  // Take the smaller of the two calculations
  const recommendedPlanterCount = Math.min(maxPlantersPerimeter, plantersForArea);
  
  // Calculate soil volume needed (accounting for drainage layer)
  const innerVolumeCm3 = (selectedVariant.dimensions.length - 10) * 
                         (selectedVariant.dimensions.width - 10) * 
                         (selectedVariant.dimensions.height - 20);
  const soilVolumePerPlanter = innerVolumeCm3 / 1000000; // m³
  const totalSoilVolume = soilVolumePerPlanter * recommendedPlanterCount;
  
  // Calculate drainage material needed
  const drainageLayerHeight = 5; // cm
  const drainageVolumeCm3 = (selectedVariant.dimensions.length - 10) * 
                           (selectedVariant.dimensions.width - 10) * 
                           drainageLayerHeight;
  const drainageVolumePerPlanter = drainageVolumeCm3 / 1000000; // m³
  const totalDrainageVolume = drainageVolumePerPlanter * recommendedPlanterCount;
  
  return {
    planterDetails: {
      type: planterProperties.type,
      dimensions: selectedVariant.dimensions,
      count: recommendedPlanterCount,
      totalWeight: Math.round(recommendedPlanterCount * selectedVariant.weight), // kg
      priceEach: planterProperties.price,
      totalPrice: planterProperties.price * recommendedPlanterCount
    },
    layoutRecommendations: {
      spacing: spacing,
      perimeter: {
        planterDistanceCm: Math.round(perimeterLength / recommendedPlanterCount) // center-to-center distance on perimeter
      },
      interior: {
        estimatedCoveragePct: Math.round((recommendedPlanterCount * selectedVariant.area * 100) / areaCm2)
      }
    },
    materialRequirements: {
      soil: {
        volumePerPlanter: Math.round(soilVolumePerPlanter * 1000) / 1000, // m³, rounded to 3 decimal places
        totalVolume: Math.round(totalSoilVolume * 1000) / 1000, // m³, rounded to 3 decimal places
        type: "Mold blönduð með perlíti eða vikri fyrir góða dreneringu"
      },
      drainage: {
        volumePerPlanter: Math.round(drainageVolumePerPlanter * 1000) / 1000, // m³, rounded to 3 decimal places
        totalVolume: Math.round(totalDrainageVolume * 1000) / 1000, // m³, rounded to 3 decimal places
        type: "Vikur, hnullungar eða drenlagnakurl"
      }
    },
    plantingRecommendations: [
      "Setja drenmottu eða jarðvegsdúk yfir drenlag",
      "Velja plöntur sem henta í ker (þurfa minni jarðveg og þola þurrk)",
      "Betra að velja færri stórar plöntur en margar litlar",
      "Nota áburðarprik til að viðhalda plöntum í kerum"
    ]
  };
}

/**
 * Calculates optimal step configuration
 * @param {number} heightDifference - Height difference to overcome in cm
 * @param {number} availableSpace - Available horizontal space in cm
 * @returns {Object} - Step configuration
 */
export function calculateStepConfiguration(heightDifference, availableSpace) {
  // Input validation
  if (heightDifference <= 0 || availableSpace <= 0) {
    throw new Error("Hæðarmunur og láréttur flötur verða að vera jákvæðar tölur");
  }
  
  // Standard dimensions from BM Valla
  const standardRiser = 15.5; // cm
  const standardTread = 34; // cm
  
  // Calculate ideal number of steps based on height
  const idealStepCount = Math.round(heightDifference / standardRiser);
  const adjustedRiser = heightDifference / idealStepCount;
  
  // Check if there's enough horizontal space
  const requiredSpace = (idealStepCount - 1) * standardTread; // The top step is usually part of the upper surface
  
  if (requiredSpace > availableSpace) {
    // Need to adjust tread depth
    const adjustedTread = availableSpace / (idealStepCount - 1);
    
    // Check if the adjusted tread meets minimum safety requirements (26cm)
    if (adjustedTread < 26) {
      // Need to reduce number of steps and increase riser height
      const reducedStepCount = Math.floor(availableSpace / 26) + 1;
      const reducedRiser = heightDifference / reducedStepCount;
      
      return {
        recommendation: "Þörf á að aðlaga bæði þrepahæð og dýpt vegna takmarkaðs plásss",
        stepConfiguration: {
          count: reducedStepCount,
          riserHeight: Math.round(reducedRiser * 10) / 10, // cm, rounded to 1 decimal place
          treadDepth: Math.floor(availableSpace / (reducedStepCount - 1)), // cm, rounded down for safety
          totalRun: availableSpace, // cm
          totalRise: heightDifference // cm
        },
        complianceNote: "Aðlöguð þrepadýpt uppfyllir lágmarkskröfur (26 cm), en er minni en kjörstærð (34 cm).",
        materialRequirements: {
          concreteVolume: Math.round((reducedStepCount * standardTread * 100 * 15) / 1000000 * 1000) / 1000, // m³, rounded to 3 decimal places
          reinforcementNeeded: reducedRiser > 18 || reducedStepCount > 5
        }
      };
    }
    
    return {
      recommendation: "Þörf á að aðlaga þrepadýpt vegna takmarkaðs plásss",
      stepConfiguration: {
        count: idealStepCount,
        riserHeight: Math.round(adjustedRiser * 10) / 10, // cm, rounded to 1 decimal place
        treadDepth: Math.floor(adjustedTread), // cm, rounded down for safety
        totalRun: availableSpace, // cm
        totalRise: heightDifference // cm
      },
      materialRequirements: {
        concreteVolume: Math.round((idealStepCount * adjustedTread * 100 * 15) / 1000000 * 1000) / 1000, // m³, rounded to 3 decimal places
        reinforcementNeeded: adjustedRiser > 18 || idealStepCount > 5
      }
    };
  }
  
  // Ideal case: standard dimensions can be used
  return {
    recommendation: "Þrepur með staðlaðri hæð og dýpt passa vel í gefið pláss",
    stepConfiguration: {
      count: idealStepCount,
      riserHeight: Math.round(adjustedRiser * 10) / 10, // cm, rounded to 1 decimal place
      treadDepth: standardTread, // cm
      totalRun: (idealStepCount - 1) * standardTread, // cm
      totalRise: heightDifference // cm
    },
    standardOptions: {
      prefabricatedSteps: true,
      standardLength: [100, 125, 150, 175, 200], // cm
      canAddHeatingElements: true,
      rampOption: "Möguleiki á vagnabraut samhliða þrepum fyrir hjól, barnavagna eða kerrur"
    },
    materialRequirements: {
      concreteVolume: Math.round((idealStepCount * standardTread * 100 * 15) / 1000000 * 1000) / 1000, // m³, rounded to 3 decimal places
      reinforcementNeeded: adjustedRiser > 18 || idealStepCount > 5
    }
  };
}

/**
 * Calculates traffic barrier/vegrið requirements
 * @param {number} length - Length to cover in meters
 * @param {string} barrierType - Type of barrier ("Rebloc", "Koddi")
 * @param {boolean} permanentInstallation - Whether this is a permanent installation
 * @returns {Object} - Barrier configuration
 */
export function calculateBarrierRequirements(length, barrierType = "Rebloc", permanentInstallation = false) {
  // Input validation
  if (length <= 0) {
    throw new Error("Lengd þarf að vera jákvæð tala");
  }
  
  // Get barrier properties based on type
  let barrierProperties;
  
  if (barrierType.toLowerCase().includes("kodd")) {
    barrierProperties = {
      type: "Koddi - hraðahindrun",
      dimensions: {
        length: 360, // cm
        width: 190, // cm
        height: 20.5 // cm
      },
      weight: 3500, // kg
      price: 401768,
      requiresAnchoring: false,
      isSpeedBump: true
    };
  } else {
    // Default to Rebloc
    barrierProperties = {
      type: "Vegrið Rebloc 80AS",
      variants: [
        { length: 265, weight: 1330 }, // 2.65 meters
        { length: 400, weight: 2000 }, // 4 meters
        { length: 800, weight: 4000 }  // 8 meters
      ],
      width: 60, // cm
      height: 80, // cm
      price: 0, // Price on request 
      requiresAnchoring: permanentInstallation,
      hasConnections: true
    };
  }
  
  // Calculate required number of barriers
  let barrierCount;
  let totalWeight;
  let selectedVariant;
  
  if (barrierProperties.isSpeedBump) {
    // For speed bumps, typically spaced every 50-100 meters
    const recommendedSpacing = 75; // meters
    barrierCount = Math.ceil(length / recommendedSpacing);
    totalWeight = barrierCount * barrierProperties.weight;
    selectedVariant = {
      length: barrierProperties.dimensions.length / 100 // meters
    };
  } else {
    // For Rebloc, select the optimal variant
    if (length <= 10) {
      // For short distances, use smaller barriers
      selectedVariant = barrierProperties.variants[0];
    } else if (length <= 50) {
      // For medium distances, use middle-sized barriers
      selectedVariant = barrierProperties.variants[1];
    } else {
      // For long distances, use longest barriers
      selectedVariant = barrierProperties.variants[2];
    }
    
    barrierCount = Math.ceil(length * 100 / selectedVariant.length);
    totalWeight = barrierCount * selectedVariant.weight;
  }
  
  return {
    barrierDetails: {
      type: barrierProperties.type,
      variant: barrierProperties.isSpeedBump ? "Standard" : `${selectedVariant.length} cm`,
      count: barrierCount,
      dimensions: barrierProperties.dimensions || {
        length: selectedVariant.length,
        width: barrierProperties.width,
        height: barrierProperties.height
      },
      totalWeight
    },
    installationRequirements: {
      totalLength: Math.round(barrierCount * (selectedVariant.length / 100) * 10) / 10, // meters
      foundation: permanentInstallation ? 
        "Mælt er með steyptri undirstöðu, sérstaklega fyrir varanlega uppsetningu" : 
        "Má setja beint á malbik eða hellulagt yfirborð fyrir tímabundna uppsetningu",
      equipment: totalWeight > 2000 ? "Þörf á krana við uppsetningu" : "Hægt að nota lítinn vöruflutningabíl við uppsetningu",
      anchoring: barrierProperties.requiresAnchoring ? 
        "Festa þarf niður með boltum eða öðrum festingum" : 
        "Engin þörf á að festa niður vegna þyngdar"
    },
    safetyRequirements: [
      "Tryggja að hindranir sjáist vel, sérstaklega í myrkri",
      "Í sumum tilfellum æskilegt að bæta við endurskinsborðum",
      "Gæta þess að innbyrðis tengingar séu öruggar"
    ]
  };
}

/**
 * Helper function to get Icelandic bin type name
 * @param {string} binType - Bin type code
 * @returns {string} - Icelandic name
 */
function getBinTypeInIcelandic(binType) {
  switch (binType) {
    case "small": return "litlar sorptunnur (120-140L)";
    case "medium": return "meðalstórar sorptunnur (240L)";
    case "large": return "stórar sorptunnur (360L)";
    case "gám660": return "660L gáma";
    case "gám1100": return "1100L gáma";
    default: return "sorptunnur";
  }
}