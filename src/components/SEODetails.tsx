import { useState } from "react";
import { Copy, Clipboard, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TranslationSet } from "../types";

interface SEODetailsProps {
  t: TranslationSet;
}

export default function SEODetails({ t }: SEODetailsProps) {
  // Store expanded FAQ item ID. Default open is the first FAQ (faq1) to match the prototype
  const [expandedId, setExpandedId] = useState<string | null>("faq1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const steps = [
    {
      title: t.tutorialSteps.step1Title,
      desc: t.tutorialSteps.step1Desc,
      icon: Copy,
      color: "from-[#FF4B72] to-[#FF6052]",
      delay: 0.1,
    },
    {
      title: t.tutorialSteps.step2Title,
      desc: t.tutorialSteps.step2Desc,
      icon: Clipboard,
      color: "from-[#FF6052] to-[#FF7043]",
      delay: 0.2,
    },
    {
      title: t.tutorialSteps.step3Title,
      desc: t.tutorialSteps.step3Desc,
      icon: CheckCircle2,
      color: "from-[#FF7043] to-[#FF8C3A]",
      delay: 0.3,
    },
  ];

  return (
    <div id="below-the-fold-seo-details" className="w-full flex flex-col gap-12 mt-4">
      {/* 1. Tutorial Section */}
      <section id="how-to-download-section" className="w-full bg-[#F9F9F9] rounded-3xl py-12 px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            id="how-to-download-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans font-extrabold text-2xl md:text-3xl text-[#1A1A1A] mb-12 tracking-tight"
          >
            {t.howToDownloadTitle}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  id={`tutorial-step-card-${idx}`}
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center group relative overflow-hidden"
                >
                  {/* Decorative subtle background circle */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-[#FF4B72]/5 to-transparent rounded-full z-0 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div 
                    id={`step-icon-bg-${idx}`}
                    className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 flex items-center justify-center mb-6 text-white shadow-md transform transition-transform group-hover:scale-110 duration-300`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="relative z-10 font-sans font-bold text-xl text-[#1A1A1A] mb-3">
                    <span className="text-[#FF4B72] mr-2">0{idx + 1}.</span>{step.title}
                  </h3>
                  <p className="relative z-10 font-sans font-normal text-base text-gray-500 leading-relaxed max-w-[260px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider line */}
      <hr className="w-full border-gray-100 max-w-4xl mx-auto" />

      {/* SEO Marketing Text Area - Styled to mimic SSSTik's informative sections but cleaner */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-8 text-[#1A1A1A]">
        <div className="flex flex-col gap-10 text-center md:text-left">
          
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight text-[#1A1A1A]">
              Download video TikTok mp4 dengan gratis!
            </h2>
            <p className="font-sans text-gray-600 leading-relaxed text-sm md:text-base max-w-3xl">
              SSS TikTok download mp4 adalah salah satu alat paling populer untuk <strong>unduh TikTok mp4 online gratis</strong> dan <strong>hapus watermark tiktok online</strong>. Tidak perlu menggunakan aplikasi tambahan untuk menggunakan layanan kami, yang kamu butuhkan hanya browser dan tautan untuk ditempelkan pada halaman utama.
            </p>
          </div>

          <div className="bg-[#F9F9F9] rounded-3xl p-8 md:p-10 border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="font-sans font-bold text-xl md:text-2xl text-[#1A1A1A]">Unduh Video TikTok: Solusi Ideal Untuk Mengunggah Ulang Konten Online</h3>
              <ul className="flex flex-col gap-3 font-sans text-gray-600 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4B72] shrink-0 mt-0.5" />
                  <span>Kamu bisa download tiktok sebanyak yang kamu mau.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4B72] shrink-0 mt-0.5" />
                  <span>Buka situs Download Tik Tok kami, tempelkan tautan video yang Anda inginkan, dan mulai mengunduh secara instan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4B72] shrink-0 mt-0.5" />
                  <span>Save from TikTok dengan kecepatan tinggi tanpa aplikasi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4B72] shrink-0 mt-0.5" />
                  <span>Pengunduh TikTok yang Kompatibel dengan Semua Browser dan Sistem Operasi.</span>
                </li>
              </ul>
            </div>
            {/* Visual element placeholder matching SSSTik's layout block */}
            <div className="w-full md:w-[40%] bg-gradient-to-br from-[#FF4B72]/10 to-[#FF7043]/10 rounded-2xl aspect-square flex items-center justify-center p-6 border border-[#FF4B72]/20 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
                <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-[#FF4B72]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mt-4">
            <div className="flex-1 flex flex-col gap-3">
              <h2 className="font-sans font-bold text-xl md:text-2xl tracking-tight">Unduh Video TikTok Tanpa Watermark HD</h2>
              <p className="font-sans text-gray-600 leading-relaxed text-sm md:text-base">
                Di <strong>SaveTok</strong>, kami menawarkan layanan gratis untuk unduh video TikTok tanpa watermark. Dapatkan video dengan resolusi HD dalam format MP4, dan ikuti petunjuk mudah kami untuk menggunakan pengunduh tiktok video.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="bg-[#F9F9F9] p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-sans font-bold text-lg mb-2 text-[#FF4B72]">Akses Tanpa Batas</h3>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                Nikmati kebebasan untuk download video tiktok no watermark sebanyak yang Anda inginkan, tanpa ada batasan unduhan sama sekali.
              </p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
              <h3 className="font-sans font-bold text-lg mb-2 text-[#FF7043]">MP4 dan MP3 Dalam HD</h3>
              <p className="font-sans text-gray-500 text-sm leading-relaxed">
                Save from TikTok dengan kecepatan tinggi tanpa aplikasi. Tersedia dalam format MP4 HD atau konversi langsung ke audio MP3.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Divider line */}
      <hr className="w-full border-gray-100 max-w-4xl mx-auto" />

      {/* 2. FAQ Accordion Section */}
      <section id="faq-section" className="w-full max-w-2xl mx-auto px-4">
        <motion.h2 
          id="faq-section-title"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-sans font-extrabold text-2xl md:text-3xl text-[#1A1A1A] mb-8 text-center tracking-tight"
        >
          {t.faqTitle}
        </motion.h2>

        <div className="space-y-4">
          {t.faqs.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                id={`faq-item-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isExpanded 
                    ? "border-[#FF4B72]/30 shadow-[0_8px_24px_rgba(255,75,114,0.04)]" 
                    : "border-gray-100 hover:border-gray-200 shadow-sm"
                }`}
              >
                <button
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-4 min-h-[64px] flex justify-between items-center text-left gap-4 font-sans focus:outline-none transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isExpanded ? "text-[#FF4B72]" : "text-gray-400"}`} />
                    <span className={`font-bold text-sm md:text-base leading-tight transition-colors duration-200 ${
                      isExpanded ? "text-[#FF4B72]" : "text-[#1A1A1A]"
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full shrink-0 transition-colors ${isExpanded ? "bg-[#FF4B72]/10 text-[#FF4B72]" : "bg-[#F9F9F9] text-gray-500"}`}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`faq-content-pane-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-gray-600 font-sans text-sm md:text-base leading-relaxed border-t border-gray-50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
