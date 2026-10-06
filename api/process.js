export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { url } = req.body || {};

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Tautan video wajib diisi.' });
    }

    const trimmedUrl = url.trim();

    // Validate TikTok URL format
    const tiktokRegex = /https?:\/\/(?:[a-z0-9-]+\.)*tiktok\.com\/(?:@[a-zA-Z0-9_.-]+\/video\/(\d+)|v\/(\d+)|t\/([a-zA-Z0-9]+)|([a-zA-Z0-9]+))/i;
    if (!tiktokRegex.test(trimmedUrl)) {
      return res.status(400).json({ error: 'Tautan tidak valid. Silakan masukkan tautan TikTok yang benar.' });
    }

    const apiKey = process.env.RAPIDAPI_KEY || "b147c13cbamshc23e106d8b0378ep1f58c6jsne1ae9647adb1";

    // Call RapidAPI server-side
    const response = await fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${encodeURIComponent(trimmedUrl)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      }
    });

    const data = await response.json();

    if (!response.ok || data.code !== 0) {
      return res.status(400).json({ 
        error: data.msg || data.error || 'Gagal memproses video dari TikTok. Pastikan video bersifat publik.' 
      });
    }

    const tikData = data.data;

    return res.status(200).json({
      id: tikData.id,
      title: tikData.title || `Video by ${tikData.author?.nickname || 'Creator'}`,
      authorName: tikData.author?.unique_id || 'tiktok_creator',
      authorUrl: `https://www.tiktok.com/@${tikData.author?.unique_id || ''}`,
      thumbnailUrl: tikData.cover,
      duration: tikData.duration ? Math.floor(tikData.duration / 60) + ':' + (tikData.duration % 60).toString().padStart(2, '0') : '00:00',
      downloadMp4: tikData.hdplay || tikData.play,
      downloadMp3: tikData.music
    });

  } catch (error) {
    console.error('API Process Error:', error.message || error);
    return res.status(500).json({ error: 'Gagal memproses video. Silakan coba lagi nanti.' });
  }
}
