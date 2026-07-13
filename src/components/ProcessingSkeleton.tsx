import { Film, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { TranslationSet } from "../types";

interface ProcessingSkeletonProps {
  t: TranslationSet;
  key?: string;
}

export default function ProcessingSkeleton({ t }: ProcessingSkeletonProps) {
  return (
    <motion.div
      id="processing-state-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto mt-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 bg-[#FF4B72] rounded-full animate-ping" />
        <h3 className="font-sans font-extrabold text-lg md:text-xl text-[#1A1A1A]">
          {t.processingTitle}
        </h3>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:grid md:grid-cols-2 relative">
        {/* Shimmer overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer pointer-events-none z-10" />

        {/* Skeleton Thumbnail Preview (Left Column) */}
        <div className="w-full relative aspect-[9/16] bg-gray-100 flex items-center justify-center animate-pulse overflow-hidden">
          <Film className="w-12 h-12 text-gray-300" />
        </div>

        {/* Skeleton Content details (Right Column) */}
        <div className="w-full p-6 md:p-8 flex flex-col justify-center gap-6">
          <div className="space-y-3">
            {/* Title Skeletons */}
            <div className="w-3/4 h-7 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-1/2 h-5 bg-gray-100 rounded-lg animate-pulse" />
          </div>

          {/* Author Skeletons */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
            <div className="w-1/3 h-4 bg-gray-100 rounded-md animate-pulse" />
          </div>

          {/* Skeletons Buttons */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="w-full h-14 bg-gray-200 rounded-xl animate-pulse" />
            <div className="w-full h-14 border-2 border-gray-100 bg-gray-50 rounded-xl animate-pulse" />
          </div>

          {/* Adsense Slot Skeleton */}
          <div className="w-full h-[90px] bg-gray-100 rounded-xl animate-pulse mt-auto" />
        </div>
      </div>
    </motion.div>
  );
}
