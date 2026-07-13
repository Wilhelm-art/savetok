import { useEffect } from "react";
import { Suspense, lazy } from "react";
import { Sparkles } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface AdProps {
  label?: string;
  className?: string;
}

// Separate component that only mounts when visible
function AdSenseBlock({ className = "", format = "horizontal", style = {} }: { className?: string, format?: string, style?: any }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });

  useEffect(() => {
    if (inView) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense script error", e);
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className={`w-full flex items-center justify-center overflow-hidden ${className}`}>
      {inView ? (
        <ins 
          className="adsbygoogle"
          style={{ display: "block", ...style }}
          data-ad-client="ca-pub-4420868155954120"
          data-ad-slot="auto"
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <div className="w-full h-full bg-gray-50/50 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
}

export function TopBannerAd({ className = "" }: AdProps) {
  return (
    <div 
      id="adsense-top-banner"
      className={`w-full max-w-[728px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
       <AdSenseBlock style={{ width: "100%", height: "90px" }} />
    </div>
  );
}

export function CardBaseAd({ className = "" }: AdProps) {
  return (
    <div 
      id="adsense-card-base-banner"
      className={`w-full max-w-[680px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <AdSenseBlock style={{ width: "100%", height: "90px" }} />
    </div>
  );
}
