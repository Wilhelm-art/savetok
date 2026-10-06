import { useState } from "react";
import { Film, Music, ArrowLeft, ExternalLink, Image as ImageIcon, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MediaResult, TranslationSet } from "../types";
import { CardBaseAd } from "./AdSpace";

interface DownloadCardProps {
  result: MediaResult;
  t: TranslationSet;
  onReset: () => void;
  key?: string;
}

export default function DownloadCard({ result, t, onReset }: DownloadCardProps) {
  const isPhotoPost = result.mediaType === "photo" && Array.isArray(result.images) && result.images.length > 0;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [downloadingAllProgress, setDownloadingAllProgress] = useState<string | null>(null);

  // Safe helper to trigger standard browser file downloads through our secure proxy
  const handleDownload = (downloadUrl: string, type: "video" | "photo" | "audio", customIndex?: number) => {
    if (!downloadUrl) return;

    if (customIndex !== undefined) {
      setDownloadingIndex(customIndex);
      setTimeout(() => setDownloadingIndex(null), 2000);
    }

    const proxyUrl = `/api/download?type=${type}&id=${encodeURIComponent(result.id)}${customIndex !== undefined ? `_${customIndex + 1}` : ""}&url=${encodeURIComponent(downloadUrl)}`;
    
    const a = document.createElement("a");
    a.href = proxyUrl;
    a.download = `SaveTok_${type}_${result.id}${customIndex !== undefined ? `_${customIndex + 1}` : ""}.${type === "audio" ? "mp3" : type === "photo" ? "jpg" : "mp4"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download all photos sequentially with slight delay to prevent browser download flood block
  const handleDownloadAllPhotos = () => {
    if (!result.images || result.images.length === 0) return;
    const total = result.images.length;
    result.images.forEach((imgUrl, idx) => {
      setTimeout(() => {
        setDownloadingAllProgress(`${idx + 1}/${total}`);
        handleDownload(imgUrl, "photo", idx);
        if (idx === total - 1) {
          setTimeout(() => setDownloadingAllProgress(null), 2000);
        }
      }, idx * 400);
    });
  };

  return (
    <motion.div
      id="download-result-container"
      data-testid="download-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto mt-6 flex flex-col gap-6"
    >
      {/* Back button link */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-downloader"
          data-testid="btn-back-to-downloader"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-sans font-bold text-gray-500 hover:text-[#FF4B72] transition-colors focus:outline-none min-h-[44px] px-3 -ml-2 rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.downloadAnother}</span>
        </button>

        {/* Media type indicator badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-black/5 text-gray-700">
          {isPhotoPost ? (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-[#FF4B72]" />
              <span>{t.photoSlideCount} ({result.images?.length})</span>
            </>
          ) : (
            <>
              <Film className="w-3.5 h-3.5 text-[#FF4B72]" />
              <span>Video HD (No WM)</span>
            </>
          )}
        </span>
      </div>

      {/* Main Card */}
      <div 
        id="result-media-card"
        className="w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Preview pane */}
        <div 
          id="result-thumbnail-container"
          className="w-full md:w-[46%] relative bg-gray-950 overflow-hidden flex flex-col items-center justify-center min-h-[320px] md:min-h-[420px] group"
        >
          {isPhotoPost && result.images && result.images.length > 0 ? (
            // Photo Slideshow Preview
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedPhotoIndex}
                  src={result.images[selectedPhotoIndex]}
                  alt={`Slide ${selectedPhotoIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[420px]"
                />
              </AnimatePresence>

              {/* Slide Counter Overlay */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                {selectedPhotoIndex + 1} / {result.images.length}
              </div>

              {/* Prev / Next controls */}
              {result.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : result.images!.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer backdrop-blur-sm shadow-md"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIndex((prev) => (prev < result.images!.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer backdrop-blur-sm shadow-md"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            // Video Thumbnail Preview
            <div className="relative w-full h-full">
              <img
                id="result-thumbnail-img"
                src={result.thumbnailUrl}
                alt={result.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div 
                id="duration-badge"
                className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-xs font-sans font-bold tracking-wide backdrop-blur-md border border-white/10"
              >
                {result.duration}
              </div>
            </div>
          )}
        </div>

        {/* Action Detail List */}
        <div 
          id="result-details-pane"
          className="w-full md:w-[54%] p-6 md:p-8 flex flex-col justify-between gap-6"
        >
          <div>
            {/* Creator Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans font-bold text-xs text-[#FF4B72] tracking-wider uppercase bg-[#FF4B72]/10 px-2.5 py-1 rounded-md">
                @{result.authorName}
              </span>
              <a
                id="creator-tiktok-link"
                href={result.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF4B72] transition-colors p-1"
                title="Lihat Profil TikTok"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Video / Post description */}
            <h2 
              id="result-video-title"
              className="font-sans font-extrabold text-lg md:text-xl text-[#1A1A1A] leading-snug line-clamp-2 mb-2"
            >
              {result.title}
            </h2>
            <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed">
              {isPhotoPost 
                ? "Postingan slide foto TikTok siap diunduh dalam resolusi asli tanpa watermark."
                : "Video berhasil diproses dalam kualitas tinggi tanpa tanda air (no watermark)."}
            </p>
          </div>

          {/* Photo Slides Thumbnails Strip (If Photo Post) */}
          {isPhotoPost && result.images && result.images.length > 1 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pilih Foto:</span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {result.images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedPhotoIndex === i ? "border-[#FF4B72] scale-105 shadow-md" : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${i+1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            {isPhotoPost && result.images && result.images.length > 0 ? (
              // PHOTO DOWNLOAD ACTIONS
              <>
                <button
                  id="btn-download-selected-photo"
                  data-testid="btn-download-photo"
                  onClick={() => handleDownload(result.images![selectedPhotoIndex], "photo", selectedPhotoIndex)}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#FF7043] text-white font-sans font-bold text-sm tracking-wide shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                >
                  <Download className="w-4.5 h-4.5" />
                  <span>
                    {downloadingIndex === selectedPhotoIndex ? "Mengunduh..." : `${t.downloadSinglePhoto} #${selectedPhotoIndex + 1}`}
                  </span>
                </button>

                {result.images.length > 1 && (
                  <button
                    id="btn-download-all-photos"
                    data-testid="btn-download-all-photos"
                    onClick={handleDownloadAllPhotos}
                    disabled={!!downloadingAllProgress}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border-2 border-[#FF4B72] text-[#FF4B72] font-sans font-bold text-sm tracking-wide bg-transparent hover:bg-[#FF4B72]/5 active:scale-98 transition-all cursor-pointer disabled:opacity-70"
                  >
                    <ImageIcon className="w-4.5 h-4.5" />
                    <span>
                      {downloadingAllProgress 
                        ? `Mengunduh (${downloadingAllProgress})...` 
                        : `${t.downloadAllPhotos} (${result.images.length})`}
                    </span>
                  </button>
                )}
              </>
            ) : (
              // VIDEO DOWNLOAD ACTIONS
              result.downloadMp4 && (
                <button
                  id="btn-download-mp4"
                  data-testid="btn-download-mp4"
                  onClick={() => handleDownload(result.downloadMp4!, "video")}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF4B72] to-[#FF7043] text-white font-sans font-bold text-sm tracking-wide shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                >
                  <Film className="w-4.5 h-4.5" />
                  <span>{t.downloadMp4Label}</span>
                </button>
              )
            )}

            {/* AUDIO DOWNLOAD ACTION (Available for both video and photo posts) */}
            {result.downloadMp3 && (
              <button
                id="btn-download-mp3"
                data-testid="btn-download-mp3"
                onClick={() => handleDownload(result.downloadMp3!, "audio")}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl border border-gray-200 text-gray-700 font-sans font-semibold text-sm tracking-wide bg-gray-50 hover:bg-gray-100 active:scale-98 transition-all cursor-pointer"
              >
                <Music className="w-4.5 h-4.5 text-[#FF7043]" />
                <span>{t.downloadMp3Label}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Pinned AdSense Placement */}
      <CardBaseAd label="AdSense Placement Pinned to Card Base" className="mt-2" />
    </motion.div>
  );
}
