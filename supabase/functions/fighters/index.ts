import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml',
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── Scraping helpers ─────────────────────────────────────────────────────────

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
  const res = await fetch(url, { headers: FETCH_HEADERS });
  const html = await res.text();

  const fullName = `${firstName} ${lastName}`.toLowerCase();
  const rowRe = /<tr[^>]*class="[^"]*b-statistics__table-row[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
  let match;

  while ((match = rowRe.exec(html)) !== null) {
    const cells = [...match[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    if (cells.length < 2) continue;
    const first = stripTags(cells[0]).toLowerCase();
    const last = stripTags(cells[1]).toLowerCase();
    if (`${first} ${last}` === fullName || first === firstName.toLowerCase()) {
      const hrefMatch = cells[0].match(/href="([^"]+fighter-details[^"]+)"/);
      if (hrefMatch) return hrefMatch[1];
    }
  }

  // Fallback: first result if only one found
  const firstHref = html.match(/href="(http:\/\/ufcstats\.com\/fighter-details\/[^"]+)"/);
  return firstHref ? firstHref[1] : null;
}

async function scrapeFighterPage(url: string) {
  const res = await fetch(url, { headers: FETCH_HEADERS });
  const html = await res.text();

  const recordMatch = html.match(/(\d+-\d+-\d+)/);
  const nicknameMatch = html.match(/class="b-content__Nickname"[^>]*>\s*"([^"]+)"/);

  const stats: Record<string, string> = {};
  const itemRe = /b-list__box-item-title[^>]*>([\s\S]*?)<\/i>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = itemRe.exec(html)) !== null) {
    const key = stripTags(m[1]).replace(':', '').trim().toLowerCase();
    const val = stripTags(m[2]).trim();
    if (key && val && val !== '--') stats[key] = val;
  }

  return {
    record: recordMatch ? recordMatch[1] : null,
    nickname: nicknameMatch ? nicknameMatch[1] : null,
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

async function scrapeAndSave(
  name: string,
  // deno-lint-ignore no-explicit-any
  supabase: any,
  // deno-lint-ignore no-explicit-any
): Promise<Record<string, any> | null> {
  const parts = name.trim().split(/\s+/);
  const fighterUrl = await searchFighterUrl(parts[0], parts.slice(1).join(' '));
  if (!fighterUrl) return null;

  const data = await scrapeFighterPage(fighterUrl);
  const fighter = { name, ...data };

  await supabase.from('fighters').upsert(fighter, { onConflict: 'name' });
  return fighter;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    // GET — return all fighters from DB
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('fighters').select('*').limit(500);
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    // POST { names: string[] } — fetch from DB, scrape if missing, return data
    if (req.method === 'POST') {
      const body = await req.json();
      const names: string[] = Array.isArray(body.names)
        ? body.names
        : body.name
        ? [body.name]
        : [];

      if (names.length === 0) {
        return new Response(JSON.stringify({ error: 'names required' }), {
          status: 400,
          headers: CORS,
        });
      }

      // 1. Check DB first
      const { data: existing } = await supabase
        .from('fighters')
        .select('*')
        .in('name', names);

      const result: Record<string, unknown> = {};
      for (const f of existing ?? []) {
        result[f.name] = f;
      }

      // 2. Scrape missing fighters one by one
      for (const name of names) {
        if (result[name]) continue;
        try {
          const fighter = await scrapeAndSave(name, supabase);
          if (fighter) result[name] = fighter;
        } catch (e) {
          console.error('Failed to sync fighter:', name, String(e));
        }
      }

      // 3. Return in requested order
      const fighters = names.map((n) => result[n]).filter(Boolean);
      return new Response(JSON.stringify(fighters), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: CORS,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: CORS,
    });
  }
});
