import { useState } from "react";
import { BookOpen, Clock, Calendar, User, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getSeoArticles } from "../data/seoArticles";
import { Language } from "../types";

interface GuidesSectionProps {
  language?: Language;
}

export default function GuidesSection({ language = "ID" }: GuidesSectionProps) {
  const articles = getSeoArticles(language);
  const [selectedArticleId, setSelectedArticleId] = useState<string>("art-1");
  const activeArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  return (
    <section id="guides-section" className="w-full max-w-4xl mx-auto px-4 md:px-8 mt-10">
      <div className="flex flex-col gap-6 text-center md:text-left">
        {/* Header */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200/60 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === "ID" ? "Pusat Panduan & Edukasi" : "Guide & Resource Center"}</span>
          </div>
          <h2 className="font-sans font-black text-2xl md:text-3xl text-slate-900 tracking-tight">
            {language === "ID" ? "Panduan Lengkap Pengguna & Kreator" : "Complete Creator & User Guides"}
          </h2>
          <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl">
            {language === "ID"
              ? "Pelajari cara memaksimalkan kualitas unduhan video, audio, dan slide foto Anda secara gratis, legal, dan aman."
              : "Learn how to maximize your video, audio, and photo carousel downloads safely, for free, and in original quality."}
          </p>
        </div>

        {/* Article Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {articles.map((art) => (
            <button
              key={art.id}
              onClick={() => setSelectedArticleId(art.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-sans font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                selectedArticleId === art.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{art.category}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          ))}
        </div>

        {/* Active Article Content Card */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeArticle.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col gap-6"
          >
            {/* Meta tags ribbon */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium font-sans border-b border-slate-100 pb-4">
              <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                <User className="w-3.5 h-3.5 text-rose-500" />
                {activeArticle.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.publishedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readingTime}
              </span>
            </div>

            {/* Article Title & Intro */}
            <h3 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900 leading-snug">
              {activeArticle.title}
            </h3>
            <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              "{activeArticle.metaDescription}"
            </p>

            {/* Body Sections */}
            <div className="flex flex-col gap-6 mt-2">
              {activeArticle.sections.map((sec, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <h4 className="font-sans font-bold text-base md:text-lg text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                    <span>{sec.heading}</span>
                  </h4>
                  <div className="flex flex-col gap-2 pl-6">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx} className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
