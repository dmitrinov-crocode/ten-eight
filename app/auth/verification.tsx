import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
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
import { BlackButton } from '@/components/common/BlackButton';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { GradientText } from '@/components/common';
import Back from '@/assets/icons/back.svg';

const CODE_LENGTH = 4;

export default function Verification() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>(Array(CODE_LENGTH).fill(null));

  const isFilled = code.every((c) => c.length === 1);

  const handleChangeText = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    router.replace('/auth/customize-account');
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
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>
                  {'Please enter the code we sent to\nla****kk@gmail.com'}
                </Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.inputsGroup}>
                  <View style={styles.divider} />
                  <View style={styles.otpRow}>
                    {code.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => {
                          inputRefs.current[index] = ref;
                        }}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        selectionColor={colors.greenEnd}
                      />
                    ))}
                  </View>
                  <View style={styles.divider} />
                </View>

                <View style={styles.buttonSection}>
                  {isFilled ? (
                    <PrimaryButton
                      label="Continue"
                      onPress={handleContinue}
                      style={styles.button}
                    />
                  ) : (
                    <BlackButton label="Continue" style={styles.button} />
                  )}

                  <View style={styles.resendRow}>
                    <Text style={styles.resendText}>{"Didn't get a code? "}</Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <GradientText
                        style={styles.resendLink}
                        colors={[colors.greenStart, colors.greenEnd]}
                      >
                        Resend
                      </GradientText>
                    </TouchableOpacity>
                  </View>
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
    paddingHorizontal: spacing.xl,
    gap: spacing['3xl'],
  },
  inputsGroup: {
    gap: spacing['3xl'],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white20,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  otpInput: {
    width: 52,
    height: 64,
    backgroundColor: colors.white7,
    borderRadius: borderRadius.card,
    fontFamily: fonts.medium,
    fontSize: fontSize.xl,
    color: colors.white85,
    textAlign: 'center',
  },
  buttonSection: {
    gap: spacing.base,
  },
  button: {
    width: '100%',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  resendText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  resendLink: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
  },
});
