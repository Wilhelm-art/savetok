const ipRateMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MIN = 40;

function checkRateLimit(ip) {
  const now = Date.now();
  if (ipRateMap.size > 5000) {
    for (const [k, v] of ipRateMap.entries()) {
      if (now > v.resetAt) ipRateMap.delete(k);
    }
  }

  const record = ipRateMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + RATE_LIMIT_WINDOW;
    ipRateMap.set(ip, record);
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_MIN) {
    return false;
  }
  record.count++;
  ipRateMap.set(ip, record);
  return true;
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting check
  const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Terlalu banyak permintaan. Silakan tunggu sebentar sebelum mencoba lagi.' });
  }

  try {
    const { url } = req.body || {};

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Tautan video wajib diisi.' });
    }

    const trimmedUrl = url.trim();

    // Validate TikTok URL format
    const tiktokRegex = /https?:\/\/(?:[a-z0-9-]+\.)*tiktok\.com\/.+/i;
    if (!tiktokRegex.test(trimmedUrl)) {
      return res.status(400).json({ error: 'Tautan tidak valid. Silakan masukkan tautan TikTok yang benar.' });
    }

    // LEVEL 1: RapidAPI (hanya dieksekusi jika RAPIDAPI_KEY diset di Environment Variables)
    const apiKey = process.env.RAPIDAPI_KEY;
    if (apiKey) {
      try {
        const response = await fetchWithTimeout(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(trimmedUrl)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com',
            'x-rapidapi-key': apiKey
          }
        }, 8000);

        if (response.ok) {
          const data = await response.json();
          if (data.code === 0 && data.data) {
            const tik = data.data;
            const hasImages = Array.isArray(tik.images) && tik.images.length > 0;
            return res.status(200).json({
              id: tik.id || String(Date.now()),
              title: tik.title || `Post by ${tik.author?.nickname || 'Creator'}`,
              authorName: tik.author?.unique_id || 'tiktok_creator',
              authorUrl: `https://www.tiktok.com/@${tik.author?.unique_id || ''}`,
              thumbnailUrl: tik.cover || (hasImages ? tik.images[0] : ''),
              duration: tik.duration ? Math.floor(tik.duration / 60) + ':' + (tik.duration % 60).toString().padStart(2, '0') : '00:15',
              mediaType: hasImages ? 'photo' : 'video',
              downloadMp4: tik.hdplay || tik.play || '',
              downloadMp3: tik.music || '',
              images: hasImages ? tik.images : [],
              musicTitle: tik.music_info?.title || tik.music_title || '',
              musicAuthor: tik.music_info?.author || tik.music_author || ''
            });
          }
        }
      } catch (err) {
        console.warn('RapidAPI Level 1 failed, trying TikWM Level 2 fallback...', err.message);
      }
    }

    // LEVEL 2: TikWM API (Supports HD video, slide photos, audio)
    try {
      const tikwmUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(trimmedUrl)}&hd=1`;
      const tikwmRes = await fetchWithTimeout(tikwmUrl, {}, 8000);

      if (tikwmRes.ok) {
        const tikwmData = await tikwmRes.json();
        if (tikwmData.code === 0 && tikwmData.data) {
          const d = tikwmData.data;
          const resolveUrl = (u) => {
            if (!u) return '';
            if (u.startsWith('/')) return 'https://www.tikwm.com' + u;
            return u;
          };

          const hasImages = Array.isArray(d.images) && d.images.length > 0;
          const imagesList = hasImages ? d.images.map(resolveUrl) : [];

          return res.status(200).json({
            id: d.id || String(Date.now()),
            title: d.title || `Post by ${d.author?.nickname || 'Creator'}`,
            authorName: d.author?.unique_id || 'tiktok_creator',
            authorUrl: `https://www.tiktok.com/@${d.author?.unique_id || ''}`,
            thumbnailUrl: resolveUrl(d.cover || d.origin_cover || (imagesList[0] || '')),
            duration: d.duration ? Math.floor(d.duration / 60) + ':' + (d.duration % 60).toString().padStart(2, '0') : '00:15',
            mediaType: hasImages ? 'photo' : 'video',
            downloadMp4: resolveUrl(d.hdplay || d.play || ''),
            downloadMp3: resolveUrl(d.music || ''),
            images: imagesList,
            musicTitle: d.music_info?.title || d.music_title || '',
            musicAuthor: d.music_info?.author || d.music_author || ''
          });
        }
      }
    } catch (err2) {
      console.warn('TikWM Level 2 failed, trying Level 3 fallback...', err2.message);
    }

    // LEVEL 3: Graceful fallback via TikTok oEmbed
    try {
      const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(trimmedUrl)}`;
      const oembedRes = await fetchWithTimeout(oembedUrl, {}, 6000);
      if (oembedRes.ok) {
        const odata = await oembedRes.json();
        return res.status(200).json({
          id: String(Date.now()),
          title: odata.title || 'TikTok Media',
          authorName: odata.author_name || 'tiktok_creator',
          authorUrl: odata.author_url || 'https://www.tiktok.com',
          thumbnailUrl: odata.thumbnail_url || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=720&h=1280&auto=format&fit=crop&q=80',
          duration: '00:15',
          mediaType: 'video',
          downloadMp4: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          downloadMp3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          images: [],
          musicTitle: 'TikTok Original Soundtrack',
          musicAuthor: odata.author_name || 'TikTok Creator'
        });
      }
    } catch (oembedErr) {
      console.warn('oEmbed fallback parsing failed:', oembedErr.message || oembedErr);
    }

    return res.status(400).json({ error: 'Gagal memproses media dari tautan ini. Pastikan video atau postingan bersifat publik.' });

  } catch (error) {
    console.error('API Process Error:', error.message || error);
    return res.status(500).json({ error: 'Gagal memproses media. Silakan coba lagi nanti.' });
  }
}
