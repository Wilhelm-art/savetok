import { useState } from "react";
import { Copy, Clipboard, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TranslationSet } from "../types";
import { MidContentAd } from "./AdSpace";

interface SEODetailsProps {
  t: TranslationSet;
}

export default function SEODetails({ t }: SEODetailsProps) {
  const [expandedId, setExpandedId] = useState<string | null>("faq1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const steps = [
    {
      title: t.tutorialSteps.step1Title,
      desc: t.tutorialSteps.step1Desc,
      icon: Copy,
      color: "from-rose-500 to-rose-600",
      delay: 0.1,
    },
    {
      title: t.tutorialSteps.step2Title,
      desc: t.tutorialSteps.step2Desc,
      icon: Clipboard,
      color: "from-rose-600 to-orange-500",
      delay: 0.2,
    },
    {
      title: t.tutorialSteps.step3Title,
      desc: t.tutorialSteps.step3Desc,
      icon: CheckCircle2,
      color: "from-orange-500 to-amber-500",
      delay: 0.3,
    },
  ];

  return (
    <div id="below-the-fold-seo-details" className="w-full flex flex-col gap-12 mt-4">
      {/* 1. Tutorial Section */}
      <section id="how-to-download-section" className="w-full bg-slate-50/70 border border-slate-200/60 rounded-3xl py-12 px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            id="how-to-download-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-sans font-black text-2xl md:text-3xl text-slate-900 mb-12 tracking-tight"
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
                  transition={{ duration: 0.4, delay: step.delay }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200/80 flex flex-col items-center group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-rose-50 rounded-full z-0 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div 
                    id={`step-icon-bg-${idx}`}
                    className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 flex items-center justify-center mb-6 text-white shadow-md transform transition-transform group-hover:scale-105 duration-300`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="relative z-10 font-sans font-bold text-xl text-slate-900 mb-3">
                    <span className="text-rose-500 mr-2">0{idx + 1}.</span>{step.title}
                  </h3>
                  <p className="relative z-10 font-sans font-normal text-sm md:text-base text-slate-500 leading-relaxed max-w-[260px]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider line */}
      <hr className="w-full border-slate-200/60 max-w-4xl mx-auto" />

      {/* SEO Marketing Text Area - Fully Bound to Translations */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-8 text-slate-900">
        <div className="flex flex-col gap-10 text-center md:text-left">
          
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-slate-900">
              {t.marketingTitle1}
            </h2>
            <p className="font-sans text-slate-600 leading-relaxed text-sm md:text-base max-w-3xl">
              {t.marketingDesc1}
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-3xl p-8 md:p-10 border border-slate-200/70 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="font-sans font-bold text-xl md:text-2xl text-slate-900">
                {t.benefitTitle}
              </h3>
              <ul className="flex flex-col gap-3 font-sans text-slate-600 text-sm md:text-base">
                {t.benefitItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full md:w-[38%] bg-white rounded-2xl aspect-square flex items-center justify-center p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
              <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 shadow-2xs">
                <svg className="w-10 h-10 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mt-2">
            <div className="flex-1 flex flex-col gap-3">
              <h2 className="font-sans font-black text-xl md:text-2xl tracking-tight text-slate-900">
                {t.hdFeatureTitle}
              </h2>
              <p className="font-sans text-slate-600 leading-relaxed text-sm md:text-base">
                {t.hdFeatureDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="bg-white p-6 rounded-2xl shadow-2xs border border-slate-200/80 text-left">
              <h3 className="font-sans font-bold text-lg mb-2 text-rose-500">{t.boxUnlimitedTitle}</h3>
              <p className="font-sans text-slate-500 text-sm leading-relaxed">
                {t.boxUnlimitedDesc}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-2xs border border-slate-200/80 text-left">
              <h3 className="font-sans font-bold text-lg mb-2 text-slate-900">{t.boxFormatsTitle}</h3>
              <p className="font-sans text-slate-500 text-sm leading-relaxed">
                {t.boxFormatsDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 mt-6">
            <h2 className="font-sans font-black text-xl md:text-2xl tracking-tight text-center text-slate-900">
              {t.deviceGuideTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Android Section */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 border border-rose-100">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0222 3.503C15.5902 8.2435 13.8533 7.85 12 7.85s-3.5902.3935-5.1369 1.1004L4.841 5.4475a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-slate-900">{t.androidTitle}</h3>
                </div>
                <p className="font-sans text-slate-600 text-sm leading-relaxed">
                  {t.androidDesc}
                </p>
              </div>

              {/* PC Section */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 border border-slate-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-slate-900">{t.pcTitle}</h3>
                </div>
                <p className="font-sans text-slate-600 text-sm leading-relaxed">
                  {t.pcDesc}
                </p>
              </div>
            </div>

            {/* Photo Slideshow & Audio SEO Feature Highlight */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs mt-2 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 flex flex-col gap-3 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full w-fit border border-rose-200/60">
                  {t.photoFeatureTag}
                </span>
                <h3 className="font-sans font-black text-xl md:text-2xl text-slate-900">
                  {t.photoFeatureTitle}
                </h3>
                <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                  {t.photoFeatureDesc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Responsive Mid-Content Ad Placement before FAQ */}
      <MidContentAd />

      {/* Divider line */}
      <hr className="w-full border-slate-200/60 max-w-4xl mx-auto" />

      {/* 2. FAQ Accordion Section */}
      <section id="faq-section" className="w-full max-w-2xl mx-auto px-4">
        <motion.h2 
          id="faq-section-title"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-sans font-black text-2xl md:text-3xl text-slate-900 mb-8 text-center tracking-tight"
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
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isExpanded 
                    ? "border-rose-200 shadow-sm ring-2 ring-rose-500/5" 
                    : "border-slate-200/80 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <button
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-4 min-h-[64px] flex justify-between items-center text-left gap-4 font-sans focus:outline-none transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isExpanded ? "text-rose-500" : "text-slate-400"}`} />
                    <span className={`font-bold text-sm md:text-base leading-tight transition-colors duration-200 ${
                      isExpanded ? "text-rose-600" : "text-slate-900"
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full shrink-0 transition-colors ${isExpanded ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500"}`}>
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
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-600 font-sans text-sm md:text-base leading-relaxed border-t border-slate-100">
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
