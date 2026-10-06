import { useState, useEffect } from "react";
import { Link, Clipboard, ArrowRight, X, AlertCircle, Film, Image as ImageIcon, Music, Sparkles, Eye, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header";
import { TopBannerAd, MobileStickyAnchorAd } from "./components/AdSpace";
import SEODetails from "./components/SEODetails";
import GuidesSection from "./components/GuidesSection";
import ProcessingSkeleton from "./components/ProcessingSkeleton";
import DownloadCard from "./components/DownloadCard";
import LegalModal from "./components/LegalModals";

import { Language, MediaResult } from "./types";
import { translations } from "./translations";
import { detectUrlPlatform } from "./utils/urlDetector";

function getRouteHero(route: string, lang: Language, t: typeof translations[Language]) {
  const norm = route.replace(/\/+$/, "") || "/";
  if (norm === "/mp3") {
    return lang === "ID"
      ? {
          title: (
            <>
              Download Lagu &amp; Sound TikTok<br />
              <span className="text-rose-600">Audio MP3 Jernih</span>
            </>
          ),
          subtitle: "Ekstrak dan simpan audio lagu viral TikTok ke format MP3 320kbps tanpa watermark, cepat dan gratis.",
          placeholder: "Tempel tautan video TikTok untuk ekstrak MP3..."
        }
      : {
          title: (
            <>
              Download TikTok Audio &amp; Sounds<br />
              <span className="text-rose-600">Crystal Clear MP3</span>
            </>
          ),
          subtitle: "Extract and save viral TikTok background music and sounds to 320kbps MP3 without watermark.",
          placeholder: "Paste TikTok URL to extract MP3 audio..."
        };
  }

  if (norm === "/foto") {
    return lang === "ID"
      ? {
          title: (
            <>
              Download Foto Slide TikTok<br />
              <span className="text-rose-600">Carousel HD &amp; File ZIP</span>
            </>
          ),
          subtitle: "Unduh semua foto carousel TikTok resolusi asli tanpa watermark, tersedia fitur paket ZIP satu klik.",
          placeholder: "Tempel tautan foto/carousel TikTok..."
        }
      : {
          title: (
            <>
              Download TikTok Photo Slides<br />
              <span className="text-rose-600">HD Carousel &amp; ZIP Archive</span>
            </>
          ),
          subtitle: "Save all photo carousel slides in full HD quality without watermark with 1-click ZIP archive.",
          placeholder: "Paste TikTok photo carousel URL..."
        };
  }

  if (norm === "/story") {
    return lang === "ID"
      ? {
          title: (
            <>
              Download Story TikTok<br />
              <span className="text-rose-600">Tanpa Watermark HD</span>
            </>
          ),
          subtitle: "Simpan story TikTok favorit sebelum kedaluwarsa 24 jam dengan resolusi video HD jernih.",
          placeholder: "Tempel tautan story TikTok..."
        }
      : {
          title: (
            <>
              Download TikTok Stories<br />
              <span className="text-rose-600">Without Watermark HD</span>
            </>
          ),
          subtitle: "Save temporary TikTok stories in original HD quality before they expire after 24 hours.",
          placeholder: "Paste TikTok story URL..."
        };
  }

  if (norm === "/viewer") {
    return lang === "ID"
      ? {
          title: (
            <>
              TikTok Web Viewer<br />
              <span className="text-rose-600">Lihat Profil Tanpa Login</span>
            </>
          ),
          subtitle: "Jelajahi video dan profil kreator TikTok secara anonim langsung di browser tanpa perlu login akun.",
          placeholder: "Tempel tautan profil atau video TikTok untuk melihat..."
        }
      : {
          title: (
            <>
              TikTok Web Viewer<br />
              <span className="text-rose-600">Watch Profiles Without Login</span>
            </>
          ),
          subtitle: "Browse public TikTok creator profiles and videos anonymously directly in your browser without an account.",
          placeholder: "Paste TikTok profile or video link to view..."
        };
  }

  // Default / or /panduan
  return lang === "ID"
    ? {
        title: (
          <>
            Download Video TikTok<br />
            <span className="text-rose-600">Tanpa Watermark</span>
          </>
        ),
        subtitle: t.subTagline,
        placeholder: t.inputPlaceholder
      }
    : {
        title: (
          <>
            Download TikTok Videos<br />
            <span className="text-rose-600">Without Watermark</span>
          </>
        ),
        subtitle: t.subTagline,
        placeholder: t.inputPlaceholder
      };
}

export default function App() {
  // 1. Multilingual State - Indonesian is the default, supported by EN
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("savetok_lang");
      if (saved === "EN" || saved === "ID") return saved;
    } catch {}
    return "ID";
  });
  const t = translations[language];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("savetok_lang", lang);
    } catch {}
  };

  // Route state for sub-landing pages (/mp3, /foto, /story, /panduan)
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.pathname || "/");

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    window.history.pushState({}, "", route);
    setCurrentRoute(route);
    if (route === "/panduan") {
      setTimeout(() => {
        document.getElementById("guides-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const routeHero = getRouteHero(currentRoute, language, t);

  // 3B. Dynamic OpenGraph, Twitter, and Document Title Routing
  useEffect(() => {
    const routeTitles: Record<string, { id: string; en: string; descId: string; descEn: string }> = {
      "/": {
        id: "SaveTok - Download Video TikTok Tanpa Watermark HD Cepat & Gratis",
        en: "SaveTok - Download TikTok Video Without Watermark HD Fast & Free",
        descId: "Download video TikTok tanpa watermark kualitas Full HD 1080p, slide foto carousel, dan audio MP3 cepat tanpa login.",
        descEn: "Download TikTok videos without watermark in Full HD 1080p, photo carousel slides, and MP3 audio fast without login."
      },
      "/mp3": {
        id: "Download Lagu & Sound TikTok MP3 320kbps - SaveTok",
        en: "Download TikTok MP3 Audio & Sound 320kbps - SaveTok",
        descId: "Ekstrak dan simpan audio lagu viral TikTok ke format MP3 320kbps jernih tanpa watermark.",
        descEn: "Extract and convert TikTok viral sounds and background music to high-quality 320kbps MP3 audio."
      },
      "/foto": {
        id: "Download Foto Slide TikTok HD & ZIP Sekaligus - SaveTok",
        en: "Download TikTok Photo Slides HD & ZIP Archive - SaveTok",
        descId: "Unduh semua foto slide carousel TikTok kualitas asli tanpa watermark dalam satu paket ZIP.",
        descEn: "Save all TikTok photo carousel slides in original HD resolution with one-click ZIP download."
      },
      "/story": {
        id: "Download Story TikTok Tanpa Watermark HD - SaveTok",
        en: "Download TikTok Story Without Watermark HD - SaveTok",
        descId: "Simpan story TikTok favorit sebelum kedaluwarsa 24 jam dengan kualitas video HD jernih.",
        descEn: "Save temporary TikTok stories in original HD quality before they expire after 24 hours."
      },
      "/viewer": {
        id: "TikTok Web Viewer Tanpa Login Gratis - SaveTok",
        en: "TikTok Web Viewer Without Login Free - SaveTok",
        descId: "Jelajahi video dan profil TikTok secara anonim langsung di web browser tanpa login akun.",
        descEn: "Browse public TikTok creator profiles and videos anonymously directly in browser without an account."
      },
      "/panduan": {
        id: "Panduan Lengkap Cara Download Video TikTok - SaveTok",
        en: "Complete Guide How to Download TikTok Videos - SaveTok",
        descId: "Tutorial lengkap cara menyimpan video, foto slide, dan lagu TikTok tanpa watermark di Android, iPhone, dan PC.",
        descEn: "Complete tutorial on downloading TikTok videos, photo slides, and audio without watermark on all devices."
      }
    };

    const norm = currentRoute.replace(/\/+$/, "") || "/";
    const meta = routeTitles[norm] || routeTitles["/"];
    const pageTitle = language === "ID" ? meta.id : meta.en;
    const pageDesc = language === "ID" ? meta.descId : meta.descEn;

    document.title = pageTitle;

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) ogTitleMeta.setAttribute("content", pageTitle);
    const twTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twTitleMeta) twTitleMeta.setAttribute("content", pageTitle);

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", pageDesc);
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) ogDescMeta.setAttribute("content", pageDesc);
    const twDescMeta = document.querySelector('meta[name="twitter:description"]');
    if (twDescMeta) twDescMeta.setAttribute("content", pageDesc);
  }, [currentRoute, language]);

  // 2. Interactive Input States
  const [urlInput, setUrlInput] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<MediaResult | null>(null);
  const [showPasteToast, setShowPasteToast] = useState(false);

  // 5A. Local Recent History State (Max 5 items, privacy-safe on device only)
  const [recentHistory, setRecentHistory] = useState<MediaResult[]>(() => {
    try {
      const saved = localStorage.getItem("savetok_recent_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveToHistory = (item: MediaResult) => {
    try {
      setRecentHistory((prev) => {
        const filtered = prev.filter((h) => h.id !== item.id);
        const updated = [item, ...filtered].slice(0, 5);
        localStorage.setItem("savetok_recent_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.warn("Failed saving history", e);
    }
  };

  const clearHistory = () => {
    setRecentHistory([]);
    try {
      localStorage.removeItem("savetok_recent_history");
    } catch {}
  };

  // 5C. Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("tiktok-url-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. Legal Modals states
  const [activeLegal, setActiveLegal] = useState<"privacy" | "terms" | "disclaimer" | null>(null);

  // Detect path on load for direct access to legal modals (/privacy, /terms, /disclaimer)
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
    if (path === "privacy" || path === "privacy-policy") {
      setActiveLegal("privacy");
    } else if (path === "terms" || path === "terms-of-service") {
      setActiveLegal("terms");
    } else if (path === "disclaimer") {
      setActiveLegal("disclaimer");
    }
  }, []);

  // Clear validation state on typing
  useEffect(() => {
    if (validationError) {
      setValidationError(null);
    }
  }, [urlInput]);

  // Handle Clipboard access to automatically paste URL links securely (5B micro-toast)
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setUrlInput(clipboardText);
        setValidationError(null);
        setShowPasteToast(true);
        setTimeout(() => setShowPasteToast(false), 2500);
      }
    } catch (err) {
      console.warn("Clipboard API blocked or rejected by container browser security.", err);
    }
  };

  // Main download orchestrator triggering our Express backend
  const handleProcessUrl = async () => {
    if (!urlInput.trim()) {
      setValidationError(t.errorRequired);
      setStatus("error");
      return;
    }

    // Smart non-TikTok platform detection (Instagram, YouTube, Facebook, Twitter)
    const platformCheck = detectUrlPlatform(urlInput, language);
    if (platformCheck.isPlatformMismatch && platformCheck.errorMessage) {
      setValidationError(platformCheck.errorMessage);
      setStatus("error");
      return;
    }

    setValidationError(null);
    setStatus("processing");
    setVideoResult(null);

    try {
      setTimeout(() => {
        document.getElementById("dynamic-content-state-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);

      const response = await fetch("/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: urlInput })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setValidationError(data.error || t.errorInvalid);
        setStatus("error");
        return;
      }

      setVideoResult(data);
      setStatus("success");
      saveToHistory(data);
      
      setTimeout(() => {
        document.getElementById("dynamic-content-state-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      
    } catch (err) {
      console.error("Express processing failed:", err);
      setValidationError(t.errorServer);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setUrlInput("");
    setStatus("idle");
    setValidationError(null);
    setVideoResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="savetok-application-wrapper" className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-rose-500/10 selection:text-rose-600">
      
      {/* Optimized SEO Metadata and JSON-LD Structured Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SaveTok",
          "url": "https://savetok.web.id/",
          "description": "Fast, free, and unlimited TikTok video downloader without watermarks directly to your device.",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires HTML5 compatible browser.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "14280",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>

      {/* Modular Navigation Header */}
      <Header 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange} 
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />

      {/* Top Margin spacer to account for fixed Header */}
      <div className="h-18 shrink-0" />

      {/* Primary Application Content */}
      <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-6 md:py-10 max-w-5xl mx-auto gap-8">
        
        {/* Designated AdSense Top Banner Container */}
        <TopBannerAd label="Ad Space (728x90)" />

        {/* Hero Section */}
        <div id="hero-heading-block" className="w-full max-w-3xl text-center flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-2xs mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {t.heroBadge}
            </span>
          </div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-sans font-black text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.15]"
          >
            {routeHero.title}
          </motion.h1>
          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-sans font-normal text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            {routeHero.subtitle}
          </motion.p>
        </div>

        {/* Format Selector Pills - Direct Interactive Navigation */}
        <div className="w-full max-w-3xl flex items-center justify-center">
          <div className="inline-flex bg-slate-200/70 p-1 rounded-2xl border border-slate-200 gap-1 overflow-x-auto max-w-full">
            {[
              { id: "/", label: t.formatVideo, icon: Film },
              { id: "/mp3", label: t.formatMp3, icon: Music },
              { id: "/foto", label: t.formatPhotos, icon: ImageIcon },
              { id: "/story", label: t.formatStory, icon: Sparkles },
              { id: "/viewer", label: t.formatViewer, icon: Eye }
            ].map((tab) => {
              const active = currentRoute === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
                    active 
                      ? "bg-white text-slate-900 shadow-xs" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-rose-500" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive URL Form Section */}
        <div id="downloader-form-card" className="w-full max-w-3xl flex flex-col gap-3">
          <div className="relative w-full rounded-2xl bg-white border-2 border-slate-200 transition-all focus-within:border-slate-900 focus-within:ring-4 focus-within:ring-slate-900/5 shadow-sm">
            <div className="absolute inset-y-0 left-4 sm:left-5 flex items-center pointer-events-none">
              <Link className="w-5 h-5 text-slate-400" />
            </div>
            
            <input
              id="tiktok-url-input"
              data-testid="url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProcessUrl()}
              placeholder={routeHero.placeholder}
              className={`w-full h-14 sm:h-16 md:h-18 pl-12 sm:pl-14 pr-12 rounded-2xl text-sm sm:text-base md:text-lg text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                validationError 
                  ? "border-[#D32F2F] shadow-[0_0_0_3px_rgba(211,47,47,0.1)]" 
                  : ""
              }`}
              aria-label="TikTok Video URL link"
            />

            {urlInput && (
              <button
                id="btn-clear-input"
                data-testid="btn-clear"
                onClick={() => {
                  setUrlInput("");
                  setValidationError(null);
                }}
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full">
            <button
              id="btn-paste-link"
              data-testid="btn-paste"
              onClick={handlePaste}
              className="w-full sm:w-[28%] min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl font-sans font-bold text-sm sm:text-base active:scale-98 transition-all cursor-pointer shadow-2xs"
            >
              <Clipboard className="w-4.5 h-4.5 text-slate-500" />
              <span>{t.buttonPaste}</span>
            </button>

            <button
              id="btn-submit-download"
              data-testid="btn-download"
              onClick={handleProcessUrl}
              className="w-full sm:w-[72%] min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-sans font-bold text-sm sm:text-base shadow-md shadow-rose-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>{t.buttonDownload}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Error validation block */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                id="form-error-block"
                data-testid="error-message"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2 text-rose-600 px-1 mt-1"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="font-sans font-semibold text-xs sm:text-sm">
                  {validationError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Example helper guidelines */}
          <div className="text-center sm:text-left text-slate-400 font-sans font-medium text-xs px-1 mt-0.5 leading-normal">
            {t.exampleLabel} <code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-700 font-mono select-all">https://www.tiktok.com/@user/video/1234567890</code>
          </div>
        </div>

        {/* Feature Trust Badges Row (Clean, purposeful, high-contrast) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full max-w-3xl text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
            <span className="text-rose-500 font-black">✓</span>
            {t.badgeNoWm}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
            <span className="text-rose-500 font-black">✓</span>
            {t.badgeMp3}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
            <span className="text-rose-500 font-black">✓</span>
            {t.badgeZip}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
            <span className="text-rose-500 font-black">✓</span>
            {t.badgeFree}
          </span>
        </div>

        {/* 5A. Recent Downloads History (Visible if user has downloaded items and currently idle) */}
        {recentHistory.length > 0 && status === "idle" && (
          <div id="recent-downloads-section" className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-800">
                  {language === "ID" ? "Riwayat Unduhan Terakhir" : "Recent Downloads"}
                </h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {recentHistory.length}/5
                </span>
              </div>
              <button
                onClick={clearHistory}
                id="btn-clear-history"
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title={language === "ID" ? "Hapus riwayat" : "Clear history"}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === "ID" ? "Hapus" : "Clear"}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {recentHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setVideoResult(item);
                    setStatus("success");
                    setTimeout(() => {
                      document.getElementById("dynamic-content-state-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-rose-50/40 hover:border-rose-200/60 transition-all cursor-pointer group text-left"
                >
                  {item.cover ? (
                    <img
                      src={`/api/download?type=cover&id=${encodeURIComponent(item.id)}&url=${encodeURIComponent(item.cover)}`}
                      alt={item.title}
                      className="w-11 h-11 rounded-lg object-cover bg-slate-200 shrink-0 border border-slate-200"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                      <Film className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-semibold text-xs text-slate-800 truncate group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </p>
                    <p className="font-sans text-[11px] text-slate-400 truncate">
                      {item.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Dynamic Area */}
        <div id="dynamic-content-state-container" className="w-full">
          <AnimatePresence mode="wait">
            {status === "processing" && (
              <ProcessingSkeleton key="loading" t={t} />
            )}

            {status === "success" && videoResult && (
              <DownloadCard 
                key="result" 
                result={videoResult} 
                t={t} 
                onReset={handleReset} 
              />
            )}
          </AnimatePresence>
        </div>

        {/* In-depth Editorial Guides & Articles for SEO / AdSense Value */}
        <GuidesSection language={language} />

        {/* Below the fold SEO section containing tutorial cards and collapsible FAQ accordion */}
        <SEODetails t={t} />

      </main>

      {/* Sleek Design Footer */}
      <footer className="w-full mt-auto bg-white border-t border-gray-100 py-6 px-6 md:px-12 pb-24 sm:pb-6 relative z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-sans">
            {t.copyright} — Not affiliated with TikTok/ByteDance.
          </p>
          
          <nav className="flex flex-wrap gap-2 md:space-x-4 font-sans text-xs font-semibold text-gray-500">
            <button
              id="footer-link-privacy"
              onClick={() => setActiveLegal("privacy")}
              className="hover:text-[#FF4B72] transition-colors cursor-pointer min-h-[48px] px-2 flex items-center"
            >
              {t.privacyPolicy}
            </button>
            <button
              id="footer-link-terms"
              onClick={() => setActiveLegal("terms")}
              className="hover:text-[#FF4B72] transition-colors cursor-pointer min-h-[48px] px-2 flex items-center"
            >
              {t.termsOfService}
            </button>
            <button
              id="footer-link-disclaimer"
              onClick={() => setActiveLegal("disclaimer")}
              className="hover:text-[#FF4B72] transition-colors cursor-pointer min-h-[48px] px-2 flex items-center"
            >
              {t.disclaimer}
            </button>
          </nav>
        </div>
      </footer>

      {/* 1A. Mobile Sticky AdSense Anchor Banner */}
      <MobileStickyAnchorAd />

      {/* 5B. Micro-Toast Notification for Paste Action */}
      <AnimatePresence>
        {showPasteToast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold border border-slate-800"
          >
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{language === "ID" ? "Tautan berhasil ditempel!" : "Link successfully pasted!"}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay modal document viewer for GDPR/Legal compliance */}
      <LegalModal
        type={activeLegal}
        language={language}
        onClose={() => setActiveLegal(null)}
      />

    </div>
  );
}
