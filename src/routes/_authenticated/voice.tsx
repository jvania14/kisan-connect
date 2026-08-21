import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Languages,
  Mic,
  MicOff,
  Search,
} from "lucide-react";

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
    code: "en-IN",
    label: "English",
    name: "English",
    example: "I need a tractor for two days",
  },
  {
    code: "hi-IN",
    label: "हिन्दी",
    name: "Hindi",
    example: "मुझे दो दिन के लिए ट्रैक्टर चाहिए",
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

  const [language, setLanguage] = useState("en-IN");
  const [speech, setSpeech] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true);

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(null);

  const selectedLanguage =
    LANGUAGES.find((item) => item.code === language) ??
    LANGUAGES[0]!;

  /*
   * Create speech recognition whenever the selected
   * language changes.
   */
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
    };

    recognition.onresult = (
      event: SpeechRecognitionResultEvent,
    ) => {
      let finalText = "";
      let interimText = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];

        const transcript =
          result?.[0]?.transcript ?? "";

        if (result?.isFinal) {
          finalText += transcript;
        } else {
          interimText += transcript;
        }
      }

      const text = (
        finalText || interimText
      ).trim();

      if (text) {
        setSpeech(text);
      }
    };

    recognition.onerror = (
      event: SpeechRecognitionErrorEvent,
    ) => {
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
            `Could not understand the voice input. Please try again.`,
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

  const stopListening = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setIsListening(false);
      return;
    }

    try {
      recognition.stop();
    } catch {
      // Recognition may already be stopped.
    }

    setIsListening(false);
  };

  const startListening = () => {
    if (!supported) {
      setError(
        "Voice recognition is not supported in this browser. Please use Google Chrome.",
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
    setError("");

    recognition.lang = language;

    try {
      recognition.start();
    } catch {
      /*
       * Browser throws InvalidStateError if start()
       * is called while already running.
       */
      setError(
        "Microphone is already active. Please wait a moment and try again.",
      );
    }
  };

  const handleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const searchMachinery = () => {
    const query = speech.trim();

    if (!query) {
      setError("Please speak something first.");
      return;
    }

    /*
     * Navigate directly using the URL.
     *
     * This avoids the TanStack Router search-type issue
     * and ensures the complete natural-language query
     * reaches the machinery page. Uses "q" to match the
     * param name the /machinery route actually reads.
     */
    const url =
      `/machinery?q=${encodeURIComponent(query)}`;

    window.location.assign(url);
  };

  const chooseLanguage = (code: string) => {
    stopListening();
    setSpeech("");
    setError("");
    setLanguage(code);
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
          {/* Header */}
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

          {/* Language selector */}
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
              onChange={(event) =>
                chooseLanguage(event.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg outline-none focus:border-green-700"
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

            <p className="mt-3 text-sm text-gray-600">
              Example: "{selectedLanguage.example}"
            </p>
          </div>

          {/* Microphone */}
          <div className="px-6 py-10 text-center">
            <button
              onClick={handleMicrophone}
              disabled={!supported}
              aria-label={
                isListening
                  ? "Stop listening"
                  : "Start voice search"
              }
              className={`mx-auto flex h-36 w-36 items-center justify-center rounded-full shadow-lg transition ${
                isListening
                  ? "scale-110 bg-red-600"
                  : "bg-green-700 hover:scale-105 hover:bg-green-800"
              } ${
                !supported
                  ? "cursor-not-allowed opacity-50"
                  : ""
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
                ? `Speak in ${selectedLanguage.name}...`
                : selectedLanguage.example}
            </p>
          </div>

          {/* Speech */}
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

          {/* Error */}
          {error && (
            <div className="mx-6 mb-6 rounded-2xl bg-red-50 px-6 py-4 text-center text-red-600">
              {error}
            </div>
          )}

          {/* Search */}
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

          {/* Language buttons */}
          <div className="border-t border-[#e5e2d5] bg-[#faf9f0] px-6 py-5">
            <p className="text-center text-sm text-gray-600">
              Supported languages
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() =>
                    chooseLanguage(item.code)
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    language === item.code
                      ? "bg-green-700 text-white"
                      : "bg-white text-gray-700 hover:bg-green-50"
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
            Voice recognition is not supported in this
            browser. Please use Google Chrome.
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5 text-center text-sm text-green-800">
          <strong>Tip:</strong> Say the machine, location,
          and number of days together.
          <br />
          Example: "I need a tractor near Ajmer for two
          days."
        </div>
      </div>
    </div>
  );
}