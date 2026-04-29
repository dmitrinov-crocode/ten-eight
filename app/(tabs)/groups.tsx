import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';
import { CommonPrimaryButton } from '@/components/common/CommonPrimaryButton';

export default function GroupScreen() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <Image
          source={require('../../assets/backgrounds/background-fantasy.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* <View style={styles.overlay} /> */}
        <View style={styles.contentWrapper}>
          <View style={styles.textSection}>
            <Text style={styles.title}>Ready to Pick?</Text>
            <Text style={styles.subtitle}>
              Pick your Fighters & Win Big as the Action Unfolds!
            </Text>
          </View>
          <View style={styles.buttonsSection}>
            <CommonPrimaryButton
              label="Create a League"
              onPress={() => router.push('/fantasy/league-setup/choose-card-type')}
            />
            <CommonPrimaryButton
              label="Find a League to Join"
              onPress={() => router.push('/(tabs)/all-leagues')}
            />
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
  backgroundImage: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 560,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black35,
  },
  contentWrapper: {
    flex: 1,
    //justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: 72,
    paddingBottom: spacing['2xl'],
    gap: spacing['2xl'],
  },
  textSection: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSize['4xl'],
    color: colors.whiteSolid,
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
    textAlign: 'center',
    width: '100%',
  },
  buttonsSection: {
    gap: spacing.md,
  },
});