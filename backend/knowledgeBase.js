// knowledgeBase.js
// Structured knowledge base for BM Vallá chatbot
// This file contains the Hellur (Paving stones), Steypa (Concrete), Sandur (Sand), Húseiningar | Smellinn (Prefabricated Housing Units) and STEYPTAR EININGAR (Precast concrete elements)
// Add this import at the top of knowledgeBase.js
import { searchSimilarContent } from './utils/embeddings.js';

export const knowledgeBase = {
  // Main product categories
  products: {
    // STEYPA (CONCRETE)
    steypa: {
      name: "Steypa",
      description: "BM Vallá er eini íslenski steypuframleiðandinn með vottað ISO 9001 gæðastjórnunarkerfi. Steypuframleiðsla fyrirtækisins byggir á þekkingu, reynslu og gæðum sem standast ströngustu kröfur fyrir íslenskar aðstæður.",
      path: "Verslun/Steypa",
      products: [
        {
          name: "Aflsteypa | C35",
          sku: "11-350VEG",
          description: "Grunngerð steypunnar er til notkunar utandyra þar sem salt kemur nálægt steypunni og hentar sérstaklega vel fyrir hafnarmannvirki, brýr, plötur í bílageymsluhæðum og efstu hæðir í mannvirkjum. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Aflsteypa hentar vel fyrir mannvirki eins og hafnir, brýr, plötur í bílageymsluhæðum og efstu hæðir mannvirkja. Aflsteypa hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 305,79 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Aflsteypa | C35",
          specs: {
            strengthClass: "C35",
            carbonFootprint: "305,79 kgCO₂ pr. m³",
            applications: [
              "Hafnarmannvirki",
              "Brýr", 
              "Plötur í bílageymsluhæðum", 
              "Efstu hæðir í mannvirkjum"
            ],
            environment: "Utandyra þar sem salt kemur nálægt steypunni"
          },
          availability: false
        },
        {
          name: "Anhydrit | Gólf",
          sku: "13-800",
          description: "Anhydrit ílögn byggir á notkun kalsíumsúlfats eða gifsi í stað sements og gerir það að verkum að hún rýrnar mjög lítið við niðurlögn, en sementsbundin ílögn vill rýrna og vinda sig. Anhydrit hentar best ofan á einangraðar gólfplötur (þó það megi nota hana ofan á steypu) og gefur slétt yfirborð. Anhydrit ílögn er afhent í steypubíl eins og hver önnur steypa og dælt með lítilli dælu. Styrkur ílagnarinnar er 20 MPa (AE20). Þykkt er að lágmarki 3 cm.",
          shortDescription: "Anhydrit ílögn er sérstaklega ætluð til nota innandyra á einangraðar gólfplötur og gefur afar slétt yfirborð. Söluráðgjafar okkar ráðleggja þér við val á floti og steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Anhydrit | Gólf",
          specs: {
            base: "Kalsíumsúlfat (gifs) í stað sements",
            strength: "20 MPa (AE20)",
            minThickness: "3 cm",
            features: [
              "Rýrnar mjög lítið við niðurlögn",
              "Gefur slétt yfirborð",
              "Afhent í steypubíl og dælt með lítilli dælu"
            ],
            applications: [
              "Ofan á einangraðar gólfplötur",
              "Ofan á steypu"
            ],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Svan | C25",
          sku: "11-250U2",
          description: "Steypan frá BM Vallá er sérhönnuð til að þola íslenskt veðurfar og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem hentar vel í plötur, sökkla og veggi utandyra. Berglind Svan, vistvænni steypan frá BM Vallá, kemur stöðluð með 35% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind Svan hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 202,59 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Svan | C25",
          specs: {
            strengthClass: "C25",
            carbonFootprint: "202,59 kgCO₂ pr. m³",
            carbonReduction: "35% staðlað, allt að 45% mögulegt",
            applications: ["Plötur", "Sökklar", "Veggir utandyra"],
            certifications: [
              "Svansvottað",
              "EPD (Umhverfisyfirlýsing)"
            ],
            features: [
              "Klinker magn sementsins er 70% í stað 90%",
              "Sérhönnuð til að þola íslenskt veðurfar"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Svan | C30",
          sku: "11-300U",
          description: "Grunngerð steypunnar miðast við notkun utandyra og hentar sérstaklega vel í sökkla og óvarða veggi úti, t.d. nálægt sjó, og einnig fyrir garð- og stoðveggi. Steypan er með vottaða umhverfisyfirlýsingu (EPD). Mesta kornastærð (Dmax): 25 mm. Mesta vatns- og sementshlutfall: 0,5.",
          shortDescription: "Steypa sem hentar vel til notkunar utandyra, t.d. fyrir garðveggi, stoðveggi, útveggi nálægt sjó og sökkla. Berglind Svan, vistvænni steypan frá BM Vallá, kemur stöðluð með 35% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind Svan hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 219,79 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Svan | C30",
          specs: {
            strengthClass: "C30",
            carbonFootprint: "219,79 kgCO₂ pr. m³",
            carbonReduction: "35% staðlað, allt að 45% mögulegt",
            maxGrainSize: "25 mm",
            maxWaterCementRatio: 0.5,
            applications: [
              "Sökklar", 
              "Óvarðir veggir úti", 
              "Veggir nálægt sjó", 
              "Garðveggir", 
              "Stoðveggir"
            ],
            certifications: [
              "Svansvottað",
              "EPD (Umhverfisyfirlýsing)"
            ],
            features: ["Klinker magn sementsins er 70% í stað 90%"],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Svan | C35/45",
          sku: "11-350U",
          description: "Grunngerð steypunnar miðast við notkun utandyra og hentar sérstaklega vel í sökkla og óvarða veggi úti, t.d. nálægt sjó, og einnig fyrir garð- og stoðveggi. Steypan er með vottaða umhverfisyfirlýsingu (EPD). Mesta kornastærð (Dmax): 25 mm. Mesta vatns- og sementshlutfall: 0,5.",
          shortDescription: "Steypa sem hentar vel til notkunar utandyra, t.d. fyrir garðveggi, stoðveggi, útveggi nálægt sjó og sökkla. Berglind Svan, vistvænni steypan frá BM Vallá, kemur stöðluð með 35% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind Svan hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 226,19 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Svan | C35/45",
          specs: {
            strengthClass: "C35/45",
            carbonFootprint: "226,19 kgCO₂ pr. m³",
            carbonReduction: "35% staðlað, allt að 45% mögulegt",
            maxGrainSize: "25 mm",
            maxWaterCementRatio: 0.5,
            applications: [
              "Sökklar", 
              "Óvarðir veggir úti", 
              "Veggir nálægt sjó", 
              "Garðveggir", 
              "Stoðveggir"
            ],
            certifications: [
              "Svansvottað",
              "EPD (Umhverfisyfirlýsing)"
            ],
            features: ["Klinker magn sementsins er 70% í stað 90%"],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | C16",
          sku: "11-160",
          description: "Grunngerð steypunnar er til notkunar innandyra, hentar sérstaklega í veggi og þrifalög t.d. afréttingar undir steypumót. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem hentar vel fyrir veggi og í þrifalög, t.d. afréttingar undir steypumót. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð. Berglind, C16/20 hefur umhverfisyfirlýsingu (EPD).",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | C16",
          specs: {
            strengthClass: "C16/20",
            carbonFootprint: "190,98 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            applications: [
              "Veggi", 
              "Þrifalög", 
              "Afréttingar undir steypumót"
            ],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | C20",
          sku: "11-200",
          description: "Grunngerð steypunnar er til notkunar innandyra og hentar hún sérstaklega vel í sökkla og veggi. Steypan frá BM Vallá er sérhönnuð til að þola íslenskt veðurfar og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem hentar sérstaklega fyrir plötur og veggi innandyra þar sem veðuráhrifa gætir ekki. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | C20",
          specs: {
            strengthClass: "C20",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            applications: ["Sökklar", "Veggi", "Plötur innandyra"],
            certifications: ["Svansvottað"],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | C25",
          sku: "11-250",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í plötur, sökkla og veggi. Steypan frá BM Vallá er sérhönnuð til að þola íslenskt veðurfar og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem hentar vel í plötur, sökkla og veggi utandyra. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 230,59 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | C25",
          specs: {
            strengthClass: "C25",
            carbonFootprint: "230,59 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            applications: ["Plötur", "Sökklar", "Veggir utandyra"],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | C30",
          sku: "11-300LL",
          description: "Grunngerð steypunnar er til notkunar innandyra og hentar sérstaklega vel í sökkla, stiga og veggi. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem hentar vel til notkunar innandyra, eins og veggi, plötur og stiga. Berglind, vistvænni steypa frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 40% minna kolefnisspori. Berglind hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 239,29 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | C30",
          specs: {
            strengthClass: "C30",
            carbonFootprint: "239,29 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 40% mögulegt",
            applications: ["Sökklar", "Stigar", "Veggir", "Plötur innandyra"],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | C30",
          sku: "11-300",
          description: "Grunngerð steypunnar miðast við notkun utandyra og hentar sérstaklega vel í sökkla og óvarða veggi úti, t.d. nálægt sjó, og einnig fyrir garð- og stoðveggi. Steypan er með vottaða umhverfisyfirlýsingu (EPD). Mesta kornastærð (Dmax): 25 mm. Mesta vatns- og sementshlutfall: 0,5.",
          shortDescription: "Steypa sem hentar vel til notkunar utandyra, t.d. fyrir garðveggi, stoðveggi, útveggi nálægt sjó og sökkla. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 239,29 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | C30",
          specs: {
            strengthClass: "C30",
            carbonFootprint: "239,29 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            maxGrainSize: "25 mm",
            maxWaterCementRatio: 0.5,
            applications: [
              "Sökklar", 
              "Óvarðir veggir úti", 
              "Veggir nálægt sjó", 
              "Garðveggir", 
              "Stoðveggir"
            ],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | C35",
          sku: "11-350LL",
          description: "Grunngerð steypunnar er til notkunar innandyra og hentar sérstaklega vel í veggi, plötur og stiga. Mesta kornastærð (Dmax): 25 mm. Mesta vatns- og sementshlutfall: 0,5. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun.",
          shortDescription: "Steypa sem hentar vel til notkunar innandyra, eins og veggi, plötur og stiga. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Þessi steypa uppfyllir skilyrði til umhverfisvottunar Svansins. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | C35",
          specs: {
            strengthClass: "C35",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            maxGrainSize: "25 mm",
            maxWaterCementRatio: 0.5,
            applications: ["Veggir", "Plötur", "Stigar"],
            certifications: ["Svansvottað"],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | Fínkorna | C25",
          sku: "11-250X",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í sökkla og veggi. Berglind, vistvænni steypa frá BM Vallá er sérhönnuð til að þola íslenskt veðurfar og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem kemur með fínkornastærð og hentar vel í veggi og sökkla utandyra þar sem erfiðara er að komast að byggingarhlutum, t.d. við þröng rými. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 230,59 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | Fínkorna | C25",
          specs: {
            strengthClass: "C25",
            carbonFootprint: "230,59 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            grainSize: "Fínkorna",
            applications: [
              "Veggi", 
              "Sökkla utandyra", 
              "Þröng rými",
              "Byggingarhlutir sem erfitt er að komast að"
            ],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | Fínkorna | C30",
          sku: "11-300X",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í plötur, sökkla og veggi. Berglind, vistvænni steypa, frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar. Mesta kornastærð (Dmax): 16 mm.",
          shortDescription: "Steypa með minni kornastærð og hentar vel til notkunar utandyra þar sem byggingarhluti er þröngur/erfitt að komast að og er sérstaklega gerð fyrir fyrir garðveggi, stoðveggi, útveggi nálægt sjó og sökkla. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 239,29 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | Fínkorna | C30",
          specs: {
            strengthClass: "C30",
            carbonFootprint: "239,29 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            maxGrainSize: "16 mm",
            applications: [
              "Plötur", 
              "Sökklar", 
              "Veggir", 
              "Þröng rými",
              "Garðveggir",
              "Stoðveggir",
              "Útveggir nálægt sjó"
            ],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Berglind | Vistvænni steypa | Inni | C25",
          sku: "11-250LL",
          description: "Grunngerð steypunnar miðast við notkun innandyra og hentar sérstaklega vel í veggi, sökkla og stiga. Steypan er með vottaða umhverfisyfirlýsingu (EPD). Mesta kornastærð (Dmax): 25 mm. Mesta vatns- og sementshlutfall: 0,6. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun.",
          shortDescription: "Steypa sem hentar vel fyrir notkun innandyra eins í veggi, plötur og stiga. Berglind, vistvænni steypan frá BM Vallá, kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 45% minna kolefnisspori. Berglind hefur umhverfisyfirlýsingu (EPD) og er með kolefnisspor að meðaltali 230,59 kgCO₂ pr. m³",
          environmentalDeclaration: true,
          path: "Verslun/Steypa/Berglind | Vistvænni steypa | Inni | C25",
          specs: {
            strengthClass: "C25",
            carbonFootprint: "230,59 kgCO₂ pr. m³",
            carbonReduction: "20% staðlað, allt að 45% mögulegt",
            maxGrainSize: "25 mm",
            maxWaterCementRatio: 0.6,
            applications: ["Veggir", "Sökklar", "Stigar", "Plötur innandyra"],
            certifications: [
              "Svansvottað", 
              "EPD (Umhverfisyfirlýsing)"
            ],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Gólfsteypa | Perluílögn",
          sku: "13-600",
          description: "Perluílögn er þægileg í niðurlögn og gefur gott yfirborð, sumir segja meira að segja að hún leggji sig að mestu sjálf. Hentar sérlega vel í plötur þegar leitað er eftir sléttu yfirborði. Perluílögn má leggja sem afréttingarlag ofan á steypu. Steypustyrkur er að jafnaði C-12 en aðrir styrkleikaflokkar eru einnig fáanlegir (C-25 og C-30). Þykkt er almennt 4-10 cm og er notuð lítil steypudæla. Almennt ekki undir 4 cm. Yfirleitt alltaf notuð motta. Perluílögn er dælt með 2\" slöngu úr kerrudælu, en hægt er að fá dælt með 3\" og 4\" tommu sem gefur grófkornóttari steypu.",
          shortDescription: "Perluílögn er þægileg í niðurlögn og gefur gott yfirborð. Má nota sem afréttingarlag ofan á steypu og hentar sérlega vel í plötur sem eiga að vera með slétt yfirborð.",
          path: "Verslun/Steypa/Gólfsteypa | Perluílögn",
          specs: {
            strengthClass: "C-12 (einnig fáanleg í C-25 og C-30)",
            recommendedThickness: "4-10 cm",
            minThickness: "4 cm",
            features: [
              "Þægileg í niðurlögn", 
              "Gefur gott og slétt yfirborð", 
              "Leggur sig að mestu sjálf"
            ],
            applications: [
              "Plötur sem þurfa slétt yfirborð", 
              "Afréttingarlag ofan á steypu"
            ],
            equipment: [
              "Lítil steypudæla", 
              "2\" slanga úr kerrudælu (einnig fáanlegt með 3\" og 4\")"
            ],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Plan- og stéttasteypa | C35",
          sku: "11-350",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í plötur og veggi, einnig í gangstéttir, bílaplön, svalir og stéttir. Mesta kornastærð (Dmax): 25 mm. Mesta vatns- og sementshlutfall: 0,45. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem hentar vel utandyra fyrir veggir, plötur, bílaplön, gangstéttir, stiga og svalir. Hún kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 40% minna kolefnisspori, sjá nánar Berglind, vistvæn steypa. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Plan- og stéttasteypa | C35",
          specs: {
            strengthClass: "C35",
            maxGrainSize: "25 mm",
            maxWaterCementRatio: 0.45,
            carbonReduction: "20% staðlað, allt að 40% mögulegt",
            applications: [
              "Plötur", 
              "Veggir", 
              "Gangstéttir", 
              "Bílaplön", 
              "Svalir", 
              "Stéttir"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Plan- og stéttasteypa | Fínkorna | C35",
          sku: "11-350X",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í plötur, veggi, gangstéttir, bílaplön og svalir. Hún er með fínkornastærð og hentar því vel fyrir byggingarhluta sem erfitt er að komast að og þrengsli til staðar. Mesta kornastærð (Dmax): 16 mm. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun.",
          shortDescription: "Steypa sem hentar vel til notkunar utandyra, eins og veggi, plötur, gangstéttir, bílaplön og svalir. Steypan er hluti af Berglindi, vistvænni steypu frá BM Vallá, og kemur stöðluð með 20% minna kolefnisspori heldur en hefðbundin steypa* og hægt að fá hana með allt að 40% minna kolefnisspori. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Plan- og stéttasteypa | Fínkorna | C35",
          specs: {
            strengthClass: "C35",
            maxGrainSize: "16 mm",
            carbonReduction: "20% staðlað, allt að 40% mögulegt",
            features: ["Fínkornastærð fyrir þröng rými"],
            applications: [
              "Plötur", 
              "Veggir", 
              "Gangstéttir", 
              "Bílaplön", 
              "Svalir", 
              "Þröng rými",
              "Byggingarhlutir sem erfitt er að komast að"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Raufarsteypa | C35",
          sku: "14-350",
          description: "Grunngerð steypunnar er til notkunar innandyra og er hún sérstaklega gerð til að fylla í raufar milli eininga og loka þeim þannig betur. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa sem er sérstaklega útbúin fyrir raufar á milli eininga. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Raufarsteypa | C35",
          specs: {
            strengthClass: "C35",
            applications: ["Raufar milli eininga"],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Sérþjál steypa | C25",
          sku: "11-250Þ",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í sökkla og veggi. Aukin þjálni gefur steypunni eiginleika sem eru mitt á milli hefðbundins sigmáls og sjálfútleggjandi steinsteypu. Það hentar vel að hafa aukna þjálni þegar verið er að steypa undir glugga eða aðrar aðstæður sem krefjast sérstaklega mjúkrar steypu. Ólíkt sjálfútleggjandi steypunni þarf og má víbra þessa steypu. Hún er til í öllum styrkleikaflokkum. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun.",
          shortDescription: "Steypa með sérþjálni sem hentar vel þegar steypa þarf í aðstæðum sem krefjast mjúkrar steypu, t.d. undir gluggum, sökkla eða veggi. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Sérþjál steypa | C25",
          specs: {
            strengthClass: "C25",
            features: [
              "Aukin þjálni", 
              "Mitt á milli hefðbundins sigmáls og sjálfútleggjandi steinsteypu", 
              "Þarf og má víbra"
            ],
            applications: [
              "Sökklar", 
              "Veggir", 
              "Undir glugga", 
              "Aðstæður sem krefjast mjúkrar steypu"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Sjónsteypa | C30",
          sku: "11-300S",
          description: "Grunngerð steypunnar er til notkunar innandyra og hentar sérstaklega vel í þartilgerða sjónsteypuveggi. Mikilvægt er að hafa í huga að til þess að ná þeirri ásýnd sem hönnun gerir ráð fyrir þarf að vanda sérstaklega við niðurlögn steypunnar. Þannig er mikilvægt að nota steypumót sem eru þétt og með óskemmdu yfirborði, að steypan sé víbruð niður eftir sérstökum reglum og mótaolían þarf að vera sérhönnuð í þessum tilgangi. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun.",
          shortDescription: "Með sérútbúinni sjónsteypu er hægt að fá fallega áferð, munstur og nokkur litaafbrigði á steyptan veggflöt innandyra. BM Vallá býður upp á nokkrar útfærslur af sjónsteypu í samráði við hönnuði og verkkaupa. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Sjónsteypa | C30",
          specs: {
            strengthClass: "C30",
            applications: ["Sjónsteypuveggir innandyra"],
            specialRequirements: [
              "Þétt steypumót með óskemmdu yfirborði", 
              "Sérstök víbrunarferli", 
              "Sérhönnuð mótaolía"
            ],
            features: ["Falleg áferð", "Munstur", "Nokkur litaafbrigði"],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Sjónsteypa | C35",
          sku: "11-350S",
          description: "Grunngerð steypunnar er til notkunar innandyra og hentar sérstaklega vel í þartilgerða sjónsteypuveggi. Mikilvægt er að hafa í huga að til þess að ná þeirri ásýnd sem hönnun gerir ráð fyrir þarf að vanda sérstaklega við niðurlögn steypunnar. Þannig er mikilvægt að nota steypumót sem eru þétt og með óskemmdu yfirborði, að steypan sé víbruð niður eftir sérstökum reglum og mótaolían þarf að vera sérhönnuð í þessum tilgangi. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun – og eini íslenski steypuframleiðandinn með slíka vottun.",
          shortDescription: "Með sérútbúinni sjónsteypu er hægt að fá fallega áferð, munstur og nokkur litaafbrigði á steyptan veggflöt innandyra. BM Vallá býður upp á nokkrar útfærslur af sjónsteypu í samráði við hönnuði og verkkaupa. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Sjónsteypa | C35",
          specs: {
            strengthClass: "C35",
            applications: ["Sjónsteypuveggir innandyra"],
            specialRequirements: [
              "Þétt steypumót með óskemmdu yfirborði", 
              "Sérstök víbrunarferli", 
              "Sérhönnuð mótaolía"
            ],
            features: ["Falleg áferð", "Munstur", "Nokkur litaafbrigði"],
            environment: "Innandyra"
          },
          availability: false
        },
        {
          name: "Snjallnemi í steypu",
          sku: "10-185-30 cm",
          description: "Þráðlausir snjallnemar fyrir steypu er komið fyrir inni í steypustyrktarjárni á verkstað til að fylgjast með þróun styrks, hitastigs og hörðnun steypunnar. Styrkleiki steypunnar er kvarðaður við þá steypugerð sem er notuð hverju sinni. Gagnasöfnun um þróun á eiginleikum steypunnar veitir byggingaraðilum mikilvægar upplýsingar þegar taka þarf ákvörðun um hvenær megi slá frá steypumótum á verkstað. Slíkt getur verið sérstaklega hentugt í köldu veðurfari og leitt af sér aukið hagræði, styttri verktíma og lægri kostnað. Að jafnaði ætti einn snjallnemi að duga fyrir hefðbundna byggingarhluta upp að 100 M3, en söluráðgjafar veita nánari upplýsingar um hversu marga snjallnema steypuframkvæmdin þarf. Snjallnemarnir fást í tveimur lengdum, með 30 cm snúru eða 3 m snúru.",
          shortDescription: "Þráðlausir snjallnemar í steypu eru notaðir til að fylgjast með þróun styrks, hitastigs og hörðnunar á steypu. Meðal ávinnings að nota snjallmæla er styttri verktími, aukið hagræði og sjálfbærni.",
          price: { amount: 24900, unit: "stk" },
          weight: "0.12 kg",
          sizes: ["30 cm", "3 m"],
          path: "Verslun/Steypa/Snjallnemi í steypu",
          specs: {
            types: ["30 cm snúra", "3 m snúra"],
            features: [
              "Fylgist með þróun styrks", 
              "Fylgist með hitastigi", 
              "Fylgist með hörðnun steypunnar"
            ],
            benefits: [
              "Styttri verktími", 
              "Aukið hagræði", 
              "Sjálfbærni", 
              "Lægri kostnaður"
            ],
            coverage: "Einn nemi dugar fyrir hefðbundna byggingarhluta upp að 100 M3"
          },
          availability: false
        },
        {
          name: "Steypa C-25 Hrað þjálni",
          sku: "11-250HÞ",
          description: "Grunngerð steypunnar er til notkunar utandyra og hentar sérstaklega vel í sökkla og veggi. Aukin þjálni gefur steypunni eiginleika sem eru mitt á milli hefðbundins sigmáls og sjálfútleggjandi steinsteypu. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun – og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa með sérþjálni sem hentar vel þegar steypa þarf í aðstæðum sem krefjast mjúkrar steypu, t.d. undir gluggum, sökkla eða veggi. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Steypa C-25 Hrað þjálni",
          specs: {
            strengthClass: "C25",
            features: [
              "Aukin þjálni", 
              "Mitt á milli hefðbundins sigmáls og sjálfútleggjandi steinsteypu"
            ],
            applications: [
              "Sökklar", 
              "Veggir", 
              "Aðstæður sem krefjast mjúkrar steypu"
            ],
            environment: "Utandyra"
          },
          availability: false
        },
        {
          name: "Svört steypa | C30",
          sku: "11-350SGSV",
          description: "Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Svört steypa er vinsæl meðal hönnuða enda gefur hún einstakt yfirbragð, dökka og fallega áferð á byggingarhlutum t.d. í útveggjum. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Svört steypa | C30",
          specs: {
            strengthClass: "C30",
            color: "Svört",
            features: ["Einstakt yfirbragð", "Dökk og falleg áferð"],
            applications: ["Útveggir", "Byggingarhlutir sem eiga að vera sjáanlegir"]
          },
          availability: false
        },
        {
          name: "Vatnsþétt steypa | C35",
          sku: "11-350VÞ",
          description: "Grunngerð steypunnar er til notkunar utandyra og inniheldur sérstakt vatnsþéttiefni sem gerir það að verkum að steypan þolir mikinn vatnsþrýsting/vatnsálag. Steypan frá BM Vallá er sérhönnuð fyrir íslenskar aðstæður og rík áhersla er lögð á að minnka kolefnisspor steypunnar. Öll framleiðsla lýtur ítrustu gæðastöðlum enda er BM Vallá með ISO 9001 gæðavottun - og eini íslenski steypuframleiðandinn með slíka vottun. Þegar steypa er valin í mannvirki þarf að horfa til mismunandi eiginleika steypunnar, staðsetningar byggingarhluta og niðurlögn hennar.",
          shortDescription: "Steypa með sérstöku vatnsþéttiefni sem gerir hana einkar vatnsþétta og þolir vel ágang tengt vatnsþrýstingi. Hentar vel í sökkla þar sem vatn kemur að, hafnarmannvirki, brýr, plötur og bílaplön. Söluráðgjafar okkar ráðleggja þér við val á steypu sem hentar þínu verki og veita upplýsingar um verð.",
          path: "Verslun/Steypa/Vatnsþétt steypa | C35",
          specs: {
            strengthClass: "C35",
            features: [
              "Inniheldur sérstakt vatnsþéttiefni", 
              "Þolir mikinn vatnsþrýsting/vatnsálag"
            ],
            applications: [
              "Sökklar þar sem vatn kemur að", 
              "Hafnarmannvirki", 
              "Brýr", 
              "Plötur", 
              "Bílaplön"
            ],
            environment: "Utandyra"
          },
          availability: false
        }
      ]
    },
    
    // SANDUR (SAND)
    sandur: {
      name: "Sandur",
      description: "Hægt er að fá hellusand og pússningarsand í sekkjum hjá BM Vallá, ef óskað er eftir sandi eða möl beint á kerru bendum við á samstarfsaðila okkar, Þrótt.",
      path: "Verslun/Sandur",
      products: [
        {
          name: "Hellusandur í sekkjum",
          sku: "40-671",
          description: "Sandurinn hentar einstaklega vel sem undirlag fyrir hellulagnir og í malbik. Afhending fer fram hjá BM Vallá, Breiðhöfða 3. Sandurinn er afhentur í 1 rúmmetra sekkjum, ef óskað er eftir sandi eða möl beint á kerru bendum við á samstarfsaðila okkar, Þrótt.",
          shortDescription: "Hellusandur sem hentar vel undir hellulagnir, í malbik, tjarnir, þekjur og til að brjóta upp línur og fleti. Sandurinn er afhentur í 1 rúmmetra sekkjum. Ef óskað er eftir sandi eða möl beint á kerru bendum við á samstarfsaðila okkar, Þrótt.",
          price: { amount: 9592, unit: "M3" },
          path: "Verslun/Sandur/Hellusandur í sekkjum",
          specs: {
            grainSize: "0/8 mm",
            certification: "CE merkt vara",
            applications: [
              "Í malbik",
              "Í tjarnir",
              "Innskot (brjóta upp línu/fleti)",
              "Í þekjur",
              "Undir hellulagnir"
            ],
            packaging: "1 rúmmetra sekkir"
          },
          availability: false
        },
        {
          name: "Pússningarsandur í poka | 25kg",
          sku: "40-600",
          description: "Pússningarsandur hentar vel sem fúga í hellulögn. Sandurinn kemur í 25 kg poka. en fæst einnig í stórsekkjum. Ef óskað er eftir sandi eða möl beint á kerru bendum við á samstarfsaðila okkar, Þrótt. Kornastærð: 0,1 til 1 mm. Um 90% af sandinum er < 0,5 mm og 99% < 1 mm. Pússningarsandurinn kemur úr Hraunsnámu, síðan er hann harpaður og að lokum pakkað í verksmiðju BM Vallár.",
          shortDescription: "Pússningarsandur hentar vel sem fúga í hellulögn. Sandurinn kemur í 25 kg poka en fæst einnig í stórsekkjum. Ef óskað er eftir sandi eða möl beint á kerru bendum við á samstarfsaðila okkar, Þrótt.",
          price: { amount: 1306, unit: "poki" },
          weight: "25.00 kg",
          path: "Verslun/Sandur/Pússningarsandur í poka | 25kg",
          specs: {
            grainSize: "0,1 til 1 mm",
            composition: "90% < 0,5 mm og 99% < 1 mm",
            source: "Hraunsnáma",
            process: "Harpaður og pakkað í verksmiðju BM Vallár",
            applications: ["Fúga í hellulögn"],
            packaging: "25 kg pokar"
          },
          availability: true
        },
        {
          name: "Pússningarsandur í sekkjum",
          sku: "40-510",
          description: "Fínkorna sandur sem hentar einstaklega vel sem fúga í hellulagnir. Afhending á sandi fer fram hjá BM Vallá, Breiðhöfða 3. Sandurinn er afhentur í 1 rúmmetra sekkjum, en fæst einnig í 25 kg pokum. Kornastærð: 0,1 til 1 mm. Um 90% af sandinum er < 0,5 mm og 99% < 1 mm. Pússningarsandurinn kemur úr Hraunsnámu, síðan er hann harpaður og að lokum pakkað í verksmiðju BM Vallár.",
          shortDescription: "Pússningarsandur hentar vel sem fúga í hellulögn. Sandurinn er afhentur í 1 rúmmetra sekkjum.",
          price: { amount: 18246, unit: "M3" },
          path: "Verslun/Sandur/Pússningarsandur í sekkjum",
          specs: {
            grainSize: "0,1 til 1 mm",
            composition: "90% < 0,5 mm og 99% < 1 mm",
            source: "Hraunsnáma",
            process: "Harpaður og pakkað í verksmiðju BM Vallár",
            applications: ["Fúga í hellulagnir"],
            packaging: "1 rúmmetra sekkir"
          },
          availability: false
        },
        {
          name: "VarioSand",
          sku: "42-541",
          description: "VarioSand er sérhannaður sandur með einstaka bindieiginleika. VarioSand inniheldur fjölliður (e. polymers), aukaefni og sement, og er einstaklega hentugur fyrir hellulagnir með fúgubreidd á bilinu 2 mm til 4 mm. VarioSand er dreift (beint úr fötunni) á þurrt hellulagt svæði, sandinum þjappað vel niður á yfirborðið og að lokum er sópað yfir svæðið til að losna við umframefni. Eftir þjöppun og sópun er mikilvægt að bleyta yfirborð hellulagða svæðisins vandlega með vatni, en gæta þess þó að nota ekki of mikið vatnsafl til að VarioSand fari ekki úr fúgunum. Við vökvunina virkjast sérstakir eiginleikar í bindiefninu sem tryggir hámarks virkni efnisins og styrkir fúgurnar til lengri tíma. Gott er að endurtaka vökvunina 4-5 sinnum til að tryggja að allt efnið í fúgunum hefur gegnvotnað í fullri dýpt. Þegar VarioSand þornar verður efnið aðeins hart í fúgunum sem gerir að verkum að fúgurnar lokast einstaklega vel.",
          shortDescription: "VarioSand er fínn fúgusandur með einstaka bindieiginleika. Hann er sérhannaður fyrir þröng samskeyti í hellulögnum ásamt því að veita frábæra vörn fyrir vöxt illgresis milli fúga. VarioSand hentar bæði á einka- og almenningssvæði þar sem miðlungs umferðarþungi er til staðar.",
          price: { amount: 12717, unit: "stk" },
          weight: "25.00 kg",
          path: "Verslun/Sandur/VarioSand",
          specs: {
            composition: "Fjölliður (polymers), aukaefni og sement",
            jointWidth: "2 mm til 4 mm",
            features: [
              "Nýstárleg lausn fyrir þröng samskeyti",
              "Hentar fyrir samskeyti þar sem hefðbundinn múr eða sandur hentar ekki",
              "Hindrar vöxt illgresis og skordýra í fúgum",
              "Hentar vel fyrir hellulagnir með þröng samskeyti",
              "Lítil rykmyndun við notkun"
            ],
            installation: [
              "Dreift á þurrt hellulagt svæði",
              "Þjappað niður og sópað",
              "Bleyta vandlega með vatni",
              "Endurtaka vökvun 4-5 sinnum"
            ],
            applications: ["Hellulagnir með þröngum samskeytum", "Einka- og almenningssvæði með miðlungs umferðarþunga"]
          },
          availability: true
        }
      ]
    },
    
    // HELLUR (PAVING STONES)
    hellur: {
      name: "Hellur",
      description: "BM Vallá hefur framleitt hellur fyrir heimili, fyrirtæki og sveitarfélög í yfir fjörtíu ár og er eini steypuframleiðandinn á Íslandi með vottað ISO 9001 gæðastjórnunarkerfi. Skoðaðu fjölbreytt vöruúrval á vefnum og finndu þær hellur sem henta þínu verki.",
      path: "Verslun/Hellur",
      subcategories: {
        // BÍLASTÆÐI (Parking lots/driveways)
        bilastaedi: {
          name: "Bílastæði",
          description: "Hellur sem henta fyrir bílastæði og innkeyrslur.",
          path: "Verslun/Hellur/Bílastæði",
          products: [
            {
              name: "Arena",
              sku: "24-753-svart",
              description: "Arena hellurnar eru svartar að lit, þær eru með skemmtilega hreyfingu og hægt að mynda fjölbreytt mynstur með þeim, nú eða bara hafa þær stakar. Arena fæst í fjórum mismunandi stærðum, og fáanlegar bæði í 6 eða 8 cm þykkar.",
              shortDescription: "Arena hellurnar eru svartar að lit og fást í fjórum stærðum. Hægt að leggja þær stakar, eða saman og mynda þannig fjölbreytt mynstur. Arena, 6 cm hellur, hafa umhverfisyfirlýsingu (EPD).",
              price: { amount: 629, unit: "stk", pricePerM2: 10074 },
              weight: "9.00 kg",
              sizes: ["25x25x6 cm", "25x50x6 cm", "50x50x6 cm", "60x60x6 cm", "25x25x8 cm", "25x50x8 cm", "50x50x8 cm", "60x60x8 cm"],
              colors: ["Svartur"],
              environmentalDeclaration: true, // EPD
              path: "Verslun/Hellur/Bílastæði/Arena",
              specs: {
                thickness: [6, 8],
                pattern: "Fást í fjórum stærðum sem hægt er að raða saman í mynstur.",
                material: "Steinsteypa",
                density: "2300 kg/m3"
              },
              availability: true
            },
            {
              name: "Borgarhella",
              sku: "24-749-Grátt",
              description: "Borgarhellan er sterkbyggð og tilvalin í stóra hellulagða fleti eins og t.d. fyrir innkeyrslu. Það er tilvalið að blanda Borgarhellunni með Jötunsteini, 8 cm. Þá er hægt að fá borgarhelluna í nokkrum litum með sérpöntun. Borgarhella fæst í fjórum mismunandi stærðum.",
              shortDescription: "Borgarhellan er sterkbyggð og tilvalin í stóra hellulagða fleti eins og t.d. fyrir innkeyrslu.",
              price: { amount: 5839, unit: "stk", pricePerM2: 11678 },
              weight: "96.00 kg",
              sizes: ["100x50x8 cm", "60x60x8 cm", "50x50x8 cm", "40x40x8 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Bílastæði/Borgarhella",
              specs: {
                thickness: 8,
                applications: ["Innkeyrslur", "Stórir hellulagðir fletir"],
                compatibility: "Hentar vel með Jötunsteini"
              },
              availability: true
            },
            {
              name: "Doppuhella",
              sku: "38-520-Rautt",
              description: "Doppuhellur eru notaðar sem varúðar- og áherslueiningar við enda gangbrauta, við efsta þrep trappa og til að gefa til kynna stefnubreytingu. Þeim er ætlað að leiðbeina blindum og sjónskertum um hvar leiðin liggi. Doppuhellur fást í nokkrum litum og eru ávallt hafðar í öðrum lit heldur en nærliggjandi yfirborð.",
              shortDescription: "Doppuhellur eru notaðar sem varúðar- og áherslueiningar, t.d. við enda gangbrauta og til að gefa til kynna stefnubreytingu. Þeim er ætlað að leiðbeina blindum og sjónskertum um hvar leiðin liggi.",
              price: { amount: 4735, unit: "stk" },
              weight: "15.00 kg",
              sizes: ["30x30x7 cm"],
              colors: ["Rauður"],
              path: "Verslun/Hellur/Bílastæði/Doppuhella",
              specs: {
                thickness: 7,
                applications: ["Við enda gangbrauta", "Við efsta þrep trappa", "Fyrir blinda og sjónskerta"],
                accessibility: "Leiðbeinandi fyrir blinda og sjónskerta"
              },
              availability: true
            },
            {
              name: "Gegndræp hella",
              sku: "24-855-Grátt",
              description: "Gegndræpar hellur eru hluti af blágrænum ofanvatnslausnum frá BM Vallá sem er umhverfisvænni og sjálfbær leið við meðferð ofanvatns. Með lausninni er ofanvatninu miðlað ofan í jarðveginn í stað þess að flytja það burt með fráveitukerfinu og þannig líkt eftir náttúrulegri hringrás vatnsins. Gegndræpir fletir gegna mikilvægu hlutverki til að tryggja að vatnið eigi greiða leið niður í jarðveginn.",
              shortDescription: "Gegndræp hella er hluti af blágrænum ofanvatnslausnum þar sem stuðlað er að því að ofanvatn eigi greiðari leið niður í jarðveginn. Gegndræp hella er með umhverfisyfirlýsingu (EPD).",
              price: { amount: 902, unit: "stk", pricePerM2: 11273 },
              weight: "15.00 kg",
              sizes: ["20x40x8 cm", "40x40x6 cm"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Bílastæði/Gegndræp hella",
              specs: {
                thickness: [6, 8],
                applications: ["Blágrænnar ofanvatnslausnir"],
                features: ["Gegndræp", "Stuðlar að náttúrulegri hringrás vatns"],
                relatedProducts: ["Fornsteinn", "Vínarsteinn", "Grassteinn"]
              },
              availability: true
            },
            {
              name: "Grassteinn",
              sku: "26-040-Grátt",
              description: "Grassteinn setur skemmtilegan svip á umhverfið og brúar bilið milli grænna og steinlagðra svæða. Hann er tilvalinn í: Gestabílastæði eða innkeyrslur þar sem bílar standa ekki lengi í senn. Lítið notaðar aðkomuleiðir. Fáfarna göngustíga eða jaðra á stígum og bílastæðum. Bílastæði við sumarbústaði. Umferðareyjur eða aðra staði þar sem búast má við að farartæki aki upp á gras. Aðkomu fyrir sjúkra- og slökkvibifreiðar.",
              shortDescription: "Grassteinn setur skemmtilegan svip á umhverfið og brúar bilið milli grænna og steinlagðra svæða.",
              price: { amount: 1592, unit: "stk", pricePerM2: 9949 },
              weight: "18.80 kg",
              sizes: ["40x40x8 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Bílastæði/Grassteinn",
              specs: {
                thickness: 8,
                applications: [
                  "Gestabílastæði", 
                  "Innkeyrslur með lítilli umferð", 
                  "Lítið notaðar aðkomuleiðir", 
                  "Fáfarnir göngustígar", 
                  "Bílastæði við sumarbústaði", 
                  "Umferðareyjur", 
                  "Aðkoma fyrir sjúkra- og slökkvibifreiðar"
                ]
              },
              availability: true
            },
            {
              name: "Hella",
              sku: "24-640-Grátt",
              description: "Upprunalega og klassíska hellan okkar sem stendur alltaf fyrir sínu. Hellu má fá í nokkrum stærðum og litum og því tilvalið að blanda saman og búa til margskonar mynstur. Hella er 6 cm þykk og kemur í nokkrum stærðum, hana má sjá víðsvegar um bæinn t.d. í Borgartúni þar sem hún er var framleidd í nokkrum litum, en hægt er að panta aðra liti, t.d. hvítan í sérpöntun.",
              shortDescription: "Hella er með klassískt útlit og stendur alltaf fyrir sínu. Hægt að velja um nokkrar stærðir og liti og tilvalið að blanda saman og skapa falleg mynstur.",
              price: { amount: 1122, unit: "stk", pricePerM2: 7008 },
              weight: "22.00 kg",
              sizes: ["40x40x6 cm"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Bílastæði/Hella",
              specs: {
                thickness: 6,
                features: ["Klassísk", "Fjölbreytt notkun"],
                customization: "Hægt að panta aðra liti í sérpöntun"
              },
              availability: true
            },
            {
              name: "Herragarðssteinn",
              sku: "26-141-Grátt-otromlad",
              description: "Herragarðssteinn hefur klassíska áferð og fjölmarga mynstur- og litamöguleika. Hann gefur umhverfinu virðuleika og hlýlegan blæ. Herragarðssteinn er án fösunar og því með skarpa kanta. Hægt er að fá steininn ótromlaðan, en þá er hann með sléttum köntum, eða tromlaðan, en þá eru brúnirnar núnar og ójafnar sem gefur annað útlit.",
              shortDescription: "Herragarðssteinn hefur klassíska áferð og fjölmarga mynstur- og litamöguleika. Hann gefur umhverfinu virðuleika og hlýlegan blæ. Herragarðssteinn hefur umhverfisyfirlýsingu (EPD).",
              price: { amount: 93, unit: "stk", pricePerM2: 9295 },
              weight: "1.50 kg",
              sizes: ["10x10x6 cm", "20x10x6 cm", "30x10x6 cm", "10x10x8 cm", "20x10x8 cm", "30x10x8 cm"],
              colors: ["Grár"],
              finishOptions: ["Ótromlaður", "Tromlaður"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Bílastæði/Herragarðssteinn",
              specs: {
                thickness: [6, 8],
                features: ["Klassísk áferð", "Fjölmargir mynstur- og litamöguleikar"],
                finishVariants: ["Ótromlaður (sléttar brúnir)", "Tromlaður (núnar og ójafnar brúnir)"],
                applications: ["Létt umferð og ýmis álagssvæði (8 cm þykkt)"]
              },
              availability: true
            },
            {
              name: "Jötunsteinn",
              sku: "25-830-Jarðb",
              description: "Jötunsteinn er sterkbyggður og er hugsaður fyrir margskonar álagssvæði, sérstaklega þar sem um bílaumferð er að ræða, t.d. í götur með léttri umferð, í hraðahindranir og ýmis álagssvæði hjá fyrirtækjum og stofnunum. Jötunsteinn fæst í þremur stærðum og er 8 cm þykkur. Það kemur vel út að taka nokkrar stærðir, jafnvel tvo til þrjá liti, og blanda saman til að fá fallegt mynstur.",
              shortDescription: "Jötunsteinn er sterkbyggður og er hugsaður fyrir margskonar álagssvæði.",
              price: { amount: 1062, unit: "stk", pricePerM2: 11794 },
              weight: "16.50 kg",
              sizes: ["30x30x8 cm", "20x20x8 cm", "10x10x8 cm"],
              colors: ["Jarðbrúnn", "Grár", "Svartur"],
              path: "Verslun/Hellur/Bílastæði/Jötunsteinn",
              specs: {
                thickness: 8,
                applications: ["Götur með léttri umferð", "Hraðahindranir", "Álagssvæði hjá fyrirtækjum og stofnunum"],
                features: ["Sterkbyggður", "Fjölbreytt mynsturmöguleikar"]
              },
              availability: true
            },
            {
              name: "Leiðnihellur",
              sku: "38-525-Rautt",
              description: "Leiðnihellur eru notaðar sem leiðarlínur í yfirborði hellulagnar. Þeim er ætlað að leiðbeina fólki um stefnu og auðvelda blindum og sjónskertum að rata um stór og opin svæði. Leiðnihellurnar fást í nokkrum litum og eru ávallt hafðar í öðrum lit heldur en nærliggjandi yfirborð.",
              shortDescription: "Leiðnihellur eru notaðar sem leiðarlínur í yfirborði hellulagnar. Þeim er ætlað að auðvelda blindum og sjónskertum að rata um stór og opin svæði.",
              price: { amount: 4735, unit: "stk" },
              weight: "15.00 kg",
              sizes: ["30x30x7 cm"],
              colors: ["Rauður"],
              path: "Verslun/Hellur/Bílastæði/Leiðnihellur",
              specs: {
                thickness: 7,
                applications: ["Leiðarlínur fyrir blinda og sjónskerta", "Stór og opin svæði"],
                accessibility: "Leiðbeinandi fyrir blinda og sjónskerta"
              },
              availability: true
            },
            {
              name: "Modena",
              sku: "25-610-Grátt",
              description: "Modena-hellurnar eru kunnugleg sjón um allt land, enda þrautreynt og hagkvæmt efni á verandir, sólpalla, stíga og gangstéttir. Hellurnar eru 6 cm þykkar og fást í þremur mismunandi stærðum og með fjarlægðarrákum sem auðvelda lögn og auka stöðugleika lagnarinnar. Hægt er að velja úr fjölbreyttu úrvali jafnþykkra steina í öðrum litum til að brjóta upp form og fleti lagnarinnar.",
              shortDescription: "Modena-hellurnar eru kunnugleg sjón um allt land, enda þrautreynt og hagkvæmt efni á verandir, sólpalla, stíga og gangstéttir.",
              price: { amount: 80, unit: "stk", pricePerM2: 8009 },
              weight: "1.50 kg",
              sizes: ["10x10x6 cm"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Bílastæði/Modena",
              specs: {
                thickness: 6,
                features: ["Fjarlægðarrákir sem auðvelda lögn", "Aukin stöðugleiki"],
                applications: ["Verandir", "Sólpallar", "Stígar", "Gangstéttir"]
              },
              availability: true
            },
            {
              name: "Óðalssteinn",
              sku: "26-110-Grátt-otromlad",
              description: "Óðalssteinn fær sérstaka meðhöndlun til að ná fram gömlu sígildu yfirbragði og veðruðu útliti. Óðalssteinn er eftirsóttur þar sem endurskapa á andrúmsloft liðinna tíma. Þess vegna hafa arkitektar og hönnuðir oft valið Óðalsstein við endurgerð sögulega mikilvægra svæða á borð við umhverfi Þingvallakirkju. Óðalssteinn kemur í þriggja steina kerfi og kemur í tveim þykktum, 6 cm þykkt og 8 cm þykkt.",
              shortDescription: "Óðalssteinn fær sérstaka meðhöndlun til að ná fram gömlu sígildu yfirbragði og veðruðu útliti.",
              price: { amount: 8753, unit: "m2" },
              weight: "135.00 kg",
              sizes: ["24x16x6 cm", "16x16x6 cm", "12x16x6 cm", "24x16x8 cm", "16x16x8 cm", "12x16x8 cm"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              finishOptions: ["Ótromlaður", "Tromlaður"],
              path: "Verslun/Hellur/Bílastæði/Óðalssteinn",
              specs: {
                thickness: [6, 8],
                features: ["Gamalt sígillt yfirbragð", "Veðrað útlit"],
                applications: ["Sögulega mikilvæg svæði", "Endurgerð svæða"],
                references: ["Umhverfi Þingvallakirkju"]
              },
              availability: true
            },
            {
              name: "Rómarsteinn",
              sku: "26-100-Grátt",
              description: "Rómarsteinn kemur í þriggja steina kerfi þar sem ólíkum stærðum er blandað saman til að fá skemmtilega hreyfingu í hellulögnina. Rómarsteinn er með slétt yfirborð og auðvelt að búa til einföld munstur í hellulögnina.",
              shortDescription: "Rómarsteinn er stílhreinn og auðvelt að búa til mynstur með honum þar sem hann kemur í þriggja steina kerfi. Rómarsteinn er með umhverfisyfirlýsingu (EPD).",
              price: { amount: 8410, unit: "m2" },
              weight: "135.00 kg",
              sizes: ["24x16x6 cm", "16x16x6 cm", "12x16x6 cm"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Bílastæði/Rómarsteinn",
              specs: {
                thickness: 6,
                features: ["Slétt yfirborð", "Þriggja steina kerfi"],
                pattern: "Skemmtileg hreyfing í hellulögn"
              },
              availability: true
            },
            {
              name: "Slitsterkur",
              sku: "25-831",
              description: "Slitsterkur er öflugur og ætlaður fyrir mikið þungaálag. Um er að ræða sérstaklega slitsterka hellu sem hentar vel fyrir götur með meðalþunga og þunga umferð. Slitsterkur fæst í tveimur stærðum og er vinsælt að blanda honum saman.",
              shortDescription: "Slitsterkur er öflugur og ætlaður fyrir mikið þungaálag.",
              price: { amount: 1125, unit: "stk", pricePerM2: 12499 },
              weight: "16.50 kg",
              sizes: ["30x30x8 cm", "20x10x10 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Bílastæði/Slitsterkur",
              specs: {
                thickness: [8, 10],
                applications: ["Götur með meðalþunga umferð", "Götur með þunga umferð"],
                features: ["Sérstaklega slitsterkur", "Þolir mikið þungaálag"]
              },
              availability: false
            },
            {
              name: "Veranda",
              sku: "24-760-Svart",
              description: "Veranda tvinnar saman stílhreinar útlínur og fjölbreytta litamöguleika. Stærð og lögun hellunnar hentar vel fyrir stærri fleti á borð við verandir og torg. Nýttu þér fjölbreytta litasamsetningu Veranda þar sem hver hella er tilbrigði við sama stef eða láttu einfaldleikann ráða með gráu og stílhreinu yfirborði.",
              shortDescription: "Veranda tvinnar saman stílhreinar útlínur og fjölbreytta litamöguleika.",
              price: { amount: 2808, unit: "stk", pricePerM2: 11680 },
              weight: "39.50 kg",
              sizes: ["60x40x7 cm"],
              colors: ["Svartur", "Grár"],
              path: "Verslun/Hellur/Bílastæði/Veranda",
              specs: {
                thickness: 7,
                applications: ["Verandir", "Torg", "Stærri fletir"],
                features: ["Stílhreinar útlínur", "Fjölbreyttir litamöguleikar"]
              },
              availability: true
            }
          ]
        },
        // KANTSTEINAR (Edge stones)
        kantsteinar: {
          name: "Kantsteinar",
          description: "Kantsteinar til afmörkunar og frágangs við hellulagnir.",
          path: "Verslun/Hellur/Kantsteinar",
          products: [
            {
              name: "Borgarkantsteinn",
              sku: "32-080-Grátt",
              description: "Borgarkantsteinn hentar vel til afmörkunar á steinlögnum, gangstígum og götum. Vinsælt er að raða Borgarkantstein til að ramma inn gróður og blóm.",
              shortDescription: "Borgarkantsteinn hentar vel til afmörkunar á steinlögnum, gangstígum og götum.",
              price: { amount: 4961, unit: "stk" },
              weight: "60.00 kg",
              sizes: ["80x12x25 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Kantsteinar/Borgarkantsteinn",
              specs: {
                dimensions: {
                  length: 80,
                  height: 25,
                  thickness: 12
                },
                applications: ["Afmörkun á steinlögnum", "Afmörkun á gangstígum", "Afmörkun á götum", "Afmörkun á gróðri og blómum"]
              },
              availability: true
            },
            {
              name: "Borgarkantsteinn | Úthorn",
              sku: "32-089",
              description: "Hægt er að fá úthorn með 90° horni sem eru hönnuð sérstaklega fyrir Borgarkantsteina. Úthornin eru afar hentug til að ramma inn horn á kantsteininum og gefa fallegan og sterkan frágang. Þau henta vel fyrir ferningslaga svæði eða þar sem þörf er á beygjum í kantsteinana, til að tryggja varanlega vörn og nákvæmar línur.",
              shortDescription: "Úthorn sem er ætlað fyrir Borgarkantstein til að ramma inn svæðið með 90° beygju.",
              price: { amount: 9322, unit: "stk" },
              weight: "68.00 kg",
              path: "Verslun/Hellur/Kantsteinar/Borgarkantsteinn | Úthorn",
              specs: {
                angle: "90°",
                compatibility: "Borgarkantsteinn",
                applications: ["Horn á ferningslaga svæðum", "Beygjur í kantsteinum"]
              },
              availability: false
            },
            {
              name: "Garðakantsteinn",
              sku: "32-050-Grátt",
              description: "Garðakantsteinn er tilvalinn til afmörkunar á smærri svæðum svo sem blómabeðum og göngustígum. Garðakantsteinn er 50 cm langur og hægt er að fá stein í endann til að mynda 90° horn.",
              shortDescription: "Garðakantsteinn er tilvalinn til afmörkunar á smærri svæðum svo sem blómabeðum og göngustígum.",
              price: { amount: 3411, unit: "stk" },
              weight: "27.00 kg",
              sizes: ["50x25x9 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Kantsteinar/Garðakantsteinn",
              specs: {
                dimensions: {
                  length: 50,
                  height: 25,
                  thickness: 9
                },
                applications: ["Afmörkun á blómabeðum", "Afmörkun á göngustígum"],
                accessories: "Hægt að fá stein í endann til að mynda 90° horn"
              },
              availability: true
            },
            {
              name: "Niðurfallsrist",
              sku: "21-151",
              description: "Rist til að setja í yfirföllin og niðurfall. Kemur í tveimur afbrigðum, annars vegar rist fyrir Óðalsstein og hins vegar fyrir Rennustein. Með ristinni þarf að kaupa niðurfallskarm.",
              shortDescription: "Rist til að setja í yfirföllin og niðurfall. Kemur í tveimur afbrigðum, annars vegar rist fyrir Óðalsstein og hins vegar fyrir Rennustein.",
              price: { amount: 7756, unit: "stk" },
              sizes: ["200x300 mm"],
              variants: ["Rist f. Rennustein", "Rist f. Óðalsstein"],
              path: "Verslun/Hellur/Kantsteinar/Niðurfallsrist",
              specs: {
                material: "Steypujárn",
                dimensions: "200x300 mm",
                drainPipeDiameter: "150 mm",
                accessories: {
                  rennusteinnFrame: "19x29 cm | 100 mm stútur",
                  odalssteinnFrame: "19x29 cm | 150 mm stútur"
                }
              },
              availability: true
            },
            {
              name: "Rennusteinn",
              sku: "25-801-Grátt",
              description: "Rennusteinn er notaður til að taka á móti ofanvatni af göngustígum og akstursleiðum.",
              shortDescription: "Rennusteinn er notaður til að taka á móti ofanvatni af göngustígum og akstursleiðum.",
              price: { amount: 1256, unit: "stk", pricePerM2: 1255 },
              weight: "7.00 kg",
              sizes: ["20x20x8 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Kantsteinar/Rennusteinn",
              specs: {
                thickness: 8,
                applications: ["Ofanvatnsmeðhöndlun", "Vatnsfrárennsli á göngustígum", "Vatnsfrárennsli á akstursleiðum"]
              },
              availability: true
            },
            {
              name: "Samsetningarkubbur",
              sku: "21-855",
              price: { amount: 128, unit: "stk" },
              path: "Verslun/Hellur/Kantsteinar/Samsetningarkubbur",
              availability: true
            },
            {
              name: "Strætókantsteinn",
              sku: "32-081",
              description: "Strætókantsteinn er sérhannaður kantsteinn sem er settur til afmörkunar við biðskýli strætisvagna og áætlunarbifreiða. Hann er bæði hærri og þykkri heldur en hefðbundnir kantsteinar og gerður til að þola mikið álag.",
              shortDescription: "Strætókantsteinn er sérhannaður kantsteinn sem er settur til afmörkunar við biðskýli strætisvagna og áætlunarbifreiða.",
              price: { amount: 18714, unit: "stk" },
              weight: "144.00 kg",
              sizes: ["100x30x20 cm"],
              path: "Verslun/Hellur/Kantsteinar/Strætókantsteinn",
              specs: {
                dimensions: {
                  length: 100,
                  height: 30,
                  width: 20
                },
                features: ["Hærri og þykkri en hefðbundnir kantsteinar", "Þolir mikið álag"],
                applications: ["Biðskýli strætisvagna", "Biðskýli áætlunarbifreiða"]
              },
              availability: true
            },
            {
              name: "Umferðarkantsteinn | Umferðartálmi | Þríkantsteinn",
              sku: "25-802-Grátt",
              description: "Kantsteinar eru til í fjölbreyttum útgáfum svo mögulegt er að leggja þá á marga mismunandi vegu og hentar því vel þegar þarf að brúa bilið á milli upphækkaðra svæða.",
              shortDescription: "Kantsteinar eru til í fjölbreyttum útgáfum svo mögulegt er að leggja þá á marga mismunandi vegu og hentar því vel þegar þarf að brúa bilið á milli upphækkaðra svæða.",
              price: { amount: 1267, unit: "stk" },
              weight: "7.00 kg",
              variants: [
                { name: "Umferðarkantsteinn | Umferðartálmi", size: "20x20x8 cm" },
                { name: "Þríkantsteinn", size: "16x16x20 cm" }
              ],
              colors: ["Grár"],
              path: "Verslun/Hellur/Kantsteinar/Umferðarkantsteinn | Umferðartálmi | Þríkantsteinn",
              availability: true
            }
          ]
        },
        // STÍGUR (Paths)
        stigur: {
          name: "Stígur",
          description: "Hellur fyrir stíga og gönguleiðir.",
          path: "Verslun/Hellur/Stígur",
          products: [
            {
              name: "Flekar",
              sku: "37-057-Grátt",
              description: "Fleki fæst í mismunandi stærðum og hentar sérstaklega vel þar sem sóst er eftir stílhreinu og einföldu formi. Flekar eru tilvaldir til að lífga upp á gönguleiðir í garðinum en einnig er hægt að nota þá með öðrum hellum og fá fallegt munstur í hellulögnina.",
              shortDescription: "Fleki fæst í mismunandi stærðum og er tilvalinn í gönguleiðir eða til að nota með öðrum hellum.",
              price: { amount: 17994, unit: "stk" },
              weight: "124.00 kg",
              sizes: ["80x80x8 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Stígur/Flekar",
              specs: {
                thickness: 8,
                features: ["Stílhreint og einfalt form"],
                applications: ["Gönguleiðir í garðinum", "Til að lífga upp gönguleiðir"],
                customization: "Hægt að fá fleiri liti í sérpöntun"
              },
              availability: true
            },
            {
              name: "Hringstikla",
              sku: "37-045-Grátt",
              description: "Hringstikla setur punktinn yfir i-ið í gönguleiðinni í garðinum og vísar réttu leiðina. Hringstiklan er með slétt yfirbragð og eru þær stundum teknar tvær saman til að vera hlið við hlið, en þær geta líka staðið stakar. Hægt er að fá hringstiklu með gati sem nýtist t.d. þegar draga þarf rafmagnsleiðslur upp úr jörðinni.",
              shortDescription: "Hringstikla fegrar gönguleiðina í garðinum og setur punktinn yfir i-ið á svæðinu.",
              price: { amount: 3969, unit: "stk" },
              weight: "20.00 kg",
              variants: ["Heil", "Með gati"],
              sizes: ["Þvermál: 45 cm, Þykkt: 7 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Stígur/Hringstikla",
              specs: {
                dimensions: {
                  diameter: 45,
                  thickness: 7
                },
                features: ["Slétt yfirbragð", "Hægt að fá með gati fyrir rafmagnsleiðslur"],
                applications: ["Gönguleiðir í garðinum", "Leiðarvísir"],
                customization: "Hægt að fá fleiri liti í sérpöntun t.d. svartan eða jarðbrúnan"
              },
              availability: true
            },
            {
              name: "Japönsk stikla",
              sku: "29-190-Patín",
              description: "Japönsk stikla líkir eftir formi náttúrulegra steinhellna og lífgar upp á gönguleiðir í garðinum. Stiklurnar koma í blönduðum stærðum.",
              shortDescription: "Japönsk stikla líkir eftir formi náttúrulegra steinhellna og lífgar upp á gönguleiðir í garðinum.",
              price: { amount: 5141, unit: "stk" },
              weight: "14.00 kg",
              sizes: ["Blandaðar stærðir | Þykkt: 4 cm"],
              path: "Verslun/Hellur/Stígur/Japönsk stikla",
              specs: {
                thickness: 4,
                features: ["Líkir eftir náttúrulegum steinhellum"],
                applications: ["Gönguleiðir í garðinum"],
                customization: "Hægt að fá feiri liti í sérpöntun eins og svartan og jarðbrúnan"
              },
              availability: true
            }
          ]
        },
        // HLEÐSLU- OG STOÐVEGGIR (Retaining walls)
        hledsluOgStodveggir: {
          name: "Hleðslu- og stoðveggir",
          description: "Steinar og einingar fyrir hleðslu- og stoðveggi.",
          path: "Verslun/Hellur/Hleðslu- og stoðveggir",
          products: [
            {
              name: "Hamar | Stoðveggur | 100x120 cm",
              sku: "30-120-Grátt",
              description: "Nýir steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og opin svæði. Veggirnir eru fáanlegir í sex mismunandi stærðum sem gera þá fullkomna til að jafna út hæðarmismun í landslagi eða bæta garðhönnun. Einnig er hægt að fá 90° horn sem eykur enn frekar á notkunarmöguleika og leyfir fjölbreyttari útfærslur. Með nýrri og endurbættri hönnun er uppsetning á stoðveggjunum auðveldari og fljótlegri.",
              shortDescription: "Ný hönnun! Steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og útivistarsvæði. Fást í sex mismunandi stærðum.",
              price: { amount: 74660, unit: "stk" },
              weight: "530.00 kg",
              dimensions: { width: 100, height: 120 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Hamar | Stoðveggur | 100x120 cm",
              specs: {
                sizes: [
                  "100 cm breidd x 60 cm hæð",
                  "100 cm breidd x 90 cm hæð",
                  "100 cm breidd x 120 cm hæð",
                  "200 cm breidd x 60 cm hæð",
                  "200 cm breidd x 90 cm hæð",
                  "200 cm breidd x 120 cm hæð"
                ],
                features: [
                  "Slétt steinsteypuáferð báðum megin",
                  "Útlit eins að framan og aftan",
                  "Auðveld og fljótleg uppsetning"
                ],
                installationOptions: [
                  "Festir saman með vinklum/boltum fyrir jarðvegsþrýsting",
                  "Festir saman með hraðþenslumúr fyrir skjólgirðingu/afmörkun"
                ],
                applications: ["Jafna út hæðarmismun í landslagi", "Bæta garðhönnun"]
              },
              availability: false
            },
            {
              name: "Hamar | Stoðveggur | 100x60 cm",
              sku: "30-060-Grátt",
              description: "Nýir steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og opin svæði. Veggirnir eru fáanlegir í sex mismunandi stærðum sem gera þá fullkomna til að jafna út hæðarmismun í landslagi eða bæta garðhönnun. Einnig er hægt að fá 90° horn sem eykur enn frekar á notkunarmöguleika og leyfir fjölbreyttari útfærslur. Með nýrri og endurbættri hönnun er uppsetning á stoðveggjunum auðveldari og fljótlegri.",
              shortDescription: "Ný hönnun! Steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og útivistarsvæði. Fást í sex mismunandi stærðum.",
              price: { amount: 46358, unit: "stk" },
              weight: "270.00 kg",
              dimensions: { width: 100, height: 60 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Hamar | Stoðveggur | 100x60 cm",
              specs: {
                sizes: [
                  "100 cm breidd x 60 cm hæð",
                  "100 cm breidd x 90 cm hæð",
                  "100 cm breidd x 120 cm hæð",
                  "200 cm breidd x 60 cm hæð",
                  "200 cm breidd x 90 cm hæð",
                  "200 cm breidd x 120 cm hæð"
                ],
                features: [
                  "Slétt steinsteypuáferð báðum megin",
                  "Útlit eins að framan og aftan",
                  "Auðveld og fljótleg uppsetning"
                ],
                installationOptions: [
                  "Festir saman með vinklum/boltum fyrir jarðvegsþrýsting",
                  "Festir saman með hraðþenslumúr fyrir skjólgirðingu/afmörkun"
                ],
                applications: ["Jafna út hæðarmismun í landslagi", "Bæta garðhönnun"]
              },
              availability: false
            },
            {
              name: "Hamar | Stoðveggur | 100x90 cm",
              sku: "30-090-Grátt",
              description: "Nýir steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og opin svæði. Veggirnir eru fáanlegir í sex mismunandi stærðum sem gera þá fullkomna til að jafna út hæðarmismun í landslagi eða bæta garðhönnun. Einnig er hægt að fá 90° horn sem eykur enn frekar á notkunarmöguleika og leyfir fjölbreyttari útfærslur. Með nýrri og endurbættri hönnun er uppsetning á stoðveggjunum auðveldari og fljótlegri.",
              shortDescription: "Ný hönnun! Steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og útivistarsvæði. Fást í sex mismunandi stærðum.",
              price: { amount: 59729, unit: "stk" },
              weight: "400.00 kg",
              dimensions: { width: 100, height: 90 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Hamar | Stoðveggur | 100x90 cm",
              specs: {
                sizes: [
                  "100 cm breidd x 60 cm hæð",
                  "100 cm breidd x 90 cm hæð",
                  "100 cm breidd x 120 cm hæð",
                  "200 cm breidd x 60 cm hæð",
                  "200 cm breidd x 90 cm hæð",
                  "200 cm breidd x 120 cm hæð"
                ],
                features: [
                  "Slétt steinsteypuáferð báðum megin",
                  "Útlit eins að framan og aftan",
                  "Auðveld og fljótleg uppsetning"
                ],
                installationOptions: [
                  "Festir saman með vinklum/boltum fyrir jarðvegsþrýsting",
                  "Festir saman með hraðþenslumúr fyrir skjólgirðingu/afmörkun"
                ],
                applications: ["Jafna út hæðarmismun í landslagi", "Bæta garðhönnun"]
              },
              availability: false
            },
            {
              name: "Kastalasteinn",
              sku: "26-190-Grátt",
              description: "Kastalasteinn er áferðarfallegur hleðslusteinn sem býður upp á mikla fjölbreytni. Steinninn kemur í tveimur stærðum og er með brotáferð báðum megin, sem gefur hleðslunni virðuleika. Sérstakur endasteinn lokar endum. Brotáferð báðum megin gefur möguleika á frístandandi hleðslum. Sérstakir samsetningarkubbar auðvelda uppsetningu og nákvæmni við hana. Kastalasteinn kemur heill frá framleiðanda og í tveggja steina einingum sem þarf að brjóta á verkstað.",
              shortDescription: "Kastalasteinn er áferðarfallegur hleðslusteinn sem býður upp á mikla fjölbreytni.",
              price: { amount: 1161, unit: "stk" },
              weight: "30.00 kg",
              sizes: ["24x30x16 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Kastalasteinn",
              specs: {
                dimensions: {
                  height: 24,
                  width: 30,
                  thickness: 16
                },
                features: [
                  "Áferðarfallegur hleðslusteinn",
                  "Brotáferð báðum megin",
                  "Gefur möguleika á frístandandi hleðslum"
                ],
                accessories: [
                  "Sérstakur endasteinn", 
                  "Kastalahatt", 
                  "Samsetningarkubbar"
                ],
                assembly: "Kemur heill frá framleiðanda og í tveggja steina einingum sem þarf að brjóta á verkstað"
              },
              availability: true
            },
            {
              name: "Klettur | Stoðveggur | 200x120 cm",
              sku: "30-122-Grátt",
              description: "Nýir steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og opin svæði. Veggirnir eru fáanlegir í sex mismunandi stærðum sem gera þá fullkomna til að jafna út hæðarmismun í landslagi eða bæta garðhönnun. Einnig er hægt að fá 90° horn sem eykur enn frekar á notkunarmöguleika og leyfir fjölbreyttari útfærslur. Með nýrri og endurbættri hönnun er uppsetning á stoðveggjunum auðveldari og fljótlegri.",
              shortDescription: "Ný hönnun! Steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og útivistarsvæði. Fást í sex mismunandi stærðum.",
              price: { amount: 149320, unit: "stk" },
              weight: "1060.00 kg",
              dimensions: { width: 200, height: 120 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Klettur | Stoðveggur | 200x120 cm",
              specs: {
                sizes: [
                  "100 cm breidd x 60 cm hæð",
                  "100 cm breidd x 90 cm hæð",
                  "100 cm breidd x 120 cm hæð",
                  "200 cm breidd x 60 cm hæð",
                  "200 cm breidd x 90 cm hæð",
                  "200 cm breidd x 120 cm hæð"
                ],
                features: [
                  "Slétt steinsteypuáferð báðum megin",
                  "Útlit eins að framan og aftan",
                  "Auðveld og fljótleg uppsetning"
                ],
                installationOptions: [
                  "Festir saman með vinklum/boltum fyrir jarðvegsþrýsting",
                  "Festir saman með hraðþenslumúr fyrir skjólgirðingu/afmörkun"
                ],
                applications: ["Jafna út hæðarmismun í landslagi", "Bæta garðhönnun"]
              },
              availability: false
            },
            {
              name: "Klettur | Stoðveggur | 200x60 cm",
              sku: "30-062-Grátt",
              description: "Nýir steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og opin svæði. Veggirnir eru fáanlegir í sex mismunandi stærðum sem gera þá fullkomna til að jafna út hæðarmismun í landslagi eða bæta garðhönnun. Einnig er hægt að fá 90° horn sem eykur enn frekar á notkunarmöguleika og leyfir fjölbreyttari útfærslur. Með nýrri og endurbættri hönnun er uppsetning á stoðveggjunum auðveldari og fljótlegri.",
              shortDescription: "Ný hönnun! Steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og útivistarsvæði. Fást í sex mismunandi stærðum.",
              price: { amount: 92717, unit: "stk" },
              weight: "550.00 kg",
              dimensions: { width: 200, height: 60 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Klettur | Stoðveggur | 200x60 cm",
              specs: {
                sizes: [
                  "100 cm breidd x 60 cm hæð",
                  "100 cm breidd x 90 cm hæð",
                  "100 cm breidd x 120 cm hæð",
                  "200 cm breidd x 60 cm hæð",
                  "200 cm breidd x 90 cm hæð",
                  "200 cm breidd x 120 cm hæð"
                ],
                features: [
                  "Slétt steinsteypuáferð báðum megin",
                  "Útlit eins að framan og aftan",
                  "Auðveld og fljótleg uppsetning"
                ],
                installationOptions: [
                  "Festir saman með vinklum/boltum fyrir jarðvegsþrýsting",
                  "Festir saman með hraðþenslumúr fyrir skjólgirðingu/afmörkun"
                ],
                applications: ["Jafna út hæðarmismun í landslagi", "Bæta garðhönnun"]
              },
              availability: false
            },
            {
              name: "Klettur | Stoðveggur | 200x90 cm",
              sku: "30-092-Grátt",
              description: "Nýir steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og opin svæði. Veggirnir eru fáanlegir í sex mismunandi stærðum sem gera þá fullkomna til að jafna út hæðarmismun í landslagi eða bæta garðhönnun. Einnig er hægt að fá 90° horn sem eykur enn frekar á notkunarmöguleika og leyfir fjölbreyttari útfærslur. Með nýrri og endurbættri hönnun er uppsetning á stoðveggjunum auðveldari og fljótlegri.",
              shortDescription: "Ný hönnun! Steyptir stoðveggir frá BM Vallá eru snjöll, stílhrein og hentug lausn fyrir garða og útivistarsvæði. Fást í sex mismunandi stærðum.",
              price: { amount: 119459, unit: "stk" },
              weight: "800.00 kg",
              dimensions: { width: 200, height: 90 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Klettur | Stoðveggur | 200x90 cm",
              specs: {
                sizes: [
                  "100 cm breidd x 60 cm hæð",
                  "100 cm breidd x 90 cm hæð",
                  "100 cm breidd x 120 cm hæð",
                  "200 cm breidd x 60 cm hæð",
                  "200 cm breidd x 90 cm hæð",
                  "200 cm breidd x 120 cm hæð"
                ],
                features: [
                  "Slétt steinsteypuáferð báðum megin",
                  "Útlit eins að framan og aftan",
                  "Auðveld og fljótleg uppsetning"
                ],
                installationOptions: [
                  "Festir saman með vinklum/boltum fyrir jarðvegsþrýsting",
                  "Festir saman með hraðþenslumúr fyrir skjólgirðingu/afmörkun"
                ],
                applications: ["Jafna út hæðarmismun í landslagi", "Bæta garðhönnun"]
              },
              availability: false
            },
            {
              name: "Máttur | Rafhleðslustaur | 40x90cm",
              sku: "31-091-m/gati",
              description: "Steyptu rafhleðslustaurarnir frá BM Vallá eru sérhannaðir fyrir rafhleðslustöðvar sem þurfa að standa frístandandi á bílastæðum við heimili eða fyrirtæki. Til að setja staurinn upp þarf að grafa fyrir undirstöðunum og koma honum fyrir í jarðvegi (sjá nánar í leiðbeiningaskjali). Staurarnir eru traustir og stöðugir, og sjást vel út um glugga bílsins, sem dregur úr áhættu á að ekið verði á hann. Slétta steypuáferðin á báðum hliðum hans skapar samræmt og stílhreint útlit ásamt því að staurinn er með gati fyrir rafhleðslustöðina.",
              shortDescription: "Ný hönnun! Rafhleðslustaur með gati fyrir rafhleðslustöðvar. Staurarnir eru traustir og stöðugir sem dregur úr áhættu á að keyrt sé á stöðina.",
              price: { amount: 34166, unit: "stk" },
              weight: "156.00 kg",
              dimensions: { width: 40, height: 90 },
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Máttur | Rafhleðslustaur | 40x90cm",
              specs: {
                dimensions: {
                  width: 40,
                  height: 90
                },
                features: [
                  "Sérhannað gat fyrir rafhleðslustöð",
                  "Traustur og stöðugur",
                  "Slétt steypuáferð á báðum hliðum",
                  "Sýnilegur úr bíl sem minnkar áhættu á áakstri"
                ],
                applications: ["Rafhleðslustöðvar á bílastæðum heimila", "Rafhleðslustöðvar á bílastæðum fyrirtækja"],
                installation: "Þarf að grafa fyrir undirstöðum og koma fyrir í jarðvegi samkvæmt leiðbeiningum"
              },
              availability: true
            },
            {
              name: "Óðalshleðslusteinn",
              sku: "26-135-Grátt-otromlad",
              description: "Óðalshleðslusteinn myndar glæsilegar hleðslur sem auðvelt er að laga að umhverfinu, svo sem frístandandi veggi, upphækkuð blómabeð eða stoðveggi. Steininn er hægt að nota í bogadregnar eða beinar hleðslur með hornum eða innfellingum. Við mælum með því að líma með steinlími eða múra á milli og styrkja hleðsluna á bakvið. Sérstakir samsetningarkubbar læsa hleðslunni sem er auðveld og fljótleg aðferð.",
              shortDescription: "Óðalshleðslusteinn myndar glæsilegar hleðslur sem auðvelt er að laga að umhverfinu, svo sem frístandandi veggi, upphækkuð blómabeð eða stoðveggi.",
              price: { amount: 1161, unit: "stk" },
              weight: "15.00 kg",
              sizes: ["24x18x16 cm", "36x18x16 cm"],
              finishOptions: ["Ótromlaður"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Óðalshleðslusteinn",
              specs: {
                dimensions: [
                  { length: 24, width: 18, thickness: 16 },
                  { length: 36, width: 18, thickness: 16 }
                ],
                features: ["Glæsilegar hleðslur", "Auðvelt að laga að umhverfinu"],
                applications: ["Frístandandi veggir", "Upphækkuð blómabeð", "Stoðveggir"],
                installationMethod: "Líma með steinlími eða múra á milli og styrkja hleðsluna á bakvið",
                accessories: ["Óðalstoppur", "Samsetningarkubbar"]
              },
              availability: true
            },
            {
              name: "Óðalskantsteinn",
              sku: "26-130-Grátt-otromlad",
              description: "Óðalskantsteinn setur glæsilegan lokapunkt á margs konar steinlagnir úr óðalssteini. Hann má nota til að afmarka blómabeð eða útbúa tröppur af ýmsum stærðum og gerðum. Steinninn fer vel með flestum hellutegundum, en passar einstaklega vel með Vínarsteini eða Fornsteini. Óðalskantstein er hægt að nota til að útbúa lág blómabeð og lága veggi þar sem ekki er mikill jarðvegsþrýstingur. Hægt er að fá Óðalskantstein með sléttum (ótromlaður) eða tromlaðan, en þá eru brúnirnar núnar og ójafnar sem gefur annað útlit.",
              shortDescription: "Óðalskantsteinn setur glæsilegan lokapunkt á margs konar steinlagnir, en einnig má nota hann til að afmarka blómabeð eða búa til þrep.",
              price: { amount: 947, unit: "stk" },
              weight: "12.00 kg",
              sizes: ["24x13x16 cm"],
              finishOptions: ["Ótromlaður", "Tromlaður"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Óðalskantsteinn",
              specs: {
                dimensions: {
                  length: 24,
                  height: 13,
                  thickness: 16
                },
                applications: [
                  "Lokapunktur á steinlagnir", 
                  "Afmörkun á blómabeðum", 
                  "Útbúa tröppur", 
                  "Lágir veggir þar sem ekki er mikill jarðvegsþrýstingur"
                ],
                compatibility: ["Vínarsteinn", "Fornsteinn", "Flestar hellutegundir"],
                finishVariants: ["Ótromlaður (sléttur)", "Tromlaður (núnar og ójafnar brúnir)"]
              },
              availability: true
            },
            {
              name: "Óðalstoppur",
              sku: "26-132-Grátt-tromlad",
              description: "Óðalstoppur myndar efstu hleðsluna í Óðalshleðslusteini og kemur hann án samsetningargata. Hann setur því punktinn yfir i-ið þegar kemur að glæsilegum hleðsluvegg gerðum úr Óðalshleðslusteini. Það er auðvelt er að laga hleðsluna að umhverfinu, t.d. fyrir frístandandi veggi, upphækkuð blómabeð eða stoðveggi. Steininn er hægt að nota í bogadregnar eða beinar hleðslur með hornum eða innfellingum.",
              shortDescription: "Óðalstoppur myndar efstu hleðsluna í Óðalshleðslusteini og kemur hann án samsetningargata.",
              price: { amount: 1742, unit: "stk" },
              weight: "22.50 kg",
              sizes: ["36x18x16 cm", "24x18x16 cm"],
              finishOptions: ["Tromlaður", "Ótromlaður"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Óðalstoppur",
              specs: {
                dimensions: [
                  { length: 36, width: 18, thickness: 16 },
                  { length: 24, width: 18, thickness: 16 }
                ],
                features: ["Án samsetningargata", "Fyrir efstu hleðslu"],
                applications: ["Frístandandi veggir", "Upphækkuð blómabeð", "Stoðveggir"],
                installationMethod: "Líma með steinlími eða múra á milli og styrkja hleðsluna á bakvið"
              },
              availability: true
            },
            {
              name: "Óðalströppusteinn",
              sku: "26-133-Grátt-otromlad",
              description: "Óðalströppusteinn er stærsti steinninn í óðals-fjölskyldunni. Hann er meðhöndlaður til að gefa þrepum og hleðslum úr ýmsum gerðum steina voldugan og virðulegan svip. Hægt er að fá Óðalströppusteininn ótromlaðan, en þá er hann með sléttum köntum, eða tromlaðan, en þá eru brúnirnar núnar og ójafnar sem gefur annað útlit.",
              shortDescription: "Óðalströppusteinn gefur þrepum og hleðslum úr ýmsum gerðum steina voldugan og virðulegan svip.",
              price: { amount: 3070, unit: "stk" },
              weight: "38.00 kg",
              sizes: ["40x24x17 cm"],
              finishOptions: ["Ótromlaður", "Tromlaður"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Óðalströppusteinn",
              specs: {
                dimensions: {
                  length: 40,
                  height: 24,
                  thickness: 17
                },
                features: ["Stærsti steinninn í óðals-fjölskyldunni", "Voldugt og virðulegt útlit"],
                finishVariants: ["Ótromlaður (sléttir kantar)", "Tromlaður (núnar og ójafnar brúnir)"],
                applications: ["Þrep", "Hleðslur"]
              },
              availability: true
            },
            {
              name: "Vegghleðslusteinn | Steyptur",
              sku: "38-452",
              description: "Steyptir vegghleðslusteinar frá BM Vallá eru sterkir og stöðugir og bjóða upp á fjölbreytta notkun. Hægt er að raða þeim upp að vild, hafa þá staka eða með öðrum byggingarefnum, til dæmis í skjólveggi, skilrúm eða geymslu fyrir vélar, hey, jarðveg og margt fleira. Hægt er að fá veggleðslusteinana í tveimur stærðum og einnig fæst sérstakur toppsteinn sem er sléttur að ofanverðu.",
              shortDescription: "Steyptir vegghleðslusteinar frá BM Vallá eru sterkir og stöðugir og bjóða upp á fjölbreytta notkun. Kubbarnir eru hannaðir í anda sjálfbærnisjónarmiða og eru steyptir úr afgangssteypu sem annars myndi falla til.",
              price: { amount: 39066, unit: "stk" },
              weight: "2400.00 kg",
              variants: ["Undirsteinn - heill", "Undirsteinn - hálfur", "Topphleðslusteinn"],
              path: "Verslun/Hellur/Hleðslu- og stoðveggir/Vegghleðslusteinn | Steyptur",
              specs: {
                sizes: [
                  "Heill vegghleðslusteinn (undirsteinn): 80 x 80 x 160 cm",
                  "Hálfur vegghleðslusteinn (undirsteinn): 80 x 80 x 80 cm",
                  "Topphleðslusteinn: 80 x 80 x 160 cm"
                ],
                features: ["Sterkir og stöðugir", "Bjóða upp á fjölbreytta notkun"],
                applications: ["Skjólveggir", "Skilrúm", "Geymsla fyrir vélar", "Geymsla fyrir hey", "Geymsla fyrir jarðveg"],
                environmentalBenefits: "Hannaðir í anda sjálfbærnisjónarmiða og steyptir úr afgangssteypu sem annars myndi falla til"
              },
              availability: true
            }
          ]
        },
        // FORNSTEINN category
        fornsteinn: {
          name: "Fornsteinn",
          path: "Verslun/Hellur/Fornsteinn",
          products: [
            {
              name: "Fornsteinn",
              sku: "26-033-Grátt",
              description: "Fornsteinn kemur í fimm steina kerfi sem býður upp á fjölbreytt mynstur. Auðvelt er að blanda saman nokkrum litum og með því að bæta Fornsteinsfleyg við er hægt að búa til hring- eða blævangsmynstur og átthyrninga sem gefur skemmtilegt útlit og brýtur upp svæðið. Fornsteinn kemur í tveimur þykktum, 6 cm og 8 cm. Einnig er hægt að sérpanta hann slitsterkan, t.d. fyrir mjög þunga umferð.",
              shortDescription: "Fornsteinn kemur í fimm steina kerfi sem býður upp á fjölbreytt mynstur sem gefur innkeyrslum og veröndum léttleika og stílhreint útlit. Fornsteinn er með umhverfisyfirlýsingu (EPD).",
              price: { amount: 8551, unit: "m2" },
              weight: "135.00 kg",
              sizes: [
                "21,8×10,9 cm | þykkt 6 cm | 8 cm",
                "18,8×10,9 cm | þykkt 6 cm | 8 cm",
                "16,2×10,9 cm | þykkt 6 cm | 8 cm",
                "13,8×10,9 cm | þykkt 6 cm | 8 cm",
                "10,9×10,9 cm | þykkt 6 cm | 8 cm"
              ],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Fornsteinn",
              specs: {
                thickness: [6, 8],
                pattern: "Fimm steina kerfi sem býður upp á fjölbreytt mynstur",
                features: ["Fjölbreytt mynsturmöguleikar", "Hægt að blanda saman litum"],
                accessories: "Fornsteinsfleygur til að búa til hring- eða blævangsmynstur og átthyrninga",
                customization: "Hægt að sérpanta slitsterkan fyrir mjög þunga umferð"
              },
              availability: true
            },
            {
              name: "Fornsteinsfleygur",
              sku: "26-036-Svart",
              description: "Fornsteinsfleygur er notaður þegar leggja á hringmynstur, blævængsmynstur eða sex- og átthyrninga með Fornsteini.",
              shortDescription: "Fornsteinsfleygur leysir hringmynstur í hellulögninni auðveldlega. Fornsteinsfleygur kemur í 6 cm þykkt og er með umhverfisyfirlýsingu (EPD).",
              price: { amount: 205, unit: "stk" },
              weight: "1.20 kg",
              sizes: ["6 cm þykkt"],
              colors: ["Svartur"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Fornsteinsfleygur",
              specs: {
                thickness: 6,
                applications: ["Hringmynstur", "Blævængsmynstur", "Sex- og átthyrninga með Fornsteini"]
              },
              availability: true
            }
          ]
        },
        // MAGNUM HLEÐSLUSTEINN category
        magnumHledslusteinn: {
          name: "Magnum hleðslusteinn",
          path: "Verslun/Hellur/Magnum hleðslusteinn",
          products: [
            {
              name: "Magnum hleðslusteinn",
              sku: "33-300-Grár",
              description: "Magnum hleðslusteinn er hleðslueiningakerfi sem raðast saman á snjallan og einfaldan hátt. Steinarnir eru holir að innan, sem sparar mikla steypu í framleiðslu, án þess að það komi niður á stöðugleika eða endingu, en minni steypa minnkar um leið kolefnissporið. Magnum hleðslusteina þarf að hlaða með vélarafli, þeir henta mjög vel í stoðveggi og \"grjótgarða\" og þá má auðveldlega hlaða hátt með akkerisstyrkingu. Gróf og stórgerð áferðin minnir á náttúrulegan klettavegg.",
              shortDescription: "Magnum hleðslusteinn er glæsilegt og tilkomumikið hleðslueiningakerfi sem raðast saman á snjallan og einfaldan hátt.",
              price: { amount: 35795, unit: "stk" },
              weight: "621.00 kg",
              sizes: ["121x61x61 cm", "121,9×30,5 cm | dýpt 60.9 cm"],
              colors: ["Grár"],
              path: "Verslun/Hellur/Magnum hleðslusteinn",
              specs: {
                dimensions: [
                  { length: 121.9, width: 60.9, depth: 60.9 },
                  { length: 121.9, width: 30.5, depth: 60.9 }
                ],
                features: [
                  "Holir að innan", 
                  "Sparar steypu í framleiðslu", 
                  "Minnkar kolefnisspor", 
                  "Stöðugt og endingargott",
                  "Gróf og stórgerð áferð sem minnir á náttúrulegan klettavegg"
                ],
                applications: ["Stoðveggir", "Grjótgarðar"],
                installation: "Þarf að hlaða með vélarafli, má hlaða hátt með akkerisstyrkingu"
              },
              availability: true
            }
          ]
        },
        // TORGSTEINN category
        torgsteinn: {
          name: "Torgsteinn",
          path: "Verslun/Hellur/Torgsteinn",
          products: [
            {
              name: "Torgsteinn",
              sku: "26-124-Grátt-tromlad",
              description: "Torgsteinn er fallegur steinn sem má nota jafnt í bílastæði og í garðinn. Steinninn er með fallegri steinflöguáferð sem gefur mjög skemmtilegt útlit. Hægt er að velja um að hafa steininn ótromlaðan, en þá er hann með sléttum köntum, eða tromlaðan, en þá eru brúnirnar núnar og ójafnar sem gefur annað útlit. Torgsteinn er þriggja steina kerfi og eru stærðirnar því blandaðar.",
              shortDescription: "Torgsteinn er fallegur steinn sem má nota jafnt í bílastæði og í garðinn. Steinninn er með fallegri steinflöguáferð sem gefur mjög skemmtilegt útlit. Torgsteinn er með umhverfisyfirlýsingu (EPD).",
              price: { amount: 8753, unit: "m2" },
              weight: "135.00 kg",
              sizes: [
                "22x14 cm | þykkt 6 cm",
                "16,5x14 cm | þykkt 6 cm",
                "11x14 cm | þykkt 6 cm"
              ],
              finishOptions: ["Tromlaður", "Ótromlaður"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Torgsteinn",
              specs: {
                thickness: 6,
                pattern: "Þriggja steina kerfi með blönduðum stærðum",
                features: ["Falleg steinflöguáferð", "Skemmtilegt útlit"],
                finishVariants: ["Ótromlaður (sléttir kantar)", "Tromlaður (núnar og ójafnar brúnir)"],
                applications: ["Bílastæði", "Garðar"]
              },
              availability: true
            }
          ]
        },
        // VÍNARSTEINN category
        vinarsteinn: {
          name: "Vínarsteinn",
          path: "Verslun/Hellur/Vínarsteinn",
          products: [
            {
              name: "Vínarsteinn",
              sku: "26-170-Grátt-otromlad",
              description: "Vínarsteinn er vinsæll hjá þeim sem vilja ná fram náttúrulegum áhrifum, t.d. í görðum og á göngustígum. Hann er gjarnarn valinn af arkitektum til að skapa líflegt mótvægi við nútímalega stílhreina byggingarlist. Lögnin er nær viðhaldsfrí því markmiðið er að mosi og smágróður festi rætur í óreglulegri fúgunni milli steinanna og gefi henni hlýlegt yfirbragð. Vínarsteinn er ávalur, með náttúrulegu yfirborði og fjölbreyttar stærðir bjóða upp á ýmsa möguleika.",
              shortDescription: "Vínarsteinn nær fram náttúrulegum áhrifum og er tilvalinn í göngustíga og í görðum. Vínarsteinn er með umhverfisyfirlýsingu (EPD).",
              price: { amount: 9290, unit: "m2" },
              weight: "135.00 kg",
              sizes: ["Blandaðar stærðir | þykkt 6 cm", "XL (stærri steinar)"],
              finishOptions: ["Ótromlaður"],
              colors: ["Grár"],
              environmentalDeclaration: true,
              path: "Verslun/Hellur/Vínarsteinn",
              specs: {
                thickness: 6,
                pattern: "Blandaðar stærðir í stórsekkjum í jöfnum hlutföllum",
                features: [
                  "Ávalur", 
                  "Náttúrulegt yfirborð", 
                  "Nær viðhaldsfrítt", 
                  "Mosi og smágróður festir rætur í óreglulegri fúgu"
                ],
                applications: ["Garðar", "Göngustígar", "Mótvægi við nútímalega stílhreina byggingarlist"]
              },
              availability: true
            }
          ]
        }
      }
    },
    // HÚSEININGAR | SMELLINN (Prefabricated Housing Units)
    huseiningar: {
      name: "Húseiningar | Smellinn",
      description: "Forsteyptar húseiningar eru traustur valkostur fyrir mannvirkjagerð. Áratuga reynsla og vottað ISO 9001 gæðastjórnunarkerfi.",
      path: "Verslun/Húseiningar | Smellinn",
      products: [
        {
          name: "Atvinnu- og iðnaðarhús",
          sku: "1241249",
          description: "Atvinnu- og iðnaðarhúsnæði þurfa að standast mikið álag, örar hitabreytingar, titring, högg og umferð tækja og véla. Hús byggð með Smellinn húseiningum eru öflugur valkostur sem byggingarmáti fyrir atvinnuhúsnæði. Hönnuðir, verkfræðingar og arkitektar hafa nánast fullt frelsi við hönnun og útfærslu byggingarinnar og hægt að fara fjölbreyttar leiðir í framleiðslunni. Auðvelt er að tvinna saman stálgrind, límtré í þökum og Smellinn húseiningar eftir því hvaða eiginleikum leitað er eftir hverju sinni.",
          shortDescription: "Hús byggð með Smellinn húseiningum eru öflugur valkostur sem byggingarmáti fyrir atvinnuhúsnæði.",
          path: "Verslun/Húseiningar | Smellinn/Atvinnu- og iðnaðarhús",
          specs: {
            features: [
              "Standast mikið álag",
              "Þola örar hitabreytingar",
              "Þola titring, högg og umferð tækja og véla"
            ],
            design: "Hönnunarfrelsi fyrir verkfræðinga og arkitekta",
            combinations: [
              "Stálgrind",
              "Límtré í þökum",
              "Smellinn húseiningar"
            ]
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Einbýlis- og raðhús",
          sku: "1241251",
          description: "BM Vallá býr yfir afar öflugri og tæknilegri framleiðslugetu og leggur starfsfólk mikinn metnað í að koma til móts við hugmyndir og þarfir viðskiptavina. Hönnuðir, verkfræðingar og arkitektar hafa nánast fullt frelsi við hönnun og útfærslu byggingarinnar og hægt að fara fjölbreyttar leiðir í framleiðslunni og útliti húsa. Hús úr forsteyptum húseiningum eru afar fljótleg í uppsetningu. Húsin eru steypt við kjöraðstæður innandyra og eru oftast tilbúin á styttri tíma og hefur áhrif veðurs minni áhrif á verktímann.",
          shortDescription: "Byggðu draumahúsið þitt á styttri og hagkvæmari hátt með Smellinn húseiningum og láttu hugmyndaflugið ráða för við hönnun þess.",
          path: "Verslun/Húseiningar | Smellinn/Einbýlis- og raðhús",
          specs: {
            benefits: [
              "Fljótleg uppsetning", 
              "Steypt við kjöraðstæður innandyra",
              "Styttri byggingartími", 
              "Minni áhrif veðurs á verktíma"
            ],
            design: "Hönnunarfrelsi fyrir verkfræðinga og arkitekta"
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Filigran loftaplötur",
          sku: "1241243",
          description: "Filigran loftaplötur henta í flestar tegundir bygginga. Plöturnar eru með stálmótaáferð að neðanverðu en með hrjúfu yfirborði að ofan til að tryggja viðloðun við ásteypulagið. Þær eru 6–8 cm þykkar og járnbentar samkvæmt fyrirmælum hönnuðar hverju sinni. Rafmagns- eða LED dósum er komið fyrir, allt eftir óskum viðskiptavinarins. Forspennt filigran loftaplata býður upp á mikla möguleika í nýtingu rýmis. Með því að forspenna loftaplöturnar er hægt að láta þær spanna meiri haflengdir vegna aukins burðarþols. Allar filigran loftaplötur eru sérframleiddar eftir teikningum viðskiptavina. Mesta breidd filigran plötu er 2,4 m og lengdir fara eftir spennivíddum. Kostir þess að nota filigran loftaplötur eru m.a. þeir að byggingartíminn er styttri því ekki er um hefðbundinn plötuuppslátt að ræða. Þar af leiðandi er sáralítil efnisrýrnun móta. Neðra byrði er slétt og því tilbúið til sandspörslunar og allar loftadósir þegar komnar í.",
          shortDescription: "Filigran loftaplötur henta í flestar tegundir bygginga. Plöturnar eru með stálmótaáferð að neðanverðu en með hrjúfu yfirborði að ofan til að tryggja viðloðun við ásteypulagið.",
          environmentalDeclaration: true,
          path: "Verslun/Húseiningar | Smellinn/Filigran loftaplötur",
          specs: {
            thickness: "6-8 cm",
            finish: {
              top: "Hrjúft yfirborð fyrir viðloðun",
              bottom: "Stálmótaáferð"
            },
            dimensions: {
              maxWidth: 2.4, // meters
              length: "Fer eftir spennivíddum"
            },
            features: [
              "Járnbentar samkvæmt hönnun",
              "Innbyggðar rafmagns- eða LED dósir eftir óskum",
              "Styttri byggingartími",
              "Minni efnisrýrnun móta",
              "Slétt neðra byrði, tilbúið til sandspörslunar"
            ],
            hasForspent: true // Forspennt filigran loftaplata sem valkostur
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Fjölbýlishús",
          sku: "1241248",
          description: "Að byggja stærðarinnar fjölbýlishús á mörgum hæðum er engin fyrirstaða þegar kemur að Smellinn húseiningum. BM Vallá hefur mikla reynslu af því að byggja bæði stór og smá fjölbýli með samstarfsaðilum okkar. Tæknileg framleiðslugeta og útfærsla fjölbýlishúsa er nánast engum takmörkum háð og hafa hönnuðir, verkfræðingar og arkitektar mikið frelsi við hönnun og útfærslu hússins.",
          shortDescription: "Að byggja stærðarinnar fjölbýlishús á mörgum hæðum er engin fyrirstaða þegar kemur að Smellinn húseiningum.",
          path: "Verslun/Húseiningar | Smellinn/Fjölbýlishús",
          specs: {
            experience: "Mikil reynsla af bæði stórum og smáum fjölbýlishúsum",
            flexibility: "Tæknileg framleiðslugeta og útfærsla nánast takmörkunarlaus",
            design: "Mikið hönnunarfrelsi fyrir arkitekta"
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Hótel og gistihús",
          sku: "1241247",
          description: "Rekstraraðilar í ferðaþjónustu hafa tekið einingahúsum byggðum með Smellinn húseiningum fagnandi. Enda bæði þægilegt og fljótlegt að hanna og byggja allt frá litlum gistihúsum upp í stærðarinnar hótel. Slíkar fjárfestingar eru umfangsmiklar og í mörg horn að líta bæði hvað varðar hönnun, skipulag og ásýnd eignarinnar. Þá skiptir miklu máli fyrir rekstraraðila að tímaáætlanir standist og að starfsemin komist í gagnið á sem stystum tíma til að minnka fjármagnskostnað og skapa tekjur af fasteigninni. Því eru Smellinn húseiningar góður valkostur. Einingahúsin eru afar fljótleg í uppsetningu. Húsin eru steypt við kjöraðstæður innandyra og eru oftast tilbúin á styttri tíma, enda þarf ekki að taka tillit til veðurfars líkt og þekkist í staðsteyptum húsum. Auðvelt er að stækka einingahúsin eftir á og auka þannig herbergjaframboð eða önnur rými eftir því sem við á.",
          shortDescription: "Smellinn húseiningar eru frábær valkostur fyrir rekstraraðila í ferðaþjónustu. Auðvelt að stækka, byggingartími hraður og því hægt að skapa tekjur af fasteigninni fyrr.",
          path: "Verslun/Húseiningar | Smellinn/Hótel og gistihús",
          specs: {
            benefits: [
              "Fljótleg uppsetning",
              "Styttri byggingartími",
              "Minni fjármagnskostnaður",
              "Tekjur af fasteigninni fyrr",
              "Auðvelt að stækka eftir á"
            ],
            applications: [
              "Lítil gistihús",
              "Stærri hótel",
              "Mismunandi stærðir og gerðir"
            ]
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Innveggir",
          sku: "1241244",
          description: "Forsteyptar innveggja einingar frá Smellinn húseiningum er hægt að nota við flestar aðstæður. Brunaveggir: Forsteyptir brunaveggir eru til þess að aðskilja brunarými. Veggina er hægt að fá í ýmsum þykktum, allt eftir því hvaða brunaþols er krafist og eftir því hvort veggurinn eigi að vera burðarveggur eða ekki. Þessir veggir hafa verið sérlega vinsælir í fjölbýlishúsum og í húsum með innbyggðum bílskúrum þar sem þeir eru notaðir til að skilja að bílskúr og íbúð. Brunaveggirnir okkar hafa vottun frá Brunamálastofnun Íslands. Burðarveggir: Forsteyptir burðarveggir henta í allar gerðir bygginga, sér í lagi fjölbýlishús og smærri hús. Léttir innveggir: Innveggirnir eru gjarnan í þykktunum 10 og 12 cm og koma í stað gifsveggja eða veggja sem ekki eru burðarveggir. Helsti kostur veggjanna er mikil hljóðdempun, í takt við vaxandi kröfur um góða hljóðvist í byggingum. Annar kostur er sá að á veggina má hengja nánast hvað sem er, t.d. innréttingar og stór/þung sjónvörp. Brandveggir: Þegar íbúðir í par- og raðhúsum eru skildar að er það gjarnan gert með brandveggjum. Þeir hljóðeinangra betur en venjulegir veggir og eru eldtefjandi burðarveggir. Í veggjunum er steinullarkjarni í miðju sem skilur að tvo steypta veggi.",
          shortDescription: "Forsteyptar innveggja einingar frá Smellinn húseiningum er hægt að nota við flestar aðstæður.",
          path: "Verslun/Húseiningar | Smellinn/Innveggir",
          specs: {
            types: [
              {
                name: "Brunaveggir",
                features: [
                  "Aðskilja brunarými",
                  "Fást í ýmsum þykktum",
                  "Með vottun frá Brunamálastofnun Íslands"
                ],
                applications: [
                  "Fjölbýlishús",
                  "Húsum með innbyggðum bílskúrum"
                ]
              },
              {
                name: "Burðarveggir",
                applications: [
                  "Allar gerðir bygginga",
                  "Sérstaklega fjölbýlishús og smærri hús"
                ]
              },
              {
                name: "Léttir innveggir",
                thickness: [10, 12], // cm
                features: [
                  "Mikil hljóðdempun",
                  "Styrkur til að hengja þungar innréttingar"
                ],
                replacement: "Koma í stað gifsveggja eða veggja sem ekki eru burðarveggir"
              },
              {
                name: "Brandveggir",
                features: [
                  "Hljóðeinangra betur en venjulegir veggir",
                  "Eldtefjandi burðarveggir",
                  "Steinullarkjarni í miðju"
                ],
                applications: [
                  "Skilja að íbúðir í par- og raðhúsum"
                ]
              }
            ]
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Landbúnaðar- og hesthús",
          sku: "1241246",
          description: "Þegar byggja þarf gott skjól fyrir þarfasta þjóninn, mjólkurkýrnar, sauðféð eða hænsnin þá eru einingahús byggð með Smellinn húseiningum snjallur valkostur. Þau eru viðhaldslítil, auðvelt að halda þeim hreinum og þola vel ágang bæði dýra og tækja. Hægt er að útfæra margar útfærslur af landbúnaðar- og hesthúsum og byggja einingahús sem mætir þörfum dýra og eiganda sinna.",
          shortDescription: "Landbúnaðarhús og hesthús byggð með Smellinn húseiningum eru viðhaldslítil, auðvelt að halda þeim hreinum og þola vel ágang bæði dýra og tækja.",
          path: "Verslun/Húseiningar | Smellinn/Landbúnaðar- og hesthús",
          specs: {
            benefits: [
              "Viðhaldslítil",
              "Auðvelt að halda hreinum",
              "Þola vel ágang dýra og tækja"
            ],
            applications: [
              "Fjós fyrir mjólkurkýr",
              "Fjárhús fyrir sauðfé",
              "Hesthús",
              "Hænsnahús og fleiri tegunda búfjárhúsa"
            ],
            customization: "Margs konar útfærslur sem mæta þörfum dýra og eigenda"
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Sumarbústaðir",
          sku: "1241250",
          description: "Marga dreymir um að eignast sinn eigin sælureit í sveitinni og byggja með sumarbústað eða heilsárshús. Sælureiturinn þarf að taka mið af þörfum fjölskyldunnar og passa jafnframt vel inn í umhverfið. Með því að velja forsteyptar húseiningar frá Smellinn sem byggingarefni fyrir sumarbústaðinn eyðir þú minni tíma í byggingu sumarbústaðsins og framkvæmdir á verkstað og getur fyrr farið að njóta. Ágætt er að hafa í huga aðstæður til flutninga húseininga á hverjum stað eru mismunandi, m.t.t. krana og flutningstækja á lóð.",
          shortDescription: "Dreymir þig um að eignast þinn eigin sælureit í sveitinni og byggja sumarbústað eða heilsárshús sem hægt er að njóta allt árið um kring.",
          path: "Verslun/Húseiningar | Smellinn/Sumarbústaðir",
          specs: {
            benefits: [
              "Styttri byggingartími",
              "Minni framkvæmdatími á verkstað",
              "Hægt að hefja nýtingu fyrr"
            ],
            considerations: [
              "Aðstæður til flutninga húseininga geta verið mismunandi",
              "Krani og flutningstæki á lóð"
            ],
            types: [
              "Sumarbústaðir",
              "Heilsárshús"
            ]
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Svalir",
          sku: "1241242",
          description: "BM Vallá framleiðir forsteyptar svalir í ýmsum stærðum og gerðum. Það er hagkvæmt að nota forsteyptar svalir í fjölbýlishús eða aðrar byggingar, hvort sem þau eru forsteypt eða staðsteypt hús. Svalirnar koma tilbúnar með réttum halla og innsteyptu niðurfalli og dós fyrir útiljós á neðri hæð ef óskað er. Hægt er að fá svalirnar með innsteyptri hálkuvörn á yfirborði svalanna og innsteyptum einangrunarbökkum til að minnka kuldaleiðni í gegnum svalinar og inn í hús. Það eru margir kostir við forsteyptar svalir í byggingar: • Styttri byggingartími • Lægri byggingarkostnaður • Einfaldari byggingarmáti • Nákvæmari smíði en gengur og gerist • Minni mótasmíði • Koma með fyrirskrifuðum halla í plötu að niðurfalli",
          shortDescription: "BM Vallá framleiðir forsteyptar svalir í ýmsum stærðum og gerðum. Það er hagkvæmt að nota forsteyptar svalir í fjölbýlishús eða aðrar byggingar, hvort sem húsið er forsteypt eða staðsteypt.",
          path: "Verslun/Húseiningar | Smellinn/Svalir",
          specs: {
            features: [
              "Tilbúnar með réttum halla",
              "Innsteypt niðurfall",
              "Innsteypt dós fyrir útiljós á neðri hæð (ef óskað)",
              "Möguleiki á innsteyptri hálkuvörn á yfirborði",
              "Möguleiki á innsteyptum einangrunarbökkum"
            ],
            benefits: [
              "Styttri byggingartími",
              "Lægri byggingarkostnaður",
              "Einfaldari byggingarmáti",
              "Nákvæmari smíði",
              "Minni mótasmíði",
              "Fyrirskrifaður halli að niðurfalli"
            ],
            applications: [
              "Fjölbýlishús",
              "Aðrar byggingar",
              "Bæði forsteypt og staðsteypt hús"
            ]
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Sökklar",
          sku: "1241241",
          description: "Forsteyptir sökklar henta vel undir hvaða byggingu sem er og flýta fyrir framkvæmdum. Hægt er að fá sökklana alveg tilbúna, þ.e. einangraða og múraða, eða sem kalda sökkla án einangrunar. Einn af kostum þess að fá tilbúna sökkla á verkstað er að hægt er að klára alla jarðvinnu í kringum þá áður en sjálft húsið kemur. Þá minnkar jarðrask og rót í kringum verkstaðinn til muna á meðan framkvæmdum stendur og slíkt hentar sérstaklega vel í grónum hverfum.",
          shortDescription: "Forsteyptir sökklar henta vel undir hvaða byggingu sem er og flýta fyrir framkvæmdum.",
          path: "Verslun/Húseiningar | Smellinn/Sökklar",
          specs: {
            types: [
              {
                name: "Tilbúnir sökklar",
                features: ["Einangraðir", "Múraðir"]
              },
              {
                name: "Kaldir sökklar",
                features: ["Án einangrunar"]
              }
            ],
            benefits: [
              "Flýta fyrir framkvæmdum",
              "Hægt að klára jarðvinnu áður en húsið kemur",
              "Minna jarðrask og rót á verkstað",
              "Hentar vel í grónum hverfum"
            ],
            applications: ["Henta undir allar tegundir bygginga"]
          },
          customProduct: true,
          availability: true
        },
        {
          name: "Útveggir",
          sku: "1241245",
          description: "Útveggir fást einangraðir eða óeinangraðir. Veggirnir eru steyptir innandyra við bestu mögulegu aðstæður ýmist á einingaborðum eða lóðréttum batterísmótum. Allt raflagnaefni er sett í eininguna, þ.e. dósir og rör, samkvæmt teikningum rafhönnuðar. Sama gildir um aðra íhluti sem hönnuðir óska eftir. 1. Einangraðir útveggir eða svokallaðar forsteyptar samlokueiningar, skiptast í þrjú mismunandi lög: 150-200 mm þykkan burðarvegg úr steypu, 100 mm einangrun, 70 mm þykka veðurkápa. Hægt er að fá einangruðu útveggina með viðhaldslítilli völun (7 cm þykk veðurkápa) eða stálmótaáferð á ytra byrði hússins. Einnig er hægt að steypa einingar með munsturáferð í margskonar gerðum og áferðum. Framleiðandi munsturdúks er framleiðandinn NOE og þar má sjá vöruframboðið. Þá er hægt að útbúa einingarnar fyrir ál- eða stálklæðningu, timbri, flísum eða öðru efni. 2. Óeinangraðir útveggir, eða kaldir veggir eru notaðir sem innveggir eða útveggir. Óeiningraðir útveggir eru líkt og nafnið gefur til kynna einangraðir að utan og klæddir ýmist með múrkerfi, timbur.- eða álklæðningum. Allar útveggjaeiningar eru járnbentar eftir kröfum hönnuða.",
          shortDescription: "Útveggir fást einangraðir eða óeinangraðir. Veggirnir eru steyptir innandyra við bestu mögulegu aðstæður ýmist á einingaborðum eða lóðréttum batterísmótum. Veggirnir koma með raflögnum og úrtökum sé þess óskað.",
          path: "Verslun/Húseiningar | Smellinn/Útveggir",
          specs: {
            types: [
              {
                name: "Einangraðir útveggir (samlokueiningar)",
                layers: [
                  {
                    name: "Burðarveggur",
                    material: "Steypa",
                    thickness: "150-200 mm"
                  },
                  {
                    name: "Einangrun",
                    thickness: "100 mm"
                  },
                  {
                    name: "Veðurkápa",
                    thickness: "70 mm"
                  }
                ],
                finishOptions: [
                  "Viðhaldslítil völun (7 cm þykk veðurkápa)",
                  "Stálmótaáferð á ytra byrði",
                  "Munsturáferð í margskonar gerðum og áferðum",
                  "Ál- eða stálklæðning",
                  "Timburklæðning",
                  "Flísaklæðning"
                ]
              },
              {
                name: "Óeinangraðir útveggir (kaldir veggir)",
                usage: ["Innveggir", "Útveggir"],
                cladding: [
                  "Múrkerfi",
                  "Timburklæðning",
                  "Álklæðning"
                ]
              }
            ],
            features: [
              "Steyptir innandyra við bestu aðstæður",
              "Raflagnir (dósir og rör) eftir teikningum",
              "Járnbentar eftir kröfum hönnuða"
            ]
          },
          customProduct: true,
          availability: true
        }
      ]
    },
    
    // STEYPTAR EININGAR (Precast concrete elements)
    steyptarEiningar: {
      name: "Steyptar einingar",
      description: "BM Vallá framleiðir margs konar steyptar einingar til að fegra umhverfið. Áratuga reynsla og vottað ISO 9001 gæðastjórnunarkerfi.",
      path: "Verslun/Steyptar einingar",
      subcategories: {
        // SORPTUNNUSKÝLI (Waste bin shelters)
        sorptunnuskyli: {
          name: "Sorptunnuskýli",
          description: "Steypt sorptunnuskýli fyrir allar gerðir sorptunna. Endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli.",
          path: "Verslun/Steyptar einingar/Sorptunnuskýli",
          products: [
            {
              name: "Tvöfalt sorptunnuskýli með fylgihlutum",
              sku: "38-660",
              description: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna. Ruslatunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli. Mikilvægt er að ruslatunnuskýli séu lögð á frostfrían jarðveg með hellulögðu eða steyptu undirlagi.",
              shortDescription: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna sem koma með pumpum, lokum og hurðum. Ruslatunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli.",
              price: { 
                amount: 360160, 
                discountedAmount: 288130, 
                unit: "stk" 
              },
              weight: "1036.00 kg",
              dimensions: {
                length: 169,
                width: 92, 
                height: 115
              },
              features: [
                "Pláss fyrir tvær sorptunnur",
                "Kemur með pumpum, lokum og hurðum",
                "Endingargott og stílhreint útlit"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Tvöfalt sorptunnuskýli með fylgihlutum",
              availability: true
            },
            {
              name: "Þrefalt sorptunnuskýli með fylgihlutum",
              sku: "38-670",
              description: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna, með eða án hurða. Ruslatunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli. Mikilvægt er að ruslatunnuskýli séu lögð á frostfrían jarðveg með hellulögðu eða steyptu undirlagi.",
              shortDescription: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna sem koma með pumpum, lokum og hurðum. Ruslatunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli.",
              price: { 
                amount: 540240, 
                discountedAmount: 432193, 
                unit: "stk" 
              },
              weight: "1359.00 kg",
              dimensions: {
                length: 249,
                width: 92, 
                height: 115
              },
              features: [
                "Pláss fyrir þrjár sorptunnur",
                "Kemur með pumpum, lokum og hurðum",
                "Endingargott og stílhreint útlit"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Þrefalt sorptunnuskýli með fylgihlutum",
              availability: true
            },
            {
              name: "Bogaskýli",
              sku: "38-620",
              description: "Falleg bogadregin tveggja tunnu steypt sorptunnuskýli sem hafa verið framleidd hjá BM Vallá í tugi ára og þurfa lítið viðhald. Mælt er með að setja hurðir framan á skýlin, en hægt er að nota þau án hurðar. Hurðir eru framleiddar hjá BM Vallá og eru keyptar aukalega, ásamt festingum. Varðandi stækkunarmöguleika á skýli: Ekki er hægt að nota L-einingu eða U-einingu til að stækka skýlið sem nemur einni sorptunnueiningu. En vissulega má bæta öðru tvöföldu bogaskýli við fyrirliggjandi skýli og auka þannig pláss fyrir sorptunnur úr tveimur í fjórar.",
              shortDescription: "Falleg steypt bogadregin tveggja tunnu sorptunnuskýli, hægt að setja hurðir á þau.",
              price: { amount: 197052, unit: "stk" },
              weight: "1200.00 kg",
              dimensions: {
                length: 150,
                width: 90, 
                height: 166
              },
              features: [
                "Bogadregin hönnun",
                "Pláss fyrir tvær sorptunnur",
                "Lítið viðhald"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Bogaskýli",
              accessories: [
                {
                  name: "Hurð á bogaskýli | Timbur",
                  sku: "21-270",
                  price: 51929
                }
              ],
              availability: true
            },
            {
              name: "Sorptunnuskýli fyrir gáma",
              sku: "38-640",
              description: "Sorptunnuskýli fyrir gáma eru hentug lausn fyrir fjölbýlishús og vinnustaði. Skýlin koma í tveimur stærðum, annars vegar rúma þau 660 lítra gám og hins vegar 1.100 lítra gám. Lokin á skýlunum festast við stöng á sjálfum gámnum sem gera þau sérlega meðfærileg og þægileg í notkun. Mælt er með að setja hurðir og lok á skýlin ásamt pumpu til að auðvelda opnun hurðarloks.",
              shortDescription: "Heilsteypt, stílhrein og falleg sorptunnuskýli eru tilvalin til að skýla gámum og sorptunnum.",
              price: { amount: 196315, unit: "stk" },
              weight: "900.00 kg",
              variants: [
                { name: "Skýli f. 660 L gám", dimensions: { length: 158, width: 97, height: 135 }},
                { name: "Skýli f. 1100 L gám", dimensions: { length: 158, width: 130, height: 150 }}
              ],
              features: [
                "Hentar fyrir fjölbýlishús og vinnustaði",
                "Lok sem festast við stöng á gámnum",
                "Meðfærileg og þægileg í notkun"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Sorptunnuskýli fyrir gáma",
              availability: true
            },
            {
              name: "Sorptunnuskýli | Einfalt | L-eining",
              sku: "38-615-Vinst",
              description: "Steypt einfalt L-eininga sorptunnuskýli er fyrst og fremst hugsað sem stækkunareining fyrir E-eininga skýli (tvöfalt, þrefalt eða fjórfalt) eða Einfalt U-skýli. L-einingunni er komið upp þétt við hlið skýlisins, sem á að stækka, (nota þarf lyftikrana til verksins). Það þarf ekki að naglfesta eða bora L-eininguna við aðrar einingar, svo framarlega sem undirlagið sé steypt eða hellulagt og frostfrítt. L-einingar fást bæði fyrir hægri og vinstri hlið, en ef það á að nota eininguna sem stækkun fyrir E-einingu mælum við með að hægri hlið sé notuð þar sem hún kemur með innsteyptum götum fyrir pumpu til að lyfta hurðarloki.",
              shortDescription: "Einfalt L-eininga steypt sorptunnuskýli fyrir eina sorptunnu. Hægt að nota sem stækkun við E-einingaskýli.",
              price: { amount: 79557, unit: "stk" },
              weight: "390.00 kg",
              dimensions: {
                length: 80,
                width: 92, 
                height: 115
              },
              variants: ["Vinstri", "Hægri"],
              features: [
                "Stækkunareining fyrir önnur skýli",
                "Pláss fyrir eina sorptunnu",
                "Krefst ekki naglfestinga eða borunar við aðrar einingar"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Sorptunnuskýli | Einfalt | L-eining",
              availability: true
            },
            {
              name: "Sorptunnuskýli | Einfalt | U-eining",
              sku: "38-600-Grátt",
              description: "Sorptunnuskýli eru stílhrein og nett skýli fyrir allar gerðir sorptunna, með eða án hurða. Sniðug og snyrtileg leið til að fela ruslatunnurnar. Hagkvæmt og sveigjanlegt kerfi. Skýlin á að leggja á frostfrían jarðveg, hellulagt eða steypt undirlag. Hægt er að fá hurðir eða hurðaramma á skýlin.",
              shortDescription: "U-eining sem rúmar eina sorptunnu.",
              price: { amount: 99263, unit: "stk" },
              weight: "600.00 kg",
              dimensions: {
                length: 89,
                width: 92, 
                height: 115
              },
              features: [
                "Pláss fyrir eina sorptunnu",
                "Stílhreint og nett útlit",
                "Hagkvæmt og sveigjanlegt kerfi"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Sorptunnuskýli | Einfalt | U-eining",
              availability: false
            },
            {
              name: "Sorptunnuskýli | Tvöfalt | E-eining",
              sku: "38-610",
              description: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna, með eða án hurða. Ruslatunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli.",
              shortDescription: "Stílhrein og sterkbyggð skýli fyrir flestar gerðir sorptunnuskýla.",
              price: { amount: 168507, unit: "stk" },
              weight: "990.00 kg",
              dimensions: {
                length: 169,
                width: 92, 
                height: 115
              },
              features: [
                "Pláss fyrir tvær sorptunnur",
                "Stílhreint og sterkbyggt",
                "Endingargott með litlu viðhaldi"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Sorptunnuskýli | Tvöfalt | E-eining",
              availability: true
            },
            {
              name: "Sorptunnuskýli | Þrefalt | E-eining",
              sku: "38-630",
              description: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna, með eða án hurða. Ruslatunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli.",
              shortDescription: "Sorptunnuskýli eru stílhrein og nett skýli fyrir allar gerðir sorptunna, með eða án hurða.",
              price: { amount: 252759, unit: "stk" },
              weight: "1290.00 kg",
              dimensions: {
                length: 249,
                width: 92, 
                height: 115
              },
              features: [
                "Pláss fyrir þrjár sorptunnur",
                "Stílhreint og sterkbyggt",
                "Endingargott með litlu viðhaldi"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Sorptunnuskýli | Þrefalt | E-eining",
              availability: false
            },
            {
              name: "Sorptunnuskýli | Fjórfalt | E-eining",
              sku: "38-635-Grár",
              description: "Stílhrein, sterkbyggð og heilsteypt sorptunnuskýli fyrir allar gerðir sorptunna, með eða án hurða. Sorptunnuskýlin frá BM Vallá hafa verið framleidd um áraraðir og eru endingargóð og sniðug leið til að koma ruslatunnunum fyrir í góðu og fallegu skjóli.",
              shortDescription: "Sorptunnuskýli eru stílhrein og nett skýli fyrir allar gerðir sorptunna, með eða án hurða.",
              price: { amount: 337010, unit: "stk" },
              weight: "1680.00 kg",
              dimensions: {
                length: 329,
                width: 92, 
                height: 115
              },
              features: [
                "Pláss fyrir fjórar sorptunnur",
                "Stílhreint og sterkbyggt",
                "Endingargott með litlu viðhaldi"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli/Sorptunnuskýli | Fjórfalt | E-eining",
              availability: true
            }
          ]
        },
        // STAURAR (Posts)
        staurar: {
          name: "Staurar",
          description: "Fjölbreytt úrval steypta staura til að afmarka, stýra eða hindra umferð farartækja. Falleg hönnun sem setur snyrtilegan svip á umhverfið.",
          path: "Verslun/Steyptar einingar/Staurar",
          products: [
            {
              name: "Borgarstaur",
              sku: "34-040-Grátt",
              description: "Steyptir staurar eru góð leið til að afmarka, stýra eða hindra umferð farartækja. Þeir fást í ýmsum gerðum og eru hannaðir með það í huga að auka öryggi vegfarenda. Falleg hönnunin setur snyrtilegan svip á umhverfið.",
              shortDescription: "Borgarstaurar eru tilvaldir til að afmarka, stýra eða hindra umferð farartækja.",
              price: { amount: 38158, unit: "stk" },
              weight: "80.00 kg",
              dimensions: {
                width: 20,
                height: 80,
                totalHeight: 120
              },
              features: [
                "Afmarkar og stýrir umferð",
                "Eykur öryggi vegfarenda",
                "Setur snyrtilegan svip á umhverfið"
              ],
              variants: ["80 cm"],
              path: "Verslun/Steyptar einingar/Staurar/Borgarstaur",
              availability: true
            },
            {
              name: "Búlki",
              sku: "37-110",
              description: "Búlka má setja beint ofan á steinlögn eða malbik til að hindra umferð farartækja.",
              shortDescription: "Búlka má setja beint ofan á steinlögn eða malbik til að hindra umferð farartækja.",
              price: { amount: 30758, unit: "stk" },
              weight: "90.00 kg",
              dimensions: {
                length: 150,
                width: 25, 
                height: 15
              },
              features: [
                "Settur beint ofan á steinlögn eða malbik",
                "Hindrar umferð farartækja",
                "Ekki þörf á jarðvinnu"
              ],
              path: "Verslun/Steyptar einingar/Staurar/Búlki",
              availability: false
            },
            {
              name: "Hafnarstaur á fæti",
              sku: "34-025",
              description: "Steyptir staurar eru góð leið til að afmarka, stýra eða hindra umferð farartækja. Hafnarstaurinn er á fæti og því auðvelt að koma honum fyrir og hafa verið vinsælir t.d. við hafnir og í tengslum við skipaumferð. Þeir fást í ýmsum gerðum og eru hannaðir með það í huga að auka öryggi vegfarenda. Falleg hönnunin setur snyrtilegan svip á umhverfið.",
              shortDescription: "Hafnarstaurar eru tilvaldir til að afmarka, stýra eða hindra umferð farartækja. Þeir eru einnig tilvaldir þegar afmarka þarf umferð, t.d. við hafnir, en þeir koma á fæti og því auðvelt að koma þeim fyrir.",
              price: { amount: 50890, unit: "stk" },
              weight: "150.00 kg",
              variants: [
                { name: "80 cm", dimensions: { diameter: 20, height: 80, footDiameter: 60 }},
                { name: "100 cm", dimensions: { diameter: 26, height: 100, footDiameter: 80 }}
              ],
              features: [
                "Kemur á fæti - auðvelt að koma fyrir",
                "Vinsæll við hafnir og skipaumferð",
                "Eykur öryggi vegfarenda"
              ],
              path: "Verslun/Steyptar einingar/Staurar/Hafnarstaur á fæti",
              availability: false
            },
            {
              name: "Haki 70 cm",
              sku: "34-080",
              description: "Klakkar eru góð leið til að afmarka, stýra eða hindra umferð farartækja. Þeir fást í ýmsum gerðum og eru hannaðir með það í huga að auka öryggi vegfarenda. Falleg hönnun setur snyrtilegan svip á umhverfið.",
              shortDescription: "Klakkar eru góð leið til að afmarka, stýra eða hindra umferð farartækja.",
              price: { amount: 45291, unit: "stk" },
              weight: "0.00 kg",
              dimensions: {
                width: 12,
                height: 70
              },
              variants: [
                { name: "12x12 cm | hæð 70 cm" },
                { name: "16x16 cm | hæð 75 cm" }
              ],
              features: [
                "Afmarkar og stýrir umferð",
                "Eykur öryggi vegfarenda",
                "Falleg hönnun"
              ],
              path: "Verslun/Steyptar einingar/Staurar/Haki 70 cm",
              accessories: [
                {
                  name: "Ljós í Haka",
                  sku: "21-024",
                  price: 15607
                }
              ],
              availability: false
            },
            {
              name: "Hverfisstaur",
              sku: "34-020-Grátt",
              description: "Steyptur staur er góð leið til að afmarka, stýra eða hindra umferð farartækja. Þeir eru hannaðir með það í huga að auka öryggi vegfarenda. Falleg hönnunin setur snyrtilegan svip á umhverfið.",
              shortDescription: "Hverfisstaurar eru tilvaldir til að afmarka, stýra eða hindra umferð farartækja og setja skemmtilegan svip á umhverfið.",
              price: { amount: 39108, unit: "stk" },
              weight: "135.00 kg",
              dimensions: {
                diameter: 26,
                height: 84,
                totalHeight: 144
              },
              variants: ["84 cm"],
              features: [
                "Afmarkar og stýrir umferð",
                "Eykur öryggi vegfarenda",
                "Setur skemmtilegan svip á umhverfið"
              ],
              path: "Verslun/Steyptar einingar/Staurar/Hverfisstaur",
              availability: false
            }
          ]
        },
        // BEKKIR (Benches)
        bekkir: {
          name: "Bekkir",
          description: "Fjölbreytt úrval steyptra garðbekkja fyrir almenningssvæði, garða og útivistarsvæði.",
          path: "Verslun/Steyptar einingar/Bekkir",
          products: [
            {
              name: "Garðbekkur án baks",
              sku: "37-021",
              description: "Heilsteyptur garðbekkur, einfaldur og án baks. Tímalaus hönnun, klassískt útlit. Bekkurinn þolir að standa úti allt árið. Vöruhönnuður: Inga Rut Gylfadóttir",
              shortDescription: "Heilsteyptur garðbekkur sem þolir öll veður, tímalaus hönnun og klassískt útlit.",
              price: { amount: 154196, unit: "stk" },
              weight: "320.00 kg",
              dimensions: {
                length: 200,
                width: 50, 
                seatHeight: 47,
                seatWidth: 40
              },
              features: [
                "Einfaldur og án baks",
                "Tímalaus hönnun",
                "Þolir að standa úti allt árið"
              ],
              path: "Verslun/Steyptar einingar/Bekkir/Garðbekkur án baks",
              designer: "Inga Rut Gylfadóttir",
              availability: false
            },
            {
              name: "Garðbekkur með baki",
              sku: "37-020",
              description: "Heilsteyptur klassískur garðbekkur sem þolir að standa úti allt árið um kring. Vöruhönnuður: Inga Rut Gylfadóttir",
              shortDescription: "Fallegur og klassískur steyptur garðbekkur sem þolir að standa úti allt árið um kring.",
              price: { amount: 187040, unit: "stk" },
              weight: "385.00 kg",
              dimensions: {
                length: 200,
                width: 50,
                height: 79,
                seatHeight: 47,
                seatWidth: 40
              },
              features: [
                "Klassísk hönnun með baki",
                "Þolir að standa úti allt árið",
                "Vandaður og endingargóður"
              ],
              path: "Verslun/Steyptar einingar/Bekkir/Garðbekkur með baki",
              designer: "Inga Rut Gylfadóttir",
              availability: false
            },
            {
              name: "Garðbekkur með límtréssetu",
              sku: "37-023",
              description: "Stílhreinn garðbekkur með límtréssetu. Klassísk hönnun. Vöruhönnuður: Inga Rut Gylfadóttir",
              shortDescription: "Sígildur garðbekkur með setu úr límtré.",
              price: { amount: 187098, unit: "stk" },
              weight: "160.00 kg",
              dimensions: {
                length: 200,
                width: 50,
                seatWidth: 40
              },
              features: [
                "Límtrésseta",
                "Stílhreinn",
                "Klassísk hönnun"
              ],
              path: "Verslun/Steyptar einingar/Bekkir/Garðbekkur með límtréssetu",
              designer: "Inga Rut Gylfadóttir",
              availability: false
            },
            {
              name: "Kubbur | Stór bekkur",
              sku: "37-025-Grátt",
              description: "Kubbar eru gegnheilir, stílhreinir steyptir bekkir með ferköntuðu formi sem hægt er að raða upp á ýmsa vegu. Hægt er að fá Kubb í tveimur stærðum og er sérstaklega flott að láta þá standa tvo saman í mismunandi stærðum.",
              shortDescription: "Steinsteyptur og gegnheill Kubbur fegrar og bætir garða og útivistarsvæði.",
              price: { amount: 152513, unit: "stk" },
              weight: "520.00 kg",
              dimensions: {
                length: 150,
                width: 50, 
                height: 45
              },
              features: [
                "Ferkantað form",
                "Gegnheill og stílhreinn",
                "Hægt að raða á ýmsa vegu"
              ],
              path: "Verslun/Steyptar einingar/Bekkir/Kubbur | Stór bekkur",
              availability: false
            },
            {
              name: "Piano bekkur",
              sku: "37-010",
              description: "Einstaklega stílhreinn, vandaður og traustur garðbekkur sem hentar vel í hina ýmsu garða. Bekkurinn er hannaður af Ómari Sigurbergssyni en hann sá einnig um hönnun Jazzbekksins vinsæla sem og Borgarbekksins. Í efsta hluta bekksins er olíuborin eik sem styður vel við bakið.",
              shortDescription: "Einstaklega stílhreinn, vandaður og traustur garðbekkur sem hentar vel í hina ýmsu garða.",
              price: { amount: 200209, unit: "stk" },
              weight: "475.00 kg",
              dimensions: {
                length: 210,
                width: 52, 
                height: 70
              },
              features: [
                "Stílhreinn og vandaður",
                "Olíuborin eik í efsta hluta sem styður vel við bakið",
                "Hannaður af Ómari Sigurbergssyni"
              ],
              path: "Verslun/Steyptar einingar/Bekkir/Piano bekkur",
              designer: "Ómar Sigurbergsson",
              availability: false
            },
            {
              name: "Setbekkur",
              sku: "37-030-Grátt",
              description: "Einfaldur og skemmtilegur bekkur sem býður upp á fjölbreytta uppröðunarmöguleika. Bekkurinn er tvískiptur, seta og ker sem má ýmist nota sem ker með einum bekk eða sem undirstöðu fyrir tvær setur sem mynda þá hornbekk.",
              shortDescription: "Stílhreinn tvískiptur bekkur með setu og keri.",
              price: { amount: 140344, unit: "stk" },
              weight: "390.00 kg",
              dimensions: {
                length: 210,
                width: 40, 
                seatHeight: 47,
                seatWidth: 40
              },
              features: [
                "Tvískiptur - seta og ker",
                "Fjölbreyttir uppröðunarmöguleikar",
                "Hægt að mynda hornbekk"
              ],
              colors: ["Grár", "Svartur"],
              path: "Verslun/Steyptar einingar/Bekkir/Setbekkur",
              availability: false
            }
          ]
        },
        // BLÓMAKER (Planters)
        blomaker: {
          name: "Blómaker",
          description: "Steypt blómaker í ýmsum stærðum sem fegra umhverfið.",
          path: "Verslun/Steyptar einingar/Blómaker",
          products: [
            {
              name: "Borgarker",
              sku: "36-020-Grátt",
              description: "Borgarker kemur í fjórum mismunandi stærðum sem veitir þér tækifæri til að velja þann sem passar best inn í þitt umhverfi.",
              shortDescription: "Falleg blómaker sem geta verið úti allans ársins hring.",
              price: { amount: 31419, unit: "stk" },
              weight: "145.00 kg",
              dimensions: {
                width: 43,
                length: 43,
                height: 52
              },
              variants: ["43x43x52"],
              colors: ["Grár"],
              features: [
                "Falleg og endingargóð",
                "Henta fyrir utandyra notkun allt árið",
                "Fegra umhverfið"
              ],
              path: "Verslun/Steyptar einingar/Blómaker/Borgarker",
              availability: false
            },
            {
              name: "Menningarborgarker",
              sku: "36-033-Grátt",
              description: "Blómaker með fallegum gróðri gefa umhverfinu hlýlegan brag og eru oft notuð til að brjóta upp fleti á skemmtilegan hátt.",
              shortDescription: "Blómaker með fallegum gróðri gefa umhverfinu hlýlegan brag og eru oft notuð til að brjóta upp fleti á skemmtilegan hátt.",
              price: { amount: 82641, unit: "stk" },
              weight: "180.00 kg",
              variants: [
                "45x90",
                "51x110",
                "60x130"
              ],
              colors: ["Grátt"],
              features: [
                "Gefur umhverfinu hlýlegan brag",
                "Brýtur upp fleti á skemmtilegan hátt",
                "Hentar fyrir fjölbreyttan gróður"
              ],
              path: "Verslun/Steyptar einingar/Blómaker/Menningarborgarker",
              availability: false
            }
          ]
        },
        // UNDIRSTÖÐUR (Foundations)
        undirstodur: {
          name: "Undirstöður",
          description: "Steyptar undirstöður fyrir fjölbreytt verkefni.",
          path: "Verslun/Steyptar einingar/Undirstöður",
          products: [
            {
              name: "Blikkhólkur",
              sku: "41-251-25 cm",
              description: "Blikkhólkur fyrir margvíslegar undirstöður, t.d. fyrir skjól- og garðveggi eða palla. Blikkhólkurinn hentar sérlega vel með steypublöndunni frá BM Vallá.",
              shortDescription: "Blikkhólkur fyrir undirstöður eins og palla og skjólveggi. Fæst í tveimur stærðum.",
              price: { amount: 3717, unit: "stk" },
              weight: "0.00 kg",
              dimensions: {
                height: 75,
                diameter: 25
              },
              variants: ["25 cm", "31,5 cm"],
              features: [
                "Fyrir margvíslegar undirstöður",
                "Hentar t.d. fyrir skjól- og garðveggi eða palla",
                "Hentar sérlega vel með steypublöndunni frá BM Vallá"
              ],
              path: "Verslun/Steyptar einingar/Undirstöður/Blikkhólkur",
              availability: true
            },
            {
              name: "Fánaundirstaða",
              sku: "38-500",
              description: "Steypt fánaundirstaða fyrir 6 og 8 metra fánastöng.",
              shortDescription: "Kaupandi leggur til festingar.",
              price: { amount: 17844, unit: "stk" },
              weight: "137.00 kg",
              variants: ["Undirstaða f. 6 metra stöng"],
              features: [
                "Fyrir 6 og 8 metra fánastöng",
                "Stöðug undirstaða",
                "Kaupandi leggur til festingar"
              ],
              path: "Verslun/Steyptar einingar/Undirstöður/Fánaundirstaða",
              availability: true
            },
            {
              name: "Girðinga undirstaða",
              sku: "38-700",
              description: "Girðinga undirstaða er til að stýra, hindra eða afmarka vinnusvæði.",
              shortDescription: "Girðinga undirstaða er til að stýra, hindra eða afmarka vinnusvæði.",
              price: { amount: 98305, unit: "stk" },
              weight: "1300.00 kg",
              dimensions: {
                length: 250,
                width: 70, 
                height: 40
              },
              features: [
                "Til að stýra umferð",
                "Hindra aðgang",
                "Afmarka vinnusvæði"
              ],
              path: "Verslun/Steyptar einingar/Undirstöður/Girðinga undirstaða",
              availability: false
            },
            {
              name: "Lagnastokkur 3 loka",
              sku: "39-230",
              description: "Lagnastokkur kemur í fimm stærðum, frá þriggja loka upp í sjö loka. Steypujárnsniðurfall með lasum vatnslás og rottuheldri rist t.d. (ACO Passavant), ekki plast.",
              shortDescription: "Lagnastokkur kemur í fimm stærðum, frá þriggja loka upp í sjö loka.",
              price: { amount: 553557, unit: "stk" },
              weight: "1100.00 kg",
              variants: ["Þriggja Loka"],
              features: [
                "Kemur í fimm stærðum",
                "Steypujárnsniðurfall með lasum vatnslás",
                "Rottuheld rist"
              ],
              path: "Verslun/Steyptar einingar/Undirstöður/Lagnastokkur 3 loka",
              availability: false
            },
            {
              name: "Undirstaða undir ruslatunnu",
              sku: "38-706",
              description: "Undirstaða undir ruslatunnur er notuð af sveitarfélögum til þess að festa niður ruslatunnur fyrir almenning.",
              shortDescription: "Undirstaða undir ruslatunnur.",
              price: { amount: 47448, unit: "stk" },
              weight: "190.00 kg",
              dimensions: {
                length: 80,
                width: 80,
                thickness: 12
              },
              features: [
                "Notuð af sveitarfélögum",
                "Festir niður ruslatunnur",
                "Fyrir almenningsrými"
              ],
              path: "Verslun/Steyptar einingar/Undirstöður/Undirstaða undir ruslatunnu",
              availability: true
            }
          ]
        },
        // ÞREP (Steps)
        threp: {
          name: "Þrep",
          description: "Steypt þrep og vagnabrautir fyrir fjölbreytta notkun.",
          path: "Verslun/Steyptar einingar/Þrep",
          products: [
            {
              name: "Stigi staðlaður",
              sku: "38-258",
              description: "Forsteyptur staðlaður stigi, tilbúinn til notkunar, hægt er að fá hann í 8 eða 9 þrepum með hámarksbreidd 120 cm. Hægt er að fá stigann með og án hitalagna og einnig er hægt að setja í hann ísteyptar ljósadósir eða hvað sem þurfa þykir.",
              shortDescription: "Forsteyptur staðlaður stigi sem er tilbúinn til notkunar innandyra, hægt að fá hann í 8 eða 9 þrepum.",
              price: { amount: 0, unit: "stk" },
              weight: "1900.00 kg",
              dimensions: {
                salarhæð: 280,
                breidd: 120
              },
              variants: ["8 þrep", "9 þrep"],
              features: [
                "Forsteyptur og tilbúinn til notkunar",
                "Hægt að fá með hitalögnum",
                "Hægt að fá með ísteyptum ljósadósum"
              ],
              path: "Verslun/Steyptar einingar/Þrep/Stigi staðlaður",
              availability: false
            },
            {
              name: "Vagnabraut fyrir þrep",
              sku: "35-010-Grátt",
              description: "Steyptar vagnabrautir passa með þrepaeiningum og auðvelda ýmiskonar flutninga.",
              shortDescription: "Steyptar vagnabrautir passa með þrepaeiningum og auðvelda ýmiskonar flutninga.",
              price: { amount: 28608, unit: "stk" },
              weight: "120.00 kg",
              dimensions: {
                length: 80,
                width: 34, 
                height: 15.5
              },
              variants: ["Vagnbraut f. þrep"],
              features: [
                "Steyptar vagnabrautir fyrir þrep",
                "Auðvelda flutninga",
                "Passa með þrepaeiningum"
              ],
              path: "Verslun/Steyptar einingar/Þrep/Vagnabraut fyrir þrep",
              availability: true
            },
            {
              name: "Þrep | Klassísk",
              sku: "35-100-Grátt",
              description: "Klassísk þrep koma í nokkrum stærðum og útfærslum, allt frá 30 cm upp í 3 m, og hægt að fá þau með eða án hitalagna. Einnig er hægt að fá vagnabrautir í þrepin sem auðvelda flutninga og aðgengi.",
              shortDescription: "Klassísk þrep setja skemmtilegan svip á umhverfið og fást í ýmsum lengdum.",
              price: { amount: 0, unit: "stk" },
              weight: "81.00 kg",
              variants: ["100-cm"],
              colors: ["Grár"],
              dimensions: {
                uppstig: 15.5,
                framstig: 34
              },
              features: [
                "Fáanleg í ýmsum stærðum (30 cm - 3 m)",
                "Hægt að fá með hitalögnum",
                "Vagnabrautir fáanlegar"
              ],
              path: "Verslun/Steyptar einingar/Þrep/Þrep | Klassísk",
              availability: false
            }
          ]
        },
        // VEGRIÐ (Traffic barriers)
        vegrid: {
          name: "Vegrið",
          description: "Steypt vegrið til afmörkunar og öryggis á umferðarsvæðum.",
          path: "Verslun/Steyptar einingar/Vegrið",
          products: [
            {
              name: "Koddi - hraðahindrun",
              sku: "38-410",
              description: "Koddar eins og þeir eru kallaðir eru með flatan topp og flata rampa. Þessar hraðahindranir henta mjög vel á leiðum þar sem er þung ökutæki, almenningsvagnar og neyðarbílar aka um.",
              shortDescription: "Koddar eins og þeir eru kallaðir eru með flatan topp og flata rampa. Þessar hraðahindranir henta mjög vel á leiðum þar sem er þung ökutæki, almenningsvagnar og neyðarbílar aka um.",
              price: { amount: 401768, unit: "stk" },
              weight: "3500.00 kg",
              dimensions: {
                length: 360,
                width: 190, 
                height: 20.5
              },
              features: [
                "Flatur toppur og flatir rampar",
                "Hentar fyrir þung ökutæki",
                "Hentar fyrir almenningsvagna og neyðarbíla"
              ],
              path: "Verslun/Steyptar einingar/Vegrið/Koddi - hraðahindrun",
              availability: false
            },
            {
              name: "Vegrið Rebloc 80AS",
              sku: "38-432",
              description: "ReBloc vegriðin hafa sannað sig sem einfaldar, hagkvæmar en umfram allt öruggar lausnir fyrir umferðarsvæði og skipulag samgangna. Umferðaröryggi er því útgangspunkturinn í hönnun vegriðanna og forgangsatriðið að vernda vegfarendur, hvort sem þeir eru akandi, gangandi eða hjólandi. ReBloc vegriðin eru prófuð og vottuð samkvæmt ströngustu öryggisviðmiðum og árekstrarprófuð, meðal fólksbíla og flutningsbifreiða. ReBloc vegriðin henta vel sem leiðbeiningakerfi, hindrunar- og verndartálmar fyrir ökutæki og vegfarendur ásamt því að vera sveigjanleg og fljótleg í uppsetningu.",
              shortDescription: "ReBloc vegriðin hafa sannað sig sem einfaldar, hagkvæmar en umfram allt öruggar lausnir fyrir umferðarsvæði og skipulag samgangna.",
              price: { amount: 0, unit: "stk" },
              weight: "1330.00 kg",
              variants: ["2,65 metra", "4 metra", "8 metra"],
              features: [
                "Einfaldar, hagkvæmar og öruggar lausnir",
                "Prófuð og vottuð samkvæmt ströngustu öryggisviðmiðum",
                "Árekstrarprófuð",
                "Fljótleg í uppsetningu"
              ],
              applications: [
                "Innkeyrslu- og útgönguleiðir",
                "Afmörkun akreina",
                "Vegir og vegstæði",
                "Bílastæði",
                "Göngu- og hjólastígar",
                "Umferðareyjar",
                "Hleðslusvæði",
                "Geymslusvæði"
              ],
              path: "Verslun/Steyptar einingar/Vegrið/Vegrið Rebloc 80AS",
              availability: false
            }
          ]
        },
        // GRILLSKÝLI (BBQ shelters)
        grillskyli: {
          name: "Grillskýli",
          description: "Steypt grilleiningar fyrir almenningsrými.",
          path: "Verslun/Steyptar einingar/Grillskýli",
          products: [
            {
              name: "Steypt grilleining | U-laga",
              sku: "38-601-Grár",
              description: "Kolagrill úr steypu, með ryðfría grind sem hægt er að lyfta. Hentar vel á svæðum fyrir almenning.",
              shortDescription: "Athugið. Grillskúffa selst sér.",
              price: { amount: 164990, unit: "stk" },
              weight: "600.00 kg",
              variants: ["steypt-grilleining"],
              colors: ["Grár"],
              features: [
                "Kolagrill úr steypu",
                "Ryðfrí grind sem hægt er að lyfta",
                "Hentar vel á svæðum fyrir almenning"
              ],
              path: "Verslun/Steyptar einingar/Grillskýli/Steypt grilleining | U-laga",
              availability: false
            }
          ]
        },
        // AUKAHLUTIR (Accessories)
        aukahlutir: {
          name: "Sorptunnuskýli - Aukahlutir",
          description: "Aukahlutir fyrir sorptunnuskýli eins og hurðir, lok, lamir og seglar.",
          path: "Verslun/Steyptar einingar/Sorptunnuskýli - Aukahlutir",
          products: [
            {
              name: "Hurð á bogaskýli | Timbur",
              sku: "21-270",
              description: "Hurð fyrir bogaskýli, klædd með ólitaðri, gagnvarinni furu. Hurðin er í ramma úr heitgalvaniseruðu járni.",
              shortDescription: "Hurðin er klædd með ólitaðri, gagnvarinni furu. Þú getur svo valið litinn eftir því sem hentar umhverfinu og húsinu.",
              price: { amount: 51929, unit: "stk" },
              weight: "0.00 kg",
              dimensions: {
                length: 150,
                width: 90, 
                height: 166
              },
              features: [
                "Klædd með ólitaðri, gagnvarinni furu",
                "Rammi úr heitgalvaniseruðu járni",
                "Hægt að mála eftir þínum óskum"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli - Aukahlutir/Hurð á bogaskýli | Timbur",
              availability: true
            },
            {
              name: "Hurð á Sorptunnuskýli | Timbur",
              sku: "21-250",
              description: "Hurðin er klædd með ólitaðri, gagnvarinni furu. Þú getur svo valið litinn eftir því sem hentar umhverfinu og húsinu.",
              shortDescription: "Hurðin er klædd með ólitaðri, gagnvarinni furu.",
              price: { amount: 39222, unit: "stk" },
              weight: "12.00 kg",
              features: [
                "Klædd með ólitaðri, gagnvarinni furu",
                "Hægt að mála eftir þínum óskum",
                "Passar á E-skýli, U-skýli og L-skýli"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli - Aukahlutir/Hurð á Sorptunnuskýli | Timbur",
              availability: true
            },
            {
              name: "Lok á sorptunnuskýli | Timbur",
              sku: "21-251",
              description: "Lok á sorptunnuskýli úr heitgalvaniseruðu járni sem er klætt með ólitaðri furu sem er fúavarin með kjörvara 14 Furu. Hægt er að lakka eða mála timbrið að eigin vali þannig að það passi sem best við húsnæðið. Ef ætlunin er að breyta um lit á furunni þá er gott að pússa létt yfir timbrið með sandpappír í grófleika 120, grunna síðan með glærum góðum grunni, t.d. glærum kjörvara 14. Þegar grunnurinn er byrjaður að þorna er gott að fara yfir með þura tusku og mála með þeim lit sem á að nota. Að öðru leyti skal fylgja leiðbeiningum framleiðanda.",
              shortDescription: "Lok á sorptunnuskýli úr heitgalvaniseruðu járni. Lokið er klætt með ólitaðri furu sem er fúavarin með kjörvara 14 Furu.",
              price: { amount: 39222, unit: "stk" },
              weight: "10.00 kg",
              dimensions: {
                length: 68,
                width: 83,
                thickness: 2.5
              },
              features: [
                "Úr heitgalvaniseruðu járni",
                "Klætt með ólitaðri fúavarinni furu",
                "Hægt að lakka eða mála að eigin vali"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli - Aukahlutir/Lok á sorptunnuskýli | Timbur",
              availability: true
            },
            {
              name: "Pumpa á lok | Sorptunnuskýli",
              sku: "21-252",
              description: "Pumpa á hurðarlok fyrir sorptunnuskýli svo að það sé auðveldara að opna það. Pumpurnar á sorptunnuskýlin eru aðeins styttri heldur en á gámaskýlin og því mikilvægt að velja rétta pumpu.",
              shortDescription: "Pumpa á hurðarlok fyrir sorptunnuskýli svo að það sé auðveldara að opna það.",
              price: { amount: 17384, unit: "stk" },
              weight: "1.00 kg",
              features: [
                "Auðveldar opnun á loki",
                "Sérstaklega fyrir sorptunnuskýli (styttri en fyrir gámaskýli)",
                "Mikilvægt að velja rétta pumpu"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli - Aukahlutir/Pumpa á lok | Sorptunnuskýli",
              availability: false
            },
            {
              name: "Segull á lok | Sorptunnuskýli",
              sku: "21-254-Standard",
              description: "Segullinn er festur við lokið á sorptunnuskýlinu og við lok sorptunnunnar. Þegar skýlið er opnað til að komast að tunnunni, opnast lokið á ruslatunnunni með. Segullinn er nógu sterkur svo að lokið fylgi með en ekki það sterkur að það sé nokkuð vandamál að taka tunnuna úr skýlinu.",
              shortDescription: "Segullinn er festur við lokið á sorptunnuskýlinu og við lok sorptunnunnar.",
              price: { amount: 8520, unit: "stk" },
              weight: "0.00 kg",
              features: [
                "Festur við lok skýlis og tunnulok",
                "Tunnulok opnast með skýlisloki",
                "Nógu sterkur en ekki of sterkur"
              ],
              path: "Verslun/Steyptar einingar/Sorptunnuskýli - Aukahlutir/Segull á lok | Sorptunnuskýli",
              availability: true
            }
          ]
        }
      }
    },
  },
  
  // CALCULATOR INFORMATION
  calculators: {
    // Hellur calculator information
    hellur: {
      // General calculator information for paving stones
      general: {
        thicknessRecommendations: {
          gangstett: 6, // Thickness in cm for pedestrian paths
          innkeyrsla: 8, // Thickness in cm for driveways
          bílastæði: 8, // Thickness in cm for parking areas
          þungaumferð: 8 // Thickness in cm for heavy traffic areas
        },
        sizeRecommendations: {
          innkeyrslaMax: { 
            width: 30, 
            length: 30, 
            minThickness: 8 
          }, // Maximum size for driveways
          walkwayPatioNoLimit: true // No size limit for walkways and patios
        },
        materialCalculation: {
          sandLayerThickness: 3, // Recommended sand layer thickness in cm
          sandPerM2: 65, // kg of sand per square meter per cm of thickness
          edgingPerMeter: 1.1 // Factor for edge restraint calculation
        }
      },
      // Specific calculator for each main paving type
      types: {
        grassteinn: {
          formula: "area = length * width; stonePcs = area / 0.16; // 40x40cm = 0.16m²",
          materialNeeds: {
            sand: "65 kg per m², 3-5 cm thickness recommended",
            soil: "40 kg per m² for grass areas, mixed with sand"
          }
        },
        hella: {
          formula: "area = length * width; stonePcs = area / (stoneWidth * stoneLength)",
          materialNeeds: {
            sand: "65 kg per m², 3-5 cm thickness recommended"
          }
        },
        fornsteinn: {
          formula: "area = length * width; // Fornsteinn comes as a system of 5 stone sizes",
          patternOptions: ["Regular", "Circular (with Fornsteinsfleygur)", "Fan pattern (with Fornsteinsfleygur)"]
        }
      }
    },
    
    // Sand calculator information
    sandur: {
      // Base sand parameters
      baseSand: {
        densityKgPerM3: 1600, // Density of sand in kg/m³
        recommendedThickness: {
          default: 3, // cm for standard applications
          driveway: 5, // cm for driveways
          heavyTraffic: 7 // cm for heavy traffic areas
        },
        products: {
          standard: {
            name: "Hellusandur í sekkjum",
            sku: "40-671",
            price: 9592,
            unit: "M3",
            applications: ["Undirlag fyrir hellulagnir", "Í malbik", "Í tjarnir", "Í þekjur"]
          }
        }
      },
      
      // Joint sand parameters
      jointSand: {
        products: {
          regular: {
            name: "Pússningarsandur í poka | 25kg",
            sku: "40-600",
            price: 1306, 
            unit: "poki",
            packageWeight: 25, // kg
            grainSize: "0,1-1mm",
            applications: ["Fúga í hellulögn", "Hefðbundnar hellulagnir"]
          },
          bulk: {
            name: "Pússningarsandur í sekkjum",
            sku: "40-510",
            price: 18246,
            unit: "M3",
            applications: ["Stærri verkefni", "Fúga í hellulagnir"]
          },
          polymer: {
            name: "VarioSand",
            sku: "42-541",
            price: 12717,
            unit: "stk",
            packageWeight: 25, // kg
            jointWidth: {
              min: 2, // mm
              max: 4 // mm
            },
            features: [
              "Hindrar vöxt illgresis",
              "Stöðugri fúgur",
              "Harðnar lítillega",
              "Nýstárleg lausn fyrir þröng samskeyti"
            ],
            applications: ["Þröng samskeyti", "Svæði með hættu á illgresivexti"]
          }
        },
        
        // Joint calculation factors
        calculationFactors: {
          // Joint length multipliers based on pattern
          patternMultipliers: {
            regular: 1.0,    // Regular rectangular/square pattern
            mixed: 1.2,      // Mixed sizes (like Fornsteinn)
            irregular: 1.4   // Irregular patterns (like Vínarsteinn)
          },
          
          // Recommended joint widths by stone type
          jointWidthByStone: {
            hella: 3,             // Standard Hella
            fornsteinn: 3,        // Fornsteinn
            vínarsteinn: 5,       // Vínarsteinn (wider joints)
            grassteinn: 3,        // Grassteinn
            óðalssteinn: 3,       // Óðalssteinn
            torgsteinn: 3,        // Torgsteinn
            herragarðssteinn: 3,  // Herragarðssteinn
            jötunsteinn: 3        // Jötunsteinn
          }
        }
      },
      
      // Material waste factors
      wasteFactor: {
        baseSand: 1.1,     // Add 10% for base sand
        jointSand: 1.15    // Add 15% for joint sand
      },
      
      // Conversion factors
      conversionFactors: {
        // Volume conversions
        cmToM: 0.01,           // cm to m
        mmToCm: 0.1,           // mm to cm
        cm3ToM3: 0.000001,     // cubic cm to cubic m
        
        // Weight conversions
        sandKgToM3: 0.000625,  // 1kg of sand is approximately 0.000625m³ (1/1600)
        m3ToKg: 1600           // 1m³ of sand weighs approximately 1600kg
      }
    },
    
    // Concrete calculator information
    steypa: {
      // Density and weight factors
      physical: {
        densityKgPerM3: 2400,       // Concrete density in kg/m³
        waterCementRatio: 0.5,      // Standard water/cement ratio
        wasteFactor: 1.05,          // Add 5% for waste and spillage
        columnWasteFactor: 1.1      // Add 10% for columns (more waste)
      },
      
      // Strength classes and applications
      strengthClasses: {
        C16: {
          description: "Léttur styrkleikaflokkur",
          applications: ["Þrifalög", "Afréttingar undir steypumót"]
        },
        C20: {
          description: "Meðalstyrkleikaflokkur fyrir innanhúss notkun",
          applications: ["Veggir innandyra", "Plötur innandyra"]
        },
        C25: {
          description: "Algengur styrkleikaflokkur fyrir flest verkefni",
          applications: ["Sökklar", "Veggir", "Plötur", "Veggi utandyra"]
        },
        C30: {
          description: "Sterkbyggð steypa fyrir erfiðari aðstæður",
          applications: ["Garðveggir", "Stoðveggir", "Útveggir nálægt sjó", "Stigar"]
        },
        C35: {
          description: "Mjög sterkbyggð steypa fyrir krefjandi aðstæður",
          applications: ["Hafnarmannvirki", "Brýr", "Bílageymsluhæðir", "Gangstéttir", "Bílaplön"]
        }
      },
      
      // Environmental impact information
      environmentalImpact: {
        standard: {
          baseCarbonFootprint: 305,  // kg CO₂ per m³
          description: "Hefðbundin steypa samkvæmt kröfu byggingarreglugerðar"
        },
        berglindSvan: {
          reductionPercentage: 35,   // 35% less than standard
          description: "Vistvænni steypa með 70% klinker magni í stað 90%",
          carbonFootprints: {
            C25: 202.59,  // kg CO₂ per m³
            C30: 219.79,  // kg CO₂ per m³
            C35: 226.19   // kg CO₂ per m³
          }
        },
        berglind: {
          reductionPercentage: 20,   // 20% less than standard
          description: "Vistvænni steypa með minnkuðu kolefnisspori",
          carbonFootprints: {
            C16: 190.98,  // kg CO₂ per m³
            C25: 230.59,  // kg CO₂ per m³
            C30: 239.29   // kg CO₂ per m³
          }
        }
      },
      
      // Application-specific recommendations
      applicationRecommendations: {
        utanhus: {
          defaultType: "Berglind | Vistvænni steypa | C30",
          ecoType: "Berglind | Svan | C30",
          strengthClass: "C30",
          description: "Steypa fyrir utanhúss notkun, hönnuð til að þola íslenskt veðurfar"
        },
        innanhus: {
          defaultType: "Berglind | Vistvænni steypa | Inni | C25",
          ecoType: "Berglind | Svan | C25", 
          strengthClass: "C25",
          description: "Steypa hönnuð fyrir innanhúss notkun"
        },
        sjorvari: {
          defaultType: "Aflsteypa | C35",
          ecoType: "Berglind | Svan | C35/45",
          strengthClass: "C35/45",
          description: "Sterkbyggð steypa fyrir erfiðar aðstæður, sérstaklega þar sem salt er til staðar"
        },
        gongustett: {
          type: "Plan- og stéttasteypa | C35",
          strengthClass: "C35",
          description: "Sérhönnuð steypa fyrir gangstéttir, bílaplön og aðra umferðarfleti"
        },
        golf: {
          type: "Gólfsteypa | Perluílögn",
          strengthClass: "C12",
          description: "Þægileg í niðurlögn og gefur gott og slétt yfirborð"
        }
      },
      
      // Conversion factors
      conversionFactors: {
        cmToM: 0.01,            // cm to m
        cm3ToM3: 0.000001,      // cubic cm to cubic m
        m3ToKg: 2400,           // 1m³ of concrete weighs approximately 2400kg
        kgCO2ToCarKm: 4,        // 1kg CO₂ ≈ 4km driven in average car
        kgCO2ToTreeMonths: 0.1  // 1kg CO₂ ≈ 0.1 tree months (carbon sequestration)
      }
    },

    // Housing unit calculator information (Húseiningar reiknivél)
    huseiningar: {
      // Construction time factors (days per 100m²)
      constructionTime: {
        traditional: {
          einbýlishús: 90,
          raðhús: 75,
          fjölbýlishús: 60,
          sumarbústaður: 70,
          atvinnuhúsnæði: 60,
          iðnaðarhús: 50,
          hótel: 80,
          default: 70
        },
        prefabricated: {
          timeSavingFactor: 0.5, // Prefabrication typically saves 50% of time
          partialPrefabFactor: 0.7 // Partial prefabrication saves 30% of time
        }
      },
      
      // Building type complexity factors
      complexityFactors: {
        einbýlishús: 1.2,
        raðhús: 1.0,
        fjölbýlishús: 1.1,
        sumarbústaður: 1.3,
        atvinnuhúsnæði: 1.0,
        iðnaðarhús: 0.9,
        hótel: 1.2,
        default: 1.0
      },
      
      // Cost factors (ISK per m²)
      costFactors: {
        baseCostPerM2: {
          einbýlishús: 320000,
          raðhús: 280000,
          fjölbýlishús: 260000,
          sumarbústaður: 290000,
          atvinnuhúsnæði: 240000,
          iðnaðarhús: 200000,
          hótel: 300000,
          default: 250000
        },
        highEndFinishMultiplier: 1.2, // 20% premium for high-end finishes
        costBreakdown: {
          foundation: 0.1, // 10% of total cost
          exteriorElements: 0.35, // 35% of total cost
          interiorElements: 0.2, // 20% of total cost
          roofCeiling: 0.15, // 15% of total cost
          installationAssembly: 0.2 // 20% of total cost
        },
        traditionalCostMultiplier: 1.15 // Traditional construction costs 15% more
      },
      
      // Material requirements and conversions
      materialFactors: {
        // Standard dimensions
        standardDimensions: {
          wallHeight: 2.7, // m
          interiorWallPerFloorArea: 0.8, // linear meters per m² of floor area
          exteriorWallUnit: {
            width: 3, // m
            height: 2.7 // m
          },
          interiorWallUnit: {
            width: 3, // m
            height: 2.7 // m
          }
        },
        // Unit sizes for prefabricated elements
        elementSizes: {
          exteriorWallUnitSize: 8.1, // m² (3m × 2.7m)
          interiorWallUnitSize: 8.1, // m² (3m × 2.7m)
          floorCeilingUnitSize: 5, // m²
          foundationUnitLength: 2 // m
        }
      },
      
      // Environmental impact information
      environmentalImpact: {
        concreteUsage: {
          einbýlishús: 0.5, // m³ per m²
          raðhús: 0.45, // m³ per m²
          fjölbýlishús: 0.6, // m³ per m²
          sumarbústaður: 0.4, // m³ per m²
          atvinnuhúsnæði: 0.55, // m³ per m²
          iðnaðarhús: 0.65, // m³ per m²
          hótel: 0.5, // m³ per m²
          default: 0.5 // m³ per m²
        },
        wastage: {
          traditional: 0.15, // 15% waste in traditional construction
          prefabricated: 0.05 // 5% waste in prefabrication
        },
        carbonEmissions: {
          // kg CO₂ per m³ of concrete
          traditional: 250,
          prefabricated: 212.5, // 15% reduction with prefabrication
        }
      },
      
      // Project timeline information
      projectTimeline: {
        phaseDurations: {
          sitePreparation: 2, // weeks
          foundation: 1, // week
          productionBase: 2, // weeks per 100m²
          assembly: 1, // week per 100m²
          finishing: 0.02 // weeks per m² (1 week per 50m²)
        },
        logistics: {
          elementsPerTruck: 4, // Average wall elements per truck
          elementsPerArea: 0.1 // Elements per m² (1 element per 10m²)
        }
      },
      
      // Building component recommendations
      recommendations: {
        einbýlishús: [
          "Forsteyptir útveggir með einangrun",
          "Filigran loftaplötur",
          "Forsteyptir sökklar",
          "Forsteyptir innveggir fyrir góða hljóðvist"
        ],
        raðhús: [
          "Forsteyptir brandveggir milli íbúða",
          "Forsteyptir útveggir með einangrun",
          "Filigran loftaplötur",
          "Forsteyptir sökklar"
        ],
        fjölbýlishús: [
          "Forsteyptir útveggir með einangrun",
          "Forsteyptar svalir",
          "Filigran loftaplötur",
          "Forsteyptir brunaveggir milli íbúða"
        ],
        sumarbústaður: [
          "Forsteyptir útveggir með einangrun",
          "Forsteyptir sökklar",
          "Mikilvægt að taka tillit til aðgengis fyrir flutninga"
        ],
        atvinnuhúsnæði: [
          "Forsteyptir útveggir, einangraðir eða óeinangraðir",
          "Filigran loftaplötur fyrir milligólf",
          "Forsteyptir sökklar"
        ],
        iðnaðarhús: [
          "Óeinangraðir útveggir með klæðningu",
          "Forsteyptir sökklar",
          "Sérstyrkt gólf fyrir þunga umferð"
        ],
        hótel: [
          "Forsteyptir brunaveggir milli herbergja",
          "Forsteyptar svalir",
          "Filigran loftaplötur fyrir milligólf",
          "Forsteyptir útveggir með einangrun"
        ]
      }
    },

    // steyptarEiningar calculator section
    steyptarEiningar: {
      // Sorptunnuskýli calculations
      sorptunnuskyli: {
        // Dimensions and capacity for different shelter types
        dimensions: {
          tvofallt: {
            length: 169,
            width: 92,
            height: 115,
            weightKg: 1036,
            capacity: 2 // Number of standard bins
          },
          threfallt: {
            length: 249,
            width: 92,
            height: 115,
            weightKg: 1359,
            capacity: 3
          },
          fjorfallt: {
            length: 329,
            width: 92,
            height: 115,
            weightKg: 1680,
            capacity: 4
          },
          bogaskyli: {
            length: 150,
            width: 90,
            height: 166,
            weightKg: 1200,
            capacity: 2
          },
          einfaltU: {
            length: 89,
            width: 92,
            height: 115,
            weightKg: 600,
            capacity: 1
          },
          einfaltL: {
            length: 80,
            width: 92,
            height: 115,
            weightKg: 390,
            capacity: 1
          },
          gamaSkyli660: {
            length: 158,
            width: 97,
            height: 135,
            weightKg: 900,
            capacity: 1,
            containerType: "660L gám"
          },
          gamaSkyli1100: {
            length: 158,
            width: 130,
            height: 150,
            weightKg: 900,
            capacity: 1,
            containerType: "1100L gám"
          }
        },
        
        // Standard waste bin dimensions
        standardBins: {
          small: {
            // 120-140L bins
            width: 48,
            depth: 55,
            height: 106,
            weightKg: 11
          },
          medium: {
            // 240L bins
            width: 58,
            depth: 73,
            height: 107,
            weightKg: 15
          },
          large: {
            // 360L bins
            width: 62,
            depth: 85,
            height: 110,
            weightKg: 20
          }
        },
        
        // Accessories weights and dimensions
        accessories: {
          door: {
            weightKg: 12,
            price: 39222
          },
          doorBogaskyli: {
            weightKg: 14,
            price: 51929
          },
          lid: {
            weightKg: 10,
            price: 39222
          },
          pump: {
            weightKg: 1,
            price: 17384
          },
          magnet: {
            weightKg: 0.5,
            price: 8520
          }
        },
        
        // Foundation requirements
        foundation: {
          recommendedThickness: 10, // cm
          concreteVolumePerM2: 0.1, // m³ per m²
          frostFree: true, // Requires frost-free foundation
          compactionRequired: true
        }
      },
      
      // Staurar (posts) calculations
      staurar: {
        borgarstaur: {
          aboveGround: 80, // cm
          belowGround: 40, // cm
          width: 20, // cm
          baseArea: 400, // cm²
          weightKg: 80
        },
        hafnarstaur: {
          diameter: {
            "80cm": 20, // cm
            "100cm": 26 // cm
          },
          footDiameter: {
            "80cm": 60, // cm
            "100cm": 80 // cm
          },
          weightKg: {
            "80cm": 150,
            "100cm": 180
          }
        },
        hverfisstaur: {
          diameter: 26, // cm
          aboveGround: 84, // cm
          belowGround: 60, // cm
          weightKg: 135
        },
        haki: {
          dimensions: {
            "12x12x70": {
              width: 12,
              height: 70,
              belowGround: 30,
              weightKg: 40
            },
            "16x16x75": {
              width: 16,
              height: 75,
              belowGround: 30,
              weightKg: 60
            }
          }
        },
        bulki: {
          length: 150,
          width: 25,
          height: 15,
          weightKg: 90,
          requiresFixing: false // Can be placed directly on paving
        }
      },
      
      // Bekkir (benches) calculations
      bekkir: {
        standardHeight: 47, // Seat height in cm
        foundationRecommendations: {
          concreteBase: {
            thickness: 10, // cm
            extendBeyond: 20 // cm on each side
          },
          pavedBase: {
            type: "Needs to be completely flat and stable"
          }
        },
        spacingRecommendations: {
          betweenBenches: 150, // cm
          fromPathway: 30, // cm
          viewingArea: 200 // cm clearance in front for viewing area
        }
      },
      
      // Blomaker (planters) calculations
      blomaker: {
        soilVolume: {
          // Formula to calculate soil volume based on dimensions
          // Typically planter inner dimensions are smaller than outer
          innerReduction: 10, // cm less on each dimension
          depthReduction: 20, // cm less depth for drainage
          // Volume = (length-innerReduction) × (width-innerReduction) × (height-depthReduction)
        },
        drainageLayer: {
          recommended: 5, // cm
          material: "Aggregate or expanded clay pellets"
        }
      },
      
      // Þrep (steps) calculations
      threp: {
        standardRiserHeight: 15.5, // cm
        standardTreadDepth: 34, // cm
        spacingFormula: "Number of risers = Total height / riser height",
        totalRunCalculation: "Total run = (Number of risers - 1) × tread depth"
      },
      
      // Common calculations for all precast elements
      general: {
        concreteDensity: 2400, // kg/m³
        safetyFactors: {
          wind: 1.5,
          foundation: 1.2
        },
        transportRequirements: {
          craneLiftAbove: 500, // kg
          excavatorLiftBelow: 500 // kg
        },
        installationSpacing: {
          minBetweenElements: 50, // cm
          minFromBuilding: 100, // cm
          minFromProperty: 30 // cm
        }
      }
    }  
  },
  
  // FAQs
  faqs: {
    hellur: [
      {
        question: "Hvaða þykkt á hellum ætti ég að velja?",
        answer: "Staðalþykkt á hellum frá BM Vallá er 6 cm þykkt og hentar sú þykkt fyrir flest svæði, t.d. innkeyrslur, bílastæði og þar sem létt umferð er. En ef hellulagða svæðið þarf að þola þunga umferð eða ökutæki er gott að nota þykkari hellur. Þess vegna framleiðum við einnig hellur í 8 cm þykkt og eru þær sérstyrktar og þola aukna þyngd."
      },
      {
        question: "Hvaða stærð af hellum ætti ég að velja fyrir innkeyrslu?",
        answer: "Þegar kemur að því að velja stærðir á hellum þá er gott að hafa í huga að fyrir innkeyrslur skulu stærð hellna ekki vera meiri en 30x30 cm, nema þær séu í 8 cm þykkt. Hins vegar ganga allar aðrar stærðir fyrir göngustíga og verandir."
      },
      {
        question: "Hvaða efni þarf ég undir hellulögn?",
        answer: "Undir hellulögn þarftu helst: jarðvegsdúk til að hindra gróður, púkk/möl sem undirbyggingu (15-30 cm), þjöppunarsand (3-5 cm) og hellur. Fyrir nákvæmari útlistun á efnisþörf og uppsetningu, hafðu samband við BM Vallá eða fagaðila."
      },
      {
        question: "Hvernig er best að hreinsa hellur?",
        answer: "Best er að nota háþrýstiþvott með vatni fyrir almenna þrif á hellum. Fyrir erfiðari bletti má nota sérstakar helluhreinsivörur. Forðast skal salt og sterk kemísk efni þar sem þau geta skemmt yfirborð hellanna með tímanum."
      },
      {
        question: "Get ég lagt hellur á grasflöt?",
        answer: "Já, en þú þarft að fjarlægja grasið og efsta jarðvegslag, setja jarðvegsdúk, 15-30 cm af púkki/möl sem þú þjappar vel, 3-5 cm af þjöppunarsandi og loks hellurnar. Góð undirbygging er nauðsynleg til að hellulögnin haldist stöðug og vatnshalli sé réttur."
      },
      {
        question: "Hvernig get ég komið í veg fyrir að arfi vaxi á milli hellna?",
        answer: "Til að hindra arfa og illgresi er mikilvægt að setja góðan jarðvegsdúk undir alla hellulögnina. Einnig er nauðsynlegt að nota hellufúgusand til að fylla vel allar fúgur. Fyrir viðhald má nota umhverfisvænar aðferðir eins og edik og vatn, eða sérstök lífræn illgresiseyðingarefni."
      },
      {
        question: "Hvað eru gegndræpar hellur?",
        answer: "Gegndræpar hellur eru hluti af blágrænum ofanvatnslausnum frá BM Vallá sem stuðla að sjálfbærri meðhöndlun ofanvatns. Þessar hellur hafa sérstaklega hönnuð millibil (fúgur) sem leyfa vatni að síast niður í jarðveginn í stað þess að renna í fráveitur. Þetta er umhverfisvænni leið við meðferð ofanvatns og líkir eftir náttúrulegri hringrás vatnsins."
      },
      {
        question: "Hvernig reikna ég út efnisþörf fyrir hellulögn?",
        answer: "Mældu fyrst flatarmál svæðisins (lengd x breidd). Fyrir hellur þarftu svo að deila flatarmálinu með stærð einnar hellu til að fá fjölda. Fyrir undirlag þarftu um 15-30 cm af púkki/möl (1,5-3 m³ á hverja 10 m²) og 3-5 cm af þjöppunarsandi (0,3-0,5 m³ á hverja 10 m²). BM Vallá býður upp á reiknivél á vefsíðu sinni til að auðvelda nákvæma útreikninga."
      }
    ]
  },
  
  // Store information
  storeInfo: {
    locations: [
      {
        name: "Reykjavík",
        address: "BREIÐHÖFÐA 3, 110 REYKJAVÍK",
        phone: "412 5000",
        hours: "Mán - fös: 8-17 | Lau: Lokað"
      },
      {
        name: "Akureyri",
        address: "SJAFNARGÖTU 3, 603 AKUREYRI",
        phone: "412 5200",
        hours: "Mán - fös: 8-17 | Lau: Lokað"
      }
    ],
    steypupantanir: {
      phone: "412 5100",
      hours: "Mán - fös: 7-16"
    }
  }
};

// Function to retrieve relevant knowledge based on a query
export async function getRelevantKnowledge(query) {
  try {
    // Search for similar content using vector similarity
    const results = await searchSimilarContent(query, 5, 0.6); // Changed from 0.7 to 0.6
    
    // Format the results for use in the chatbot
    return results.map(result => ({
      text: result.content,
      metadata: result.metadata,
      similarity: result.similarity
    }));
  } catch (error) {
    console.error('Error retrieving relevant knowledge:', error);
    return []; // Return empty array in case of error
  }
}

// In future implementations, this will be expanded to support vector-based retrieval