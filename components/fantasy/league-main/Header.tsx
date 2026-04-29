import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BackIcon from '@/assets/icons/back.svg';
import EditContainedIcon from '@/assets/icons/edit-contained.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

type TProps = {
  title: string;
  paddingTop?: number;
  onBackPress?: () => void;
  onEditPress?: () => void;
  onSettingsPress?: () => void;
  onSearchPress?: () => void;
};

export default function Header({ title, paddingTop = 0, onBackPress, onEditPress, onSettingsPress }: TProps) {
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.left}>
        <Pressable style={styles.iconBtn} onPress={onBackPress}>
          <BackIcon />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.right}>
        <Pressable style={styles.iconBtn} onPress={onEditPress}>
          <EditContainedIcon width={18} height={18} />
        </Pressable>
        <Pressable style={styles.iconBtn} onPress={onSettingsPress}>
          <SettingsIcon width={24} height={24} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: 'transparent',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    flexShrink: 0,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
    flexShrink: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
