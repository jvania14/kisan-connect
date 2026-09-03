import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Mic, D as Package, F as MapPin, S as Search, Z as CircleCheck, a as Volume2, at as Bot, d as TrendingUp, dt as ArrowRight, f as Tractor, ft as ArrowLeft, j as MicOff, o as Users, q as Clock3, y as ShoppingCart, z as Languages } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voice-CGLKpJoQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LANGUAGES = [
	{
		code: "en-IN",
		label: "English",
		name: "English",
		example: "What is today's tomato price?"
	},
	{
		code: "hi-IN",
		label: "हिन्दी",
		name: "Hindi",
		example: "आज टमाटर का भाव क्या है?"
	},
	{
		code: "mr-IN",
		label: "मराठी",
		name: "Marathi",
		example: "आज टोमॅटोचा बाजारभाव काय आहे?"
	},
	{
		code: "pa-IN",
		label: "ਪੰਜਾਬੀ",
		name: "Punjabi",
		example: "ਅੱਜ ਟਮਾਟਰ ਦਾ ਭਾਅ ਕੀ ਹੈ?"
	},
	{
		code: "bn-IN",
		label: "বাংলা",
		name: "Bengali",
		example: "আজ টমেটোর দাম কত?"
	},
	{
		code: "gu-IN",
		label: "ગુજરાતી",
		name: "Gujarati",
		example: "આજે ટામેટાંનો ભાવ કેટલો છે?"
	},
	{
		code: "ta-IN",
		label: "தமிழ்",
		name: "Tamil",
		example: "இன்று தக்காளி விலை என்ன?"
	},
	{
		code: "te-IN",
		label: "తెలుగు",
		name: "Telugu",
		example: "ఈరోజు టమాటా ధర ఎంత?"
	},
	{
		code: "kn-IN",
		label: "ಕನ್ನಡ",
		name: "Kannada",
		example: "ಇಂದು ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು?"
	},
	{
		code: "ml-IN",
		label: "മലയാളം",
		name: "Malayalam",
		example: "ഇന്നത്തെ തക്കാളി വില എത്രയാണ്?"
	}
];
var DEMO_MARKETS = [
	{
		name: "Mumbai",
		price: 3020,
		change: "+9.1%",
		arrivals: 1240,
		distance: "168 km",
		net: 2720
	},
	{
		name: "Nashik",
		price: 2850,
		change: "+8.4%",
		arrivals: 1840,
		distance: "42 km",
		net: 2700
	},
	{
		name: "Pune",
		price: 2720,
		change: "+5.2%",
		arrivals: 2140,
		distance: "156 km",
		net: 2390
	},
	{
		name: "Ahmednagar",
		price: 2610,
		change: "+3.8%",
		arrivals: 2430,
		distance: "92 km",
		net: 2460
	}
];
var DEMO_BUYERS = [
	{
		name: "FreshKart Foods",
		price: 3e3,
		quantity: "500–2,000 kg",
		distance: "18 km",
		match: 98,
		verified: true
	},
	{
		name: "Maharashtra Agro",
		price: 2950,
		quantity: "1,000 kg",
		distance: "32 km",
		match: 94,
		verified: true
	},
	{
		name: "Fresh Harvest Traders",
		price: 2900,
		quantity: "750 kg",
		distance: "25 km",
		match: 91,
		verified: true
	}
];
function hasAny(text, words) {
	return words.some((word) => text.includes(word));
}
function detectIntent(query) {
	const text = query.toLowerCase().trim();
	if (hasAny(text, [
		"tractor",
		"harvester",
		"rotavator",
		"cultivator",
		"thresher",
		"sprayer",
		"seed drill",
		"machinery",
		"machine",
		"equipment",
		"ट्रैक्टर",
		"हार्वेस्टर",
		"मशीन",
		"यंत्र",
		"कृषि मशीन",
		"अवजार"
	])) return {
		intent: "machinery",
		title: "Machinery Assistant",
		message: "I can help you find agricultural machinery nearby. You can search for a tractor, harvester, rotavator or another machine and check availability.",
		actions: [
			{
				label: "Find Machinery",
				action: "machinery",
				primary: true
			},
			{
				label: "List My Machinery",
				action: "list-machinery"
			},
			{
				label: "My Bookings",
				action: "bookings"
			}
		]
	};
	if (hasAny(text, [
		"residue",
		"stubble",
		"parali",
		"crop waste",
		"straw",
		"husk",
		"पराली",
		"फसल अवशेष",
		"कचरा",
		"भूसा"
	])) return {
		intent: "residue",
		title: "Crop Residue Exchange",
		message: "You can list surplus crop residue such as straw, husk or stubble and connect with buyers instead of letting it go to waste.",
		actions: [{
			label: "Open Residue Exchange",
			action: "residues",
			primary: true
		}]
	};
	if (hasAny(text, [
		"buyer",
		"buyers",
		"customer",
		"who will buy",
		"find buyer",
		"खरीदार",
		"ग्राहक",
		"खरेदीदार",
		"खरीदार ढूंढ",
		"खरेदीदार शोध"
	])) return {
		intent: "buyer",
		title: "Verified Buyers",
		message: "I found buyers matching your crop. FreshKart Foods currently has the strongest demo offer at ₹3,000 per quintal with a 98% match score.",
		actions: [{
			label: "View Buyers",
			action: "buyers",
			primary: true
		}, {
			label: "Create Sale Lot",
			action: "lot"
		}]
	};
	if (hasAny(text, [
		"sale lot",
		"sell lot",
		"create lot",
		"make lot",
		"lot",
		"offer",
		"sell my crop",
		"crop for sale",
		"बिक्री",
		"बिक्री लॉट",
		"लॉट बन",
		"फसल बेच",
		"बेचने का लॉट"
	])) return {
		intent: "lot",
		title: "Create a Sale Lot",
		message: "A digital sale lot contains your crop, quantity, quality grade and expected price. Verified buyers can then send digital offers.",
		actions: [{
			label: "Create Sale Lot",
			action: "lot",
			primary: true
		}, {
			label: "View My Offers",
			action: "offers"
		}]
	};
	if (hasAny(text, [
		"sell now",
		"sell today",
		"should i sell",
		"when should i sell",
		"wait",
		"prediction",
		"predict",
		"forecast",
		"future price",
		"future",
		"sell or wait",
		"अभी बेच",
		"बेचूं",
		"बेचना चाहिए",
		"रुक",
		"कब बेच",
		"भविष्य",
		"भाव बढ़ेगा"
	])) return {
		intent: "forecast",
		title: "Smart Sell Window",
		message: "The prototype price trend is upward. Tomato is currently around ₹2,850 per quintal and the forecast reaches about ₹3,070 per quintal. The current recommendation is WAIT 2–3 DAYS, subject to actual mandi arrivals and prices.",
		actions: [
			{
				label: "View Price Forecast",
				action: "forecast",
				primary: true
			},
			{
				label: "Find Buyers",
				action: "buyers"
			},
			{
				label: "Sell Now",
				action: "buyers"
			}
		]
	};
	if (hasAny(text, [
		"compare mandi",
		"compare market",
		"best mandi",
		"best market",
		"which mandi",
		"which market",
		"mandi",
		"market",
		"मुंबई",
		"नाशिक",
		"पुणे",
		"मंडी",
		"बाजार",
		"सर्वोत्तम बाजार",
		"कौन सी मंडी"
	])) return {
		intent: "mandi",
		title: "Best Market to Sell",
		message: "Mumbai has the highest headline price at ₹3,020 per quintal. Nashik is much closer at 42 km. The best decision should consider transport and handling costs, not only the headline price.",
		actions: [{
			label: "Compare Mandis",
			action: "mandi",
			primary: true
		}, {
			label: "Check Net Realization",
			action: "net"
		}]
	};
	if (hasAny(text, [
		"price",
		"rate",
		"bhav",
		"today price",
		"market price",
		"mandi price",
		"today's price",
		"भाव",
		"कितना भाव",
		"बाजार भाव",
		"आज का भाव",
		"आज टमाटर",
		"किंमत",
		"बाजारभाव"
	])) return {
		intent: "price",
		title: "Today's Mandi Price",
		message: "The current prototype tomato price is ₹2,850 per quintal. The highest shown market price is Mumbai at ₹3,020 per quintal.",
		actions: [
			{
				label: "View Market Prices",
				action: "market",
				primary: true
			},
			{
				label: "Compare Mandis",
				action: "mandi"
			},
			{
				label: "Find Buyers",
				action: "buyers"
			}
		]
	};
	return {
		intent: "general",
		title: "Kisan AI Assistant",
		message: "I can help with mandi prices, price prediction, sell-now-or-wait decisions, verified buyers, sale lots, mandi comparison, machinery and crop residues.",
		actions: [
			{
				label: "Check Market Price",
				action: "market",
				primary: true
			},
			{
				label: "Price Prediction",
				action: "forecast"
			},
			{
				label: "Find Buyers",
				action: "buyers"
			}
		]
	};
}
function navigateTo(action, query) {
	const routes = {
		market: "/dashboard#market-prices",
		forecast: "/dashboard#price-forecast",
		buyers: "/dashboard#find-buyers",
		lot: "/dashboard#sale-lots",
		offers: "/dashboard#offers",
		mandi: "/dashboard#best-mandi",
		net: "/dashboard#net-realization",
		machinery: `/machinery${query?.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`,
		"list-machinery": "/list-machinery",
		bookings: "/bookings",
		residues: "/residues"
	};
	window.location.assign(routes[action] ?? "/dashboard");
}
function speakText(text, language) {
	if (!("speechSynthesis" in window)) return;
	window.speechSynthesis.cancel();
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = language;
	utterance.rate = .95;
	utterance.pitch = 1;
	window.speechSynthesis.speak(utterance);
}
function VoiceAssistant() {
	const navigate = useNavigate();
	const [language, setLanguage] = (0, import_react.useState)("en-IN");
	const [speech, setSpeech] = (0, import_react.useState)("");
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [supported, setSupported] = (0, import_react.useState)(true);
	const [result, setResult] = (0, import_react.useState)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	const selectedLanguage = LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];
	(0, import_react.useEffect)(() => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			setSupported(false);
			recognitionRef.current = null;
			return;
		}
		setSupported(true);
		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = true;
		recognition.lang = language;
		recognition.onstart = () => {
			setIsListening(true);
			setError("");
			setResult(null);
		};
		recognition.onresult = (event) => {
			let finalText = "";
			let interimText = "";
			for (let i = 0; i < event.results.length; i++) {
				const item = event.results[i];
				const transcript = item?.[0]?.transcript ?? "";
				if (item?.isFinal) finalText += transcript;
				else interimText += transcript;
			}
			const text = (finalText || interimText).trim();
			if (text) setSpeech(text);
		};
		recognition.onerror = (event) => {
			setIsListening(false);
			switch (event.error) {
				case "not-allowed":
				case "service-not-allowed":
					setError("Microphone permission was denied. Please allow microphone access in Chrome.");
					break;
				case "no-speech":
					setError("No speech detected. Please speak clearly and try again.");
					break;
				case "audio-capture":
					setError("No microphone was found. Please check your microphone.");
					break;
				case "network":
					setError("Speech recognition needs an internet connection.");
					break;
				case "aborted": break;
				default: setError("Could not understand the voice input. Please try again.");
			}
		};
		recognition.onend = () => {
			setIsListening(false);
		};
		recognitionRef.current = recognition;
		return () => {
			try {
				recognition.abort();
			} catch {}
			if (recognitionRef.current === recognition) recognitionRef.current = null;
		};
	}, [language]);
	const startListening = () => {
		if (!supported) {
			setError("Voice recognition is not supported. Please use Google Chrome.");
			return;
		}
		const recognition = recognitionRef.current;
		if (!recognition) {
			setError("Voice recognition is unavailable. Please refresh the page.");
			return;
		}
		setSpeech("");
		setResult(null);
		setError("");
		recognition.lang = language;
		try {
			recognition.start();
		} catch {
			setError("Microphone is already active. Please wait a moment and try again.");
		}
	};
	const stopListening = () => {
		try {
			recognitionRef.current?.stop();
		} catch {}
		setIsListening(false);
	};
	const handleMicrophone = () => {
		if (isListening) stopListening();
		else startListening();
	};
	const analyzeSpeech = () => {
		if (!speech.trim()) {
			setError("Please speak something first.");
			return;
		}
		const response = detectIntent(speech);
		setResult(response);
		speakText(response.message, language);
	};
	const handleExample = (example) => {
		setSpeech(example);
		setError("");
		const response = detectIntent(example);
		setResult(response);
	};
	const chooseLanguage = (code) => {
		stopListening();
		setSpeech("");
		setResult(null);
		setError("");
		setLanguage(code);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/dashboard" }),
					className: "mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-green-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to Dashboard"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-6 text-white shadow-xl sm:p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" }), "Kisan AI"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-bold tracking-tight sm:text-5xl",
									children: "Your voice-powered farming assistant"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-base leading-7 text-green-50 sm:text-lg",
									children: "Ask about mandi prices, future prices, buyers, sale lots, machinery and more — in your own language."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white/15 px-4 py-2 text-sm",
											children: "🌾 Market Intelligence"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white/15 px-4 py-2 text-sm",
											children: "📈 Price Prediction"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white/15 px-4 py-2 text-sm",
											children: "👨‍🌾 Buyer Matching"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white/15 px-4 py-2 text-sm",
											children: "🎤 Regional Voice"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-40 w-40 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-28 w-28 items-center justify-center rounded-full bg-white text-green-700 shadow-2xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-14 w-14" })
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-5 w-5 text-green-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold text-slate-900",
										children: "Ask Kisan AI"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-slate-500",
									children: "Tap the microphone and speak naturally."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl bg-green-50 p-2.5 text-green-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-5 w-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "language",
									className: "mb-2 block text-sm font-semibold text-slate-700",
									children: "Choose language"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "language",
									value: language,
									onChange: (event) => chooseLanguage(event.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100",
									children: LANGUAGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: item.code,
										children: [
											item.label,
											" — ",
											item.name
										]
									}, item.code))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "my-8 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleMicrophone,
									disabled: !supported,
									"aria-label": isListening ? "Stop listening" : "Start voice assistant",
									className: `relative flex h-36 w-36 items-center justify-center rounded-full shadow-xl transition ${isListening ? "bg-red-500 shadow-red-200" : "bg-green-600 shadow-green-200 hover:scale-105 hover:bg-green-700"} ${!supported ? "cursor-not-allowed opacity-50" : ""}`,
									children: [isListening && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 animate-ping rounded-full bg-red-400 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex h-24 w-24 items-center justify-center rounded-full bg-white",
										children: isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "h-10 w-10 text-red-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-10 w-10 text-green-600" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-slate-700",
									children: isListening ? "Listening..." : "Tap to speak"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-slate-400",
									children: selectedLanguage.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 rounded-2xl bg-slate-50 p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-slate-800",
										children: "Your Speech"
									}), speech && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setSpeech("");
											setResult(null);
										},
										className: "text-xs font-medium text-slate-400 hover:text-slate-700",
										children: "Clear"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "min-h-12 text-sm leading-6 text-slate-600",
									children: speech || selectedLanguage.example
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: analyzeSpeech,
								disabled: !speech.trim(),
								className: "mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5" }), "Ask Kisan AI"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-green-100 p-2.5 text-green-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold text-slate-900",
								children: "AI Response"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500",
								children: "Prototype decision support"
							})] })]
						}), !result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-[430px] flex-col items-center justify-center text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-full bg-slate-100 p-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-8 w-8 text-slate-400" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 text-lg font-bold text-slate-800",
									children: "Ask me about your crop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-sm text-sm leading-6 text-slate-500",
									children: "Check prices, compare markets, find buyers or decide whether to sell now or wait."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid w-full max-w-md gap-2",
									children: [
										"What is today's tomato price?",
										"Should I sell now or wait?",
										"Which mandi gives the best price?",
										"Find buyers for 500 kg of tomatoes."
									].map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => handleExample(example),
										className: "flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-green-200 hover:bg-green-50",
										children: [example, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-slate-400" })]
									}, example))
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-green-50 p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold uppercase tracking-wider text-green-700",
												children: result.intent
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 text-xl font-bold text-slate-900",
												children: result.title
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-green-600" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm leading-7 text-slate-700",
											children: result.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => speakText(result.message, language),
											className: "mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-green-700 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }), "Hear Response"]
										})
									]
								}),
								(result.intent === "price" || result.intent === "mandi" || result.intent === "forecast") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-slate-200 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-500",
												children: "Current tomato price"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-2xl font-bold text-slate-900",
												children: "₹2,850"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-slate-500",
												children: "per quintal"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-green-200 bg-green-50 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-green-700",
												children: "Forecast"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-2xl font-bold text-green-700",
												children: "₹3,070"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-green-700",
												children: "per quintal"
											})
										]
									})]
								}),
								result.intent === "forecast" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-5 w-5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold uppercase tracking-wide text-amber-700",
												children: "Smart Sell Advisor"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-lg font-bold text-slate-900",
												children: "WAIT 2–3 DAYS"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-white p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-slate-500",
													children: "Expected range"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-bold text-slate-900",
													children: "₹2,950–₹3,100/q"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-white p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-slate-500",
													children: "Confidence"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-bold text-green-700",
													children: "78%"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-xs leading-5 text-slate-600",
											children: "Recommendation should ultimately use verified mandi prices, arrivals, storage capacity and local conditions."
										})
									]
								}),
								result.intent === "mandi" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 space-y-3",
									children: DEMO_MARKETS.map((market) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-slate-200 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-slate-900",
													children: market.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 flex items-center gap-1 text-xs text-slate-500",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), market.distance]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-1 text-xs text-slate-500",
													children: [
														market.arrivals.toLocaleString("en-IN"),
														" ",
														"q arrivals"
													]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "font-bold text-slate-900",
													children: ["₹", market.price.toLocaleString("en-IN")]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-semibold text-green-600",
													children: market.change
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-slate-500",
												children: "Estimated net realization"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-bold text-green-700",
												children: ["₹", market.net.toLocaleString("en-IN")]
											})]
										})]
									}, market.name))
								}),
								result.intent === "buyer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 space-y-3",
									children: DEMO_BUYERS.map((buyer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-slate-200 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-slate-900",
													children: buyer.name
												}), buyer.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-600" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs text-slate-500",
												children: [
													buyer.quantity,
													" ·",
													" ",
													buyer.distance
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700",
												children: [buyer.match, "% match"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-lg font-bold text-green-700",
												children: [
													"₹",
													buyer.price.toLocaleString("en-IN"),
													"/q"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-medium text-slate-500",
												children: "Verified buyer"
											})]
										})]
									}, buyer.name))
								}),
								result.intent === "lot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-slate-900",
											children: "Digital Sale Lot"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500",
											children: "Crop → Quantity → Grade → Expected price"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 grid grid-cols-2 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
												label: "Demo crop",
												value: "Tomato"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
												label: "Quantity",
												value: "500 kg"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
												label: "Quality",
												value: "Grade A"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
												label: "Expected",
												value: "₹3,000/q"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 grid gap-3 sm:grid-cols-2",
									children: result.actions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => navigateTo(item.action, item.action === "machinery" ? speech : void 0),
										className: `flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${item.primary ? "bg-green-600 text-white hover:bg-green-700" : "border border-slate-200 bg-white text-slate-700 hover:bg-green-50"}`,
										children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}, item.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-center text-xs text-slate-400",
									children: "Prototype market values — connect verified AGMARKNET/eNAM data before production use."
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold text-slate-900",
							children: "What Kisan AI can do"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-slate-500",
							children: "Voice is the entry point to the existing Kisan Connect workflow."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" }),
								title: "Market Prices",
								description: "Check mandi prices and trends."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-5 w-5" }),
								title: "Sell Now or Wait",
								description: "Understand the price direction."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" }),
								title: "Find Buyers",
								description: "Discover matched verified buyers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }),
								title: "Sale Lots",
								description: "Create lots and receive offers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
								title: "Compare Mandis",
								description: "Compare price, distance, arrivals and net realization."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-5 w-5" }),
								title: "Machinery",
								description: "Find, book or list agricultural machinery."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" }),
								title: "Crop Residue",
								description: "Exchange residue for additional income."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capability, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" }),
								title: "Natural Language",
								description: "Ask naturally in your own language."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-3xl border border-green-100 bg-green-50 p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "mt-0.5 h-5 w-5 text-green-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-slate-900",
							children: "Try saying..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-slate-600",
							children: "Examples for your SIH prototype demo."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-3 md:grid-cols-2",
						children: [
							"What is today's tomato price?",
							"Should I sell my tomatoes now or wait?",
							"Which mandi gives me the best price?",
							"Find buyers for 500 kg of tomatoes.",
							"Create a sale lot for my tomatoes.",
							"I need a tractor for two days.",
							"Find a harvester near me.",
							"Show me crop residue exchange."
						].map((text) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => handleExample(text),
							className: "rounded-xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow",
							children: [
								"“",
								text,
								"”"
							]
						}, text))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center justify-center gap-2 pb-8 text-xs text-slate-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4" }), LANGUAGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-slate-200 bg-white px-3 py-1.5",
						children: item.name
					}, item.code))]
				})
			]
		})
	});
}
function InfoBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-white p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-slate-500",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-bold text-slate-900",
			children: value
		})]
	});
}
function Capability({ icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-slate-200 p-5 transition hover:border-green-200 hover:bg-green-50/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-bold text-slate-900",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-6 text-slate-500",
				children: description
			})
		]
	});
}
//#endregion
export { VoiceAssistant as component };
