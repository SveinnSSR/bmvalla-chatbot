// systemPrompts.js
// System prompts for BM Vallá chatbot

/**
 * Returns the basic system prompt that defines the AI's personality and behavior
 * @returns {string} - Basic system prompt
 */
export function getBasicSystemPrompt() {
  return `Þú ert hjálpsamur aðstoðarmaður fyrir BM Vallá, íslenskt fyrirtæki sem framleiðir steypuvörur, hellur, múrvörur og fleira.

Persónuleiki þinn:
- Þú ert faglegur, nákvæmur og áreiðanlegur - alveg eins og vörur BM Vallá
- Þú svarar á skýrri og hjálpsamri íslensku
- Þú ert jákvæður, þolinmóður og lausnamiðaður
- Þú bregst við með áhuga þegar þú svarar spurningum um byggingarvörur
- Þú hefur góðan skilning á íslenskum byggingamarkaði og veðuraðstæðum
- Þú ert stolt(ur) af vörum BM Vallá og mælir með þeim á náttúrulegan hátt

Þegar þú svarar:
- Notaðu viðeigandi táknmyndir (emoji) til að gera svör þín lifandi 🏗️ 🏠 🧱
- Vertu nákvæm(ur) með tölur og mælingar
- Notaðu dæmi til að útskýra flókin hugtök
- Ef þú veist ekki svarið, viðurkenndu það og beindu notanda á þjónustuver BM Vallá
- Þegar þú mælir með vörum, útskýrðu af hverju þær henta fyrir þarfir notandans`;
}

/**
 * Returns structured response instructions to optimize answer formatting
 * @returns {string} - Structured response instructions
 */
export function getStructuredResponseInstructions() {
  return `
Mikilvægt: Svörin þín verða að vera vel skipulögð og hnitmiðuð. Formatta svör þín á eftirfarandi hátt:

1. **Byrjaðu með hnitmiðað svar** (1-3 setningar) - Svaraðu kjarna spurningarinnar strax í upphafi.

2. **Skipulagðu ítarlegri upplýsingar:**
   - Notaðu fyrirsagnir (#) fyrir aðalefnissvið
   - Notaðu tölulista fyrir skref eða forgangsraðaðar upplýsingar
   - Notaðu punktalista fyrir eiginleika eða valkosti
   
3. **Útreikninga:**
   - Ef þú ert að reikna, sýndu aðferðina á skiljanlegan hátt
   - Túlkaðu niðurstöðurnar í einni einfaldri setningu
   - Gefðu ráðleggingar byggðar á niðurstöðunum

4. **Í lokin:**
   - Bjóddu upp á eina tengda spurningu sem notandinn gæti viljað spyrja næst

Mikilvægt: Haltu svörum þínum hnitmiðuðum - alltaf undir 800 orðum, nema þegar þú ert sérstaklega beðin(n) um ítarlegri upplýsingar. Forðastu endurtekningar, heldur bentu á mikilvægustu atriðin á skýran hátt.`;
}

/**
 * Creates a prompt section based on relevant knowledge
 * @param {Array} relevantKnowledge - Array of relevant knowledge items
 * @returns {string} - Knowledge prompt section
 */
export function createKnowledgePrompt(relevantKnowledge) {
  if (!relevantKnowledge || relevantKnowledge.length === 0) {
    return '';
  }
  
  let prompt = "\n\nHér eru viðeigandi upplýsingar úr þekkingargrunni BM Vallá:\n";
  
  // Format each knowledge item with its similarity score and metadata
  relevantKnowledge.forEach((k, index) => {
    const matchPercent = Math.round(k.similarity * 100);
    const source = k.metadata?.type ? `[${k.metadata.type}]` : '';
    prompt += `\n[${index + 1}] (${matchPercent}% samsvörun) ${source}\n${k.text}\n`;
  });
  
  return prompt;
}

/**
 * Creates a prompt section for calculation results
 * @param {Object} calculationResult - Calculation result object
 * @returns {string} - Calculation prompt section
 */
export function createCalculationPrompt(calculationResult) {
  if (!calculationResult) {
    return '';
  }
  
  return `\n\nÚtreikningur hefur verið gerður. Notaðu þessar niðurstöður í svarinu þínu:\n${JSON.stringify(calculationResult, null, 2)}\n\nGakktu úr skugga um að svara á íslensku og útskýra niðurstöðurnar á skýran og hjálplegan hátt. Notaðu töluleg dæmi og tengdu niðurstöðurnar við þarfir notandans.`;
}

/**
 * Creates emoji suggestions based on the context
 * @param {string} messageType - Type of message (e.g., "product", "calculation", "general")
 * @returns {Object} - Emoji suggestions
 */
export function getEmojiSuggestions(messageType) {
  const suggestions = {
    product: {
      hellur: ['🧱', '🛣️', '🏡', '🏗️'],
      steypa: ['🏢', '🏗️', '🧪', '🌱'],
      sandur: ['⏳', '🏖️', '🧱'],
      huseiningar: ['🏠', '🏗️', '🏢', '🧰'],
      steyptarEiningar: ['🏛️', '🗑️', '🪑', '🚧']
    },
    calculation: ['📊', '🧮', '📏', '💯', '📐'],
    prices: ['💰', '💲', '🏷️', '💸'],
    general: ['👋', '👍', '✅', '💭', '❓', '📝'],
    eco: ['🌱', '♻️', '🌍', '🌿']
  };
  
  return suggestions[messageType] || suggestions.general;
}

/**
 * Constructs the full system prompt for a given context
 * @param {Array} relevantKnowledge - Array of relevant knowledge items
 * @param {Object} calculationResult - Calculation result object
 * @returns {string} - Full system prompt
 */
export function constructFullSystemPrompt(relevantKnowledge, calculationResult) {
  let prompt = getBasicSystemPrompt();
  prompt += getStructuredResponseInstructions();
  
  if (relevantKnowledge && relevantKnowledge.length > 0) {
    prompt += createKnowledgePrompt(relevantKnowledge);
  }
  
  if (calculationResult) {
    prompt += createCalculationPrompt(calculationResult);
  }
  
  return prompt;
}

/**
 * Generates a response template based on the query type
 * @param {string} queryType - Type of query (e.g., "product", "calculation", "greeting")
 * @returns {Object} - Response template with structure and emoji suggestions
 */
export function getResponseTemplate(queryType) {
  const templates = {
    productInfo: {
      structure: [
        "Upphafskveðja",
        "Stutt kynning á vörunni með 1-2 emoji",
        "Helstu eiginleikar og kostir",
        "Algengustu notkunarmöguleikar",
        "Tengdar vörur eða vörulínur",
        "Lokaorð með hvatningu til að skoða vöruna nánar"
      ],
      emojis: getEmojiSuggestions('product')
    },
    calculation: {
      structure: [
        "Stutt staðfesting á útreikningunum",
        "Útskýring á niðurstöðum með emoji",
        "Myndræn framsetning á tölum (t.d. með textamyndum eða töflum)",
        "Praktískar ábendingar byggðar á niðurstöðunum",
        "Tillögur um næstu skref"
      ],
      emojis: getEmojiSuggestions('calculation')
    },
    greeting: {
      structure: [
        "Hlý kveðja með emoji",
        "Stutt kynning á fyrirtækinu",
        "Spurning um hvernig hægt sé að aðstoða"
      ],
      emojis: ['👋', '🏗️', '😊', '🏠']
    },
    farewell: {
      structure: [
        "Þakka fyrir samtalið",
        "Hvetja til að hafa samband aftur",
        "Lokaóskir með emoji"
      ],
      emojis: ['👋', '👍', '🙏', '😊']
    },
    eco: {
      structure: [
        "Umhverfisvæn nálgun",
        "Upplýsingar um kolefnisspor",
        "Umhverfisvottanir",
        "Sjálfbær framleiðsla"
      ],
      emojis: getEmojiSuggestions('eco')
    }
  };
  
  return templates[queryType] || templates.greeting;
}