import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { GradientText } from '@/components/common';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

const GREEN40_GRADIENT: [string, string] = [colors.green40Start, colors.green40End];

interface BlackButtonProps {
  label: string;
  Icon?: React.FC<SvgProps>;
  gap?: number;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
}

export function BlackButton({
  label,
  Icon,
  gap = spacing.xs,
  onPress,
  disabled = false,
  activeOpacity = 0.85,
  style,
}: BlackButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      <LinearGradient
        colors={GREEN40_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.border}
      >
        <View style={[styles.inner, Icon ? { gap } : null]}>
          {Icon && (
            <View style={styles.iconWrapper}>
              <Icon width={24} height={24} />
            </View>
          )}
          <GradientText style={styles.text} colors={GREEN40_GRADIENT}>
            {label}
          </GradientText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  border: {
    borderRadius: borderRadius.pill,
    padding: 1,
  },
  inner: {
    backgroundColor: colors.blackSolid,
    borderRadius: borderRadius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xxs,
    height: 42,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
});
