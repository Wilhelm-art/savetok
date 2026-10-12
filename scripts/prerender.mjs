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

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

const routes = [
  {
    path: 'mp3',
    title: 'Download Lagu & Sound TikTok MP3 320kbps - SaveTok',
    description: 'Ekstrak dan simpan audio lagu viral TikTok ke format MP3 320kbps jernih tanpa watermark.',
    canonical: 'https://savetok.web.id/mp3'
  },
  {
    path: 'foto',
    title: 'Download Foto Slide TikTok HD & ZIP Sekaligus - SaveTok',
    description: 'Unduh semua foto slide carousel TikTok kualitas asli tanpa watermark dalam satu paket ZIP.',
    canonical: 'https://savetok.web.id/foto'
  },
  {
    path: 'story',
    title: 'Download Story TikTok Tanpa Watermark HD - SaveTok',
    description: 'Simpan story TikTok favorit sebelum kedaluwarsa 24 jam dengan kualitas video HD jernih.',
    canonical: 'https://savetok.web.id/story'
  },
  {
    path: 'viewer',
    title: 'TikTok Web Viewer Tanpa Login Gratis - SaveTok',
    description: 'Jelajahi video dan profil TikTok secara anonim langsung di web browser tanpa login akun.',
    canonical: 'https://savetok.web.id/viewer'
  },
  {
    path: 'panduan',
    title: 'Panduan Lengkap Cara Download Video TikTok - SaveTok',
    description: 'Tutorial lengkap cara menyimpan video, foto slide, dan lagu TikTok tanpa watermark di Android, iPhone, dan PC.',
    canonical: 'https://savetok.web.id/panduan'
  },
  {
    path: 'privacy',
    title: 'Kebijakan Privasi - SaveTok',
    description: 'Kebijakan Privasi SaveTok - Layanan download video TikTok yang aman dan menghormati privasi pengguna.',
    canonical: 'https://savetok.web.id/privacy'
  },
  {
    path: 'terms',
    title: 'Syarat & Ketentuan - SaveTok',
    description: 'Syarat dan Ketentuan penggunaan layanan SaveTok downloader online.',
    canonical: 'https://savetok.web.id/terms'
  },
  {
    path: 'disclaimer',
    title: 'Penafian (Disclaimer) - SaveTok',
    description: 'Penafian resmi mengenai hak cipta dan batasan tanggung jawab penggunaan layanan SaveTok.',
    canonical: 'https://savetok.web.id/disclaimer'
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
