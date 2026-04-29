import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackIcon from '@/assets/icons/back.svg';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

type TProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

export default function SettingCard({ icon, label, onPress }: TProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <View style={styles.iconWrapper}>{icon}</View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.arrowInner}>
        <BackIcon color={colors.white85} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrapper: {
    padding: spacing.xs,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  arrowInner: {
    transform: [{ rotate: '180deg' }],
    width: 32,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
