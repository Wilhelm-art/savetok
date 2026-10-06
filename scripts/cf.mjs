import fs from 'fs';
import path from 'path';

const ENV_PATH = path.join(process.env.USERPROFILE, '.env');

function getCloudflareToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
  if (!fs.existsSync(ENV_PATH)) return null;

  const raw = fs.readFileSync(ENV_PATH, 'utf8');
  for (const line of raw.replace(/\r/g, '').split('\n')) {
    const match = line.match(/^\s*CLOUDFLARE_API_TOKEN\s*=\s*(.*)$/);
    if (match) {
      let val = match[1].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      return val;
    }
  }
  return null;
}

export async function purgeEverything(zoneName = 'savetok.web.id') {
  const token = getCloudflareToken();
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN not found in environment or ~/.env');

  // 1. Get Zone ID
  const zoneRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(zoneName)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const zoneData = await zoneRes.json();
  if (!zoneData.result || zoneData.result.length === 0) {
    throw new Error(`Zone ${zoneName} not found: ${JSON.stringify(zoneData)}`);
  }

  const zoneId = zoneData.result[0].id;

  // 2. Purge Everything
  const purgeRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ purge_everything: true })
  });

  return await purgeRes.json();
}

if (process.argv[1] && process.argv[1].endsWith('cf.mjs')) {
  (async () => {
    try {
      console.log('Purging Cloudflare cache for savetok.web.id...');
      const res = await purgeEverything();
      console.log('Result:', JSON.stringify(res, null, 2));
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  })();
}
