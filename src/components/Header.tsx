import { useState, useEffect } from "react";
import { Download, Smartphone, Film, Music, Image as ImageIcon, Sparkles, BookOpen } from "lucide-react";
import { Language } from "../types";

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
  const languages: Language[] = ["ID", "EN", "ES"];
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
    { label: "Video", route: "/", icon: Film },
    { label: "MP3", route: "/mp3", icon: Music },
    { label: "Foto", route: "/foto", icon: ImageIcon },
    { label: "Story", route: "/story", icon: Sparkles },
    { label: "Panduan", route: "/panduan", icon: BookOpen },
  ];

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-gradient-to-r from-[#FF4B72] to-[#FF7043] shadow-md flex items-center justify-between px-4 sm:px-6 md:px-12">
      {/* Brand Logo & Name */}
      <div 
        id="header-brand-container"
        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all shrink-0"
        onClick={() => handleNav("/")}
      >
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
          <Download className="w-5.5 h-5.5 text-[#FF4B72]" />
        </div>
        <span className="text-2xl font-black tracking-tight text-white hidden sm:inline">
          SaveTok
        </span>
      </div>

      {/* Sub-Route Navigation Pills */}
      <nav className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 text-xs md:text-sm font-semibold text-white/90">
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
              className={`px-2.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive 
                  ? "bg-white text-[#FF4B72] shadow-sm font-bold" 
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Actions: PWA Install + Language Switcher */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* PWA Install Button */}
        <button
          id="btn-pwa-install"
          onClick={handleInstallClick}
          title="Pasang Aplikasi di Layar Utama HP"
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-white" />
          <span className="hidden md:inline">
            {canInstall ? "Pasang App" : "App"}
          </span>
        </button>

        {/* Inline language switcher */}
        <div className="flex items-center pl-1 sm:pl-2 border-l border-white/20">
          <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0.5 sm:p-1 shadow-sm">
            {languages.map((lang) => (
              <button
                key={lang}
                id={`lang-btn-${lang.toLowerCase()}`}
                data-testid={`lang-btn-${lang.toLowerCase()}`}
                onClick={() => onLanguageChange(lang)}
                className={`min-w-[32px] sm:min-w-[36px] h-8 flex items-center justify-center rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  currentLanguage === lang
                    ? "bg-white text-[#FF4B72] shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

