import React, { useState } from 'react';
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
import { InputField } from '@/components/common/InputField';
import { BlackButton } from '@/components/common/BlackButton';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { GradientText } from '@/components/common';
import Back from '@/assets/icons/back.svg';

type LoginMode = 'email' | 'phone';

export default function LogIn() {
  const [mode, setMode] = useState<LoginMode>('email');
  const [firstField, setFirstField] = useState('');
  const [password, setPassword] = useState('');

  const isFilled = firstField.trim().length > 0 && password.trim().length > 0;

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleModeSwitch = (newMode: LoginMode) => {
    setMode(newMode);
    setFirstField('');
    setPassword('');
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
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>
                  Enter the email associated with your account
                </Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleTab,
                      mode === 'email' ? styles.toggleTabActive : styles.toggleTabInactive,
                    ]}
                    onPress={() => handleModeSwitch('email')}
                    activeOpacity={0.7}
                  >
                    {mode === 'email' ? (
                      <GradientText
                        style={styles.toggleTextActive}
                        colors={[colors.greenStart, colors.greenEnd]}
                      >
                        Email
                      </GradientText>
                    ) : (
                      <Text style={styles.toggleTextInactive}>Email</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.toggleTab,
                      mode === 'phone' ? styles.toggleTabActive : styles.toggleTabInactive,
                    ]}
                    onPress={() => handleModeSwitch('phone')}
                    activeOpacity={0.7}
                  >
                    {mode === 'phone' ? (
                      <GradientText
                        style={styles.toggleTextActive}
                        colors={[colors.greenStart, colors.greenEnd]}
                      >
                        Phone Number
                      </GradientText>
                    ) : (
                      <Text style={styles.toggleTextInactive}>Phone Number</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.inputsAndButton}>
                  <View style={styles.inputsContainer}>
                    <InputField
                      label={mode === 'email' ? 'Email' : 'Phone Number'}
                      placeholder={mode === 'email' ? 'Email' : 'Phone Number'}
                      value={firstField}
                      onChangeText={setFirstField}
                      keyboardType={mode === 'email' ? 'email-address' : 'phone-pad'}
                      autoCapitalize="none"
                      autoComplete={mode === 'email' ? 'email' : 'tel'}
                    />
                    <InputField
                      label="Password"
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoComplete="password"
                    />
                  </View>

                  {isFilled ? (
                    <PrimaryButton
                      label="Continue"
                      onPress={handleContinue}
                      style={styles.continueButton}
                    />
                  ) : (
                    <BlackButton
                      label="Continue"
                      style={styles.continueButton}
                    />
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
  },
  navButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
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
  formSection: {
    alignItems: 'center',
    gap: spacing['2xl'],
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.toggle,
    padding: spacing.sm,
    gap: 2,
    width: 343,
  },
  toggleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  toggleTabActive: {
    borderWidth: 1,
    borderColor: colors.green40Start,
    borderRadius: borderRadius.toggle,
    paddingHorizontal: spacing.xxs,
  },
  toggleTabInactive: {
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
  },
  toggleTextActive: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
  toggleTextInactive: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  inputsAndButton: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    gap: spacing['3xl'],
  },
  inputsContainer: {
    gap: spacing.xl,
  },
  continueButton: {
    width: '100%',
  },
});
