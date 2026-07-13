export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Determine file extension
    const isMp3 = url.includes('music') || url.includes('audio');
    const extension = isMp3 ? 'mp3' : 'mp4';
    const contentType = isMp3 ? 'audio/mpeg' : 'video/mp4';

    // Fetch the raw media from TikTok's CDN
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media from TikTok: ${response.statusText}`);
    }

    // Pass necessary headers to force the browser to treat it as a direct download
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="SaveTok_media.${extension}"`);
    
    // Pipe the external stream directly to the client's browser (bypass CORS)
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.send(buffer);

  } catch (error) {
    console.error('API Download Error:', error);
    return res.status(500).json({ error: 'Failed to download the media' });
  }
}
