export default async function handler(req, res) {
  const rawUrl = req.query.url;

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
    const allowedCdnRegex = /(^|\.)(tiktokcdn\.com|tiktokv\.com|musical\.ly|tiktokcdn-us\.com|byteoversea\.com|ibytedtos\.com)$/i;
    if (!allowedCdnRegex.test(parsedUrl.hostname)) {
      return res.status(403).json({ error: 'Media source domain is not authorized.' });
    }

    // Determine safe file extension
    const isMp3 = rawUrl.includes('music') || rawUrl.includes('audio');
    const extension = isMp3 ? 'mp3' : 'mp4';
    const contentType = isMp3 ? 'audio/mpeg' : 'video/mp4';

    // Fetch the raw media from TikTok's CDN
    const response = await fetch(rawUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media from TikTok CDN: ${response.statusText}`);
    }

    // Prevent CRLF injection in headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="SaveTok_media.${extension}"`);
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
