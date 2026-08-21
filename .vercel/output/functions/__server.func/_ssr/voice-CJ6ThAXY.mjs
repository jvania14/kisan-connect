import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as ArrowLeft, C as Languages, d as Search, g as MicOff, h as Mic } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voice-CJ6ThAXY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LANGUAGES = [
	{
		code: "en-IN",
		label: "English",
		name: "English",
		example: "I need a tractor for two days"
	},
	{
		code: "hi-IN",
		label: "हिन्दी",
		name: "Hindi",
		example: "मुझे दो दिन के लिए ट्रैक्टर चाहिए"
	},
	{
		code: "pa-IN",
		label: "ਪੰਜਾਬੀ",
		name: "Punjabi",
		example: "ਮੈਨੂੰ ਦੋ ਦਿਨਾਂ ਲਈ ਟਰੈਕਟਰ ਚਾਹੀਦਾ ਹੈ"
	},
	{
		code: "bn-IN",
		label: "বাংলা",
		name: "Bengali",
		example: "আমার দুই দিনের জন্য ট্রাক্টর দরকার"
	},
	{
		code: "mr-IN",
		label: "मराठी",
		name: "Marathi",
		example: "मला दोन दिवसांसाठी ट्रॅक्टर हवा आहे"
	},
	{
		code: "gu-IN",
		label: "ગુજરાતી",
		name: "Gujarati",
		example: "મારે બે દિવસ માટે ટ્રેક્ટર જોઈએ છે"
	},
	{
		code: "ta-IN",
		label: "தமிழ்",
		name: "Tamil",
		example: "எனக்கு இரண்டு நாட்களுக்கு டிராக்டர் வேண்டும்"
	},
	{
		code: "te-IN",
		label: "తెలుగు",
		name: "Telugu",
		example: "నాకు రెండు రోజులకు ట్రాక్టర్ కావాలి"
	},
	{
		code: "kn-IN",
		label: "ಕನ್ನಡ",
		name: "Kannada",
		example: "ನನಗೆ ಎರಡು ದಿನಗಳ ಕಾಲ ಟ್ರ್ಯಾಕ್ಟರ್ ಬೇಕು"
	},
	{
		code: "ml-IN",
		label: "മലയാളം",
		name: "Malayalam",
		example: "എനിക്ക് രണ്ട് ദിവസത്തേക്ക് ട്രാക്ടർ വേണം"
	}
];
function VoiceSearch() {
	const navigate = useNavigate();
	const [language, setLanguage] = (0, import_react.useState)("en-IN");
	const [speech, setSpeech] = (0, import_react.useState)("");
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [supported, setSupported] = (0, import_react.useState)(true);
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
		};
		recognition.onresult = (event) => {
			let finalText = "";
			let interimText = "";
			for (let i = 0; i < event.results.length; i++) {
				const result = event.results[i];
				const transcript = result?.[0]?.transcript ?? "";
				if (result?.isFinal) finalText += transcript;
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
				default: setError(`Could not understand the voice input. Please try again.`);
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
	const stopListening = () => {
		const recognition = recognitionRef.current;
		if (!recognition) {
			setIsListening(false);
			return;
		}
		try {
			recognition.stop();
		} catch {}
		setIsListening(false);
	};
	const startListening = () => {
		if (!supported) {
			setError("Voice recognition is not supported in this browser. Please use Google Chrome.");
			return;
		}
		const recognition = recognitionRef.current;
		if (!recognition) {
			setError("Voice recognition is unavailable. Please refresh the page.");
			return;
		}
		setSpeech("");
		setError("");
		recognition.lang = language;
		try {
			recognition.start();
		} catch {
			setError("Microphone is already active. Please wait a moment and try again.");
		}
	};
	const handleMicrophone = () => {
		if (isListening) stopListening();
		else startListening();
	};
	const searchMachinery = () => {
		const query = speech.trim();
		if (!query) {
			setError("Please speak something first.");
			return;
		}
		const url = `/machinery?q=${encodeURIComponent(query)}`;
		window.location.assign(url);
	};
	const chooseLanguage = (code) => {
		stopListening();
		setSpeech("");
		setError("");
		setLanguage(code);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#faf9f0] px-5 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/dashboard" }),
					className: "mb-6 flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-green-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" }), "Back to Dashboard"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-3xl border border-[#e5e2d5] bg-white shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 pb-5 pt-8 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-7 w-7 text-green-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-bold text-[#071c0d]",
									children: "Voice Search"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-gray-600",
								children: "Search agricultural machinery using your voice"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-6 rounded-2xl bg-[#f6f5e9] p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "language",
									className: "mb-2 block font-semibold text-gray-700",
									children: "Select your language"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "language",
									value: language,
									onChange: (event) => chooseLanguage(event.target.value),
									className: "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg outline-none focus:border-green-700",
									children: LANGUAGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: item.code,
										children: [
											item.label,
											" — ",
											item.name
										]
									}, item.code))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm text-gray-600",
									children: [
										"Example: \"",
										selectedLanguage.example,
										"\""
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-6 py-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleMicrophone,
									disabled: !supported,
									"aria-label": isListening ? "Stop listening" : "Start voice search",
									className: `mx-auto flex h-36 w-36 items-center justify-center rounded-full shadow-lg transition ${isListening ? "scale-110 bg-red-600" : "bg-green-700 hover:scale-105 hover:bg-green-800"} ${!supported ? "cursor-not-allowed opacity-50" : ""}`,
									children: isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "h-16 w-16 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-16 w-16 text-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-8 text-3xl font-semibold text-[#071c0d]",
									children: isListening ? "Listening..." : "Tap the microphone and speak"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-lg text-gray-500",
									children: isListening ? `Speak in ${selectedLanguage.name}...` : selectedLanguage.example
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-6 mb-6 rounded-2xl bg-[#f6f5e9] p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500",
								children: "Your Speech"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-h-[90px] text-2xl leading-relaxed text-[#071c0d]",
								children: speech || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-400",
									children: "Your recognized speech will appear here..."
								})
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-6 mb-6 rounded-2xl bg-red-50 px-6 py-4 text-center text-red-600",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-6 pb-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: searchMachinery,
								disabled: !speech.trim(),
								className: `flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-xl font-semibold ${speech.trim() ? "bg-green-700 text-white hover:bg-green-800" : "cursor-not-allowed bg-gray-200 text-gray-400"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-6 w-6" }), "Search Machinery"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-[#e5e2d5] bg-[#faf9f0] px-6 py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-sm text-gray-600",
								children: "Supported languages"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap justify-center gap-2",
								children: LANGUAGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => chooseLanguage(item.code),
									className: `rounded-full px-4 py-2 text-sm font-medium ${language === item.code ? "bg-green-700 text-white" : "bg-white text-gray-700 hover:bg-green-50"}`,
									children: item.label
								}, item.code))
							})]
						})
					]
				}),
				!supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 rounded-2xl bg-yellow-50 p-5 text-center text-yellow-800",
					children: "Voice recognition is not supported in this browser. Please use Google Chrome."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-green-100 bg-green-50 p-5 text-center text-sm text-green-800",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tip:" }),
						" Say the machine, location, and number of days together.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Example: \"I need a tractor near Ajmer for two days.\""
					]
				})
			]
		})
	});
}
//#endregion
export { VoiceSearch as component };
