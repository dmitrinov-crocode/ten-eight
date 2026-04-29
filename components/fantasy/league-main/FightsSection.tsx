import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';
import BackIcon from '@/assets/icons/back.svg';
import FightCard, { FightCardData } from './FightCard';

const MAIN_CARD_FIGHTS: FightCardData[] = [
  {
    date: 'Sat, 4/12',
    prize: '$23.5k',
    time: '13:00',
    fighter1: { name: 'Nariman Abbassov', winPct: '50%', odds: '1.89x', imageUri: 'https://i.pravatar.cc/46?img=11' },
    fighter2: { name: 'Tank Abbott', winPct: '50%', odds: '1.89x', imageUri: 'https://i.pravatar.cc/46?img=12' },
  },
  {
    date: 'Sat, 4/12',
    prize: '$23.5k',
    time: '13:00',
    fighter1: { name: 'Hamdy Abdelwah', winPct: '50%', odds: '1.89x', imageUri: 'https://i.pravatar.cc/46?img=13' },
    fighter2: { name: 'Klidson Abreu', winPct: '50%', odds: '1.89x', imageUri: 'https://i.pravatar.cc/46?img=14' },
  },
  {
    date: 'Sat, 4/12',
    prize: '$23.5k',
    time: '13:00',
    fighter1: { name: 'Papy Abedi', winPct: '50%', odds: '1.89x', imageUri: 'https://i.pravatar.cc/46?img=15' },
    fighter2: { name: 'John Adajar', winPct: '50%', odds: '1.89x', imageUri: 'https://i.pravatar.cc/46?img=16' },
  },
];

type SectionKey = 'main' | 'prelims' | 'early';

export default function FightsSection() {
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
    main: true,
    prelims: false,
    early: false,
  });

  const toggle = (key: SectionKey) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Upcoming fights</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.section}>
            <Pressable style={styles.sectionHeader} onPress={() => toggle('main')}>
              <Text style={styles.sectionLabel}>Main Card</Text>
              <View style={{ transform: [{ rotate: expanded.main ? '90deg' : '-90deg' }] }}>
                <BackIcon color={colors.white60} />
              </View>
            </Pressable>
            {expanded.main && (
              <View style={styles.fightList}>
                {MAIN_CARD_FIGHTS.map((fight, i) => (
                  <FightCard key={i} data={fight} borderColor={colors.white20} />
                ))}
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Pressable style={styles.sectionHeader} onPress={() => toggle('prelims')}>
              <Text style={styles.sectionLabel}>Prelims</Text>
              <View style={{ transform: [{ rotate: expanded.prelims ? '90deg' : '-90deg' }] }}>
                <BackIcon color={colors.white60} />
              </View>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Pressable style={styles.sectionHeader} onPress={() => toggle('early')}>
              <Text style={styles.sectionLabel}>Early Prelims</Text>
              <View style={{ transform: [{ rotate: expanded.early ? '90deg' : '-90deg' }] }}>
                <BackIcon color={colors.white60} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.base,
  },
  heading: {
    paddingHorizontal: spacing.xxs,
    justifyContent: 'center',
  },
  headingText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  card: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingVertical: spacing.sm,
  },
  cardInner: {
    paddingBottom: spacing.sm,
  },
  section: {
    paddingHorizontal: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  sectionLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  fightList: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
    marginHorizontal: spacing.base,
  },
});
