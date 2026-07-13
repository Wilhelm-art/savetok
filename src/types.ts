export type Language = "ID" | "EN" | "ES";

export interface VideoResult {
  id: string;
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailUrl: string;
  duration: string;
  downloadMp4: string;
  downloadMp3: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TranslationSet {
  brandName: string;
  tagline: string;
  subTagline: string;
  inputPlaceholder: string;
  buttonPaste: string;
  buttonDownload: string;
  exampleLabel: string;
  processingTitle: string;
  processingSubtitle: string;
  downloadResults: string;
  downloadMp4Label: string;
  downloadMp3Label: string;
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
