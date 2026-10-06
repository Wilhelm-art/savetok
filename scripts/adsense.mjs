import fs from 'fs';
import path from 'path';

const ENV_PATH = path.join(process.env.USERPROFILE, '.env');
const TOKENS_PATH = path.join(process.env.USERPROFILE, '.adsense_tokens.json');

function getCredentials() {
  let clientId = process.env.GSC_CLIENT_ID;
  let clientSecret = process.env.GSC_CLIENT_SECRET;
  let refreshToken = process.env.ADSENSE_REFRESH_TOKEN;

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
        if (key === 'ADSENSE_REFRESH_TOKEN' && !refreshToken) refreshToken = val;
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
    throw new Error('AdSense credentials missing in environment or ~/.env');
  }

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
    throw new Error(`Failed to refresh AdSense token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

export async function getAccount() {
  const token = await getValidAccessToken();
  const res = await fetch('https://adsense.googleapis.com/v2/accounts', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function getSites(accountId = 'pub-4420868155954120') {
  const token = await getValidAccessToken();
  const res = await fetch(`https://adsense.googleapis.com/v2/accounts/${accountId}/sites`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function getAdUnits(accountId = 'pub-4420868155954120', adClientId = 'ca-pub-4420868155954120') {
  const token = await getValidAccessToken();
  const res = await fetch(`https://adsense.googleapis.com/v2/accounts/${accountId}/adclients/${adClientId}/adunits`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function createAdUnit(displayName, size = '728x90', accountId = 'pub-4420868155954120', adClientId = 'ca-pub-4420868155954120') {
  const token = await getValidAccessToken();
  const res = await fetch(`https://adsense.googleapis.com/v2/accounts/${accountId}/adclients/${adClientId}/adunits`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      displayName,
      state: 'ACTIVE',
      contentAdsSettings: {
        size,
        type: 'DISPLAY'
      }
    })
  });
  return await res.json();
}

export async function getReport(accountId = 'pub-4420868155954120', dateRange = 'LAST_30_DAYS') {
  const token = await getValidAccessToken();
  const url = `https://adsense.googleapis.com/v2/accounts/${accountId}/reports:generate?dateRange=${dateRange}&metrics=ESTIMATED_EARNINGS&metrics=IMPRESSIONS&metrics=CLICKS&metrics=PAGE_VIEWS_CTR&metrics=PAGE_VIEWS_RPM`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

// CLI handler
if (process.argv[1] && process.argv[1].endsWith('adsense.mjs')) {
  const cmd = process.argv[2] || 'account';
  (async () => {
    try {
      if (cmd === 'account') {
        console.log('Fetching AdSense Accounts...');
        const result = await getAccount();
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'sites') {
        console.log('Fetching AdSense Sites...');
        const result = await getSites();
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'adunits') {
        console.log('Fetching AdUnits...');
        const result = await getAdUnits();
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'create' && process.argv[3]) {
        console.log(`Creating AdUnit: ${process.argv[3]}...`);
        const result = await createAdUnit(process.argv[3]);
        console.log(JSON.stringify(result, null, 2));
      } else if (cmd === 'report') {
        console.log('Generating Performance Report...');
        const result = await getReport();
        console.log(JSON.stringify(result, null, 2));
      } else {
        console.log('Available commands: account, sites, adunits, report, create [name]');
      }
    } catch (err) {
      console.error('AdSense API Error:', err.message);
      process.exit(1);
    }
  })();
}
