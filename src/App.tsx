import { useState, useEffect } from "react";
import { Link, Clipboard, ArrowRight, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header";
import { TopBannerAd } from "./components/AdSpace";
import SEODetails from "./components/SEODetails";
import ProcessingSkeleton from "./components/ProcessingSkeleton";
import DownloadCard from "./components/DownloadCard";
import LegalModal from "./components/LegalModals";

import { Language, VideoResult } from "./types";
import { translations } from "./translations";

export default function App() {
  // 1. Multilingual State - Indonesian is the default, supported by EN and ES
  const [language, setLanguage] = useState<Language>("ID");
  const t = translations[language];

  // 2. Interactive Input States
  const [urlInput, setUrlInput] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<VideoResult | null>(null);

  // 3. Legal Modals states
  const [activeLegal, setActiveLegal] = useState<"privacy" | "terms" | "disclaimer" | null>(null);

  // Clear validation state on typing
  useEffect(() => {
    if (validationError) {
      setValidationError(null);
    }
  }, [urlInput]);

  // Handle Clipboard access to automatically paste URL links securely
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setUrlInput(clipboardText);
        setValidationError(null);
      }
    } catch (err) {
      console.warn("Clipboard API blocked or rejected by container browser security.", err);
      // Fallback: Notify browser using a micro-toast or let user paste normally
    }
  };

  // Main download orchestrator triggering our Express backend
  const handleProcessUrl = async () => {
    if (!urlInput.trim()) {
      setValidationError(t.errorRequired);
      setStatus("error");
      return;
    }

    // Prepare processing states
    setValidationError(null);
    setStatus("processing");
    setVideoResult(null);

    try {
      // Use RapidAPI TikTok Video No Watermark endpoint for 100% reliable fetching
      const response = await fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(urlInput)}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
          "x-rapidapi-key": "b147c13cbamshc23e106d8b0378ep1f58c6jsne1ae9647adb1"
        }
      });

      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        setValidationError(data.msg || data.error || t.errorInvalid);
        setStatus("error");
        return;
      }

      // Success payload received from RapidAPI
      const tikData = data.data;
      setVideoResult({
        id: tikData.id,
        title: tikData.title || `Video by ${tikData.author?.nickname || "Creator"}`,
        authorName: tikData.author?.unique_id || "tiktok_creator",
        authorUrl: `https://www.tiktok.com/@${tikData.author?.unique_id || ""}`,
        thumbnailUrl: tikData.cover,
        duration: tikData.duration ? Math.floor(tikData.duration / 60) + ":" + (tikData.duration % 60).toString().padStart(2, '0') : "00:00",
        downloadMp4: tikData.hdplay || tikData.play,
        downloadMp3: tikData.music
      });
      setStatus("success");
      
      // Auto-scroll to the result card so mobile users see the download buttons immediately
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
    <div id="savetok-application-wrapper" className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#FF4B72]/10 selection:text-[#FF4B72]">
      
      {/* Optimized SEO Metadata and JSON-LD Structured Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SaveTok",
          "url": "https://savetok.co",
          "description": "Fast, free, and unlimited TikTok video downloader without watermarks directly to your device.",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires HTML5 compatible browser.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>

      {/* Modular Navigation Header */}
      <Header currentLanguage={language} onLanguageChange={setLanguage} />

      {/* Top Margin spacer to account for fixed Header */}
      <div className="h-20 shrink-0" />

      {/* Primary Application Content */}
      <main className="flex-grow flex flex-col items-center w-full px-4 md:px-8 py-8 md:py-12 max-w-5xl mx-auto gap-10">
        
        {/* Designated AdSense Top Banner Container */}
        <TopBannerAd label="Ad Space (728x90)" />

        {/* Hero Section */}
        <div id="hero-heading-block" className="w-full max-w-3xl text-center flex flex-col gap-3">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans font-black text-4xl md:text-6xl text-[#1A1A1A] tracking-tighter leading-tight"
          >
            {language === "ID" ? (
              <>
                Download Video TikTok<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B72] to-[#FF7043]">Tanpa Watermark.</span>
              </>
            ) : language === "ES" ? (
              <>
                Descargar Videos de TikTok<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B72] to-[#FF7043]">al Instante y Gratis.</span>
              </>
            ) : (
              <>
                TikTok Video Downloader<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B72] to-[#FF7043]">Without Watermark.</span>
              </>
            )}
          </motion.h1>
          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-sans font-medium text-base md:text-lg text-gray-500 max-w-xl mx-auto mt-2"
          >
            {t.subTagline}
          </motion.p>
        </div>

        {/* Interactive URL Form Section */}
        <div id="downloader-form-card" className="w-full max-w-3xl flex flex-col gap-3">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Link className="w-5.5 h-5.5 text-gray-400" />
            </div>
            
            <input
              id="tiktok-url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProcessUrl()}
              placeholder={t.inputPlaceholder}
              className={`w-full h-16 md:h-20 pl-14 pr-12 rounded-2xl bg-[#FF4B72]/5 border-2 text-base md:text-lg text-[#1C1B1B] placeholder:text-gray-400 outline-none focus:ring-0 transition-all ${
                validationError 
                  ? "border-[#D32F2F] focus:border-[#D32F2F] shadow-[0_0_0_4px_rgba(211,47,47,0.1)]" 
                  : "border-transparent focus:border-[#FF4B72]"
              }`}
              aria-label="TikTok Video URL link"
            />

            {urlInput && (
              <button
                id="btn-clear-input"
                onClick={() => {
                  setUrlInput("");
                  setValidationError(null);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <button
              id="btn-paste-link"
              onClick={handlePaste}
              className="w-full md:w-[30%] min-h-[56px] md:h-16 flex items-center justify-center gap-2 border-2 border-[#FF4B72] text-[#FF4B72] bg-white rounded-xl font-sans font-bold text-base hover:bg-[#FF4B72]/10 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <Clipboard className="w-5 h-5" />
              <span>{t.buttonPaste}</span>
            </button>

            <button
              id="btn-submit-download"
              onClick={handleProcessUrl}
              className="w-full md:w-[70%] min-h-[56px] md:h-16 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF4B72] to-[#FF7043] text-white rounded-xl font-sans font-bold text-base hover:opacity-95 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>{t.buttonDownload}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Error validation block (State B) */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                id="form-error-block"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2 text-[#D32F2F] px-1 mt-1"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="font-sans font-semibold text-xs">
                  {validationError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Example helper guidelines */}
          <div className="text-center md:text-left text-gray-400 font-sans font-medium text-xs px-1 mt-1 leading-normal">
            {t.exampleLabel} <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono select-all">https://www.tiktok.com/@user/video/1234567890</code>
          </div>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-3xl mt-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#FF4B72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-sans font-bold text-gray-800 text-sm md:text-base">Ultra Fast</h3>
            <p className="text-xs text-gray-400 mt-0.5">Processes in milliseconds</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#FF7043]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-sans font-bold text-gray-800 text-sm md:text-base">Stateless</h3>
            <p className="text-xs text-gray-400 mt-0.5">No storage, no logs</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-[#FF4B72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-sans font-bold text-gray-800 text-sm md:text-base">HD Quality</h3>
            <p className="text-xs text-gray-400 mt-0.5">Original source resolution</p>
          </div>
        </div>

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

        {/* Below the fold SEO section containing tutorial cards and collapsible FAQ accordion */}
        <SEODetails t={t} />

      </main>

      {/* Sleek Design Footer */}
      <footer className="w-full mt-auto bg-white border-t border-gray-100 py-6 px-6 md:px-12">
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

      {/* Overlay modal document viewer for GDPR/Legal compliance */}
      <LegalModal
        type={activeLegal}
        language={language}
        onClose={() => setActiveLegal(null)}
      />

    </div>
  );
}
