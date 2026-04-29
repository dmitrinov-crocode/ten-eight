import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import { CommonInputField } from '@/components/common/CommonInputField';
import { CommonPrimaryButton } from '@/components/common/CommonPrimaryButton';
import Back from '@/assets/icons/back.svg';
import Pensil from '@/assets/icons/pensil.svg';
import League1 from '@/assets/icons/league1.svg';
import League2 from '@/assets/icons/league2.svg';
import League3 from '@/assets/icons/league3.svg';
import League4 from '@/assets/icons/league4.svg';
import League5 from '@/assets/icons/league5.svg';
import SettingsIcon from '@/assets/icons/settings.svg';
import Toast from '@/components/fantasy/league-main/Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const USER_ICONS = [League1, League2, League3, League4, League5] as const;
const TOAST_DURATION = 2500;

export default function SetUp() {
  const [leagueName, setLeagueName] = useState('NameOftheLeague');
  const [welcomeMessage, setWelcomeMessage] = useState('Message');

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const insets = useSafeAreaInsets();
  const toastTopOffset = insets.top;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((message: string) => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastMessage(message);
      setToastVisible(true);
      toastTimer.current = setTimeout(() => setToastVisible(false), TOAST_DURATION);
    }, []);

  const RandomUserIcon = useMemo(
    () => USER_ICONS[Math.floor(Math.random() * USER_ICONS.length)],
    []
  );

  const handleSaveSuccess = useCallback(() => {
      showToast('Changes have been saved');
    }, [showToast]);


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
            <View style={styles.headerContainer}>
                <View style={styles.left}>
                    <Pressable style={styles.iconBtn} onPress={() => router.back()}>
                    <Back />
                    </Pressable>
                    <Text style={styles.title} numberOfLines={1}>NameOftheLeague</Text>
                </View>
                <View style={styles.right}>
                    <Pressable style={styles.iconBtn} onPress={() => router.push('../settings/settings')}>
                    <SettingsIcon width={24} height={24} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.content}>

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
                      placeholder="Message"
                      value={welcomeMessage}
                      onChangeText={setWelcomeMessage}
                    />
                  </View>

                    <CommonPrimaryButton
                      label="Save"
                      onPress={handleSaveSuccess}
                      style={styles.continueButton}
                    />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast
              visible={toastVisible}
              message={toastMessage}
              topOffset={toastTopOffset}
            />
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
    marginTop: spacing['2xl'],
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: 'transparent',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    flexShrink: 0,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
    flexShrink: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});