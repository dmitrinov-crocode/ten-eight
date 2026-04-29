import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackIcon from '@/assets/icons/back.svg';
import UserProfileIcon from '@/assets/icons/user-profile.svg';
import StarIcon from '@/assets/icons/star.svg';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';
import SettingCard from '@/components/settings/settings/SettingCard';

type SettingItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
};

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const settingItems: SettingItem[] = [
    {
      id: 'account',
      label: 'Account',
      icon: <UserProfileIcon width={24} height={24} color={colors.white85} />,
      route: '/settings/account/1',
    },
    {
      id: 'setting-2',
      label: 'Setting 2',
      icon: <StarIcon width={24} height={24} color={colors.white85} />,
      route: '/settings/setting-name',
    },
    {
      id: 'setting-3',
      label: 'Setting 3',
      icon: <StarIcon width={24} height={24} color={colors.white85} />,
      route: '/settings/setting-name',
    },
    {
      id: 'setting-4',
      label: 'Setting 4',
      icon: <StarIcon width={24} height={24} color={colors.white85} />,
      route: '/settings/setting-name',
    },
    {
      id: 'setting-5',
      label: 'Setting 5',
      icon: <StarIcon width={24} height={24} color={colors.white85} />,
      route: '/settings/setting-name',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.content}>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
              <BackIcon color={colors.white85} />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
            <View style={[styles.navBtn, styles.invisible]} />
          </View>
          <View style={styles.inner}>
            <View style={styles.divider} />
            <View style={styles.cards}>
              {settingItems.map((item) => (
                <SettingCard
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  onPress={() => router.push(item.route as any)}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackSolid,
  },
  content: {
    flex: 1,
    gap: spacing.md,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  navBtn: {
    width: 32,
    height: 32,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invisible: {
    opacity: 0,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  inner: {
    gap: spacing.md,
    paddingHorizontal: spacing.base,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white20,
  },
  cards: {
    gap: spacing.md,
  },
});