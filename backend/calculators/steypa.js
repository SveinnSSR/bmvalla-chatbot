// calculators/steypa.js
// Concrete calculator for BM Vallá chatbot

/**
 * Calculates concrete volume for a rectangular area
 * @param {number} length - Area length in meters
 * @param {number} width - Area width in meters
 * @param {number} thickness - Area thickness/depth in centimeters
 * @returns {Object} - Calculation result
 */
export function calculateConcreteVolume(length, width, thickness) {
  // Input validation
  if (length <= 0 || width <= 0 || thickness <= 0) {
    throw new Error("Allar stærðir verða að vera jákvæðar tölur");
  }
  
  // Convert thickness from cm to m
  const thicknessInMeters = thickness / 100;
  
  // Calculate volume in cubic meters
  const volumeM3 = length * width * thicknessInMeters;
  
  // Concrete density is approximately 2400 kg/m³
  const weightKg = volumeM3 * 2400;
  
  // Round to 2 decimal places for better readability
  const roundedVolumeM3 = Math.round(volumeM3 * 100) / 100;
  
  return {
    dimensions: {
      length: length,
      width: width,
      thickness: thickness
    },
    area: length * width,
    volume: roundedVolumeM3,
    weight: Math.round(weightKg),
    // Add 5% for waste and spillage
    recommendedVolume: Math.round(roundedVolumeM3 * 1.05 * 100) / 100
  };
}

/**
 * Calculates concrete volume for a cylindrical column
 * @param {number} diameter - Column diameter in centimeters
 * @param {number} height - Column height in centimeters
 * @returns {Object} - Calculation result
 */
export function calculateColumnVolume(diameter, height) {
  // Input validation
  if (diameter <= 0 || height <= 0) {
    throw new Error("Allar stærðir verða að vera jákvæðar tölur");
  }
  
  // Convert from cm to m
  const diameterInMeters = diameter / 100;
  const heightInMeters = height / 100;
  
  // Calculate radius
  const radiusInMeters = diameterInMeters / 2;
  
  // Calculate volume (π × r² × h)
  const volumeM3 = Math.PI * Math.pow(radiusInMeters, 2) * heightInMeters;
  
  // Concrete density is approximately 2400 kg/m³
  const weightKg = volumeM3 * 2400;
  
  // Round to 3 decimal places for better readability
  const roundedVolumeM3 = Math.round(volumeM3 * 1000) / 1000;
  
  return {
    dimensions: {
      diameter: diameter,
      height: height
    },
    volume: roundedVolumeM3,
    weight: Math.round(weightKg),
    // Add 10% for waste (columns often have more waste)
    recommendedVolume: Math.round(roundedVolumeM3 * 1.1 * 1000) / 1000
  };
}

/**
 * Calculates concrete volume for a column with embedded post(s)
 * @param {number} columnDiameter - Column diameter in centimeters
 * @param {number} columnHeight - Column height in centimeters
 * @param {number} postWidth - Post width in centimeters (0 if no post)
 * @param {number} postHeight - Post height in centimeters (0 if no post)
 * @param {number} postCount - Number of posts (0 if no posts)
 * @returns {Object} - Calculation result
 */
export function calculateColumnWithPostVolume(columnDiameter, columnHeight, postWidth, postHeight, postCount = 1) {
  // Input validation
  if (columnDiameter <= 0 || columnHeight <= 0) {
    throw new Error("Stærðir súlu verða að vera jákvæðar tölur");
  }
  
  if (postCount < 0 || (postCount > 0 && (postWidth <= 0 || postHeight <= 0))) {
    throw new Error("Ef staur er til staðar verða stærðir staurs að vera jákvæðar tölur");
  }
  
  // Calculate column volume
  const columnResult = calculateColumnVolume(columnDiameter, columnHeight);
  
  // If no posts, return just the column volume
  if (postCount === 0 || postWidth === 0 || postHeight === 0) {
    return columnResult;
  }
  
  // Calculate post volume (assume square post)
  const postWidthInMeters = postWidth / 100;
  const postHeightInMeters = postHeight / 100;
  const columnHeightInMeters = columnHeight / 100;
  
  // Calculate volume of a single post
  const singlePostVolume = postWidthInMeters * postWidthInMeters * columnHeightInMeters;
  
  // Calculate total post volume
  const totalPostVolume = singlePostVolume * postCount;
  
  // Subtract post volume from column volume to get concrete volume
  const concreteVolume = columnResult.volume - totalPostVolume;
  
  // Ensure volume is positive (in case of calculation errors)
  const adjustedVolume = Math.max(0, concreteVolume);
  
  // Concrete density is approximately 2400 kg/m³
  const weightKg = adjustedVolume * 2400;
  
  return {
    dimensions: {
      columnDiameter: columnDiameter,
      columnHeight: columnHeight,
      postWidth: postWidth,
      postHeight: postHeight,
      postCount: postCount
    },
    columnVolume: columnResult.volume,
    postVolume: Math.round(totalPostVolume * 1000) / 1000,
    concreteVolume: Math.round(adjustedVolume * 1000) / 1000,
    weight: Math.round(weightKg),
    // Add 10% for waste
    recommendedVolume: Math.round(adjustedVolume * 1.1 * 1000) / 1000
  };
}

/**
 * Recommends concrete type based on application
 * @param {string} application - Application type ("innanhúss", "utanhúss", "sökkull", "veggur", etc.)
 * @param {boolean} environmentalFocus - Whether environmental impact is important
 * @returns {Object} - Recommendation with explanation
 */
export function recommendConcreteType(application, environmentalFocus = false) {
  // Normalize application string
  const normalizedApplication = application
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  // Define application categories
  const outdoorApplications = [
    "utanhuss", "utandyra", "utanhúss", "utanhus",
    "bilastæði", "bilastadi", "bílastæði", "bilaplön", "bílaplan", "bilaplan",
    "göngubraut", "gongubraut", "gangstett", "gangstétt",
    "garður", "gardur", "garðveggur", "gardveggur",
    "sökkull", "sokkull", "stoðveggur", "stodveggur"
  ];
  
  const indoorApplications = [
    "innanhuss", "innandyra", "innanhúss", "innanhus",
    "gólf", "golf", "veggur", "veggjur", "stigar", "stigi"
  ];
  
  const marineApplications = [
    "sjór", "sjor", "hafnarmannvirki", "bryggja", "höfn", "hofn",
    "saltvatn", "salt"
  ];
  
  // Check if the application matches any of the categories
  const isOutdoor = outdoorApplications.some(term => normalizedApplication.includes(term));
  const isIndoor = indoorApplications.some(term => normalizedApplication.includes(term));
  const isMarine = marineApplications.some(term => normalizedApplication.includes(term));
  
  // Default recommendation
  let recommendation = {
    concreteType: "Berglind | Vistvænni steypa | C25",
    strengthClass: "C25",
    description: "Almenn steypa fyrir flest verkefni, bæði inn- og útidyra.",
    environmentalImpact: "Kolefnisspor 230,59 kgCO₂ pr. m³, sem er 20% minna en hefðbundin steypa.",
    applications: ["Sökklar", "Veggir", "Plötur"]
  };
  
  // Refine recommendation based on categories
  if (isMarine) {
    recommendation = {
      concreteType: environmentalFocus ? "Berglind | Svan | C35/45" : "Aflsteypa | C35",
      strengthClass: "C35/45",
      description: "Sterkbyggð steypa fyrir erfiðar aðstæður, sérstaklega þar sem salt er til staðar.",
      environmentalImpact: environmentalFocus ? 
        "Kolefnisspor 226,19 kgCO₂ pr. m³, sem er 35% minna en hefðbundin steypa." : 
        "Kolefnisspor 305,79 kgCO₂ pr. m³.",
      applications: ["Hafnarmannvirki", "Brýr", "Svæði nálægt sjó", "Svæði með mikið salt"]
    };
  } else if (isOutdoor) {
    // If specifically asking about driveways or walkways
    if (normalizedApplication.includes("bilastæði") || 
        normalizedApplication.includes("bilaplan") || 
        normalizedApplication.includes("gangstett")) {
      recommendation = {
        concreteType: "Plan- og stéttasteypa | C35",
        strengthClass: "C35",
        description: "Sérhönnuð steypa fyrir gangstéttir, bílaplön og aðra umferðarfleti.",
        environmentalImpact: "Kemur stöðluð með 20% minna kolefnisspori en hefðbundin steypa.",
        applications: ["Gangstéttir", "Bílaplön", "Stéttir", "Plötur utandyra"]
      };
    } else {
      recommendation = {
        concreteType: environmentalFocus ? "Berglind | Svan | C30" : "Berglind | Vistvænni steypa | C30",
        strengthClass: "C30",
        description: "Sterkbyggð steypa fyrir utandyra notkun, þolir vel íslenskt veðurfar.",
        environmentalImpact: environmentalFocus ? 
          "Kolefnisspor 219,79 kgCO₂ pr. m³, sem er 35% minna en hefðbundin steypa." : 
          "Kolefnisspor 239,29 kgCO₂ pr. m³, sem er 20% minna en hefðbundin steypa.",
        applications: ["Sökklar", "Garðveggir", "Stoðveggir", "Útveggir"]
      };
    }
  } else if (isIndoor) {
    // If specifically asking about floors
    if (normalizedApplication.includes("golf")) {
      recommendation = {
        concreteType: "Gólfsteypa | Perluílögn",
        strengthClass: "C12 (einnig fáanleg í C25 og C30)",
        description: "Þægileg í niðurlögn og gefur gott og slétt yfirborð.",
        environmentalImpact: "Framleidd í samræmi við ISO 9001 gæðastjórnunarkerfi.",
        applications: ["Plötur sem þurfa slétt yfirborð", "Afréttingarlag ofan á steypu"]
      };
    } else {
      recommendation = {
        concreteType: environmentalFocus ? "Berglind | Svan | C25" : "Berglind | Vistvænni steypa | Inni | C25",
        strengthClass: "C25",
        description: "Steypa sérhönnuð fyrir innanhúss notkun.",
        environmentalImpact: environmentalFocus ? 
          "Kolefnisspor 202,59 kgCO₂ pr. m³, sem er 35% minna en hefðbundin steypa." : 
          "Kolefnisspor 230,59 kgCO₂ pr. m³, sem er 20% minna en hefðbundin steypa.",
        applications: ["Veggir", "Sökklar", "Stigar", "Plötur innandyra"]
      };
    }
  }
  
  // Add environmental certification if focus is on environment
  if (environmentalFocus) {
    recommendation.certifications = ["Svansvottað", "EPD (Umhverfisyfirlýsing)"];
  }
  
  return recommendation;
}

/**
 * Estimates carbon footprint for concrete project
 * @param {number} volumeM3 - Concrete volume in cubic meters
 * @param {string} concreteType - Type of concrete used
 * @returns {Object} - Carbon footprint estimation
 */
export function estimateCarbonFootprint(volumeM3, concreteType) {
  // Input validation
  if (volumeM3 <= 0) {
    throw new Error("Rúmmál steypunnar verður að vera jákvæð tala");
  }
  
  // Default carbon footprint if type not specified (kg CO₂ per m³)
  let baseFootprint = 305; // Average for traditional concrete
  let reducedFootprint = 305; // Will be calculated based on concrete type
  let reduction = 0; // Percentage reduction
  
  // Determine carbon footprint based on concrete type
  switch (concreteType) {
    case "berglind-svan-c25":
    case "Berglind | Svan | C25":
      baseFootprint = 305;
      reducedFootprint = 202.59;
      reduction = 35;
      break;
    case "berglind-svan-c30":
    case "Berglind | Svan | C30":
      baseFootprint = 305;
      reducedFootprint = 219.79;
      reduction = 35;
      break;
    case "berglind-svan-c35":
    case "Berglind | Svan | C35/45":
      baseFootprint = 305;
      reducedFootprint = 226.19;
      reduction = 35;
      break;
    case "berglind-c16":
    case "Berglind | Vistvænni steypa | C16":
      baseFootprint = 305;
      reducedFootprint = 190.98;
      reduction = 20;
      break;
    case "berglind-c25":
    case "Berglind | Vistvænni steypa | C25":
      baseFootprint = 305;
      reducedFootprint = 230.59;
      reduction = 20;
      break;
    case "berglind-c30":
    case "Berglind | Vistvænni steypa | C30":
      baseFootprint = 305;
      reducedFootprint = 239.29;
      reduction = 20;
      break;
    case "aflsteypa-c35":
    case "Aflsteypa | C35":
      baseFootprint = 305;
      reducedFootprint = 305.79;
      reduction = 0;
      break;
    case "plan-og-stettasteypa-c35":
    case "Plan- og stéttasteypa | C35":
      baseFootprint = 305;
      reducedFootprint = 244;
      reduction = 20;
      break;
    default:
      // If concrete type not recognized, use standard values
      baseFootprint = 305;
      reducedFootprint = 305;
      reduction = 0;
  }
  
  // Calculate total carbon footprint
  const totalBaseFootprint = baseFootprint * volumeM3;
  const totalReducedFootprint = reducedFootprint * volumeM3;
  const totalReduction = totalBaseFootprint - totalReducedFootprint;
  
  return {
    concreteType: concreteType,
    volume: volumeM3,
    baseFootprint: Math.round(baseFootprint * 100) / 100,
    reducedFootprint: Math.round(reducedFootprint * 100) / 100,
    percentageReduction: reduction,
    totalBaseFootprint: Math.round(totalBaseFootprint * 100) / 100,
    totalReducedFootprint: Math.round(totalReducedFootprint * 100) / 100,
    totalCO2Saved: Math.round(totalReduction * 100) / 100,
    equivalence: {
      // Conversion factors for equivalent reductions
      carKilometers: Math.round(totalReduction * 4), // Approx. 4 km per kg CO₂
      treeMonths: Math.round(totalReduction / 10) // Approx. 10 kg CO₂ per tree month
    }
  };
}

/**
 * Calculates complete concrete project details
 * @param {Object} dimensions - Project dimensions
 * @param {string} application - Application type
 * @param {boolean} environmentalFocus - Whether environmental impact is important
 * @returns {Object} - Complete project calculation
 */
export function calculateCompleteConcreteProject(dimensions, application, environmentalFocus = false) {
  let volumeCalculation;
  
  // Determine calculation type based on dimensions provided
  if (dimensions.diameter && dimensions.height) {
    // Column calculation
    if (dimensions.postWidth && dimensions.postHeight && dimensions.postCount) {
      volumeCalculation = calculateColumnWithPostVolume(
        dimensions.diameter,
        dimensions.height,
        dimensions.postWidth,
        dimensions.postHeight,
        dimensions.postCount
      );
    } else {
      volumeCalculation = calculateColumnVolume(
        dimensions.diameter,
        dimensions.height
      );
    }
  } else if (dimensions.length && dimensions.width && dimensions.thickness) {
    // Rectangular calculation
    volumeCalculation = calculateConcreteVolume(
      dimensions.length,
      dimensions.width,
      dimensions.thickness
    );
  } else {
    throw new Error("Ófullnægjandi stærðarupplýsingar fyrir útreikning. Vinsamlegast gefðu upp allar nauðsynlegar stærðir.");
  }
  
  // Get concrete type recommendation
  const concreteRecommendation = recommendConcreteType(application, environmentalFocus);
  
  // Calculate carbon footprint
  const footprintEstimation = estimateCarbonFootprint(
    volumeCalculation.recommendedVolume,
    concreteRecommendation.concreteType
  );
  
  // Return comprehensive project details
  return {
    projectType: application,
    dimensions: volumeCalculation.dimensions,
    calculations: {
      volume: volumeCalculation.volume,
      recommendedVolume: volumeCalculation.recommendedVolume,
      weight: volumeCalculation.weight
    },
    recommendations: {
      concreteType: concreteRecommendation,
      environmentalImpact: footprintEstimation
    },
    tips: [
      `Mælt er með að panta ${volumeCalculation.recommendedVolume} m³ af steypu, sem tekur tillit til 5-10% afganga.`,
      `Fyrir þetta verk hentar ${concreteRecommendation.concreteType} vel.`,
      `Þessi steypa er með ${concreteRecommendation.strengthClass} styrkleikaflokk.`,
      environmentalFocus ? 
        `Með því að nota ${concreteRecommendation.concreteType} sparast ${footprintEstimation.totalCO2Saved} kg af CO₂ útblæstri, sem jafngildir ${footprintEstimation.equivalence.carKilometers} km í meðalbíl.` :
        `Hafðu samband við söluráðgjafa BM Vallá til að fá nákvæm verð og ráðleggingar.`
    ]
  };
}