import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import { CommonInputField } from '@/components/common/CommonInputField';
import { CommonBlackButton } from '@/components/common/CommonBlackButton';
import { CommonPrimaryButton } from '@/components/common/CommonPrimaryButton';
import Back from '@/assets/icons/back.svg';
import Pensil from '@/assets/icons/pensil.svg';
import League1 from '@/assets/icons/league1.svg';
import League2 from '@/assets/icons/league2.svg';
import League3 from '@/assets/icons/league3.svg';
import League4 from '@/assets/icons/league4.svg';
import League5 from '@/assets/icons/league5.svg';

const USER_ICONS = [League1, League2, League3, League4, League5] as const;

export default function SetUp() {
  const [leagueName, setLeagueName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const isFilled = leagueName.trim().length > 0 && welcomeMessage.trim().length > 0;

  const RandomUserIcon = useMemo(
    () => USER_ICONS[Math.floor(Math.random() * USER_ICONS.length)],
    []
  );

  const handleContinue = () => {
    router.replace('/(tabs)/league');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={gradients.authBg.colors}
        locations={gradients.authBg.locations}
        start={gradients.authBg.start}
        end={gradients.authBg.end}
        style={StyleSheet.absoluteFill}
      />

      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => router.back()} style={styles.navButton}>
                <Back color={colors.whiteSolid} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Set Up Your League</Text>
                <Text style={styles.subtitle}>Set up your league details and invite others to start competing</Text>
              </View>

              <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarContainer}>
                    <RandomUserIcon width={120} height={120} />
                  </View>
                  <LinearGradient
                    colors={[colors.greenStart, colors.greenEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.editButton}
                  >
                    <Pensil color={colors.blackSolid} />
                  </LinearGradient>
                </View>
              </View>

              <View style={styles.formSection}>
                <View style={styles.inputsAndButton}>
                  <View style={styles.inputsContainer}>
                    <CommonInputField
                      label="League Name"
                      placeholder="League Name"
                      value={leagueName}
                      onChangeText={setLeagueName}
                      autoCapitalize="none"
                    />
                    <CommonInputField
                      label="Welcome Message"
                      placeholder="Message to greet New Members"
                      value={welcomeMessage}
                      onChangeText={setWelcomeMessage}
                    />
                  </View>

                  {isFilled ? (
                    <CommonPrimaryButton
                      label="Continue"
                      onPress={handleContinue}
                      style={styles.continueButton}
                    />
                  ) : (
                    <CommonBlackButton label="Continue" style={styles.continueButton} />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: colors.black85,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xxs,
    paddingVertical: spacing.xxs,
  },
  navButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  titleSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.xxs,
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
  avatarSection: {
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: colors.white7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.white7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    alignItems: 'center',
  },
  inputsAndButton: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    gap: spacing['2xl'],
  },
  inputsContainer: {
    gap: spacing.xl,
  },
  continueButton: {
    width: '100%',
    marginTop: 20,
  },
});