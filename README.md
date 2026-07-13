# SaveTok - TikTok Video Downloader

SaveTok is a modern, responsive web application that allows users to download TikTok videos as MP4 or MP3 files without watermarks. Built for speed and simplicity, it features localization support and a clean UI tailored for both desktop and mobile users.

## Features
- **Download MP4 & MP3**: Fetch TikTok videos instantly without watermarks or extract high-quality audio.
- **Multilingual UI**: Native support for Indonesian, English, and Spanish.
- **Stateless & Private**: No login required. Downloads happen directly via API; nothing is permanently stored on our servers.
- **Responsive Design**: Clean UI/UX optimized seamlessly for all devices.
- **SEO & Tracking Ready**: Integrated with Google Tag Manager for reliable analytics.

## Quick Start

**Prerequisites:**  
- Node.js (v18+)
- npm or yarn

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Run the application locally in development mode:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000`.

3. To build for production:
   ```bash
   npm run build
   ```

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, TypeScript
- **Backend / API Wrapper**: Express.js
- **Metadata Handling**: Schema.org JSON-LD for SEO

## Disclaimer
SaveTok is not affiliated with, endorsed by, or sponsored by TikTok, ByteDance, or any of their affiliates. The app relies on publicly available third-party data APIs.
