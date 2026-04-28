import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackIcon from '@/assets/icons/back.svg';
import FollowerItem from '@/components/profile/followers/FollowerItem';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

const FOLLOWERS = [
  { id: '1', name: 'User 21' },
  { id: '2', name: 'Username Fan MMA John' },
  { id: '3', name: 'I Love Betting' },
  { id: '4', name: 'Username Fan MMA John' },
  { id: '5', name: 'User 21' },
  { id: '6', name: 'Kaled Morth' },
  { id: '7', name: 'I Love Betting' },
  { id: '8', name: 'I Love Betting' },
  { id: '9', name: 'I Love Betting' },
  { id: '10', name: 'Kaled Morth' },
  { id: '11', name: 'I Love Betting' },
  { id: '12', name: 'I Love Betting' },
  { id: '13', name: 'I Love Betting' },
  { id: '14', name: 'Kaled Morth' },
];

export default function FollowersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <BackIcon color={colors.white85} />
          </TouchableOpacity>
          <Text style={styles.title}>Followers</Text>
          <View style={styles.navPlaceholder} />
        </View>
        <View style={styles.content}>
          <View style={styles.separator} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
            {FOLLOWERS.map(follower => (
              <FollowerItem key={follower.id} name={follower.name} />
            ))}
          </ScrollView>
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
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    //paddingHorizontal: spacing.base,
  },
  backButton: {
    width: 32,
    height: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  navPlaceholder: {
    width: 32,
    height: 32,
    opacity: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.base,
    gap: spacing.base,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white20,
  },
  list: {
    gap: spacing.md,
  },
});