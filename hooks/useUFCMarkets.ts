import { useEffect, useState } from 'react';
import { fetchUFCMarkets, PolyMarket } from '@/utils/polymarket';

export type FightCard = {
  id: string;
  date: string;
  prize: string;
  time: string;
  eventName: string;
  weightClass: string;
  cardPosition: string;
  fighter1: { name: string; odds: string; multiplier: string; image: string };
  e;
  fighter2: { name: string; odds: string; multiplier: string; image: string };
  polyTokenIds: { fighter1: string; fighter2: string };
};

function formatVolume(vol: number): string {
  if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
  if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}k`;
  return `$${vol.toFixed(0)}`;
}

function formatEndDate(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  const date = d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return { date, time };
}

function parseQuestion(question: string) {
  const colonIdx = question.indexOf(':');
  const eventName = colonIdx >= 0 ? question.slice(0, colonIdx).trim() : 'UFC';

  const parenMatch = question.match(/\(([^)]+)\)\s*$/);
  let weightClass = '';
  let cardPosition = '';
  if (parenMatch) {
    const parts = parenMatch[1].split(',').map((s) => s.trim());
    weightClass = parts[0] ?? '';
    cardPosition = parts[1] ?? '';
  }

  return { eventName, weightClass, cardPosition };
}

function avatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=191C1F&color=f5f5f5&bold=true`;
}

async function fetchWikipediaPhotos(names: string[]): Promise<Record<string, string>> {
  if (names.length === 0) return {};

  const titles = names.map((n) => n.replace(/\s+/g, '_')).join('|');
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages&format=json&pithumbsize=400&origin=*`;

  try {
    const res = await fetch(url);
    if (!res.ok) return {};
    const data = await res.json();
    const pages: any[] = Object.values(data.query?.pages ?? {});

    const photoMap: Record<string, string> = {};
    for (const page of pages) {
      if (page.thumbnail?.source && page.title) {
        photoMap[page.title.replace(/_/g, ' ')] = page.thumbnail.source;
      }
    }
    return photoMap;
  } catch {
    return {};
  }
}

function marketToFight(market: PolyMarket): FightCard | null {
  if (market.tokens.length < 2) return null;
  const [t1, t2] = market.tokens;
  if (!t1.token_id || !t2.token_id) return null;

  const { date, time } = market.endDate ? formatEndDate(market.endDate) : { date: 'TBD', time: '' };

  const { eventName, weightClass, cardPosition } = parseQuestion(market.question);

  const pct1 = Math.round((t1.price ?? 0.5) * 100);
  const pct2 = 100 - pct1;
  const mult1 = t1.price > 0 ? (1 / t1.price).toFixed(2) + 'x' : '—';
  const mult2 = t2.price > 0 ? (1 / t2.price).toFixed(2) + 'x' : '—';

  return {
    id: market.id,
    date,
    time,
    prize: formatVolume(market.volume ?? 0),
    eventName,
    weightClass,
    cardPosition,
    fighter1: {
      name: t1.outcome,
      odds: `${pct1}%`,
      multiplier: mult1,
      image: avatarUrl(t1.outcome),
    },
    fighter2: {
      name: t2.outcome,
      odds: `${pct2}%`,
      multiplier: mult2,
      image: avatarUrl(t2.outcome),
    },
    polyTokenIds: {
      fighter1: t1.token_id,
      fighter2: t2.token_id,
    },
  };
}

export function useUFCMarkets() {
  const [fights, setFights] = useState<FightCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const markets = await fetchUFCMarkets();
        const preliminary = markets.map(marketToFight).filter((f): f is FightCard => f !== null);

        setFights(preliminary);
        setLoading(false);

        // Fetch real photos in background, update when ready
        const allNames = [
          ...new Set(preliminary.flatMap((f) => [f.fighter1.name, f.fighter2.name])),
        ];
        const photos = await fetchWikipediaPhotos(allNames);

        if (Object.keys(photos).length === 0) return;

        setFights((prev) =>
          prev.map((fight) => ({
            ...fight,
            fighter1: {
              ...fight.fighter1,
              image: photos[fight.fighter1.name] ?? fight.fighter1.image,
            },
            fighter2: {
              ...fight.fighter2,
              image: photos[fight.fighter2.name] ?? fight.fighter2.image,
            },
          })),
        );
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }

    load();
  }, []);

  return { fights, loading, error };
}
