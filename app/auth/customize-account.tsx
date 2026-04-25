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
import { InputField } from '@/components/common/InputField';
import { BlackButton } from '@/components/common/BlackButton';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import Back from '@/assets/icons/back.svg';
import Pensil from '@/assets/icons/pensil.svg';
import User1 from '@/assets/icons/user1.svg';
import User2 from '@/assets/icons/user2.svg';
import User3 from '@/assets/icons/user3.svg';
import User4 from '@/assets/icons/user4.svg';
import User5 from '@/assets/icons/user5.svg';

const USER_ICONS = [User1, User2, User3, User4, User5] as const;

const formatBirthDate = (text: string): string => {
  let cleaned = text.replace(/\D/g, '');
  cleaned = cleaned.slice(0, 8);
  let formatted = '';
  for (let i = 0; i < cleaned.length; i++) {
    if (i === 2 || i === 4) {
      formatted += '/';
    }
    formatted += cleaned[i];
  }
  
  return formatted;
};

export default function CustomizeAccount() {
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const isFilled = username.trim().length > 0 && dateOfBirth.trim().length === 10;

  const RandomUserIcon = useMemo(
    () => USER_ICONS[Math.floor(Math.random() * USER_ICONS.length)],
    []
  );

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleDateChange = (text: string) => {
    const formatted = formatBirthDate(text);
    setDateOfBirth(formatted);
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
                <Text style={styles.title}>Almost Done!</Text>
                <Text style={styles.subtitle}>Customize your account</Text>
              </View>

              <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                  <RandomUserIcon width={120} height={120} />
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
                    <InputField
                      label="Username"
                      placeholder="Username"
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                    />
                    <InputField
                      label="Date of Birth"
                      placeholder="mm/dd/yyyy"
                      value={dateOfBirth}
                      onChangeText={handleDateChange}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>

                  {isFilled ? (
                    <PrimaryButton
                      label="Continue"
                      onPress={handleContinue}
                      style={styles.continueButton}
                    />
                  ) : (
                    <BlackButton label="Continue" style={styles.continueButton} />
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