import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

export default function ProfileStats() {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.label}>WIN STREAK</Text>
        <Text style={styles.value}>8</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.label}>ACCURACY</Text>
        <Text style={styles.value}>80%</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.label}>AVG. POINTS</Text>
        <View style={styles.avgRow}>
          <Text style={styles.value}>4</Text>
          <Text style={styles.avgUnit}>/per fight</Text>
        </View>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  value: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  avgUnit: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.white30,
    paddingBottom: 1,
  },
});
