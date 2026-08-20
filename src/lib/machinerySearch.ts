export type ParsedMachinerySearch = {
  originalQuery: string;
  category: string | null;
  durationDays: number | null;
  location: string | null;
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Tractor: [
    "tractor",
    "ट्रैक्टर",
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
    "हार्वेस्टर",
    "हार्वेस्टर मशीन",
    "ਹਾਰਵੈਸਟਰ",
    "হারভেস্টার",
    "हार्वेस्टर",
    "હાર્વેસ્ટર",
    "ஹார்வெஸ்டர்",
    "హార్వెస్టర్",
    "ಹಾರ್ವೆಸ್ಟರ್",
    "ഹാർവെസ്റ്റർ",
  ],

  Rotavator: [
    "rotavator",
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
    "सीड ड्रिल",
    "ਬੀਜ ਡਰਿੱਲ",
    "বীজ ড্রিল",
    "सीड ड्रिल",
    "સીડ ડ્રિલ",
    "சீட் டிரில்",
    "సీడ్ డ్రిల్",
    "ಸೀಡ್ ಡ್ರಿಲ್",
    "സീഡ് ഡ്രിൽ",
  ],

  Cultivator: [
    "cultivator",
    "कल्टीवेटर",
    "ਕਲਟੀਵੇਟਰ",
    "কাল্টিভেটর",
    "कल्टीवेटर",
    "કલ્ટિવેટર",
    "கல்டிவேட்டர்",
    "కల్టివేటర్",
    "ಕಲ್ಟಿವೇಟರ್",
    "കൾട്ടിവേറ്റർ",
  ],

  Thresher: [
    "thresher",
    "थ्रेशर",
    "ਥ੍ਰੈਸ਼ਰ",
    "থ্রেশার",
    "थ्रेशर",
    "થ્રેશર",
    "த்ரெஷர்",
    "త్రెషర్",
    "ಥ್ರೆಶರ್",
    "ത്രെഷർ",
  ],

  Sprayer: [
    "sprayer",
    "स्प्रेयर",
    "स्प्रे मशीन",
    "ਸਪਰੇਅਰ",
    "স্প্রেয়ার",
    "स्प्रेयर",
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
};

function findCategory(text: string): string | null {
  const lower = text.toLowerCase();

  for (const [category, keywords] of Object.entries(
    CATEGORY_KEYWORDS,
  )) {
    for (const keyword of keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return null;
}

function findDuration(text: string): number | null {
  const normalized = text
    .toLowerCase()
    .replace(/,/g, " ");

  /*
   * Numeric forms:
   *
   * 2 days
   * 2 day
   * 2 दिन
   * 2 दिनों
   * 2 દિવસ
   * 2 நாட்கள்
   * etc.
   */

  const numericPatterns = [
    /(\d+)\s*(?:days?|day)/i,
    /(\d+)\s*(?:दिन|दिनों)/,
    /(\d+)\s*(?:ਦਿਨ|ਦਿਨਾਂ)/,
    /(\d+)\s*(?:দিন|দিনের)/,
    /(\d+)\s*(?:दिवस)/,
    /(\d+)\s*(?:દિવસ|દિવસો)/,
    /(\d+)\s*(?:நாட்கள்|நாள்)/,
    /(\d+)\s*(?:రోజులు|రోజు)/,
    /(\d+)\s*(?:ದಿನ|ದಿನಗಳ)/,
    /(\d+)\s*(?:ദിവസം|ദിവസങ്ങൾക്ക്)/,
  ];

  for (const pattern of numericPatterns) {
    const match = normalized.match(pattern);

    if (match?.[1]) {
      return Number(match[1]);
    }
  }

  /*
   * English number words
   */

  for (const [word, number] of Object.entries(NUMBER_WORDS)) {
    if (
      new RegExp(
        `\\b${word}\\s*(?:days?|day)`,
        "i",
      ).test(normalized)
    ) {
      return number;
    }
  }

  /*
   * Hindi number words
   */

  for (const [word, number] of Object.entries(NUMBER_WORDS)) {
    if (
      normalized.includes(`${word} दिन`) ||
      normalized.includes(`${word} दिनों`) ||
      normalized.includes(`${word} दिवस`)
    ) {
      return number;
    }
  }

  return null;
}

function findLocation(text: string): string | null {
  /*
   * Keep this conservative.
   *
   * We don't want words like "tractor" or "days"
   * accidentally becoming a location.
   */

  const patterns = [
    /(?:near|in|at)\s+([a-zA-Z][a-zA-Z\s]{2,30})/i,
    /(?:पास|में|पर)\s+([ऀ-ॿa-zA-Z][ऀ-ॿa-zA-Z\s]{2,30})/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return null;
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
  };
}

export function normalizeSearchText(
  value: unknown,
): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim();
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
  /*
   * If a category was detected, category is the strongest
   * requirement.
   */

  if (parsed.category) {
    const category = normalizeSearchText(
      machinery.category,
    );

    const name = normalizeSearchText(machinery.name);

    const wanted = normalizeSearchText(
      parsed.category,
    );

    if (
      !category.includes(wanted) &&
      !name.includes(wanted)
    ) {
      return false;
    }
  }

  /*
   * If a location was detected, use it as a soft filter.
   *
   * For the prototype we only reject it when we have
   * an obvious location mismatch.
   */

  if (parsed.location) {
    const locationText = [
      machinery.state,
      machinery.district,
      machinery.village,
    ]
      .map(normalizeSearchText)
      .join(" ");

    if (
      locationText &&
      !locationText.includes(
        normalizeSearchText(parsed.location),
      )
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
  },
  parsed: ParsedMachinerySearch,
): number {
  let score = 0;

  const category = normalizeSearchText(
    machinery.category,
  );

  const name = normalizeSearchText(machinery.name);

  /*
   * Resource type = 30%
   */
  if (parsed.category) {
    const wanted = normalizeSearchText(
      parsed.category,
    );

    if (
      category === wanted ||
      name.includes(wanted)
    ) {
      score += 30;
    }
  } else {
    score += 15;
  }

  /*
   * Availability = 25%
   *
   * The actual date overlap is handled by the
   * marketplace/booking flow.
   *
   * For a voice request without dates we give a
   * neutral availability score.
   */
  score += 25;

  /*
   * Location = 20%
   *
   * Without GPS/location data in the request,
   * use a neutral value.
   */
  score += 10;

  /*
   * Price = 15%
   *
   * Neutral score for now.
   */
  score += 7;

  /*
   * Rating = 10%
   */
  const rating = Number(machinery.rating ?? 0);

  if (rating > 0) {
    score += Math.min(10, (rating / 5) * 10);
  }

  return Math.min(100, Math.round(score));
}