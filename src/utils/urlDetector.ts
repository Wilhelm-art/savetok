import { Language } from "../types";

export interface URLValidationResult {
  isValidTikTok: boolean;
  isPlatformMismatch: boolean;
  platformName?: string;
  errorMessage?: string;
}

export function detectUrlPlatform(url: string, lang: Language): URLValidationResult {
  const clean = url.trim().toLowerCase();
  if (!clean) {
    return {
      isValidTikTok: false,
      isPlatformMismatch: false
    };
  }

  // Detect Instagram & Threads
  if (clean.includes("instagram.com") || clean.includes("instagr.am") || clean.includes("threads.net")) {
    return {
      isValidTikTok: false,
      isPlatformMismatch: true,
      platformName: "Instagram",
      errorMessage: lang === "ID"
        ? "Tautan tidak valid. Ini adalah tautan dari Instagram. SaveTok dirancang khusus untuk video, audio, dan slide foto TikTok."
        : "Invalid link. This is an Instagram link. SaveTok is designed specifically for TikTok videos, audio, and photo slides."
    };
  }

  // Detect YouTube & Shorts
  if (clean.includes("youtube.com") || clean.includes("youtu.be")) {
    return {
      isValidTikTok: false,
      isPlatformMismatch: true,
      platformName: "YouTube",
      errorMessage: lang === "ID"
        ? "Tautan tidak valid. Ini adalah tautan dari YouTube. SaveTok dirancang khusus untuk video, audio, dan slide foto TikTok."
        : "Invalid link. This is a YouTube link. SaveTok is designed specifically for TikTok videos, audio, and photo slides."
    };
  }

  // Detect Facebook
  if (clean.includes("facebook.com") || clean.includes("fb.watch") || clean.includes("fb.com")) {
    return {
      isValidTikTok: false,
      isPlatformMismatch: true,
      platformName: "Facebook",
      errorMessage: lang === "ID"
        ? "Tautan tidak valid. Ini adalah tautan dari Facebook. SaveTok dirancang khusus untuk konten TikTok."
        : "Invalid link. This is a Facebook link. SaveTok is designed specifically for TikTok media."
    };
  }

  // Detect X / Twitter
  if (clean.includes("twitter.com") || clean.includes("x.com")) {
    return {
      isValidTikTok: false,
      isPlatformMismatch: true,
      platformName: "Twitter",
      errorMessage: lang === "ID"
        ? "Tautan tidak valid. Ini adalah tautan dari X (Twitter). SaveTok dirancang khusus untuk konten TikTok."
        : "Invalid link. This is an X (Twitter) link. SaveTok is designed specifically for TikTok media."
    };
  }

  // Check valid TikTok domains (tiktok.com, vt.tiktok.com, vm.tiktok.com, douyin.com)
  const isTikTok = clean.includes("tiktok.com") || clean.includes("douyin.com");
  return {
    isValidTikTok: isTikTok,
    isPlatformMismatch: false
  };
}
