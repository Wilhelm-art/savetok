import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('[prerender] dist/index.html not found! Run vite build first.');
  process.exit(1);
}

let baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

// Inline critical CSS into <head> to eliminate render-blocking external stylesheet delay
const assetsDir = path.join(DIST_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
  if (cssFiles.length > 0) {
    const mainCss = cssFiles[0];
    const cssContent = fs.readFileSync(path.join(assetsDir, mainCss), 'utf8');
    baseHtml = baseHtml.replace(
      new RegExp(`<link\\s+rel=["']stylesheet["'][^>]*href=["'][^"']*${mainCss}["'][^>]*>`, 'i'),
      `<style id="savetok-bundle-css">${cssContent}</style>`
    );
    fs.writeFileSync(BASE_HTML_PATH, baseHtml, 'utf8');
    console.log(`[prerender] Successfully inlined ${mainCss} (${Math.round(cssContent.length / 1024)} KB) into index.html`);
  }
}

const routes = [
  {
    path: 'mp3',
    title: 'Download Lagu & Sound TikTok MP3 320kbps - SaveTok',
    description: 'Ekstrak dan simpan audio lagu viral TikTok ke format MP3 320kbps jernih tanpa watermark.',
    canonical: 'https://savetok.web.id/mp3',
    heroTitle: 'Download Lagu &amp; Sound TikTok <span class="text-rose-600">Audio MP3 Jernih</span>',
    heroSubtitle: 'Ekstrak dan simpan audio lagu viral TikTok ke format MP3 320kbps tanpa watermark, cepat dan gratis.'
  },
  {
    path: 'foto',
    title: 'Download Foto Slide TikTok HD & ZIP Sekaligus - SaveTok',
    description: 'Unduh semua foto slide carousel TikTok kualitas asli tanpa watermark dalam satu paket ZIP.',
    canonical: 'https://savetok.web.id/foto',
    heroTitle: 'Download Foto Slide TikTok <span class="text-rose-600">HD &amp; ZIP Sekaligus</span>',
    heroSubtitle: 'Unduh semua foto slide carousel TikTok kualitas asli tanpa watermark dalam satu paket ZIP gratis.'
  },
  {
    path: 'story',
    title: 'Download Story TikTok Tanpa Watermark HD - SaveTok',
    description: 'Simpan story TikTok favorit sebelum kedaluwarsa 24 jam dengan kualitas video HD jernih.',
    canonical: 'https://savetok.web.id/story',
    heroTitle: 'Download Story TikTok <span class="text-rose-600">Tanpa Watermark HD</span>',
    heroSubtitle: 'Simpan story TikTok favorit sebelum kedaluwarsa 24 jam dengan kualitas video HD jernih tanpa login.'
  },
  {
    path: 'viewer',
    title: 'TikTok Web Viewer Tanpa Login Gratis - SaveTok',
    description: 'Jelajahi video dan profil TikTok secara anonim langsung di web browser tanpa login akun.',
    canonical: 'https://savetok.web.id/viewer',
    heroTitle: 'TikTok Web Viewer <span class="text-rose-600">Tanpa Login Gratis</span>',
    heroSubtitle: 'Jelajahi video dan profil TikTok secara anonim langsung di web browser tanpa login akun.'
  },
  {
    path: 'panduan',
    title: 'Panduan Lengkap Cara Download Video TikTok - SaveTok',
    description: 'Tutorial lengkap cara menyimpan video, foto slide, dan lagu TikTok tanpa watermark di Android, iPhone, dan PC.',
    canonical: 'https://savetok.web.id/panduan',
    heroTitle: 'Panduan Lengkap <span class="text-rose-600">Download Video TikTok</span>',
    heroSubtitle: 'Tutorial lengkap cara menyimpan video, foto slide, dan lagu TikTok tanpa watermark di Android, iPhone, dan PC.'
  },
  {
    path: 'privacy',
    title: 'Kebijakan Privasi - SaveTok',
    description: 'Kebijakan Privasi SaveTok - Layanan download video TikTok yang aman dan menghormati privasi pengguna.',
    canonical: 'https://savetok.web.id/privacy',
    heroTitle: 'Kebijakan Privasi <span class="text-rose-600">SaveTok</span>',
    heroSubtitle: 'Kebijakan Privasi SaveTok - Layanan download video TikTok yang aman dan menghormati privasi pengguna.'
  },
  {
    path: 'terms',
    title: 'Syarat & Ketentuan - SaveTok',
    description: 'Syarat dan Ketentuan penggunaan layanan SaveTok downloader online.',
    canonical: 'https://savetok.web.id/terms',
    heroTitle: 'Syarat &amp; Ketentuan <span class="text-rose-600">SaveTok</span>',
    heroSubtitle: 'Syarat dan Ketentuan resmi penggunaan layanan SaveTok downloader online.'
  },
  {
    path: 'disclaimer',
    title: 'Penafian (Disclaimer) - SaveTok',
    description: 'Penafian resmi mengenai hak cipta dan batasan tanggung jawab penggunaan layanan SaveTok.',
    canonical: 'https://savetok.web.id/disclaimer',
    heroTitle: 'Penafian (Disclaimer) <span class="text-rose-600">SaveTok</span>',
    heroSubtitle: 'Penafian resmi mengenai hak cipta dan batasan tanggung jawab penggunaan layanan SaveTok.'
  }
];

function generateHtml(route) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

  // Replace Canonical Link
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  html = html.replace(/<link\s+href=["'][^"']*["']\s+rel=["']canonical["']\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);

  // Replace OG / Twitter Tags
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${route.canonical}" />`);

  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:url" content="${route.canonical}" />`);

  // Replace critical hero inside #root
  if (route.heroTitle) {
    html = html.replace(/<h1 id="hero-title"[^>]*>[\s\S]*?<\/h1>/i, `<h1 id="hero-title" class="font-sans font-black text-3xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-[1.15]">${route.heroTitle}</h1>`);
  }
  if (route.heroSubtitle) {
    html = html.replace(/<p id="hero-subtitle"[^>]*>[\s\S]*?<\/p>/i, `<p id="hero-subtitle" class="font-sans font-normal text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">${route.heroSubtitle}</p>`);
  }

  return html;
}

let count = 0;
for (const route of routes) {
  const content = generateHtml(route);

  // 1. Write <route>.html (for Vercel cleanUrls)
  const cleanHtmlPath = path.join(DIST_DIR, `${route.path}.html`);
  fs.writeFileSync(cleanHtmlPath, content, 'utf8');

  // 2. Write <route>/index.html (for directory routing)
  const routeDir = path.join(DIST_DIR, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  const indexPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(indexPath, content, 'utf8');

  count += 2;
  console.log(`[prerender] Generated: /${route.path} -> ${route.path}.html & ${route.path}/index.html`);
}

console.log(`[prerender] Successfully generated ${count} prerendered files for ${routes.length} routes.`);
