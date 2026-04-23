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
import { Stack } from 'expo-router';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import { InputField } from '@/components/common/InputField';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    console.log('Continue with:', { email, password });
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
            <View style={styles.contentWrapper}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>
                  Enter the email associated with your account
                </Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity style={styles.toggleButton} activeOpacity={0.7}>
                    <Text style={[styles.toggleText, styles.toggleActive]}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.toggleButton} activeOpacity={0.7}>
                    <Text style={styles.toggleText}>Phone Number</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputsContainer}>
                  <InputField
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (emailError) setEmailError('');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={emailError}
                  />

                  <InputField
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoComplete="password"
                  />
                </View>

                <TouchableOpacity style={styles.forgotButton} activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={[colors.greenStart, colors.greenEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.continueGradient}
                  >
                    <Text style={styles.continueText}>Continue</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.signupRow}>
                <Text style={styles.signupText}>Don&#39;t have an account?</Text>
                <TouchableOpacity style={styles.signupBtn} activeOpacity={0.85}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
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
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing['3xl'],
    paddingVertical: spacing['xl'],
  },
  titleSection: {
  
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
    width: '100%',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white7,
    borderRadius: borderRadius.pill,
    padding: spacing.xxs,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.pill,
  },
  toggleText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  toggleActive: {
    color: colors.blackSolid,
    backgroundColor: colors.whiteSolid,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    overflow: 'hidden',
  },
  inputsContainer: {
    gap: spacing.lg,
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.greenStart,
  },
  continueButton: {
    borderRadius: borderRadius.pill,
    overflow: 'hidden',
    marginTop: spacing.xs,
    shadowColor: colors.greenGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  continueGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  continueText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.base,
    color: colors.blackSolid,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signupText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.whiteSolid,
  },
  signupBtn: {
    padding: spacing.md,
  },
  signupLink: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.greenStart,
    textDecorationLine: 'underline',
  },
});