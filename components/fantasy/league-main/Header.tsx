import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CommonIcon } from '@/components/auth';
import { fonts, fontSize, spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TProps = {
  title: string;
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
};

export default function Header({ title, onSearchPress, onSettingsPress }: TProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + spacing.sm }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        <Pressable onPress={onSearchPress} style={styles.iconButton}>
          <CommonIcon name="edit" size={32} color="white" />
        </Pressable>
        <Pressable onPress={onSettingsPress} style={styles.iconButton}>
          <CommonIcon name="settings" size={32} color="white" />
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
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.lg,
    color: 'rgba(245, 245, 245, 1)',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
