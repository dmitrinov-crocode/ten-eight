import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

const GREEN_GRADIENT: [string, string] = [colors.greenStart, colors.greenEnd];

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: object;
  textStyle?: object;
  gradientColors?: [string, string];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

export function PrimaryButton({ 
  label, 
  onPress, 
  disabled = false,
  activeOpacity = 0.85,
  style,
  textStyle,
  gradientColors = GREEN_GRADIENT,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 }
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={activeOpacity} 
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonWrapper, styles.primaryShadow, style]}
    >
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        style={styles.primaryButton}
      >
        <Text style={[styles.primaryText, textStyle]}>
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: borderRadius.pill,
  },
  primaryButton: {
    borderRadius: borderRadius.pill,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryShadow: {
    shadowColor: colors.greenGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.black85,
  },
});