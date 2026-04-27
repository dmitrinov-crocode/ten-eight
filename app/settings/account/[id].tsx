import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';
import AccountAvatar from '@/components/settings/account/AccountAvatar';
import AccountSettingCard from '@/components/settings/account/AccountSettingCard';
import AccountToggle from '@/components/settings/account/AccountToggle';
import { CommonInputField } from '@/components/common/CommonInputField';
import Back from '@/assets/icons/back.svg';

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [privateProfile, setPrivateProfile] = useState(false);
  const [username, setUsername] = useState('Example Name');
  const [dateOfBirth, setDateOfBirth] = useState('07/12/2000');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.back()}>
            <Back color={colors.white85} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Account</Text>
          <View style={styles.navButton} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <View style={styles.divider} />

            <View style={styles.innerSection}>
              <View style={styles.profileSection}>
                <AccountAvatar />

                <CommonInputField
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                />

                <CommonInputField
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="dd/mm/yyyy"
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Private Profile</Text>
                <AccountToggle value={privateProfile} onValueChange={setPrivateProfile} />
              </View>

              <View style={styles.divider} />

              <AccountSettingCard title="Setting Name" subtitle="Chosen Option" />
              <AccountSettingCard title="Setting Name 2" subtitle="Chosen Option 2" />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackSolid,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  navButton: {
    width: 32,
    height: 32,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  contentWrapper: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
    width: '100%',
  },
  innerSection: {
    gap: spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  profileSection: {
    gap: spacing.xl,
    paddingVertical: spacing.base,
    alignItems: 'center',
    width: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    width: '100%',
  },
  toggleLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.white85,
  },
});