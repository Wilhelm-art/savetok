import fs from 'fs';
import path from 'path';

const ENV_PATH = path.join(process.env.USERPROFILE, '.env');
const TOKENS_PATH = path.join(process.env.USERPROFILE, '.gsc_tokens.json');

function getCredentials() {
  let clientId = process.env.GSC_CLIENT_ID;
  let clientSecret = process.env.GSC_CLIENT_SECRET;
  let refreshToken = process.env.GSC_REFRESH_TOKEN;

  if (fs.existsSync(ENV_PATH)) {
    const raw = fs.readFileSync(ENV_PATH, 'utf8');
    const lines = raw.replace(/\r/g, '').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (key === 'GSC_CLIENT_ID' && !clientId) clientId = val;
        if (key === 'GSC_CLIENT_SECRET' && !clientSecret) clientSecret = val;
        if (key === 'GSC_REFRESH_TOKEN' && !refreshToken) refreshToken = val;
      }
    }
  }

  if (!refreshToken && fs.existsSync(TOKENS_PATH)) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
      refreshToken = tokenData.refresh_token;
    } catch {}
  }

  return { clientId, clientSecret, refreshToken };
}

export async function getValidAccessToken() {
  const { clientId, clientSecret, refreshToken } = getCredentials();
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('GSC credentials missing in environment or ~/.env');
  }

  // Refresh access token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Failed to refresh token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

export async function inspectUrl(url = 'https://savetok.web.id/', siteUrl = 'sc-domain:savetok.web.id') {
  const token = await getValidAccessToken();
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inspectionUrl: url,
      siteUrl: siteUrl
    })
  });
  return await res.json();
}

export async function getSearchAnalytics({
  siteUrl = 'sc-domain:savetok.web.id',
  startDate,
  endDate,
  dimensions = ['query'],
  rowLimit = 10
} = {}) {
  const token = await getValidAccessToken();
  const today = new Date();
  const defaultEnd = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const defaultStart = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      startDate: startDate || defaultStart,
      endDate: endDate || defaultEnd,
      dimensions,
      rowLimit
    })
  });
  return await res.json();
}

export async function getSitemaps(siteUrl = 'sc-domain:savetok.web.id') {
  const token = await getValidAccessToken();
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function submitSitemap(feedpath = 'https://savetok.web.id/sitemap.xml', siteUrl = 'sc-domain:savetok.web.id') {
  const token = await getValidAccessToken();
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 204 || res.ok) {
    return { success: true, message: `Sitemap ${feedpath} submitted successfully.` };
  }
  return await res.json();
}

// CLI handler
if (process.argv[1] && process.argv[1].endsWith('gsc.mjs')) {
  const cmd = process.argv[2] || 'inspect';
  (async () => {
    try {
      if (cmd === 'inspect') {
        const targetUrl = process.argv[3] || 'https://savetok.web.id/';
        console.log(`Inspecting URL: ${targetUrl}`);
        const result = await inspectUrl(targetUrl);
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'stats') {
        console.log('Fetching Search Analytics (Last 30 days)...');
        const result = await getSearchAnalytics();
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'sitemaps') {
        console.log('Fetching Sitemaps...');
        const result = await getSitemaps();
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'submit-sitemap') {
        const feedpath = process.argv[3] || 'https://savetok.web.id/sitemap.xml';
        console.log(`Submitting Sitemap: ${feedpath}...`);
        const result = await submitSitemap(feedpath);
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log('Available commands: inspect [url], stats, sitemaps, submit-sitemap [url]');
      }
    } catch (err) {
      console.error('GSC Error:', err.message);
      process.exit(1);
    }
  })();
}
