const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml',
};

async function fetchHtml(url: string): Promise<string> {
  // Try direct fetch first (Android + iOS custom builds)
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (res.ok) return res.text();
  } catch {
    // Falls through to proxy on iOS ATS failure
  }
  // HTTPS proxy fallback — works in Expo Go on iOS
  const proxied = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  );
  const json = (await proxied.json()) as { contents: string };
  return json.contents ?? '';
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function parseFloatSafe(s: string): number | null {
  const n = parseFloat(s.replace('%', '').trim());
  return isNaN(n) ? null : n;
}

function parseAge(dob: string): number | null {
  if (!dob || dob === '--') return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

async function searchFighterUrl(firstName: string, lastName: string): Promise<string | null> {
  const url = `http://ufcstats.com/statistics/fighters?action=search&SearchFirstName=${encodeURIComponent(firstName)}&SearchLastName=${encodeURIComponent(lastName)}&search=Search`;
  const html = await fetchHtml(url);

  const rowRe = /<tr[^>]*class="[^"]*b-statistics__table-row[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
  const fullName = `${firstName} ${lastName}`.toLowerCase();
  let match;

  while ((match = rowRe.exec(html)) !== null) {
    const row = match[1];
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    if (cells.length < 2) continue;
    const first = stripTags(cells[0]).toLowerCase();
    const last = stripTags(cells[1]).toLowerCase();
    if (`${first} ${last}` === fullName || first === firstName.toLowerCase()) {
      const hrefMatch = cells[0].match(/href="([^"]+fighter-details[^"]+)"/);
      if (hrefMatch) return hrefMatch[1];
    }
  }

  const firstHref = html.match(/href="(http:\/\/ufcstats\.com\/fighter-details\/[^"]+)"/);
  return firstHref ? firstHref[1] : null;
}

async function scrapeFighterPage(url: string) {
  const html = await fetchHtml(url);

  const recordMatch = html.match(/(\d+-\d+-\d+)/);
  const record = recordMatch ? recordMatch[1] : null;

  const nicknameMatch = html.match(/class="b-content__Nickname"[^>]*>\s*"([^"]+)"/);
  const nickname = nicknameMatch ? nicknameMatch[1] : null;

  const stats: Record<string, string> = {};
  const itemRe = /b-list__box-item-title[^>]*>([\s\S]*?)<\/i>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = itemRe.exec(html)) !== null) {
    const key = stripTags(m[1]).replace(':', '').trim().toLowerCase();
    const val = stripTags(m[2]).trim();
    if (key && val && val !== '--') stats[key] = val;
  }

  return {
    record,
    nickname,
    age: parseAge(stats['dob'] ?? ''),
    height: stats['height'] ?? null,
    reach: stats['reach'] ?? null,
    stance: stats['stance'] ?? null,
    strikes_landed_per_min: parseFloatSafe(stats['slpm'] ?? ''),
    strike_accuracy: parseFloatSafe(stats['str. acc.'] ?? ''),
    takedown_avg: parseFloatSafe(stats['td avg.'] ?? ''),
    takedown_accuracy: parseFloatSafe(stats['td acc.'] ?? ''),
    submission_avg: parseFloatSafe(stats['sub. avg.'] ?? ''),
  };
}

export interface ScrapedFighter {
  name: string;
  nickname: string | null;
  record: string | null;
  age: number | null;
  height: string | null;
  reach: string | null;
  stance: string | null;
  image_url: string | null;
  strikes_landed_per_min: number | null;
  strike_accuracy: number | null;
  takedown_avg: number | null;
  takedown_accuracy: number | null;
  submission_avg: number | null;
}

export async function scrapeFighter(name: string): Promise<ScrapedFighter | null> {
  try {
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    const fighterUrl = await searchFighterUrl(firstName, lastName);
    if (!fighterUrl) return null;
    const data = await scrapeFighterPage(fighterUrl);
    return { name, image_url: null, ...data };
  } catch {
    return null;
  }
}
