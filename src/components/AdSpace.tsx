import { Sparkles } from "lucide-react";

interface AdProps {
  label?: string;
  className?: string;
}

export function TopBannerAd({ label = "Ad Space (728x90)", className = "" }: AdProps) {
  return (
    <div 
      id="adsense-top-banner"
      className={`w-full max-w-[728px] h-[90px] bg-[#F9F9F9] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center mx-auto text-gray-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ${className}`}
    >
      <div className="flex items-center gap-1.5 opacity-60">
        <Sparkles className="w-4 h-4 text-[#FF4B72]" />
        <span className="font-sans font-semibold text-xs tracking-wider uppercase">
          Sponsor / Advertisement
        </span>
      </div>
      <span className="font-sans font-medium text-sm text-gray-400 mt-0.5">
        {label}
      </span>
    </div>
  );
}

export function CardBaseAd({ label = "AdSense Placement Pinned to Card Base", className = "" }: AdProps) {
  return (
    <div 
      id="adsense-card-base-banner"
      className={`w-full max-w-[680px] h-[90px] bg-[#F9F9F9] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center mx-auto text-gray-500 shadow-inner ${className}`}
    >
      <div className="flex items-center gap-1.5 opacity-65">
        <span className="font-sans font-bold text-[10px] tracking-widest uppercase bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
          ADSENSE
        </span>
      </div>
      <span className="font-sans font-semibold text-xs text-gray-400 mt-1.5 opacity-80">
        {label}
      </span>
    </div>
  );
}
