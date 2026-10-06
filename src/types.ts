export type Language = "ID" | "EN";

export type MediaType = "video" | "photo";

export interface MediaResult {
  id: string;
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailUrl: string;
  duration: string;
  mediaType: MediaType;
  downloadMp4?: string;
  downloadMp3?: string;
  images?: string[];
  musicTitle?: string;
  musicAuthor?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TranslationSet {
  // Navigation
  navVideo: string;
  navMp3: string;
  navPhotos: string;
  navStory: string;
  navGuides: string;
  pwaInstall: string;
  pwaInstallShort: string;

  // Hero & Interactive Segment
  heroBadge: string;
  formatVideo: string;
  formatMp3: string;
  formatPhotos: string;
  formatStory: string;
  formatViewer: string;
  subTagline: string;
  inputPlaceholder: string;
  buttonPaste: string;
  buttonDownload: string;
  exampleLabel: string;
  processingTitle: string;

  // Trust Badges
  badgeNoWm: string;
  badgeMp3: string;
  badgeZip: string;
  badgeFree: string;

  // Result Card Details
  downloadMp4Label: string;
  downloadMp3Label: string;
  downloadSinglePhoto: string;
  downloadAllPhotos: string;
  downloadAllZip: string;
  downloadingLabel: string;
  zippingLabel: string;
  selectPhoto: string;
  photoReadyDesc: string;
  videoReadyDesc: string;
  photoSlideCount: string;
  downloadAnother: string;

  // SEO & Marketing Content
  howToDownloadTitle: string;
  marketingTitle1: string;
  marketingDesc1: string;
  benefitTitle: string;
  benefitItems: string[];
  hdFeatureTitle: string;
  hdFeatureDesc: string;
  boxUnlimitedTitle: string;
  boxUnlimitedDesc: string;
  boxFormatsTitle: string;
  boxFormatsDesc: string;
  deviceGuideTitle: string;
  androidTitle: string;
  androidDesc: string;
  pcTitle: string;
  pcDesc: string;
  photoFeatureTag: string;
  photoFeatureTitle: string;
  photoFeatureDesc: string;

  // Footer & Legal
  faqTitle: string;
  copyright: string;
  privacyPolicy: string;
  termsOfService: string;
  disclaimer: string;
  errorRequired: string;
  errorInvalid: string;
  errorServer: string;

  // Tutorial Steps
  tutorialSteps: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  faqs: FAQItem[];
}

export type TranslationsMap = Record<Language, TranslationSet>;
