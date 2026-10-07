# SaveTok

> High-performance, privacy-first web application for downloading TikTok videos (HD without watermark), photo slide carousels (with batch ZIP bundling), and audio tracks (MP3 320kbps).

[![Production](https://img.shields.io/badge/Production-savetok.web.id-rose?style=flat-square)](https://savetok.web.id/)
[![Tests](https://img.shields.io/badge/Playwright%20E2E-16%20Passed-emerald?style=flat-square)](./e2e)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.1-38bdf8?style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-slate?style=flat-square)](./LICENSE)

---

## Overview

SaveTok is built to provide an instant, reliable, and clean interface for extracting content from TikTok without forced registrations, intrusive interstitial ads, or watermarks.

The application combines a modern React 19 frontend with an Express / Vercel Serverless proxy backend that streams binary streams directly to the client, preventing CDN hotlink blocks and CORS restrictions.

### Production Lighthouse Scores (PageSpeed Insights)

| Metric | Desktop | Mobile |
| :--- | :---: | :---: |
| **Performance** | **99 / 100** | **89 / 100** |
| **Accessibility** | **100 / 100** | **100 / 100** |
| **Best Practices** | **100 / 100** | **100 / 100** |
| **SEO** | **100 / 100** | **100 / 100** |
| **Cumulative Layout Shift (CLS)** | **0.000** | **0.000** |
| **Total Blocking Time (TBT)** | **20 ms** | **20 ms** |

---

## Key Features

- **No-Watermark HD MP4 Video**: Extracts the direct original feed from ByteDance CDNs with zero compression degradation.
- **Photo Slide Carousels & 1-Click ZIP**: Browse individual photos with a built-in gallery viewer or download all carousel images packaged into a single `.zip` file generated client-side using `JSZip`.
- **MP3 Audio Extraction & Player**: Extract the original audio or background song at 320kbps with an in-browser audio preview player before downloading.
- **Stream Proxy Pipeline**: Server streams binary chunks with `Content-Disposition: attachment; filename=...` directly to the client to ensure instant download triggers without opening raw CDN URLs.
- **Bilingual Support (ID / EN)**: Complete localization for Indonesian and English, with state persistence and accessible language toggles.
- **Zero Layout Shift UI (CLS = 0)**: Optimized using native system font stacks (`system-ui`), static document skeletons, and lazy-loaded modals to prevent any content jumping.
- **Clean Google AdSense**: Integrated purely with official Google AdSense Auto Ads—no deceptive fake buttons, popunders, or misleading fallback banners.
- **Progressive Web App (PWA)**: Installable on Android and iOS home screens with an offline manifest and app shortcuts.

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                      Client                            │
│  React 19 + Vite 6 + Tailwind CSS v4 + TypeScript      │
│  - URL normalization & pattern validation              │
│  - In-browser MP3 audio player preview                 │
│  - Client-side photo slide carousel & ZIP compilation  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Backend Proxy                        │
│          Express (Local) / Vercel Serverless           │
│  POST /api/process   -> Resolves TikTok metadata       │
│  GET  /api/download  -> Binary stream proxy pipe       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             Upstream Video & Audio CDNs                │
│             ByteDance / TikTok Media CDN               │
└────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Latest concurrent rendering and modern hook discipline |
| **Build Tool** | [Vite 6](https://vite.dev/) | Instant HMR in development and optimized Rollup production bundling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first configuration via `@import "tailwindcss"` with zero runtime overhead |
| **Icons** | [Lucide React](https://lucide.dev/) | Lightweight, tree-shakeable SVG icon primitives |
| **Client Bundling** | [JSZip](https://stuk.github.io/jszip/) | In-memory ZIP compilation for batch photo slide downloads |
| **Backend & API** | Node.js + Express | Lightweight stream pipe for proxying binary media buffers |
| **Testing** | [Playwright](https://playwright.dev/) | 16 end-to-end browser tests across Chromium and Mobile Chrome |
| **Hosting & CDN** | Vercel | Global edge CDN, automatic HTTPS, and zero-config serverless deployments |

---

## Getting Started

### Prerequisites

- **Node.js**: v18.x or v20.x+
- **npm** (or `pnpm` / `yarn`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Wilhelm-art/savetok.git
   cd savetok
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express server with Vite middleware in development mode (`localhost:3000`) |
| `npm run build` | Compiles frontend assets with Vite and bundles the Node server with `esbuild` into `dist/` |
| `npm run start` | Runs the compiled production server (`dist/server.cjs`) |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run test:e2e` | Executes the complete Playwright E2E test suite (16 tests, headless) |
| `npm run test:e2e:ui` | Opens Playwright Interactive Test UI for visual debugging |

---

## End-to-End Testing

The project maintains comprehensive Playwright test coverage ensuring that core download flows never break.

To execute tests locally:

```bash
npx playwright test
```

### Covered Test Journeys (16 Scenarios)
1. **Journey 1**: Happy Path — Download Video HD & Audio
2. **Journey 2**: Happy Path — Download Photo Slide Carousel
3. **Journey 3**: Input Validation & Failure State Handling
4. **Journey 4**: Multilingual Switcher (ID & EN)
5. **Journey 5**: Legal Modals Navigation (Privacy, Terms, Disclaimer)
6. **Journey 6**: Server & Network Error Handling
7. **Journey 7**: Sub-Page Keyword Routes & Educational Guides
8. **Journey 8**: Photo Slide Carousel ZIP Button Presence
*(All 8 journeys are validated across both Desktop Chromium and Mobile Chrome viewports)*

---

## Project Structure

```
savetok/
├── api/                       # Vercel Serverless Function handlers
│   ├── download.js            # Binary stream pipe with Content-Disposition headers
│   └── process.js             # TikTok metadata resolver
├── e2e/                       # Playwright test suite
│   ├── downloader.spec.ts     # User journey test specifications
│   └── fixtures.ts            # Network mocks and testing harness
├── public/                    # Static assets, icons, manifest
│   ├── favicon.svg            # Custom geometric SaveTok brand icon
│   ├── manifest.webmanifest   # PWA application manifest
│   └── robots.txt             # Search crawler directives
├── src/                       # React frontend source
│   ├── components/            # UI components (Header, DownloadCard, Guides, etc.)
│   ├── data/                  # Multilingual guide articles and metadata
│   ├── types/                 # Shared TypeScript interfaces
│   ├── utils/                 # URL detector and format helpers
│   ├── App.tsx                # Primary application container
│   ├── index.css              # Tailwind CSS v4 entrypoint & theme tokens
│   └── main.tsx               # React root entry
├── index.html                 # Semantic HTML entry, SEO meta, JSON-LD schemas
├── server.ts                  # Local Express development and production server
└── vite.config.ts             # Vite configuration
```

---

## Disclaimer

SaveTok is an independent tool and is not affiliated with, authorized, maintained, sponsored, or endorsed by TikTok, ByteDance Ltd., or any of their affiliates or subsidiaries.

All trademarks, service marks, trade names, product names, and logos appearing on this site are the property of their respective owners. SaveTok respects intellectual property rights and expects users to use the service in compliance with copyright and fair use regulations.

---

## License

This project is licensed under the [MIT License](./LICENSE).
