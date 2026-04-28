import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSize, spacing, gradients } from '@/constants/theme';
import { CardTypeOption } from '@/components/fantasy/league-setup/CardTypeOption';
import { CommonBlackButton } from '@/components/common/CommonBlackButton';
import { CommonPrimaryButton } from '@/components/common/CommonPrimaryButton';
import BackSvg from '@/assets/icons/back.svg';
import BankNote from '@/assets/icons/bank-note.svg';
import CoinHand from '@/assets/icons/coin-hand.svg';
import Star from '@/assets/icons/star2.svg';

type CardType = 'main' | 'full' | 'full2' | null;

export default function ScoringStyle() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<CardType>(null);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={[...gradients.authBg.colors]}
        locations={[...gradients.authBg.locations]}
        start={gradients.authBg.start}
        end={gradients.authBg.end}
        style={styles.container}
      >
        <View style={styles.overlay} />
        <View style={[styles.content, { paddingTop: insets.top }]}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <BackSvg color={colors.white85} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainSection}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Scoring Style</Text>
              <Text style={styles.subtitle}>
                Choose how points will be earned in your league
              </Text>
            </View>
            <View style={styles.cards}>
              <CardTypeOption
                title="Money Line"
                description="Pick the winner of each fight and earn points for correct outcomes"
                tags={['Winner Pick', 'Simple Scoring']}
                Icon={BankNote}
                showPopular
                isSelected={selected === 'main'}
                onPress={() => setSelected('main')}
              />
              <CardTypeOption
                title="Full Card"
                description="Every fight on the event card will count toward your league"
                tags={['All Fights', 'Complete Scoring']}
                Icon={CoinHand}
                isSelected={selected === 'full'}
                onPress={() => setSelected('full')}
              />
              <CardTypeOption
                title="Full Card2"
                description="Every fight on the event card will count toward your league"
                tags={['All Fights', 'Complete Scoring']}
                Icon={Star}
                isSelected={selected === 'full2'}
                onPress={() => setSelected('full2')}
              />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            {selected ? (
              <CommonPrimaryButton
                label="Continue"
                onPress={() => router.push('/fantasy/league-setup/pick-cadence')}
                style={styles.button}
              />
            ) : (
              <CommonBlackButton label="Continue" style={styles.button} />
            )}
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black50,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xxs,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  mainSection: {
    flex: 1,
    gap: spacing.md,
    marginTop: spacing.md,
  },
  titleSection: {
    paddingVertical: spacing.md,
    gap: spacing.nano,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSize['32pt'],
    color: colors.whiteSolid,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  cards: {
    gap: spacing.md,
  },
  buttonWrapper: {
    paddingVertical: spacing.xl,
  },
  button: {
    width: '100%',
  },
});