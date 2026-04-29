import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import User1 from '@/assets/icons/user1.svg';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

export default function ProfileHeader() {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <View style={styles.avatarWrapper}>
        <User1 width={80} height={80} />
      </View>
      <View style={styles.info}>
        <Text style={styles.username}>Username</Text>
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statItem} onPress={() => router.push('/profile/followers')}>
            <Text style={styles.statLabel}>FOLOWERS</Text>
            <Text style={styles.statValue}>54</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={() => router.push('/profile/following')}>
            <Text style={styles.statLabel}>FOLOWING</Text>
            <Text style={styles.statValue}>3</Text>
          </TouchableOpacity>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TOTAL BETS</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    gap: 10,
  },
  username: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
  statValue: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
});
