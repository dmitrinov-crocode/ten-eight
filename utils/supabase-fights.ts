import { supabase } from './supabase';

export interface FighterRow {
  name: string;
  nickname: string | null;
  record: string | null;
  age: number | null;
  height: string | null;
  reach: string | null;
  stance: string | null;
  image_url: string | null;
  weight: string | null;
  strikes_landed_per_min: number | null;
  strike_accuracy: number | null;
  takedown_avg: number | null;
  takedown_accuracy: number | null;
  submission_avg: number | null;
}

export interface FightRow {
  id: string;
  rounds: number;
  fighter1_name: string | null;
  fighter2_name: string | null;
}

export async function fetchFightersByNames(names: string[]): Promise<Record<string, FighterRow>> {
  if (names.length === 0) return {};

  const { data, error } = await supabase
    .from('fighters')
    .select(
      'name,nickname,record,age,height,reach,stance,image_url,weight,strikes_landed_per_min,strike_accuracy,takedown_avg,takedown_accuracy,submission_avg',
    )
    .in('name', names);

  if (error || !data) return {};
  return Object.fromEntries(data.map((f: FighterRow) => [f.name, f]));
}

export async function fetchFightById(id: string): Promise<FightRow | null> {
  const { data, error } = await supabase.from('fights').select('*').eq('id', id).single();

  if (error || !data) return null;
  return data as FightRow;
}

export async function upsertFight(fight: FightRow): Promise<void> {
  await supabase.from('fights').upsert(fight, { onConflict: 'id' });
}
