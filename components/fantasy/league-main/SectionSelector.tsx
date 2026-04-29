import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

export type LeagueTab = 'Home' | 'Leaderboard' | 'Fights';
const TABS: LeagueTab[] = ['Home', 'Leaderboard', 'Fights'];

type Props = {
  activeTab: LeagueTab;
  onTabPress: (tab: LeagueTab) => void;
};

export default function SectionSelector({ activeTab, onTabPress }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <Pressable
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black35,
    borderWidth: 1,
    borderColor: colors.white3,
    borderRadius: borderRadius.pill,
    padding: spacing.sm,
    flexDirection: 'row',
    gap: spacing.nano,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.xxs,
    borderRadius: borderRadius.pill,
  },
  activeTab: {
    borderWidth: 1,
    borderColor: colors.green40Start,
  },
  tabText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  activeTabText: {
    color: colors.greenStart,
  },
});
