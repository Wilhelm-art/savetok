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
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TranslationSet {
  subTagline: string;
  inputPlaceholder: string;
  buttonPaste: string;
  buttonDownload: string;
  exampleLabel: string;
  processingTitle: string;
  downloadMp4Label: string;
  downloadMp3Label: string;
  downloadSinglePhoto: string;
  downloadAllPhotos: string;
  photoSlideCount: string;
  downloadAnother: string;
  howToDownloadTitle: string;
  faqTitle: string;
  copyright: string;
  privacyPolicy: string;
  termsOfService: string;
  disclaimer: string;
  errorRequired: string;
  errorInvalid: string;
  errorServer: string;
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
