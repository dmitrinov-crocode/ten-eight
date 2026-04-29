import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserIcon from '@/assets/icons/user2.svg';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

type Props = {
  name: string;
};

export default function FollowerItem({ name }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <UserIcon width={36} height={36} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.base,
    backgroundColor: colors.white3,
    borderRadius: borderRadius.xs,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.toggle,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
});
