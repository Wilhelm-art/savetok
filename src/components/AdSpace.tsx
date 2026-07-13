import { useEffect } from "react";
import { Sparkles } from "lucide-react";

interface AdProps {
  label?: string;
  className?: string;
}

export function TopBannerAd({ className = "" }: AdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense script error", e);
    }
  }, []);

  return (
    <div 
      id="adsense-top-banner"
      className={`w-full max-w-[728px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <ins 
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "90px" }}
        data-ad-client="ca-pub-4420868155954120"
        data-ad-slot="auto" // <-- you will want to replace 'auto' with a real slot ID from AdSense later if using manual units
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export function CardBaseAd({ className = "" }: AdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense script error", e);
    }
  }, []);

  return (
    <div 
      id="adsense-card-base-banner"
      className={`w-full max-w-[680px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <ins 
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "90px" }}
        data-ad-client="ca-pub-4420868155954120"
        data-ad-slot="auto"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
