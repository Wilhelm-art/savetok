import { Download } from "lucide-react";
import { Language } from "../types";

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  const languages: Language[] = ["ID", "EN", "ES"];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 bg-gradient-to-r from-[#FF4B72] to-[#FF7043] shadow-md flex items-center justify-between px-6 md:px-12">
      {/* Brand Logo & Name */}
      <div 
        id="header-brand-container"
        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
          <Download className="w-5.5 h-5.5 text-[#FF4B72]" />
        </div>
        <span className="text-2xl font-black tracking-tight text-white">
          SaveTok
        </span>
      </div>

      {/* Navigation and Language Toggles */}
      <nav className="flex items-center space-x-2 md:space-x-4 text-sm font-semibold text-white/90">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-white transition-colors cursor-pointer min-h-[48px] px-2 md:px-3 flex items-center hidden md:flex"
        >
          Downloader
        </button>
        <button 
          onClick={() => scrollToSection("how-to-download-section")}
          className="hover:text-white transition-colors cursor-pointer min-h-[48px] px-2 md:px-3 flex items-center hidden md:flex"
        >
          How to use
        </button>
        <button 
          onClick={() => scrollToSection("faq-section")}
          className="hover:text-white transition-colors cursor-pointer min-h-[48px] px-2 md:px-3 flex items-center hidden md:flex"
        >
          FAQ
        </button>
        
        {/* Inline language switcher */}
        <div className="flex items-center space-x-1 pl-2 md:pl-4 border-l border-white/20">
          <div className="flex bg-white/20 backdrop-blur-md rounded-full p-1 shadow-sm">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
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
      </nav>
    </header>
  );
}

