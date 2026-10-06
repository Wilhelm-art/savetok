import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface AdProps {
  label?: string;
  className?: string;
}

// Separate component that only mounts when visible
function AdSenseBlock({ className = "", format = "auto", style = {} }: { className?: string, format?: string, style?: any }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });

  useEffect(() => {
    // Only push if the script has actually loaded and this component is in view
    // @ts-ignore
    if (inView && window.adsbygoogleLoaded) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense script error", e);
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className={`w-full min-h-[90px] flex items-center justify-center overflow-hidden ${className}`}>
      {inView ? (
        <ins 
          className="adsbygoogle"
          style={{ display: "block", minHeight: "90px", width: "100%", ...style }}
          data-ad-client="ca-pub-4420868155954120"
          data-ad-slot="auto"
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <div className="w-full h-[90px] bg-gray-50/50 rounded-xl" />
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
       <AdSenseBlock />
    </div>
  );
}

export function CardBaseAd({ className = "" }: AdProps) {
  return (
    <div 
      id="adsense-card-base-banner"
      className={`w-full max-w-[680px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <AdSenseBlock />
    </div>
  );
}

export function MidContentAd({ className = "" }: AdProps) {
  return (
    <div 
      id="adsense-mid-content-banner"
      className={`w-full max-w-[728px] min-h-[90px] mx-auto flex items-center justify-center overflow-hidden my-6 ${className}`}
    >
      <AdSenseBlock />
    </div>
  );
}
