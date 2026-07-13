import { Film, Music, ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { VideoResult, TranslationSet } from "../types";
import { CardBaseAd } from "./AdSpace";

interface DownloadCardProps {
  result: VideoResult;
  t: TranslationSet;
  onReset: () => void;
  key?: string;
}

export default function DownloadCard({ result, t, onReset }: DownloadCardProps) {
  // Safe helper to trigger standard browser file downloads through our Express proxy
  const handleDownload = (downloadUrl: string) => {
    window.location.href = downloadUrl;
  };

  return (
    <motion.div
      id="download-result-container"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto mt-6 flex flex-col gap-6"
    >
      {/* Back button link */}
      <div className="flex items-center">
        <button
          id="btn-back-to-downloader"
          onClick={onReset}
          className="flex items-center gap-1.5 text-sm font-sans font-bold text-gray-500 hover:text-[#FF4B72] transition-colors focus:outline-none min-h-[48px] px-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.downloadAnother}</span>
        </button>
      </div>

      {/* Main card */}
      <div 
        id="result-media-card"
        className="w-full bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Media Preview pane */}
        <div 
          id="result-thumbnail-container"
          className="w-full md:w-[40%] relative aspect-video md:aspect-auto md:min-h-[380px] bg-gray-900 overflow-hidden group shrink-0"
        >
          <img
            id="result-thumbnail-img"
            src={result.thumbnailUrl}
            alt={result.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          {/* Duration Badge */}
          <div 
            id="duration-badge"
            className="absolute bottom-3 right-3 bg-black/75 text-white px-2.5 py-1 rounded-md text-xs font-sans font-bold tracking-wide backdrop-blur-sm"
          >
            {result.duration}
          </div>
        </div>

        {/* Action Detail list */}
        <div 
          id="result-details-pane"
          className="w-full md:w-[60%] p-6 flex flex-col justify-between gap-6"
        >
          <div>
            {/* Creator Tag */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="font-sans font-bold text-xs text-[#FF4B72] tracking-wider uppercase bg-[#FF4B72]/10 px-2 py-0.5 rounded-md">
                @{result.authorName}
              </span>
              <a
                id="creator-tiktok-link"
                href={result.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF4B72] transition-colors"
                title="Visit TikTok Creator Profile"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video description */}
            <h2 
              id="result-video-title"
              className="font-sans font-extrabold text-lg md:text-xl text-[#1A1A1A] leading-tight mb-2"
            >
              {result.title}
            </h2>
            <p className="font-sans font-normal text-sm text-gray-500 leading-relaxed">
              Video is processed successfully. You can download either the high-definition video track or the isolated background audio.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 w-full">
            {/* Primary Download (MP4) */}
            <button
              id="btn-download-mp4"
              onClick={() => handleDownload(result.downloadMp4)}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF4B72] to-[#FF7043] text-white font-sans font-bold text-sm tracking-wide shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
            >
              <Film className="w-4.5 h-4.5" />
              <span>{t.downloadMp4Label}</span>
            </button>

            {/* Secondary Download (MP3) */}
            <button
              id="btn-download-mp3"
              onClick={() => handleDownload(result.downloadMp3)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-[#FF4B72] text-[#FF4B72] font-sans font-bold text-sm tracking-wide bg-transparent hover:bg-[#FF4B72]/5 active:scale-98 transition-all cursor-pointer"
            >
              <Music className="w-4.5 h-4.5" />
              <span>{t.downloadMp3Label}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Pinned AdSense Placement */}
      <CardBaseAd label="AdSense Placement Pinned to Card Base" className="mt-2" />
    </motion.div>
  );
}
