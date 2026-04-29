import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Back from '@/assets/icons/back.svg';
import RadioOption from '@/components/settings/setting-name/RadioOption';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

const OPTIONS = [
  { id: '1', label: 'Chosen Option', description: 'Description' },
  { id: '2', label: 'Option 2', description: 'Description' },
  { id: '3', label: 'Option Without Description' },
];

export default function SettingNameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('1');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.inner}>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.navButton} onPress={() => router.back()} activeOpacity={0.7}>
              <Back color={colors.white85} />
            </TouchableOpacity>
            <Text style={styles.title}>Setting Name</Text>
            <View style={styles.navButton} />
          </View>
          <View style={styles.optionsSection}>
            <View style={styles.divider} />
            {OPTIONS.map(option => (
              <RadioOption
                key={option.id}
                label={option.label}
                description={option.description}
                selected={selected === option.id}
                onPress={() => setSelected(option.id)}
              />
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackSolid,
  },
  inner: {
    flex: 1,
    gap: spacing.md,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.base,
  },
  navButton: {
    width: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    lineHeight: fontSize.base,
    color: colors.white85,
  },
  optionsSection: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white20,
  },
});