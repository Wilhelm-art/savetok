import { useEffect, useRef, CSSProperties } from "react";
import { useInView } from "react-intersection-observer";

interface AdProps {
  label?: string;
  className?: string;
}

interface AdBlockProps {
  className?: string;
  format?: string;
  style?: CSSProperties;
  slot?: string;
}

function AdSenseBlock({
  className = "",
  format = "auto",
  style = {},
  slot
}: AdBlockProps) {
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });
  const pushedRef = useRef(false);
  const isValidNumericSlot = Boolean(slot && /^\d+$/.test(slot));

  useEffect(() => {
    if (!inView || !isValidNumericSlot || pushedRef.current) return;

    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        pushedRef.current = true;
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("AdSense push error", e);
    }
  }, [inView, isValidNumericSlot]);

  if (!isValidNumericSlot) {
    return null;
  }

  return (
    <div ref={inViewRef} className={`w-full flex items-center justify-center overflow-hidden ${className}`}>
      {inView ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", ...style }}
          data-ad-client="ca-pub-4420868155954120"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : null}
    </div>
  );
}

export function TopBannerAd({ className = "" }: AdProps) {
  return (
    <div
      id="adsense-top-banner"
      className={`w-full max-w-[728px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <AdSenseBlock />
    </div>
  );
}

export function CardBaseAd({ className = "" }: AdProps) {
  return (
    <div
      id="adsense-card-base-banner"
      className={`w-full max-w-[680px] mx-auto flex items-center justify-center overflow-hidden ${className}`}
    >
      <AdSenseBlock />
    </div>
  );
}

export function MidContentAd({ className = "" }: AdProps) {
  return (
    <div
      id="adsense-mid-content-banner"
      className={`w-full max-w-[728px] mx-auto flex items-center justify-center overflow-hidden my-6 ${className}`}
    >
      <AdSenseBlock />
    </div>
  );
}
