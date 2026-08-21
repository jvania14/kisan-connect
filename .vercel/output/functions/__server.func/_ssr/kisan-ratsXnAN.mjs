import { t as tractor_default } from "./tractor-BxFqVpAI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kisan-ratsXnAN.js
var harvester_default = "/assets/harvester-z0tGRqlU.jpg";
var implement_default = "/assets/implement-CwruOYhM.jpg";
var MACHINERY_CATEGORIES = [
	"Tractor",
	"Harvester",
	"Rotavator",
	"Seed Drill",
	"Cultivator",
	"Thresher",
	"Sprayer",
	"Other"
];
var FARMER_TYPES = [
	"Owner Farmer",
	"Tenant Farmer",
	"Custom Hiring Centre",
	"Agri Entrepreneur"
];
var LANGUAGES = [
	{
		value: "hi",
		label: "हिन्दी (Hindi)"
	},
	{
		value: "en",
		label: "English"
	},
	{
		value: "pa",
		label: "ਪੰਜਾਬੀ (Punjabi)"
	},
	{
		value: "mr",
		label: "मराठी (Marathi)"
	},
	{
		value: "bn",
		label: "বাংলা (Bengali)"
	}
];
function categoryImage(category) {
	switch (category) {
		case "Tractor": return tractor_default;
		case "Harvester": return harvester_default;
		default: return implement_default;
	}
}
/** Haversine distance in km. Returns null when either point is unknown. */
function distanceKm(aLat, aLng, bLat, bLng) {
	if (aLat == null || aLng == null || bLat == null || bLng == null) return null;
	const R = 6371;
	const toRad = (d) => d * Math.PI / 180;
	const dLat = toRad(bLat - aLat);
	const dLng = toRad(bLng - aLng);
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
	return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}
function formatINR(value) {
	return `₹${Number(value).toLocaleString("en-IN")}`;
}
function daysBetween(start, end) {
	const s = (/* @__PURE__ */ new Date(start + "T00:00:00")).getTime();
	const e = (/* @__PURE__ */ new Date(end + "T00:00:00")).getTime();
	return Math.max(1, Math.round((e - s) / 864e5) + 1);
}
function toISODate(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function overlaps(aStart, aEnd, bStart, bEnd) {
	return aStart <= bEnd && aEnd >= bStart;
}
var MATCH_WEIGHTS = {
	resource: .3,
	availability: .25,
	location: .2,
	price: .15,
	rating: .1
};
function scoreMachinery(item, query, context) {
	const reasons = [];
	const text = (query.text ?? "").trim().toLowerCase();
	let resource = .5;
	if (query.category && query.category !== "all") resource = item.category === query.category ? 1 : 0;
	if (text) {
		const haystack = `${item.name} ${item.category} ${item.brand ?? ""} ${item.model ?? ""}`.toLowerCase();
		const words = text.split(/\s+/).filter(Boolean);
		const hits = words.filter((w) => haystack.includes(w)).length;
		resource = Math.max(resource, words.length ? hits / words.length : .5);
	}
	if (resource >= .99) reasons.push("Matches requested resource");
	let availability = .6;
	if (query.startDate && query.endDate) {
		const withinWindow = (!item.available_from || item.available_from <= query.startDate) && (!item.available_until || item.available_until >= query.endDate);
		const clash = (context.bookedRanges ?? []).some((r) => overlaps(query.startDate, query.endDate, r.start, r.end));
		availability = withinWindow && !clash ? 1 : 0;
		if (availability === 1) reasons.push("Available for your dates");
	} else if (item.available_from && item.available_until) {
		const today = toISODate(/* @__PURE__ */ new Date());
		availability = item.available_until >= today ? .9 : .2;
		if (availability === .9) reasons.push("Currently listed as available");
	}
	const distance = distanceKm(query.userLat, query.userLng, item.latitude, item.longitude);
	let location = .5;
	if (distance != null) {
		location = Math.max(0, 1 - Math.min(distance, 100) / 100);
		if (distance <= 15) reasons.push(`${distance} km away`);
	}
	const span = Math.max(1, context.maxPrice - context.minPrice);
	const price = Math.max(0, 1 - (item.price_per_day - context.minPrice) / span);
	if (price >= .6) reasons.push("Competitive price");
	const rating = Math.min(1, Number(item.rating) / 5);
	if (Number(item.rating) >= 4.5) reasons.push("Highly rated owner");
	if (item.is_verified) reasons.push("Verified listing");
	const score = MATCH_WEIGHTS.resource * resource + MATCH_WEIGHTS.availability * availability + MATCH_WEIGHTS.location * location + MATCH_WEIGHTS.price * price + MATCH_WEIGHTS.rating * rating;
	return {
		score: Math.round(score * 100),
		reasons,
		distance
	};
}
//#endregion
export { daysBetween as a, overlaps as c, categoryImage as i, scoreMachinery as l, LANGUAGES as n, distanceKm as o, MACHINERY_CATEGORIES as r, formatINR as s, FARMER_TYPES as t, toISODate as u };
