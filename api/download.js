const downloadIpRateMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_DOWNLOAD_REQUESTS_PER_MIN = 60;

function checkDownloadRateLimit(ip) {
  const now = Date.now();
  if (downloadIpRateMap.size > 5000) {
    for (const [k, v] of downloadIpRateMap.entries()) {
      if (now > v.resetAt) downloadIpRateMap.delete(k);
    }
  }

  const record = downloadIpRateMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + RATE_LIMIT_WINDOW;
    downloadIpRateMap.set(ip, record);
    return true;
  }
  if (record.count >= MAX_DOWNLOAD_REQUESTS_PER_MIN) {
    return false;
  }
  record.count++;
  downloadIpRateMap.set(ip, record);
  return true;
}

export default async function handler(req, res) {
  const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkDownloadRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Terlalu banyak permintaan unduhan. Silakan tunggu 1 menit.' });
  }

  const rawUrl = req.query.url;
  const requestedType = req.query.type; // 'video' | 'photo' | 'audio'
  const customId = req.query.id;

  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required.' });
  }

  try {
    const parsedUrl = new URL(rawUrl);

    // Only allow HTTPS protocol
    if (parsedUrl.protocol !== 'https:') {
      return res.status(403).json({ error: 'Only HTTPS protocol is supported.' });
    }

    // Whitelist legitimate TikTok media CDN hostnames (SSRF prevention)
    const allowedCdnRegex = /(^|\.)(tiktokcdn\.com|tiktokv\.com|musical\.ly|tiktokcdn-us\.com|byteoversea\.com|ibytedtos\.com|tikwm\.com)$/i;
    if (!allowedCdnRegex.test(parsedUrl.hostname)) {
      return res.status(403).json({ error: 'Media source domain is not authorized.' });
    }

    // Determine safe file type & extension
    let extension = 'mp4';
    let contentType = 'video/mp4';
    let prefix = 'video';

    if (requestedType === 'audio' || rawUrl.includes('music') || rawUrl.includes('audio') || rawUrl.endsWith('.mp3')) {
      extension = 'mp3';
      contentType = 'audio/mpeg';
      prefix = 'audio';
    } else if (requestedType === 'photo' || rawUrl.includes('image') || rawUrl.includes('photo') || /\.(jpe?g|png|webp)/i.test(rawUrl)) {
      extension = 'jpg';
      contentType = 'image/jpeg';
      prefix = 'photo';
    }

    // Fetch the raw media from TikTok's CDN with 15s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(rawUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/',
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch media from CDN: ${response.statusText}`);
    }

    const sanitizedId = String(customId || Date.now()).replace(/[^a-zA-Z0-9_-]/g, '');

    // Prevent CRLF injection in headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="SaveTok_${prefix}_${sanitizedId}.${extension}"`);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Pipe external buffer directly to client
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.send(buffer);

  } catch (error) {
    console.error('API Download Error:', error.message || error);
    return res.status(500).json({ error: 'Failed to download the media' });
  }
}
