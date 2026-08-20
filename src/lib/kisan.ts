import tractorImg from "@/assets/tractor.jpg";
import harvesterImg from "@/assets/harvester.jpg";
import implementImg from "@/assets/implement.jpg";
import residueImg from "@/assets/residue.jpg";

export const MACHINERY_CATEGORIES = [
  "Tractor",
  "Harvester",
  "Rotavator",
  "Seed Drill",
  "Cultivator",
  "Thresher",
  "Sprayer",
  "Other",
] as const;

export const RESIDUE_TYPES = [
  "Wheat Straw",
  "Rice Husk",
  "Stubble",
  "Mustard Residue",
  "Organic Residue",
  "Other",
] as const;

export const POST_CATEGORIES = [
  "Machinery",
  "Crops",
  "Prices",
  "Government Schemes",
  "Farming Advice",
] as const;

export const FARMER_TYPES = [
  "Owner Farmer",
  "Tenant Farmer",
  "Custom Hiring Centre",
  "Agri Entrepreneur",
] as const;

export const LANGUAGES = [
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "en", label: "English" },
  { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "bn", label: "বাংলা (Bengali)" },
];

export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface Profile {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  village: string | null;
  district: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  preferred_language: string;
  farmer_type: string | null;
  profile_image: string | null;
  is_verified: boolean;
  rating: number;
  created_at: string;
}

export interface Machinery {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  brand: string | null;
  model: string | null;
  description: string | null;
  terms: string | null;
  price_per_day: number;
  state: string | null;
  district: string | null;
  village: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  available_from: string | null;
  available_until: string | null;
  rating: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  profiles?: Pick<Profile, "id" | "name" | "is_verified" | "rating" | "phone"> | null;
}

export interface Booking {
  id: string;
  machinery_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  machinery?: Machinery | null;
}

export function categoryImage(category: string): string {
  switch (category) {
    case "Tractor":
      return tractorImg;
    case "Harvester":
      return harvesterImg;
    default:
      return implementImg;
  }
}

export const RESIDUE_IMAGE = residueImg;

/** Haversine distance in km. Returns null when either point is unknown. */
export function distanceKm(
  aLat: number | null | undefined,
  aLng: number | null | undefined,
  bLat: number | null | undefined,
  bLng: number | null | undefined,
): number | null {
  if (aLat == null || aLng == null || bLat == null || bLng == null) return null;
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

export function formatINR(value: number): string {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export function daysBetween(start: string, end: string): number {
  const s = new Date(start + "T00:00:00").getTime();
  const e = new Date(end + "T00:00:00").getTime();
  return Math.max(1, Math.round((e - s) / 86400000) + 1);
}

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart <= bEnd && aEnd >= bStart;
}

/* ------------------------------------------------------------------ *
 * Smart matching engine — deterministic weighted scoring (no ML).
 * Resource 30% | Availability 25% | Location 20% | Price 15% | Rating 10%
 * ------------------------------------------------------------------ */

export interface MatchQuery {
  text?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  userLat?: number | null;
  userLng?: number | null;
  maxPrice?: number | null;
}

export interface MatchResult {
  score: number;
  reasons: string[];
  distance: number | null;
}

export const MATCH_WEIGHTS = {
  resource: 0.3,
  availability: 0.25,
  location: 0.2,
  price: 0.15,
  rating: 0.1,
};

export function scoreMachinery(
  item: Machinery,
  query: MatchQuery,
  context: { minPrice: number; maxPrice: number; bookedRanges?: Array<{ start: string; end: string }> },
): MatchResult {
  const reasons: string[] = [];
  const text = (query.text ?? "").trim().toLowerCase();

  // Resource fit
  let resource = 0.5;
  if (query.category && query.category !== "all") {
    resource = item.category === query.category ? 1 : 0;
  }
  if (text) {
    const haystack = `${item.name} ${item.category} ${item.brand ?? ""} ${item.model ?? ""}`.toLowerCase();
    const words = text.split(/\s+/).filter(Boolean);
    const hits = words.filter((w) => haystack.includes(w)).length;
    resource = Math.max(resource, words.length ? hits / words.length : 0.5);
  }
  if (resource >= 0.99) reasons.push("Matches requested resource");

  // Availability
  let availability = 0.6;
  if (query.startDate && query.endDate) {
    const withinWindow =
      (!item.available_from || item.available_from <= query.startDate) &&
      (!item.available_until || item.available_until >= query.endDate);
    const clash = (context.bookedRanges ?? []).some((r) =>
      overlaps(query.startDate!, query.endDate!, r.start, r.end),
    );
    availability = withinWindow && !clash ? 1 : 0;
    if (availability === 1) reasons.push("Available for your dates");
  } else if (item.available_from && item.available_until) {
    const today = toISODate(new Date());
    availability = item.available_until >= today ? 0.9 : 0.2;
    if (availability === 0.9) reasons.push("Currently listed as available");
  }

  // Location
  const distance = distanceKm(query.userLat, query.userLng, item.latitude, item.longitude);
  let location = 0.5;
  if (distance != null) {
    location = Math.max(0, 1 - Math.min(distance, 100) / 100);
    if (distance <= 15) reasons.push(`${distance} km away`);
  }

  // Price
  const span = Math.max(1, context.maxPrice - context.minPrice);
  const price = Math.max(0, 1 - (item.price_per_day - context.minPrice) / span);
  if (price >= 0.6) reasons.push("Competitive price");

  // Rating
  const rating = Math.min(1, Number(item.rating) / 5);
  if (Number(item.rating) >= 4.5) reasons.push("Highly rated owner");
  if (item.is_verified) reasons.push("Verified listing");

  const score =
    MATCH_WEIGHTS.resource * resource +
    MATCH_WEIGHTS.availability * availability +
    MATCH_WEIGHTS.location * location +
    MATCH_WEIGHTS.price * price +
    MATCH_WEIGHTS.rating * rating;

  return { score: Math.round(score * 100), reasons, distance };
}

/* ------------------------------------------------------------------ *
 * Voice requirement extraction (runs locally on the transcript)
 * ------------------------------------------------------------------ */

const RESOURCE_KEYWORDS: Array<{ category: string; words: string[] }> = [
  { category: "Tractor", words: ["tractor", "traktar", "ट्रैक्टर", "टैक्टर"] },
  { category: "Harvester", words: ["harvester", "combine", "हार्वेस्टर", "कंबाइन"] },
  { category: "Rotavator", words: ["rotavator", "rotovator", "रोटावेटर"] },
  { category: "Seed Drill", words: ["seed drill", "drill", "बीज", "सीड ड्रिल"] },
  { category: "Cultivator", words: ["cultivator", "कल्टीवेटर"] },
  { category: "Thresher", words: ["thresher", "थ्रेशर"] },
  { category: "Sprayer", words: ["sprayer", "spray", "स्प्रेयर"] },
];

const NUMBER_WORDS: Record<string, number> = {
  ek: 1, एक: 1, one: 1,
  do: 2, दो: 2, two: 2,
  teen: 3, तीन: 3, three: 3,
  char: 4, चार: 4, chaar: 4, four: 4,
  paanch: 5, panch: 5, पांच: 5, पाँच: 5, five: 5,
  chhe: 6, छह: 6, six: 6,
  saat: 7, सात: 7, seven: 7,
};

export interface VoiceRequirement {
  category: string | null;
  days: number | null;
  raw: string;
}

export function extractRequirement(transcript: string): VoiceRequirement {
  const lower = transcript.toLowerCase();
  let category: string | null = null;
  for (const entry of RESOURCE_KEYWORDS) {
    if (entry.words.some((w) => lower.includes(w))) {
      category = entry.category;
      break;
    }
  }

  let days: number | null = null;
  const digit = lower.match(/(\d+)\s*(din|day|days|दिन)/);
  if (digit && digit[1]) {
    days = parseInt(digit[1], 10);
  } else {
    const tokens = lower.split(/[\s,.]+/);
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const next = tokens[i + 1] ?? "";
      if (token && token in NUMBER_WORDS && /din|day|days|दिन/.test(next)) {
        days = NUMBER_WORDS[token] ?? null;
        break;
      }
    }
  }

  return { category, days, raw: transcript };
}
