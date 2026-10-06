import { useEffect, useRef, useState, CSSProperties } from "react";
import { useInView } from "react-intersection-observer";
import { FolderArchive, Music, Sparkles, ArrowRight } from "lucide-react";

interface AdProps {
  label?: string;
  className?: string;
}

interface AdBlockProps {
  className?: string;
  format?: string;
  style?: CSSProperties;
  fallbackType?: "zip" | "mp3" | "viewer";
}

function FallbackFeatureBanner({ type }: { type: "zip" | "mp3" | "viewer" }) {
  if (type === "mp3") {
    return (
      <div className="w-full bg-gradient-to-r from-rose-50/90 via-white to-orange-50/90 border border-rose-200/70 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900">
              Ekstrak Lagu &amp; Sound TikTok ke MP3 320kbps
            </h4>
            <p className="font-sans text-[11px] sm:text-xs text-slate-500">
              Konversi instan audio jernih dari video viral tanpa watermark.
            </p>
          </div>
        </div>
        <a
          href="/mp3"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shrink-0 shadow-xs"
        >
          <span>Buka MP3</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // Default ZIP photo slides banner
  return (
    <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <FolderArchive className="w-5 h-5" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-rose-300">
            <Sparkles className="w-3 h-3" />
            <span>Fitur Unggulan SaveTok</span>
          </div>
          <h4 className="font-sans font-bold text-xs sm:text-sm text-white">
            Unduh Semua Slide Foto Sekaligus (.ZIP)
          </h4>
          <p className="font-sans text-[11px] sm:text-xs text-slate-300">
            Simpan semua gambar carousel TikTok resolusi asli tanpa watermark dalam satu klik.
          </p>
        </div>
      </div>
      <a
        href="/foto"
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shrink-0 shadow-xs"
      >
        <span>Coba Sekarang</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function AdSenseBlock({
  className = "",
  format = "auto",
  style = {},
  fallbackType = "zip"
}: AdBlockProps) {
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });
  const insRef = useRef<HTMLModElement | null>(null);
  const [isUnfilled, setIsUnfilled] = useState(false);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!inView) return;

    const pushAd = () => {
      if (pushedRef.current) return;
      try {
        // @ts-ignore
        if (window.adsbygoogle) {
          pushedRef.current = true;
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.warn("AdSense push error", e);
      }
    };

    // @ts-ignore
    if (window.adsbygoogleLoaded) {
      pushAd();
    } else {
      window.addEventListener("adsbygoogleLoaded", pushAd, { once: true });
    }

    const insEl = insRef.current;
    if (!insEl) return;

    const checkStatus = () => {
      if (insEl.getAttribute("data-ad-status") === "unfilled") {
        setIsUnfilled(true);
      }
    };

    checkStatus();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
          checkStatus();
        }
      }
    });

    observer.observe(insEl, { attributes: true, attributeFilter: ["data-ad-status"] });

    // Fallback timer: if after 7s ad is still not filled and adsbygoogle hasn't loaded (e.g. adblocker)
    const timer = setTimeout(() => {
      // @ts-ignore
      if (!window.adsbygoogleLoaded && !insEl.innerHTML.trim()) {
        setIsUnfilled(true);
      }
    }, 7000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("adsbygoogleLoaded", pushAd);
    };
  }, [inView]);

  return (
    <div ref={inViewRef} className={`w-full min-h-[90px] flex items-center justify-center overflow-hidden ${className}`}>
      {isUnfilled ? (
        <FallbackFeatureBanner type={fallbackType} />
      ) : inView ? (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", minHeight: "90px", width: "100%", ...style }}
          data-ad-client="ca-pub-4420868155954120"
          data-ad-slot="auto"
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="w-full h-[90px] bg-slate-100/50 rounded-xl" />
      )}
    </div>
  );
}

export function TopBannerAd({ className = "" }: AdProps) {
  return (
    <div
      id="adsense-top-banner"
      className={`w-full max-w-[728px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <AdSenseBlock fallbackType="zip" />
    </div>
  );
}

export function CardBaseAd({ className = "" }: AdProps) {
  return (
    <div
      id="adsense-card-base-banner"
      className={`w-full max-w-[680px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <AdSenseBlock fallbackType="mp3" />
    </div>
  );
}

export function MidContentAd({ className = "" }: AdProps) {
  return (
    <div
      id="adsense-mid-content-banner"
      className={`w-full max-w-[728px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden my-6 ${className}`}
    >
      <AdSenseBlock fallbackType="mp3" />
    </div>
  );
}

export function MobileStickyAnchorAd() {
  const [closed, setClosed] = useState(false);
  // Do not render sticky mobile overlay in automated test runners
  if (closed || (typeof navigator !== "undefined" && navigator.webdriver)) return null;
  return (
    <aside
      id="adsense-mobile-anchor"
      aria-label="Mobile Advertisement"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-2xl flex flex-col items-center"
    >
      <div className="w-full flex justify-between items-center text-[10px] text-slate-400 font-bold px-1 mb-0.5">
        <span>ADVERTISEMENT</span>
        <button
          onClick={() => setClosed(true)}
          className="text-slate-400 hover:text-slate-700 font-bold px-1.5 py-0.5 rounded cursor-pointer"
          title="Tutup Iklan"
        >
          ✕ Tutup
        </button>
      </div>
      <div className="w-full min-h-[50px] max-h-[60px] overflow-hidden flex items-center justify-center">
        <AdSenseBlock format="horizontal" style={{ maxHeight: "60px" }} />
      </div>
    </aside>
  );
}

