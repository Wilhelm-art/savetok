import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";
import { legalContent, LegalDocType } from "../data/legalContent";

interface LegalModalProps {
  type: LegalDocType | null;
  language: Language;
  onClose: () => void;
}

export default function LegalModal({ type, language, onClose }: LegalModalProps) {
  if (!type) return null;

  const activeDoc = legalContent[language]?.[type] || legalContent.ID[type];

  return (
    <AnimatePresence>
      <div id="legal-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Semi-transparent dark overlay */}
        <motion.div
          id="legal-backdrop-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black"
        />

        {/* Modal Panel container */}
        <motion.div
          id="legal-modal-panel"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 z-10 flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4.5 border-b border-gray-100 shrink-0">
            <h3 
              id="legal-modal-title" 
              data-testid="legal-modal-title" 
              className="font-sans font-extrabold text-lg text-[#1A1A1A] tracking-tight"
            >
              {activeDoc.title}
            </h3>
            <button
              id="btn-close-legal"
              data-testid="btn-close-legal-modal"
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none -mr-3 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content body */}
          <div className="p-6 overflow-y-auto space-y-4 font-sans text-sm md:text-base text-gray-600 leading-relaxed">
            {activeDoc.body.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "font-semibold text-gray-500 mb-2.5 text-xs tracking-wider uppercase" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer controls */}
          <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end bg-[#F9F9F9] rounded-b-2xl">
            <button
              id="btn-confirm-legal"
              onClick={onClose}
              className="px-5 py-2 min-h-[48px] bg-gradient-to-r from-[#FF4B72] to-[#FF7043] hover:opacity-95 text-white font-sans font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Okay
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
