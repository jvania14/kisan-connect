export type SearchIntent =
  | "best"
  | "cheapest"
  | "highest_rated"
  | "nearest";

export type ParsedMachinerySearch = {
  originalQuery: string;
  category: string | null;
  durationDays: number | null;
  location: string | null;
  intent: SearchIntent;
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Tractor: [
    "tractor",
    "tractors",
    "ट्रैक्टर",
    "ٽرેક્ટર",
    "ਟਰੈਕਟਰ",
    "ট্রাক্টর",
    "ट्रॅक्टर",
    "ટ્રેક્ટર",
    "டிராக்டர்",
    "ట్రాక్టర్",
    "ಟ್ರ್ಯಾಕ್ಟರ್",
    "ട്രാക്ടർ",
  ],

  Harvester: [
    "harvester",
    "harvestor",
    "हार्वेस्टर",
    "হারভেস্টার",
    "ਹਾਰਵੈਸਟਰ",
    "ہارویسٹر",
    "હાર્વેસ્ટર",
    "ஹார்வெஸ்டர்",
    "హార్వెస్టర్",
    "ಹಾರ್ವೆಸ್ಟರ್",
    "ഹാർവെസ്റ്റർ",
  ],

  Rotavator: [
    "rotavator",
    "rotavator machine",
    "रोटावेटर",
    "ਰੋਟਾਵੇਟਰ",
    "রোটাভেটর",
    "रोटाव्हेटर",
    "રોટાવેટર",
    "ரோட்டவேட்டர்",
    "రోటావేటర్",
    "ರೋಟಾವೇಟರ್",
    "റോട്ടവേറ്റർ",
  ],

  "Seed Drill": [
    "seed drill",
    "seeddrill",
    "सीड ड्रिल",
    "बीज ड्रिल",
    "ਬੀਜ ਡਰਿੱਲ",
    "বীজ ড্রিল",
    "સીડ ડ્રિલ",
    "சீட் டிரில்",
    "సీడ్ డ్రిల్",
    "ಸೀಡ್ ಡ್ರಿಲ್",
    "സീഡ് ഡ്രിൽ",
  ],

  Cultivator: [
    "cultivator",
    "cultivation machine",
    "कल्टीवेटर",
    "कल्टीवेटर मशीन",
    "ਕਲਟੀਵੇਟਰ",
    "কাল্টিভেটর",
    "કલ્ટિવેટર",
    "கல்டிவேட்டர்",
    "కల్టివేటర్",
    "ಕಲ್ಟಿವೇಟರ್",
    "കൾട്ടിവേറ്റർ",
  ],

  Thresher: [
    "thresher",
    "threshing machine",
    "थ्रेशर",
    "थ्रेसर",
    "ਥ੍ਰੈਸ਼ਰ",
    "থ্রেশার",
    "થ્રેશર",
    "த்ரெஷர்",
    "త్రెషర్",
    "ಥ್ರೆಶರ್",
    "ത്രെഷർ",
  ],

  Sprayer: [
    "sprayer",
    "spray machine",
    "स्प्रेयर",
    "स्प्रे मशीन",
    "ਸਪਰੇਅਰ",
    "স্প্রেয়ার",
    "સ્પ્રેયર",
    "ஸ்ப்ரேயர்",
    "స్ప్రేయర్",
    "ಸ್ಪ್ರೇಯರ್",
    "സ്പ്രേയർ",
  ],
};

const NUMBER_WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,

  एक: 1,
  दो: 2,
  तीन: 3,
  चार: 4,
  पांच: 5,
  पाँच: 5,
  छह: 6,
  छः: 6,
  सात: 7,
  आठ: 8,
  नौ: 9,
  दस: 10,

  एकदा: 1,
  दोन: 2,
 
  नऊ: 9,
  दहा: 10,

  ਇੱਕ: 1,
  ਦੋ: 2,
  ਤਿੰਨ: 3,
  ਚਾਰ: 4,
  ਪੰਜ: 5,
  ਛੇ: 6,
  ਸੱਤ: 7,
  ਅੱਠ: 8,
  ਨੌਂ: 9,
  ਦਸ: 10,

  দুই: 2,
  তিন: 3,
  চার: 4,
  পাঁচ: 5,
  ছয়: 6,
  সাত: 7,
  আট: 8,
  নয়: 9,
  দশ: 10,

  એક: 1,
  બે: 2,
  ત્રણ: 3,
  ચાર: 4,
  પાંચ: 5,
  છ: 6,
  સાત: 7,
  આઠ: 8,
  નવ: 9,
  દસ: 10,

  ஒன்று: 1,
  இரண்டு: 2,
  மூன்று: 3,
  நான்கு: 4,
  ஐந்து: 5,
  ஆறு: 6,
  ஏழு: 7,
  எட்டு: 8,
  ஒன்பது: 9,
  பத்து: 10,

  ఒకటి: 1,
  రెండు: 2,
  మూడు: 3,
  నాలుగు: 4,
  ఐదు: 5,
  ఆరు: 6,
  ఏడు: 7,
  ఎనిమిది: 8,
  తొమ్మిది: 9,
  పది: 10,

  ಒಂದು: 1,
  ಎರಡು: 2,
  ಮೂರು: 3,
  ನಾಲ್ಕು: 4,
  ಐದು: 5,
  ಆರು: 6,
  ಏಳು: 7,
  ಎಂಟು: 8,
  ಒಂಬತ್ತು: 9,
  ಹತ್ತು: 10,

  ഒന്ന്: 1,
  രണ്ട്: 2,
  മൂന്ന്: 3,
  നാല്: 4,
  അഞ്ച്: 5,
  ആറ്: 6,
  ഏഴ്: 7,
  എട്ട്: 8,
  ഒമ്പത്: 9,
  പത്ത്: 10,
};

export function normalizeSearchText(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ");
}

function findCategory(text: string): string | null {
  const normalized = normalizeSearchText(text);

  for (const [category, keywords] of Object.entries(
    CATEGORY_KEYWORDS,
  )) {
    for (const keyword of keywords) {
      if (normalized.includes(normalizeSearchText(keyword))) {
        return category;
      }
    }
  }

  return null;
}

function findDuration(text: string): number | null {
  const normalized = normalizeSearchText(text);

  // Numeric durations
  const numericPatterns = [
    /(\d+)\s*(?:days?|day)\b/i,
    /(\d+)\s*(?:दिन|दिनों|दिवस)/,
    /(\d+)\s*(?:ਦਿਨ|ਦਿਨਾਂ)/,
    /(\d+)\s*(?:দিন|দিনের)/,
    /(\d+)\s*(?:દિવસ|દિવસો)/,
    /(\d+)\s*(?:நாள்|நாட்கள்)/,
    /(\d+)\s*(?:రోజు|రోజులు)/,
    /(\d+)\s*(?:ದಿನ|ದಿನಗಳ)/,
    /(\d+)\s*(?:ദിവസം|ദിവസങ്ങൾക്ക്)/,
  ];

  for (const pattern of numericPatterns) {
    const match = normalized.match(pattern);

    if (match?.[1]) {
      return Number(match[1]);
    }
  }

  // Number words
  for (const [word, number] of Object.entries(NUMBER_WORDS)) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const patterns = [
      new RegExp(`\\b${escaped}\\s*(?:days?|day)\\b`, "i"),
      new RegExp(`${escaped}\\s*(?:दिन|दिनों|दिवस)`, "i"),
      new RegExp(`${escaped}\\s*(?:ਦਿਨ|ਦਿਨਾਂ)`, "i"),
      new RegExp(`${escaped}\\s*(?:দিন|দিনের)`, "i"),
      new RegExp(`${escaped}\\s*(?:દિવસ|દિવસો)`, "i"),
      new RegExp(`${escaped}\\s*(?:நாள்|நாட்கள்)`, "i"),
      new RegExp(`${escaped}\\s*(?:రోజు|రోజులు)`, "i"),
      new RegExp(`${escaped}\\s*(?:ದಿನ|ದಿನಗಳ)`, "i"),
      new RegExp(`${escaped}\\s*(?:ദിവസം|ദിവസങ്ങൾക്ക്)`, "i"),
    ];

    if (patterns.some((pattern) => pattern.test(normalized))) {
      return number;
    }
  }

  return null;
}

function findLocation(text: string): string | null {
  const normalized = normalizeSearchText(text);

  const patterns = [
    // English
    /(?:near|nearby|around|in|at|from)\s+([a-zA-Z][a-zA-Z\s-]{1,35}?)(?=\s+(?:for|for\s+\d|one|two|three|four|five|days?|day)\b|[,.!?]|$)/i,

    // Hindi
    /(?:के पास|पास|पास में|नजदीक|नज़दीक|में|से)\s+([\u0900-\u097F][\u0900-\u097F\s-]{1,35}?)(?=\s+(?:के लिए|दिन|दिनों|दिवस)|[,.!?]|$)/,

    // Punjabi
    /(?:ਨੇੜੇ|ਵਿੱਚ|ਤੋਂ|ਕੋਲ)\s+([\u0A00-\u0A7F][\u0A00-\u0A7F\s-]{1,35}?)(?=\s+(?:ਲਈ|ਦਿਨ|ਦਿਨਾਂ)|[,.!?]|$)/,

    // Bengali
    /(?:কাছে|মধ্যে|থেকে)\s+([\u0980-\u09FF][\u0980-\u09FF\s-]{1,35}?)(?=\s+(?:জন্য|দিন)|[,.!?]|$)/,

    // Gujarati
    /(?:પાસે|માં|થી|નજીક)\s+([\u0A80-\u0AFF][\u0A80-\u0AFF\s-]{1,35}?)(?=\s+(?:માટે|દિવસ)|[,.!?]|$)/,

    // Tamil
    /(?:அருகில்|இல்|இருந்து)\s+([\u0B80-\u0BFF][\u0B80-\u0BFF\s-]{1,35}?)(?=\s+(?:க்கு|நாள்|நாட்கள்)|[,.!?]|$)/,

    // Telugu
    /(?:దగ్గర|లో|నుండి)\s+([\u0C00-\u0C7F][\u0C00-\u0C7F\s-]{1,35}?)(?=\s+(?:కోసం|రోజు|రోజులు)|[,.!?]|$)/,

    // Kannada
    /(?:ಹತ್ತಿರ|ನಲ್ಲಿ|ನಿಂದ)\s+([\u0C80-\u0CFF][\u0C80-\u0CFF\s-]{1,35}?)(?=\s+(?:ಗಾಗಿ|ದಿನ|ದಿನಗಳ)|[,.!?]|$)/,

    // Malayalam
    /(?:അടുത്ത്|ൽ|നിന്ന്)\s+([\u0D00-\u0D7F][\u0D00-\u0D7F\s-]{1,35}?)(?=\s+(?:വേണ്ടി|ദിവസം)|[,.!?]|$)/,
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);

    if (match?.[1]) {
      const location = match[1]
        .trim()
        .replace(/\s+/g, " ");

      if (location.length >= 2) {
        return location;
      }
    }
  }

  return null;
}

function findIntent(text: string): SearchIntent {
  const normalized = normalizeSearchText(text);

  const cheapestKeywords = [
    "cheapest",
    "cheap",
    "lowest price",
    "low price",
    "budget",
    "सस्ता",
    "सबसे सस्ता",
    "कम कीमत",
    "कम दाम",
    "ਸਸਤਾ",
    "ਘੱਟ ਕੀਮਤ",
    "সস্তা",
    "কম দাম",
    "સસ્તું",
    "ઓછી કિંમત",
    "மலிவான",
    "குறைந்த விலை",
    "చౌక",
    "తక్కువ ధర",
    "ಅಗ್ಗ",
    "ಕಡಿಮೆ ಬೆಲೆ",
    "വിലകുറഞ്ഞ",
    "കുറഞ്ഞ വില",
  ];

  const ratingKeywords = [
    "best rated",
    "highest rated",
    "top rated",
    "best rating",
    "highest rating",
    "सबसे अच्छी रेटिंग",
    "अच्छी रेटिंग",
    "सबसे बढ़िया",
    "ਵਧੀਆ ਰੇਟਿੰਗ",
    "ਸਭ ਤੋਂ ਵਧੀਆ",
    "সেরা রেটিং",
    "ভালো রেটিং",
    "શ્રેષ્ઠ રેટિંગ",
    "சிறந்த மதிப்பீடு",
    "சிறந்த ரேட்டிங்",
    "ఉత్తమ రేటింగ్",
    "ಅತ್ಯುತ್ತಮ ರೇಟಿಂಗ್",
    "മികച്ച റേറ്റിംഗ്",
  ];

  const nearestKeywords = [
    "nearest",
    "near me",
    "closest",
    "nearby",
    "मेरे पास",
    "मेरे नजदीक",
    "मेरे नज़दीक",
    "नजदीक",
    "नज़दीक",
    "पास में",
    "सबसे पास",
    "ਮੇਰੇ ਨੇੜੇ",
    "ਨੇੜੇ",
    "ਕੋਲ",
    "কাছাকাছি",
    "আমার কাছে",
    "નજીક",
    "મારી નજીક",
    "அருகில்",
    "என் அருகில்",
    "దగ్గరలో",
    "నా దగ్గర",
    "ಹತ್ತಿರ",
    "ನನ್ನ ಹತ್ತಿರ",
    "അടുത്ത്",
    "എന്റെ അടുത്ത്",
  ];

  if (
    cheapestKeywords.some((keyword) =>
      normalized.includes(normalizeSearchText(keyword)),
    )
  ) {
    return "cheapest";
  }

  if (
    ratingKeywords.some((keyword) =>
      normalized.includes(normalizeSearchText(keyword)),
    )
  ) {
    return "highest_rated";
  }

  if (
    nearestKeywords.some((keyword) =>
      normalized.includes(normalizeSearchText(keyword)),
    )
  ) {
    return "nearest";
  }

  return "best";
}

export function parseMachinerySearch(
  query: string,
): ParsedMachinerySearch {
  const cleanQuery = query.trim();

  return {
    originalQuery: cleanQuery,
    category: findCategory(cleanQuery),
    durationDays: findDuration(cleanQuery),
    location: findLocation(cleanQuery),
    intent: findIntent(cleanQuery),
  };
}

export function machineryMatchesQuery(
  machinery: {
    name?: string | null;
    category?: string | null;
    brand?: string | null;
    model?: string | null;
    description?: string | null;
    state?: string | null;
    district?: string | null;
    village?: string | null;
  },
  parsed: ParsedMachinerySearch,
): boolean {
  const category = normalizeSearchText(machinery.category);
  const name = normalizeSearchText(machinery.name);
  const brand = normalizeSearchText(machinery.brand);
  const model = normalizeSearchText(machinery.model);
  const description = normalizeSearchText(machinery.description);

  // Category
  if (parsed.category) {
    const wanted = normalizeSearchText(parsed.category);

    const categoryMatches =
      category.includes(wanted) ||
      name.includes(wanted) ||
      brand.includes(wanted) ||
      model.includes(wanted) ||
      description.includes(wanted);

    if (!categoryMatches) {
      return false;
    }
  }

  // Location
  if (parsed.location) {
    const location = normalizeSearchText(parsed.location);

    const locationText = [
      machinery.state,
      machinery.district,
      machinery.village,
    ]
      .map(normalizeSearchText)
      .filter(Boolean)
      .join(" ");

    /*
     * Only reject when location data exists and clearly
     * doesn't match.
     */
    if (
      locationText &&
      !locationText.includes(location)
    ) {
      return false;
    }
  }

  return true;
}

export function calculateMatchScore(
  machinery: {
    category?: string | null;
    name?: string | null;
    price_per_day?: number | null;
    rating?: number | null;
    state?: string | null;
    district?: string | null;
    village?: string | null;
  },
  parsed: ParsedMachinerySearch,
): number {
  let score = 0;

  const category = normalizeSearchText(machinery.category);
  const name = normalizeSearchText(machinery.name);

  // Category: 40
  if (parsed.category) {
    const wanted = normalizeSearchText(parsed.category);

    if (category === wanted) {
      score += 40;
    } else if (category.includes(wanted)) {
      score += 35;
    } else if (name.includes(wanted)) {
      score += 30;
    }
  } else {
    score += 20;
  }

  // Location: 25
  if (parsed.location) {
    const wantedLocation = normalizeSearchText(parsed.location);

    const locationText = [
      machinery.state,
      machinery.district,
      machinery.village,
    ]
      .map(normalizeSearchText)
      .filter(Boolean)
      .join(" ");

    if (locationText.includes(wantedLocation)) {
      score += 25;
    }
  } else {
    score += 15;
  }

  // Rating: 15
  const rating = Number(machinery.rating ?? 0);

  if (rating > 0) {
    score += Math.min(15, (rating / 5) * 15);
  }

  // Price exists: 5
  const price = Number(machinery.price_per_day ?? 0);

  if (price > 0) {
    score += 5;
  }

  return Math.min(100, Math.round(score));
}