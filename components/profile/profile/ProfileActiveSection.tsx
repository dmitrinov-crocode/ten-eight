import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/theme';

export default function ProfileActiveSection() {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    height: 160,
    width: '100%',
  },
});
