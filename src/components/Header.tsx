import { useState, useEffect } from "react";
import { Smartphone, Film, Music, Image as ImageIcon, Sparkles, BookOpen } from "lucide-react";
import { Language } from "../types";
import SaveTokLogo from "./SaveTokLogo";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export default function Header({ 
  currentLanguage, 
  onLanguageChange,
  currentRoute = "/",
  onNavigate
}: HeaderProps) {
  const languages: Language[] = ["ID", "EN"];
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setCanInstall(false);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        currentLanguage === "ID"
          ? "Untuk memasang aplikasi SaveTok: Ketuk menu browser Anda (tiga titik di Android / tombol Share di Safari iOS), lalu pilih 'Tambahkan ke Layar Utama' (Add to Home Screen)."
          : "To install SaveTok: Open your browser menu (three dots on Android / Share button in Safari on iOS), then tap 'Add to Home Screen'."
      );
    }
  };

  const navLinks = [
    { label: currentLanguage === "ID" ? "Video" : "Video", route: "/", icon: Film },
    { label: currentLanguage === "ID" ? "MP3" : "MP3", route: "/mp3", icon: Music },
    { label: currentLanguage === "ID" ? "Foto" : "Photos", route: "/foto", icon: ImageIcon },
    { label: currentLanguage === "ID" ? "Story" : "Story", route: "/story", icon: Sparkles },
    { label: currentLanguage === "ID" ? "Panduan" : "Guides", route: "/panduan", icon: BookOpen },
  ];

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-18 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between px-3 sm:px-6 md:px-10 transition-colors">
      {/* Brand Logo & Name */}
      <div 
        id="header-brand-container"
        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all shrink-0 select-none"
        onClick={() => handleNav("/")}
      >
        <SaveTokLogo size={36} />
        <div className="flex items-center gap-1.5">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
            SaveTok
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200/60">
            PRO
          </span>
        </div>
      </div>

      {/* Sub-Route Navigation Pills */}
      <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs md:text-sm font-semibold max-w-[45vw] sm:max-w-none">
        {navLinks.map((item) => {
          const isActive = currentRoute === item.route;
          const Icon = item.icon;
          const navId = item.route.replace('/', '') || 'home';
          return (
            <button
              key={item.route}
              id={`header-nav-${navId}`}
              data-testid={`header-nav-${navId}`}
              onClick={() => handleNav(item.route)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[36px] ${
                isActive 
                  ? "bg-slate-900 text-white shadow-xs font-bold" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Actions: PWA Install + 2-way Language Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* PWA Install Button */}
        <button
          id="btn-pwa-install"
          onClick={handleInstallClick}
          title={currentLanguage === "ID" ? "Pasang Aplikasi di Layar Utama HP" : "Install App on Home Screen"}
          className="bg-slate-100 hover:bg-slate-200/90 text-slate-700 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200/70 shadow-2xs cursor-pointer min-h-[36px]"
        >
          <Smartphone className="w-3.5 h-3.5 text-rose-500" />
          <span className="hidden md:inline">
            {canInstall ? (currentLanguage === "ID" ? "Pasang App" : "Install App") : "App"}
          </span>
        </button>

        {/* Focused 2-way Language Segmented Toggle (ID | EN) */}
        <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 shadow-2xs">
          {languages.map((lang) => (
            <button
              key={lang}
              id={`lang-btn-${lang.toLowerCase()}`}
              data-testid={`lang-btn-${lang.toLowerCase()}`}
              onClick={() => onLanguageChange(lang)}
              className={`min-w-[32px] sm:min-w-[36px] h-7 sm:h-8 flex items-center justify-center rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                currentLanguage === lang
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
