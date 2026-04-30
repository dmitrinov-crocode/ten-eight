import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
};

// ─── Parsing helpers ──────────────────────────────────────────────────────────

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function parseFloat_(s: string): number | null {
  const n = parseFloat(s.replace('%', '').trim());
  return isNaN(n) ? null : n;
}

function parseAge(dob: string): number | null {
  if (!dob || dob === '--') return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

// ─── UFC Stats scraping ───────────────────────────────────────────────────────

async function searchFighter(firstName: string, lastName: string): Promise<string | null> {
  const url = `http://ufcstats.com/statistics/fighters?action=search&SearchFirstName=${encodeURIComponent(firstName)}&SearchLastName=${encodeURIComponent(lastName)}&search=Search`;

  const res = await fetch(url, { headers: HEADERS });
  const html = await res.text();

  const rowRe = /<tr[^>]*class="[^"]*b-statistics__table-row[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
  let match;
  const fullName = `${firstName} ${lastName}`.toLowerCase();

  while ((match = rowRe.exec(html)) !== null) {
    const row = match[1];
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    if (cells.length < 2) continue;

    const first = stripTags(cells[0]).toLowerCase();
    const last = stripTags(cells[1]).toLowerCase();
    const rowName = `${first} ${last}`;

    if (rowName === fullName || first === firstName.toLowerCase()) {
      const hrefMatch = cells[0].match(/href="([^"]+fighter-details[^"]+)"/);
      if (hrefMatch) return hrefMatch[1];
    }
  }

  const firstHref = html.match(/href="(http:\/\/ufcstats\.com\/fighter-details\/[^"]+)"/);
  return firstHref ? firstHref[1] : null;
}

async function scrapeFighterPage(url: string) {
  const res = await fetch(url, { headers: HEADERS });
  const html = await res.text();

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
    strikes_landed_per_min: parseFloat_(stats['slpm'] ?? ''),
    strike_accuracy: parseFloat_(stats['str. acc.'] ?? ''),
    takedown_avg: parseFloat_(stats['td avg.'] ?? ''),
    takedown_accuracy: parseFloat_(stats['td acc.'] ?? ''),
    submission_avg: parseFloat_(stats['sub. avg.'] ?? ''),
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  try {
    const { name } = await req.json();
    if (!name) {
      return new Response(JSON.stringify({ error: 'name required' }), {
        status: 400,
        headers: CORS,
      });
    }

    const parts = name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');

    const fighterUrl = await searchFighter(firstName, lastName);
    if (!fighterUrl) {
      return new Response(JSON.stringify({ error: 'Fighter not found on UFC Stats' }), {
        status: 404,
        headers: CORS,
      });
    }

    const data = await scrapeFighterPage(fighterUrl);

    // Best-effort cache in Supabase (skip if service key not configured)
    if (SUPABASE_SERVICE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
        await supabase
          .from('fighters')
          .upsert({ name, ...data }, { onConflict: 'name' });
      } catch {
        // Non-fatal — continue and return data anyway
      }
    }

    return new Response(JSON.stringify({ success: true, data: { name, ...data } }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: CORS,
    });
  }
});
