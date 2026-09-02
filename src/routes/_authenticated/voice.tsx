import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Languages,
  MapPin,
  Mic,
  MicOff,
  Package,
  Search,
  ShoppingCart,
  Tractor,
  TrendingUp,
  Users,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/voice")({
  component: VoiceAssistant,
});

type SpeechRecognitionResultEvent = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

/* ---------------------------------------------------------
   REGIONAL LANGUAGES
--------------------------------------------------------- */

const LANGUAGES = [
  {
    code: "en-IN",
    label: "English",
    name: "English",
    example: "What is today's tomato price?",
  },
  {
    code: "hi-IN",
    label: "हिन्दी",
    name: "Hindi",
    example: "आज टमाटर का भाव क्या है?",
  },
  {
    code: "mr-IN",
    label: "मराठी",
    name: "Marathi",
    example: "आज टोमॅटोचा बाजारभाव काय आहे?",
  },
  {
    code: "pa-IN",
    label: "ਪੰਜਾਬੀ",
    name: "Punjabi",
    example: "ਅੱਜ ਟਮਾਟਰ ਦਾ ਭਾਅ ਕੀ ਹੈ?",
  },
  {
    code: "bn-IN",
    label: "বাংলা",
    name: "Bengali",
    example: "আজ টমেটোর দাম কত?",
  },
  {
    code: "gu-IN",
    label: "ગુજરાતી",
    name: "Gujarati",
    example: "આજે ટામેટાંનો ભાવ કેટલો છે?",
  },
  {
    code: "ta-IN",
    label: "தமிழ்",
    name: "Tamil",
    example: "இன்று தக்காளி விலை என்ன?",
  },
  {
    code: "te-IN",
    label: "తెలుగు",
    name: "Telugu",
    example: "ఈరోజు టమాటా ధర ఎంత?",
  },
  {
    code: "kn-IN",
    label: "ಕನ್ನಡ",
    name: "Kannada",
    example: "ಇಂದು ಟೊಮೇಟೊ ಬೆಲೆ ಎಷ್ಟು?",
  },
  {
    code: "ml-IN",
    label: "മലയാളം",
    name: "Malayalam",
    example: "ഇന്നത്തെ തക്കാളി വില എത്രയാണ്?",
  },
];

/* ---------------------------------------------------------
   DEMO MARKET DATA
   Replace these with AGMARKNET/eNAM data later.
--------------------------------------------------------- */

const DEMO_MARKETS = [
  {
    name: "Mumbai",
    price: 3020,
    change: "+9.1%",
    arrivals: 1240,
    distance: "168 km",
    net: 2720,
  },
  {
    name: "Nashik",
    price: 2850,
    change: "+8.4%",
    arrivals: 1840,
    distance: "42 km",
    net: 2700,
  },
  {
    name: "Pune",
    price: 2720,
    change: "+5.2%",
    arrivals: 2140,
    distance: "156 km",
    net: 2390,
  },
  {
    name: "Ahmednagar",
    price: 2610,
    change: "+3.8%",
    arrivals: 2430,
    distance: "92 km",
    net: 2460,
  },
];

const DEMO_BUYERS = [
  {
    name: "FreshKart Foods",
    price: 3000,
    quantity: "500–2,000 kg",
    distance: "18 km",
    match: 98,
    verified: true,
  },
  {
    name: "Maharashtra Agro",
    price: 2950,
    quantity: "1,000 kg",
    distance: "32 km",
    match: 94,
    verified: true,
  },
  {
    name: "Fresh Harvest Traders",
    price: 2900,
    quantity: "750 kg",
    distance: "25 km",
    match: 91,
    verified: true,
  },
];

type Intent =
  | "price"
  | "forecast"
  | "buyer"
  | "lot"
  | "mandi"
  | "machinery"
  | "residue"
  | "general";

type AssistantAction = {
  label: string;
  action: string;
  primary?: boolean;
};

type AssistantResult = {
  intent: Intent;
  title: string;
  message: string;
  actions: AssistantAction[];
};

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

/* ---------------------------------------------------------
   VOICE INTENT ENGINE
--------------------------------------------------------- */

function detectIntent(query: string): AssistantResult {
  const text = query.toLowerCase().trim();

  /* MACHINERY */
  if (
    hasAny(text, [
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
      "अवजार",
    ])
  ) {
    return {
      intent: "machinery",
      title: "Machinery Assistant",
      message:
        "I can help you find agricultural machinery nearby. You can search for a tractor, harvester, rotavator or another machine and check availability.",
      actions: [
        {
          label: "Find Machinery",
          action: "machinery",
          primary: true,
        },
        {
          label: "List My Machinery",
          action: "list-machinery",
        },
        {
          label: "My Bookings",
          action: "bookings",
        },
      ],
    };
  }

  /* CROP RESIDUE */
  if (
    hasAny(text, [
      "residue",
      "stubble",
      "parali",
      "crop waste",
      "straw",
      "husk",
      "पराली",
      "फसल अवशेष",
      "कचरा",
      "भूसा",
    ])
  ) {
    return {
      intent: "residue",
      title: "Crop Residue Exchange",
      message:
        "You can list surplus crop residue such as straw, husk or stubble and connect with buyers instead of letting it go to waste.",
      actions: [
        {
          label: "Open Residue Exchange",
          action: "residues",
          primary: true,
        },
      ],
    };
  }

  /* BUYERS */
  if (
    hasAny(text, [
      "buyer",
      "buyers",
      "customer",
      "who will buy",
      "find buyer",
      "खरीदार",
      "ग्राहक",
      "खरेदीदार",
      "खरीदार ढूंढ",
      "खरेदीदार शोध",
    ])
  ) {
    return {
      intent: "buyer",
      title: "Verified Buyers",
      message:
        "I found buyers matching your crop. FreshKart Foods currently has the strongest demo offer at ₹3,000 per quintal with a 98% match score.",
      actions: [
        {
          label: "View Buyers",
          action: "buyers",
          primary: true,
        },
        {
          label: "Create Sale Lot",
          action: "lot",
        },
      ],
    };
  }

  /* SALE LOT */
  if (
    hasAny(text, [
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
      "बेचने का लॉट",
    ])
  ) {
    return {
      intent: "lot",
      title: "Create a Sale Lot",
      message:
        "A digital sale lot contains your crop, quantity, quality grade and expected price. Verified buyers can then send digital offers.",
      actions: [
        {
          label: "Create Sale Lot",
          action: "lot",
          primary: true,
        },
        {
          label: "View My Offers",
          action: "offers",
        },
      ],
    };
  }

  /* FORECAST / SELL-WAIT */
  if (
    hasAny(text, [
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
      "भाव बढ़ेगा",
    ])
  ) {
    return {
      intent: "forecast",
      title: "Smart Sell Window",
      message:
        "The prototype price trend is upward. Tomato is currently around ₹2,850 per quintal and the forecast reaches about ₹3,070 per quintal. The current recommendation is WAIT 2–3 DAYS, subject to actual mandi arrivals and prices.",
      actions: [
        {
          label: "View Price Forecast",
          action: "forecast",
          primary: true,
        },
        {
          label: "Find Buyers",
          action: "buyers",
        },
        {
          label: "Sell Now",
          action: "buyers",
        },
      ],
    };
  }

  /* MANDI */
  if (
    hasAny(text, [
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
      "कौन सी मंडी",
    ])
  ) {
    return {
      intent: "mandi",
      title: "Best Market to Sell",
      message:
        "Mumbai has the highest headline price at ₹3,020 per quintal. Nashik is much closer at 42 km. The best decision should consider transport and handling costs, not only the headline price.",
      actions: [
        {
          label: "Compare Mandis",
          action: "mandi",
          primary: true,
        },
        {
          label: "Check Net Realization",
          action: "net",
        },
      ],
    };
  }

  /* PRICE */
  if (
    hasAny(text, [
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
      "बाजारभाव",
    ])
  ) {
    return {
      intent: "price",
      title: "Today's Mandi Price",
      message:
        "The current prototype tomato price is ₹2,850 per quintal. The highest shown market price is Mumbai at ₹3,020 per quintal.",
      actions: [
        {
          label: "View Market Prices",
          action: "market",
          primary: true,
        },
        {
          label: "Compare Mandis",
          action: "mandi",
        },
        {
          label: "Find Buyers",
          action: "buyers",
        },
      ],
    };
  }

  return {
    intent: "general",
    title: "Kisan AI Assistant",
    message:
      "I can help with mandi prices, price prediction, sell-now-or-wait decisions, verified buyers, sale lots, mandi comparison, machinery and crop residues.",
    actions: [
      {
        label: "Check Market Price",
        action: "market",
        primary: true,
      },
      {
        label: "Price Prediction",
        action: "forecast",
      },
      {
        label: "Find Buyers",
        action: "buyers",
      },
    ],
  };
}

/* ---------------------------------------------------------
   NAVIGATION
--------------------------------------------------------- */

function navigateTo(action: string, query?: string) {
  const encodedQuery = query?.trim()
    ? `?q=${encodeURIComponent(query.trim())}`
    : "";

  const routes: Record<string, string> = {
    market: "/dashboard#market-prices",
    forecast: "/dashboard#price-forecast",
    buyers: "/dashboard#find-buyers",
    lot: "/dashboard#sale-lots",
    offers: "/dashboard#offers",
    mandi: "/dashboard#best-mandi",
    net: "/dashboard#net-realization",
    machinery: `/machinery${encodedQuery}`,
    "list-machinery": "/list-machinery",
    bookings: "/bookings",
    residues: "/residues",
  };

  window.location.assign(routes[action] ?? "/dashboard");
}

/* ---------------------------------------------------------
   SPEECH OUTPUT
--------------------------------------------------------- */

function speakText(text: string, language: string) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = 0.95;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */

function VoiceAssistant() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en-IN");
  const [speech, setSpeech] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true);
  const [result, setResult] = useState<AssistantResult | null>(null);

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const selectedLanguage =
    LANGUAGES.find((item) => item.code === language) ??
    LANGUAGES[0]!;

  /* -------------------------------------------------------
     INITIALISE SPEECH RECOGNITION
  ------------------------------------------------------- */

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

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

        const transcript =
          item?.[0]?.transcript ?? "";

        if (item?.isFinal) {
          finalText += transcript;
        } else {
          interimText += transcript;
        }
      }

      const text =
        (finalText || interimText).trim();

      if (text) {
        setSpeech(text);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      switch (event.error) {
        case "not-allowed":
        case "service-not-allowed":
          setError(
            "Microphone permission was denied. Please allow microphone access in Chrome.",
          );
          break;

        case "no-speech":
          setError(
            "No speech detected. Please speak clearly and try again.",
          );
          break;

        case "audio-capture":
          setError(
            "No microphone was found. Please check your microphone.",
          );
          break;

        case "network":
          setError(
            "Speech recognition needs an internet connection.",
          );
          break;

        case "aborted":
          break;

        default:
          setError(
            "Could not understand the voice input. Please try again.",
          );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // Ignore cleanup errors.
      }

      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };
  }, [language]);

  /* -------------------------------------------------------
     MICROPHONE
  ------------------------------------------------------- */

  const startListening = () => {
    if (!supported) {
      setError(
        "Voice recognition is not supported. Please use Google Chrome.",
      );
      return;
    }

    const recognition = recognitionRef.current;

    if (!recognition) {
      setError(
        "Voice recognition is unavailable. Please refresh the page.",
      );
      return;
    }

    setSpeech("");
    setResult(null);
    setError("");

    recognition.lang = language;

    try {
      recognition.start();
    } catch {
      setError(
        "Microphone is already active. Please wait a moment and try again.",
      );
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);
  };

  const handleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  /* -------------------------------------------------------
     ANALYSE
  ------------------------------------------------------- */

  const analyzeSpeech = () => {
    if (!speech.trim()) {
      setError("Please speak something first.");
      return;
    }

    const response = detectIntent(speech);

    setResult(response);

    speakText(response.message, language);
  };

  const handleExample = (example: string) => {
    setSpeech(example);
    setError("");

    const response = detectIntent(example);

    setResult(response);
  };

  const chooseLanguage = (code: string) => {
    stopListening();

    setSpeech("");
    setResult(null);
    setError("");

    setLanguage(code);
  };

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <button
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* HERO */}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-6 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium">
                <Bot className="h-4 w-4" />
                Kisan AI
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Your voice-powered farming assistant
              </h1>

              <p className="mt-4 text-base leading-7 text-green-50 sm:text-lg">
                Ask about mandi prices, future prices, buyers,
                sale lots, machinery and more — in your own language.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  🌾 Market Intelligence
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  📈 Price Prediction
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  👨‍🌾 Buyer Matching
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  🎤 Regional Voice
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-green-700 shadow-2xl">
                  <Bot className="h-14 w-14" />
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">

          {/* VOICE INPUT */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start justify-between gap-4">

              <div>
                <div className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-green-600" />

                  <h2 className="text-xl font-bold text-slate-900">
                    Ask Kisan AI
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Tap the microphone and speak naturally.
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-2.5 text-green-700">
                <Languages className="h-5 w-5" />
              </div>

            </div>

            {/* LANGUAGE */}

            <div className="mt-6">

              <label
                htmlFor="language"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Choose language
              </label>

              <select
                id="language"
                value={language}
                onChange={(event) =>
                  chooseLanguage(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                {LANGUAGES.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.label} — {item.name}
                  </option>
                ))}
              </select>

            </div>

            {/* MICROPHONE */}

            <div className="my-8 flex justify-center">

              <button
                type="button"
                onClick={handleMicrophone}
                disabled={!supported}
                aria-label={
                  isListening
                    ? "Stop listening"
                    : "Start voice assistant"
                }
                className={`relative flex h-36 w-36 items-center justify-center rounded-full shadow-xl transition ${
                  isListening
                    ? "bg-red-500 shadow-red-200"
                    : "bg-green-600 shadow-green-200 hover:scale-105 hover:bg-green-700"
                } ${
                  !supported
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >

                {isListening && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-30" />
                )}

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white">

                  {isListening ? (
                    <MicOff className="h-10 w-10 text-red-500" />
                  ) : (
                    <Mic className="h-10 w-10 text-green-600" />
                  )}

                </div>

              </button>

            </div>

            <div className="text-center">

              <p className="text-sm font-semibold text-slate-700">
                {isListening
                  ? "Listening..."
                  : "Tap to speak"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {selectedLanguage.name}
              </p>

            </div>

            {/* SPEECH */}

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">

              <div className="mb-2 flex items-center justify-between">

                <p className="text-sm font-semibold text-slate-800">
                  Your Speech
                </p>

                {speech && (
                  <button
                    type="button"
                    onClick={() => {
                      setSpeech("");
                      setResult(null);
                    }}
                    className="text-xs font-medium text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}

              </div>

              <p className="min-h-12 text-sm leading-6 text-slate-600">
                {speech ||
                  selectedLanguage.example}
              </p>

            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={analyzeSpeech}
              disabled={!speech.trim()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              <Bot className="h-5 w-5" />
              Ask Kisan AI
            </button>

          </section>

          {/* AI RESPONSE */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-100 p-2.5 text-green-700">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  AI Response
                </h2>

                <p className="text-xs text-slate-500">
                  Prototype decision support
                </p>
              </div>

            </div>

            {!result ? (

              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">

                <div className="rounded-full bg-slate-100 p-5">
                  <Volume2 className="h-8 w-8 text-slate-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-800">
                  Ask me about your crop
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Check prices, compare markets, find
                  buyers or decide whether to sell now
                  or wait.
                </p>

                <div className="mt-6 grid w-full max-w-md gap-2">

                  {[
                    "What is today's tomato price?",
                    "Should I sell now or wait?",
                    "Which mandi gives the best price?",
                    "Find buyers for 500 kg of tomatoes.",
                  ].map((example) => (

                    <button
                      key={example}
                      type="button"
                      onClick={() =>
                        handleExample(example)
                      }
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-green-200 hover:bg-green-50"
                    >
                      {example}

                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </button>

                  ))}

                </div>

              </div>

            ) : (

              <div className="mt-6">

                {/* RESULT HEADER */}

                <div className="rounded-2xl bg-green-50 p-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                        {result.intent}
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-slate-900">
                        {result.title}
                      </h3>

                    </div>

                    <CheckCircle2 className="h-6 w-6 text-green-600" />

                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {result.message}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      speakText(
                        result.message,
                        language,
                      )
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-green-700 shadow-sm"
                  >
                    <Volume2 className="h-4 w-4" />
                    Hear Response
                  </button>

                </div>

                {/* MARKET DATA */}

                {(result.intent === "price" ||
                  result.intent === "mandi" ||
                  result.intent === "forecast") && (

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl border border-slate-200 p-4">

                      <p className="text-xs text-slate-500">
                        Current tomato price
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        ₹2,850
                      </p>

                      <p className="text-xs text-slate-500">
                        per quintal
                      </p>

                    </div>

                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

                      <p className="text-xs text-green-700">
                        Forecast
                      </p>

                      <p className="mt-1 text-2xl font-bold text-green-700">
                        ₹3,070
                      </p>

                      <p className="text-xs text-green-700">
                        per quintal
                      </p>

                    </div>

                  </div>
                )}

                {/* SELL / WAIT */}

                {result.intent === "forecast" && (

                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                    <div className="flex items-center gap-3">

                      <Clock3 className="h-5 w-5 text-amber-600" />

                      <div>

                        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                          Smart Sell Advisor
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          WAIT 2–3 DAYS
                        </p>

                      </div>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs text-slate-500">
                          Expected range
                        </p>

                        <p className="mt-1 font-bold text-slate-900">
                          ₹2,950–₹3,100/q
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-xs text-slate-500">
                          Confidence
                        </p>

                        <p className="mt-1 font-bold text-green-700">
                          78%
                        </p>
                      </div>

                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-600">
                      Recommendation should ultimately use
                      verified mandi prices, arrivals, storage
                      capacity and local conditions.
                    </p>

                  </div>
                )}

                {/* MANDI COMPARISON */}

                {result.intent === "mandi" && (

                  <div className="mt-5 space-y-3">

                    {DEMO_MARKETS.map((market) => (

                      <div
                        key={market.name}
                        className="rounded-xl border border-slate-200 p-4"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="font-bold text-slate-900">
                              {market.name}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="h-3 w-3" />
                              {market.distance}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {market.arrivals.toLocaleString(
                                "en-IN",
                              )}{" "}
                              q arrivals
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="font-bold text-slate-900">
                              ₹
                              {market.price.toLocaleString(
                                "en-IN",
                              )}
                            </p>

                            <p className="text-xs font-semibold text-green-600">
                              {market.change}
                            </p>

                          </div>

                        </div>

                        <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">

                          <span className="text-xs text-slate-500">
                            Estimated net realization
                          </span>

                          <span className="text-sm font-bold text-green-700">
                            ₹
                            {market.net.toLocaleString(
                              "en-IN",
                            )}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>
                )}

                {/* BUYERS */}

                {result.intent === "buyer" && (

                  <div className="mt-5 space-y-3">

                    {DEMO_BUYERS.map((buyer) => (

                      <div
                        key={buyer.name}
                        className="rounded-xl border border-slate-200 p-4"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <div className="flex items-center gap-2">

                              <p className="font-bold text-slate-900">
                                {buyer.name}
                              </p>

                              {buyer.verified && (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              )}

                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              {buyer.quantity} ·{" "}
                              {buyer.distance}
                            </p>

                          </div>

                          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                            {buyer.match}% match
                          </span>

                        </div>

                        <div className="mt-3 flex items-center justify-between">

                          <p className="text-lg font-bold text-green-700">
                            ₹
                            {buyer.price.toLocaleString(
                              "en-IN",
                            )}
                            /q
                          </p>

                          <span className="text-xs font-medium text-slate-500">
                            Verified buyer
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>
                )}

                {/* SALE LOT */}

                {result.intent === "lot" && (

                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                    <div className="flex items-center gap-3">

                      <Package className="h-5 w-5 text-blue-600" />

                      <div>

                        <p className="font-bold text-slate-900">
                          Digital Sale Lot
                        </p>

                        <p className="text-xs text-slate-500">
                          Crop → Quantity → Grade → Expected price
                        </p>

                      </div>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      <InfoBox
                        label="Demo crop"
                        value="Tomato"
                      />

                      <InfoBox
                        label="Quantity"
                        value="500 kg"
                      />

                      <InfoBox
                        label="Quality"
                        value="Grade A"
                      />

                      <InfoBox
                        label="Expected"
                        value="₹3,000/q"
                      />

                    </div>

                  </div>
                )}

                {/* ACTIONS */}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  {result.actions.map((item) => (

                    <button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        navigateTo(
                          item.action,
                          item.action === "machinery"
                            ? speech
                            : undefined,
                        )
                      }
                      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${
                        item.primary
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-green-50"
                      }`}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4" />
                    </button>

                  ))}

                </div>

                <p className="mt-5 text-center text-xs text-slate-400">
                  Prototype market values — connect verified
                  AGMARKNET/eNAM data before production use.
                </p>

              </div>
            )}

          </section>

        </div>

        {/* CAPABILITIES */}

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-900">
              What Kisan AI can do
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Voice is the entry point to the existing
              Kisan Connect workflow.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Capability
              icon={
                <TrendingUp className="h-5 w-5" />
              }
              title="Market Prices"
              description="Check mandi prices and trends."
            />

            <Capability
              icon={<Clock3 className="h-5 w-5" />}
              title="Sell Now or Wait"
              description="Understand the price direction."
            />

            <Capability
              icon={<Users className="h-5 w-5" />}
              title="Find Buyers"
              description="Discover matched verified buyers."
            />

            <Capability
              icon={<Package className="h-5 w-5" />}
              title="Sale Lots"
              description="Create lots and receive offers."
            />

            <Capability
              icon={<MapPin className="h-5 w-5" />}
              title="Compare Mandis"
              description="Compare price, distance, arrivals and net realization."
            />

            <Capability
              icon={<Tractor className="h-5 w-5" />}
              title="Machinery"
              description="Find, book or list agricultural machinery."
            />

            <Capability
              icon={
                <ShoppingCart className="h-5 w-5" />
              }
              title="Crop Residue"
              description="Exchange residue for additional income."
            />

            <Capability
              icon={<Search className="h-5 w-5" />}
              title="Natural Language"
              description="Ask naturally in your own language."
            />

          </div>

        </section>

        {/* DEMO COMMANDS */}

        <section className="mt-6 rounded-3xl border border-green-100 bg-green-50 p-6 sm:p-8">

          <div className="flex items-start gap-3">

            <Mic className="mt-0.5 h-5 w-5 text-green-700" />

            <div>

              <h2 className="font-bold text-slate-900">
                Try saying...
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Examples for your SIH prototype demo.
              </p>

            </div>

          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">

            {[
              "What is today's tomato price?",
              "Should I sell my tomatoes now or wait?",
              "Which mandi gives me the best price?",
              "Find buyers for 500 kg of tomatoes.",
              "Create a sale lot for my tomatoes.",
              "I need a tractor for two days.",
              "Find a harvester near me.",
              "Show me crop residue exchange.",
            ].map((text) => (

              <button
                key={text}
                type="button"
                onClick={() =>
                  handleExample(text)
                }
                className="rounded-xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              >
                “{text}”
              </button>

            ))}

          </div>

        </section>

        {/* LANGUAGES */}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 pb-8 text-xs text-slate-500">

          <Languages className="h-4 w-4" />

          {LANGUAGES.map((item) => (

            <span
              key={item.code}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5"
            >
              {item.name}
            </span>

          ))}

        </div>

      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   SMALL COMPONENTS
--------------------------------------------------------- */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white p-3">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

function Capability({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-green-200 hover:bg-green-50/40">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}