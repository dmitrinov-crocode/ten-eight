import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { GradientText } from '@/components/auth';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import GoogleIcon from '@/assets/icons/google.svg';
import AppleIcon from '@/assets/icons/apple.svg';
import { PrimaryButton } from '@/components/auth/PrimaryButton';
import { BlackButton } from '@/components/auth/BlackButton';

const { width } = Dimensions.get('window');

const GREEN_GRADIENT: [string, string] = [colors.greenStart, colors.greenEnd];
const WATERMARK_COLORS: [string, string, string] = [colors.whiteSolid, colors.whiteSolid, colors.white3];
const WATERMARK_LOCATIONS: [number, number, number] = [0, 0.316, 1];

export default function GetStarted() {
  const router = useRouter();

  const handleLogIn = () => {
    router.push('./log-in');
  };

  const handleSignUpWithEmail = () => {
    router.push('./sing-up');
  };

  const handleSignUpWithGoogle = () => {
    console.log('Sign up with Google');
  };

  const handleSignUpWithApple = () => {
    console.log('Sign up with Apple');
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
        <View style={styles.contentWrapper}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.subtitle}>New here? Sign up to continue!</Text>
          </View>

          <View style={styles.buttonsSection}>
            <View style={styles.buttonsInner}>

              <PrimaryButton 
                label="Sign Up with Email / Phone"
                onPress={handleSignUpWithEmail}
              />

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialGroup}>
                <BlackButton Icon={GoogleIcon} label="Sign Up with Google" gap={spacing.xs} onPress={handleSignUpWithGoogle} />
                <BlackButton Icon={AppleIcon} label="Sign Up with Apple" gap={spacing.xxs} onPress={handleSignUpWithApple} />
              </View>
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already a member?</Text>
              <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85} onPress={handleLogIn}>
                <GradientText style={styles.loginLink} colors={GREEN_GRADIENT}>
                  Log in
                </GradientText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>{"By signing up you agree to The Action Network's"}</Text>
          <Text style={styles.termsText}>
            <Text style={styles.termsLink}>TERMS OF SERVICE</Text>
            <Text>{' and '}</Text>
            <Text style={styles.termsLink}>PRIVACY POLICY</Text>
          </Text>
        </View>

      </SafeAreaView>

      <View style={styles.watermarkWrapper} pointerEvents="none">
        <GradientText
          style={styles.watermarkText}
          colors={WATERMARK_COLORS}
          locations={WATERMARK_LOCATIONS}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          10-8
        </GradientText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: width + 100,
    height: '80%',
  },
  overlay: {
    backgroundColor: colors.black85,
  },
  safeArea: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing['3xl'],
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: spacing['4xl'],
    gap: spacing.xs,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSize['4xl'],
    color: colors.whiteSolid,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
    textAlign: 'center',
  },
  buttonsSection: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  buttonsInner: {
    gap: spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white20,
  },
  dividerText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white30,
  },
  socialGroup: {
    gap: spacing.md,
  },
  socialBorder: {
    borderRadius: borderRadius.pill,
    padding: 1,
  },
  socialInner: {
    backgroundColor: colors.blackSolid,
    borderRadius: borderRadius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing.md,
    paddingRight: spacing.base,
    paddingVertical: spacing.xxs,
  },
  socialIconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  socialText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.whiteSolid,
  },
  loginBtn: {
    padding: spacing.md,
  },
  loginLink: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.greenStart,
    textDecorationLine: 'underline',
  },
  termsContainer: {
    marginBottom: spacing['2xl'],
    alignItems: 'center',
    gap: 2,
  },
  termsText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xxs,
    color: colors.white30,
    textAlign: 'center',
  },
  termsLink: {
    textDecorationLine: 'underline',
    color: colors.white30,
  },
  watermarkWrapper: {
    position: 'absolute',
    top: 165,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  watermarkText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize['3xl'],
    textAlign: 'center',
    color: colors.white30,
  },
});
