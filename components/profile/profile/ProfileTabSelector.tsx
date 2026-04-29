import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

export type ProfileTab = 'active' | 'bets' | 'fantasy';

type Props = {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'bets', label: 'Bets History' },
  { id: 'fantasy', label: 'Fantasy' },
];

function GradientTabLabel({ label }: { label: string }) {
  return (
    <View style={styles.gradientTextContainer}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <View style={styles.gradientMaskWrapper}>
            <Text style={styles.activeTabText}>{label}</Text>
          </View>
        }
      >
        <LinearGradient
          colors={[colors.greenStart, colors.greenEnd]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </MaskedView>
      <Text style={[styles.activeTabText, { opacity: 0 }]}>{label}</Text>
    </View>
  );
}

export default function ProfileTabSelector({ activeTab, onTabChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            {isActive ? (
              <GradientTabLabel label={tab.label} />
            ) : (
              <Text style={styles.inactiveTabText}>{tab.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.black35,
    borderWidth: 1,
    borderColor: colors.white3,
    borderRadius: borderRadius.toggle,
    padding: spacing.sm,
    gap: 2,
    width: '100%',
  },
  tab: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  activeTab: {
    borderWidth: 1,
    borderColor: colors.green40Start,
    borderRadius: borderRadius.toggle,
    paddingHorizontal: spacing.xxs,
  },
  gradientTextContainer: {
    position: 'relative',
  },
  gradientMaskWrapper: {
    backgroundColor: 'transparent',
  },
  activeTabText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  inactiveTabText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
});
