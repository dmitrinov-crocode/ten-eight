import { useEffect, useState } from 'react';
import { fetchFightById, FighterRow, FightRow } from '@/utils/supabase-fights';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const FUNCTIONS_JWT = process.env.EXPO_PUBLIC_SUPABASE_FUNCTIONS_JWT!;

interface UseFightDetailsResult {
  fighter1Stats: FighterRow | null;
  fighter2Stats: FighterRow | null;
  fightInfo: FightRow | null;
  loading: boolean;
  syncing: boolean;
}

async function fetchFighters(names: string[]): Promise<Record<string, FighterRow>> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/fighters`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FUNCTIONS_JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ names }),
    });
    console.log({ res });
    if (!res.ok) return {};

    const list = (await res.json()) as FighterRow[];
    if (!Array.isArray(list)) return {};

    return Object.fromEntries(list.map((f) => [f.name, f]));
  } catch {
    return {};
  }
}

export function useFightDetails(
  fightId: string,
  fighter1Name: string,
  fighter2Name: string,
): UseFightDetailsResult {
  const [fighter1Stats, setFighter1Stats] = useState<FighterRow | null>(null);
  const [fighter2Stats, setFighter2Stats] = useState<FighterRow | null>(null);
  const [fightInfo, setFightInfo] = useState<FightRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!fighter1Name || !fighter2Name) return;

    async function load() {
      setLoading(true);
      setSyncing(true);

      const [fighters, fight] = await Promise.all([
        fetchFighters([fighter1Name, fighter2Name]),
        fetchFightById(fightId),
      ]);
      console.log({ fight });
      setFightInfo(fight);
      setFighter1Stats(fighters[fighter1Name] ?? null);
      setFighter2Stats(fighters[fighter2Name] ?? null);
      setLoading(false);
      setSyncing(false);
    }

    load();
  }, [fightId, fighter1Name, fighter2Name]);

  return { fighter1Stats, fighter2Stats, fightInfo, loading, syncing };
}
