import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';
import GoldIcon from '@/assets/icons/gold.svg';
import SilverIcon from '@/assets/icons/silver.svg';
import BronzeIcon from '@/assets/icons/bronze.svg';
import UserIcon from '@/assets/icons/user2.svg';

type Player = {
  rank: number;
  name: string;
  pts: number;
  isCurrentUser?: boolean;
  avatarBg: string;
};

const PLAYERS: Player[] = [
  { rank: 1, name: 'User 21', pts: 123, avatarBg: 'rgba(195,67,99,0.3)' },
  { rank: 2, name: 'You', pts: 67, isCurrentUser: true, avatarBg: 'rgba(47,194,170,0.2)' },
  { rank: 3, name: 'MMA_Fan2000 John', pts: 43, avatarBg: 'rgba(7,244,153,0.25)' },
  { rank: 4, name: 'User123', pts: 0, avatarBg: 'rgba(47,194,170,0.2)' },
];

function TrophyIcon({ rank }: { rank: number }) {
  if (rank === 1) return <GoldIcon width={24} height={24} />;
  if (rank === 2) return <SilverIcon width={24} height={24} />;
  if (rank === 3) return <BronzeIcon width={24} height={24} />;
  return (
    <Text style={styles.rankNumber}>{rank}</Text>
  );
}

function PlayerRow({ player }: { player: Player }) {
  const rowBg = player.isCurrentUser ? colors.black30 : colors.white3;
  return (
    <View style={[styles.row, { backgroundColor: rowBg }]}>
      <View style={styles.rankCell}>
        <TrophyIcon rank={player.rank} />
      </View>
      <View style={styles.playerCell}>
        <View style={[styles.avatar, { backgroundColor: player.avatarBg }]}>
          <UserIcon width={36} height={36} color={colors.white60} />
        </View>
        <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>
      </View>
      <View style={styles.ptsCell}>
        <Text style={styles.ptsText}>{player.pts}</Text>
      </View>
    </View>
  );
}

export default function LeaderboardSection() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.colLabel, styles.rankCol]}>#</Text>
        <Text style={[styles.colLabel, styles.playerCol]}>Player</Text>
        <Text style={[styles.colLabel, styles.ptsCol]}>PTS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.list}>
        {PLAYERS.map((p) => (
          <PlayerRow key={p.rank} player={p} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    padding: spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    paddingBottom: spacing.xxs,
    paddingTop: spacing.xxs,
  },
  colLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  rankCol: {
    width: 32,
    textAlign: 'center',
  },
  playerCol: {
    flex: 1,
    paddingLeft: spacing.sm,
  },
  ptsCol: {
    width: 32,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
    marginVertical: spacing.base,
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xs,
  },
  rankCell: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  rankNumber: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white85,
    textAlign: 'center',
  },
  playerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  playerName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
    flexShrink: 1,
  },
  ptsCell: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  ptsText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
    textAlign: 'center',
  },
});
