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
import Target from '@/assets/icons/target.svg';
import Clock from '@/assets/icons/clock.svg';
import Hash from '@/assets/icons/hash.svg';

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
              <Text style={styles.title}>Pick Cadence</Text>
              <Text style={styles.subtitle}>
                Decide how often your league will reset and score
              </Text>
            </View>
            <View style={styles.cards}>
              <CardTypeOption
                title="One Card"
                description="Score a single fight card only, then reset after the event ends for a quick and easy league format"
                tags={['One Event', 'Quick Play']}
                Icon={Target}
                showPopular
                isSelected={selected === 'main'}
                onPress={() => setSelected('main')}
              />
              <CardTypeOption
                title="All Cards – Timeline"
                description="Track multiple events in order across the full timeline"
                tags={['Multi-Event', 'Season Timeline']}
                Icon={Clock}
                isSelected={selected === 'full'}
                onPress={() => setSelected('full')}
              />
              <CardTypeOption
                title="Numbered Cards Only"
                description="Limit scoring to selected numbered cards, giving your league a cleaner structure"
                tags={['Selected Cards', 'Structured Format']}
                Icon={Hash}
                isSelected={selected === 'full2'}
                onPress={() => setSelected('full2')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              {selected ? (
                <CommonPrimaryButton
                  label="Continue"
                  onPress={() => router.push('/fantasy/league-setup/league_privacy')}
                  style={styles.button}
                />
              ) : (
                <CommonBlackButton label="Continue" style={styles.button} />
              )}
            </View>
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