import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import FlameIcon from '@/assets/icons/flame.svg';
import FistIcon from '@/assets/icons/fist-outline2.svg';

export type FightCardFighter = {
  name: string;
  winPct: string;
  odds: string;
  imageUri?: string
};

export type FightCardData = {
  date: string;
  prize: string;
  time: string;
  fighter1: FightCardFighter;
  fighter2: FightCardFighter;
};

type Props = {
  data: FightCardData;
  borderColor?: string;
  onMoreDetails?: () => void;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export default function FightCard({ data, borderColor = colors.selectedFighterBorder, onMoreDetails }: Props) {
  const { date, prize, time, fighter1, fighter2 } = data;

  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={styles.content}>
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.initialsRow}>
            <Text style={[styles.initials, { color: 'rgba(63,240,211,0.07)' }]}>
              {getInitials(fighter1.name)}
            </Text>
            <Text style={[styles.initials, { color: 'rgba(146,0,231,0.07)' }]}>
              {getInitials(fighter2.name)}
            </Text>
          </View>
        </View>
        <View style={styles.topRow}>
          <Text style={styles.dateText}>{date}</Text>
          <View style={styles.prizeRow}>
            <FlameIcon width={28} height={28} color={colors.white50} />
            <Text style={styles.prizeText}>{prize}</Text>
          </View>
        </View>
        <View style={styles.fightersRow}>
          <View style={styles.leftBlock}>
            <View style={[styles.avatar, styles.blueAvatar]}>
              {fighter1.imageUri ? (
                <Image source={{ uri: fighter1.imageUri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
              ) : null}
              <LinearGradient
                colors={gradients.cardSelected.colors}
                locations={[...gradients.cardSelected.locations]}
                start={gradients.cardSelected.start}
                end={gradients.cardSelected.end}
                style={StyleSheet.absoluteFill}
              />
            </View>
            <View style={styles.leftFighterInfo}>
              <Text style={styles.fighterName} numberOfLines={2}>{fighter1.name}</Text>
              <View style={styles.statsRow}>
                <Text style={[styles.statText, { color: colors.teal }]}>{fighter1.winPct}</Text>
                <Text style={styles.bullet}>⬤</Text>
                <Text style={[styles.statText, { color: colors.teal }]}>{fighter1.odds}</Text>
              </View>
            </View>
          </View>
          <View style={styles.vsBlock}>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.fistWrap}>
              <FistIcon width={16} height={13} color={colors.white60} />
            </View>
          </View>
          <View style={styles.rightBlock}>
            <View style={styles.rightFighterInfo}>
              <Text style={[styles.fighterName, styles.textRight]} numberOfLines={2}>{fighter2.name}</Text>
              <View style={[styles.statsRow, styles.statsRowRight]}>
                <Text style={[styles.statText, { color: colors.red }]}>{fighter2.winPct}</Text>
                <Text style={styles.bullet}>⬤</Text>
                <Text style={[styles.statText, { color: colors.red }]}>{fighter2.odds}</Text>
              </View>
            </View>
            <View style={[styles.avatar, styles.redAvatar]}>
              {fighter2.imageUri ? (
                <Image source={{ uri: fighter2.imageUri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
              ) : null}
              <LinearGradient
                colors={gradients.fighterRed.colors}
                locations={[...gradients.fighterRed.locations]}
                start={gradients.fighterRed.start}
                end={gradients.fighterRed.end}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </View>
        </View>
      </View>
      <Pressable style={styles.footer} onPress={onMoreDetails}>
        <Text style={styles.footerText}>More Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black45,
    borderWidth: 1,
    borderRadius: borderRadius.card,
    overflow: 'hidden',
    width: '100%',
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: 20,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  initialsRow: {
    position: 'absolute',
    top: 39,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  initials: {
    fontFamily: fonts.bold,
    fontSize: 96,
    letterSpacing: -9.6,
    includeFontPadding: false,
    lineHeight: 96,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.nano,
  },
  dateText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  prizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //gap: spacing.nano,
  },
  prizeText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  fightersRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: spacing.nano,
  },
  leftBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  rightBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xxs,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.xs,
    overflow: 'hidden',
    flexShrink: 0,
  },
  blueAvatar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.teal,
    backgroundColor: colors.darkBlueBg,
  },
  redAvatar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
    backgroundColor: colors.darkRedBg,
  },
  leftFighterInfo: {
    flex: 1,
    gap: spacing.nano,
  },
  rightFighterInfo: {
    flex: 1,
    gap: spacing.nano,
    alignItems: 'flex-end',
  },
  fighterName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  textRight: {
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  statsRowRight: {
    justifyContent: 'flex-end',
  },
  statText: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  bullet: {
    fontFamily: fonts.regular,
    fontSize: 2,
    color: colors.white50,
  },
  vsBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
    gap: spacing['sm+'],
    paddingHorizontal: spacing.xs,
    flexShrink: 0,
  },
  timeText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  fistWrap: {
    padding: spacing.xs,
  },
  footer: {
    backgroundColor: colors.black30,
    borderTopWidth: 1,
    borderTopColor: colors.white7,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.white60,
  },
});
