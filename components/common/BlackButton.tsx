import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { GradientText } from '@/components/common';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

const GREEN40_GRADIENT: [string, string] = [colors.green40Start, colors.green40End];

interface BlackButtonProps {
  Icon: React.FC<SvgProps>;
  label: string;
  gap?: number;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: object;
  textStyle?: object;
}

export function BlackButton({ 
  Icon, 
  label, 
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
        style={styles.socialBorder}
      >
        <View style={[styles.socialInner, { gap }]}>
          <View style={styles.socialIconWrapper}>
            <Icon width={24} height={24} />
          </View>
          <GradientText 
            style={styles.socialText} 
            colors={GREEN40_GRADIENT}
          >
            {label}
          </GradientText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialBorder: {
    borderRadius: borderRadius.pill,
    padding: 1,
  },
  socialInner: {
    backgroundColor: colors.blackSolid,
    borderRadius: borderRadius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing.md,
    paddingRight: spacing.base,
    paddingVertical: spacing.xxs,
  },
  socialIconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
});