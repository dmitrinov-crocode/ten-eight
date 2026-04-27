import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import League from '@/assets/icons/league.svg';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

type FighterData = {
  name: string;
  winRate: string;
  odds: string;
  Icon: React.ComponentType<{ width: number; height: number }>;
};

type FightCardData = {
  event: string;
  date: string;
  time: string;
  rounds: string;
  leftFighter: FighterData;
  rightFighter: FighterData;
  stake: string;
  ratio: string;
  resultLabel: string;
  win: string;
};

const FIGHT_CARDS: FightCardData[] = [
  {
    event: 'UFC Event1',
    date: 'Sat 4/12, 13:00',
    time: '3:04',
    rounds: '5 Rounds',
    leftFighter: { name: 'Nariman A.', winRate: 'Win 50%', odds: '1.89x', Icon: League },
    rightFighter: { name: 'Tank A.', winRate: 'Win 50%', odds: '1.89x', Icon: League },
    stake: '$5.00',
    ratio: '2:3',
    resultLabel: 'LOSS',
    win: '$0.00',
  },
  {
    event: 'UFC Event1',
    date: 'Sat 4/12, 13:00',
    time: '3:04',
    rounds: '5 Rounds',
    leftFighter: { name: 'Nariman A.', winRate: 'Win 50%', odds: '1.89x', Icon: League },
    rightFighter: { name: 'Tank A.', winRate: 'Win 50%', odds: '1.89x', Icon: League },
    stake: '$5.00',
    ratio: '2:3',
    resultLabel: 'LOSS',
    win: '$0.00',
  },
];

function VsWatermark() {
  return (
    <View style={styles.vsContainer} pointerEvents="none">
      <View style={styles.vsTextWrapper}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={styles.vsText}>ABC</Text>
            </View>
          }
        >
          <LinearGradient
            colors={[
              'rgba(0,189,231,0)',
              'rgba(63,240,211,0.07)',
              'rgba(182,254,13,0.25)',
            ]}
            locations={[0.144, 0.649, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </MaskedView>
        <Text style={[styles.vsText, { opacity: 0 }]}>ABC</Text>
      </View>
      <View style={styles.vsTextWrapper}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={styles.vsText}>DFC</Text>
            </View>
          }
        >
          <LinearGradient
            colors={[
              'rgba(231,8,0,0)',
              'rgba(231,0,4,0.08)',
              'rgba(146,0,231,0.17)',
            ]}
            locations={[0.1875, 0.524, 0.8798]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </MaskedView>
        <Text style={[styles.vsText, { opacity: 0 }]}>DFC</Text>
      </View>
    </View>
  );
}

function FightCard({ card }: { card: FightCardData }) {
  const LeftIcon = card.leftFighter.Icon;
  const RightIcon = card.rightFighter.Icon;

  return (
    <View style={styles.fightCard}>
      <VsWatermark />
      <View style={styles.fightCardContent}>
        <View style={styles.fightHeader}>
          <View style={styles.fightHeaderLeft}>
            <Text style={styles.eventName}>{card.event}</Text>
            <Text style={styles.eventMeta}>{card.date}</Text>
          </View>
          <View style={styles.fightHeaderRight}>
            <Text style={styles.eventName}>{card.time}</Text>
            <Text style={styles.eventMeta}>{card.rounds}</Text>
          </View>
        </View>
        <View style={styles.participantsRow}>
          <View style={styles.selectedCard}>
            <View style={styles.fighterImageTeal}>
              <LinearGradient
                colors={[
                  'rgba(0,189,231,0)',
                  'rgba(63,240,211,0.07)',
                  'rgba(182,254,13,0.25)',
                ]}
                locations={[0.144, 0.649, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <LeftIcon width={42} height={42} />
            </View>
            <View style={styles.fighterInfo}>
              <Text style={styles.fighterName}>{card.leftFighter.name}</Text>
              <Text style={[styles.fighterStat, { color: colors.teal }]}>{card.leftFighter.winRate}</Text>
              <Text style={[styles.fighterOdds, { color: colors.teal }]}>{card.leftFighter.odds}</Text>
            </View>
          </View>
          <View style={styles.unselectedCard}>
            <View style={styles.fighterInfoRight}>
              <Text style={[styles.fighterName, { textAlign: 'right' }]}>{card.rightFighter.name}</Text>
              <Text style={[styles.fighterStat, { color: colors.red, textAlign: 'right' }]}>{card.rightFighter.winRate}</Text>
              <Text style={[styles.fighterOdds, { color: colors.red, textAlign: 'right' }]}>{card.rightFighter.odds}</Text>
            </View>
            <View style={styles.fighterImageRed}>
              <LinearGradient
                colors={[
                  'rgba(231,8,0,0)',
                  'rgba(231,0,139,0.08)',
                  'rgba(146,0,231,0.17)',
                ]}
                locations={[0.1875, 0.524, 0.8798]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <RightIcon width={42} height={42} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.bottomRow}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomLabel}>STAKE</Text>
          <Text style={styles.bottomValue}>{card.stake}</Text>
        </View>
        <View style={[styles.bottomItem, { alignItems: 'center' }]}>
          <Text style={styles.bottomLabel}>{card.ratio}</Text>
          <Text style={styles.bottomValue}>{card.resultLabel}</Text>
        </View>
        <View style={[styles.bottomItem, { alignItems: 'flex-end' }]}>
          <Text style={styles.bottomLabel}>WIN</Text>
          <Text style={styles.bottomValue}>{card.win}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ProfileBetsHistorySection() {
  return (
    <View style={styles.container}>
      {FIGHT_CARDS.map((card, index) => (
        <FightCard key={index} card={card} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    width: '100%',
  },
  fightCard: {
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    padding: spacing.base,
    overflow: 'hidden',
    gap: spacing.md,
    position: 'relative',
  },
  fightCardContent: {
    gap: spacing.md,
    zIndex: 1,
  },
  vsContainer: {
    position: 'absolute',
    top: 77,
    left: 0,
    right: 0,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 0,
  },
  vsTextWrapper: {
    position: 'relative',
    height: 72,
  },
  vsText: {
    fontFamily: fonts.bold,
    fontSize: 96,
    fontStyle: 'italic',
    letterSpacing: -23,
    lineHeight: 72,
    color: 'white',
  },
  fightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  fightHeaderLeft: {
    gap: 2,
  },
  fightHeaderRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  eventName: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white85,
  },
  eventMeta: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  selectedCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.selectedFighterBorder,
    borderRadius: borderRadius.card,
    padding: spacing.sm,
  },
  unselectedCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fighterImageTeal: {
    width: 42,
    height: 42,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.teal,
    backgroundColor: colors.darkBlueBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fighterImageRed: {
    width: 42,
    height: 42,
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
    backgroundColor: colors.darkRedBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fighterInfo: {
    gap: 2,
    flexShrink: 1,
  },
  fighterInfoRight: {
    flex: 1,
    gap: 2,
    alignItems: 'flex-end',
    minWidth: 0,
  },
  fighterName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.white85,
  },
  fighterStat: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
  },
  fighterOdds: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    opacity: 0.75,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
    width: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    width: '100%',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bottomLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  bottomValue: {
    fontFamily: fonts.medium,
    fontSize: fontSize.lg,
    color: colors.white85,
  },
});
