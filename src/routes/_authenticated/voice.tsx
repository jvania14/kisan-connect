import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Languages, Mic, MicOff, Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/voice")({
  component: VoiceSearch,
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

const LANGUAGES = [
  {
    code: "hi-IN",
    label: "हिन्दी",
    name: "Hindi",
    example: "मुझे दो दिन के लिए ट्रैक्टर चाहिए",
  },
  {
    code: "en-IN",
    label: "English",
    name: "English",
    example: "I need a tractor for two days",
  },
  {
    code: "pa-IN",
    label: "ਪੰਜਾਬੀ",
    name: "Punjabi",
    example: "ਮੈਨੂੰ ਦੋ ਦਿਨਾਂ ਲਈ ਟਰੈਕਟਰ ਚਾਹੀਦਾ ਹੈ",
  },
  {
    code: "bn-IN",
    label: "বাংলা",
    name: "Bengali",
    example: "আমার দুই দিনের জন্য ট্রাক্টর দরকার",
  },
  {
    code: "mr-IN",
    label: "मराठी",
    name: "Marathi",
    example: "मला दोन दिवसांसाठी ट्रॅक्टर हवा आहे",
  },
  {
    code: "gu-IN",
    label: "ગુજરાતી",
    name: "Gujarati",
    example: "મારે બે દિવસ માટે ટ્રેક્ટર જોઈએ છે",
  },
  {
    code: "ta-IN",
    label: "தமிழ்",
    name: "Tamil",
    example: "எனக்கு இரண்டு நாட்களுக்கு டிராக்டர் வேண்டும்",
  },
  {
    code: "te-IN",
    label: "తెలుగు",
    name: "Telugu",
    example: "నాకు రెండు రోజులకు ట్రాక్టర్ కావాలి",
  },
  {
    code: "kn-IN",
    label: "ಕನ್ನಡ",
    name: "Kannada",
    example: "ನನಗೆ ಎರಡು ದಿನಗಳ ಕಾಲ ಟ್ರ್ಯಾಕ್ಟರ್ ಬೇಕು",
  },
  {
    code: "ml-IN",
    label: "മലയാളം",
    name: "Malayalam",
    example: "എനിക്ക് രണ്ട് ദിവസത്തേക്ക് ട്രാക്ടർ വേണം",
  },
];

function VoiceSearch() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("hi-IN");
  const [speech, setSpeech] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true);

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const selectedLanguage =
    LANGUAGES.find((item) => item.code === language) ??
    LANGUAGES[0];

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (
      event: SpeechRecognitionResultEvent,
    ) => {
      let text = "";

      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0]?.transcript ?? "";
      }

      if (text.trim()) {
        setSpeech(text.trim());
      }
    };

    recognition.onerror = (
      event: SpeechRecognitionErrorEvent,
    ) => {
      setIsListening(false);

      switch (event.error) {
        case "not-allowed":
          setError(
            "Microphone permission was denied. Please allow microphone access.",
          );
          break;

        case "no-speech":
          setError(
            "No speech detected. Please speak clearly and try again.",
          );
          break;

        case "network":
          setError(
            "Speech recognition needs an internet connection.",
          );
          break;

        default:
          setError(
            "Could not understand your voice. Please try again.",
          );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [language]);

  const startListening = () => {
    if (!supported) {
      setError(
        "Voice recognition is not supported in this browser. Please use Google Chrome.",
      );
      return;
    }

    if (!recognitionRef.current) {
      setError("Voice recognition is unavailable.");
      return;
    }

    setSpeech("");
    setError("");

    recognitionRef.current.lang = language;

    try {
      recognitionRef.current.start();
    } catch {
      setError(
        "Microphone is already active. Please wait and try again.",
      );
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const searchMachinery = () => {
    if (!speech.trim()) {
      setError("Please speak something first.");
      return;
    }

    /*
     * IMPORTANT:
     * We pass the COMPLETE natural-language request.
     *
     * The machinery page will extract:
     *
     * "मुझे दो दिन के लिए ट्रैक्टर चाहिए"
     *
     * →
     * category = Tractor
     * duration = 2 days
     */

    navigate({
      to: "/machinery",
      search: {
        search: speech.trim(),
      } as never,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf9f0] px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
          className="mb-6 flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-green-700"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="overflow-hidden rounded-3xl border border-[#e5e2d5] bg-white shadow-sm">
          <div className="px-6 pb-5 pt-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Languages className="h-7 w-7 text-green-700" />

              <h1 className="text-3xl font-bold text-[#071c0d]">
                Voice Search
              </h1>
            </div>

            <p className="text-lg text-gray-600">
              Search agricultural machinery using your voice
            </p>
          </div>

          <div className="mx-6 rounded-2xl bg-[#f6f5e9] p-5">
            <label
              htmlFor="language"
              className="mb-2 block font-semibold text-gray-700"
            >
              Select your language
            </label>

            <select
              id="language"
              value={language}
              onChange={(e) => {
                stopListening();
                setSpeech("");
                setError("");
                setLanguage(e.target.value);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg outline-none focus:border-green-700"
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label} — {item.name}
                </option>
              ))}
            </select>

            <p className="mt-3 text-sm text-gray-600">
              Example: "{selectedLanguage.example}"
            </p>
          </div>

          <div className="px-6 py-10 text-center">
            <button
              onClick={handleMicrophone}
              disabled={!supported}
              className={`mx-auto flex h-36 w-36 items-center justify-center rounded-full shadow-lg transition ${
                isListening
                  ? "scale-110 bg-red-600"
                  : "bg-green-700 hover:scale-105 hover:bg-green-800"
              }`}
            >
              {isListening ? (
                <MicOff className="h-16 w-16 text-white" />
              ) : (
                <Mic className="h-16 w-16 text-white" />
              )}
            </button>

            <h2 className="mt-8 text-3xl font-semibold text-[#071c0d]">
              {isListening
                ? "Listening..."
                : "Tap the microphone and speak"}
            </h2>

            <p className="mt-3 text-lg text-gray-500">
              {isListening
                ? "Speak clearly..."
                : selectedLanguage.example}
            </p>
          </div>

          <div className="mx-6 mb-6 rounded-2xl bg-[#f6f5e9] p-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Your Speech
            </p>

            <div className="min-h-[90px] text-2xl leading-relaxed text-[#071c0d]">
              {speech || (
                <span className="text-gray-400">
                  Your recognized speech will appear here...
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="mx-6 mb-6 rounded-2xl bg-red-50 px-6 py-4 text-center text-red-600">
              {error}
            </div>
          )}

          <div className="px-6 pb-8">
            <button
              onClick={searchMachinery}
              disabled={!speech.trim()}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-xl font-semibold ${
                speech.trim()
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
            >
              <Search className="h-6 w-6" />
              Search Machinery
            </button>
          </div>

          <div className="border-t border-[#e5e2d5] bg-[#faf9f0] px-6 py-5">
            <p className="text-center text-sm text-gray-600">
              Supported languages
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    stopListening();
                    setLanguage(item.code);
                    setSpeech("");
                    setError("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    language === item.code
                      ? "bg-green-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!supported && (
          <div className="mt-5 rounded-2xl bg-yellow-50 p-5 text-center text-yellow-800">
            Voice recognition is not supported in this browser.
            Please use Google Chrome.
          </div>
        )}
      </div>
    </div>
  );
}