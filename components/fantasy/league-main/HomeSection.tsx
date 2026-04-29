import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import GlobeIcon from '@/assets/icons/globe.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import CopyLeftIcon from '@/assets/icons/copy-left.svg';
import FistIcon from '@/assets/icons/fist-outline.svg';
import BackIcon from '@/assets/icons/back.svg';
import UserIcon from '@/assets/icons/user2.svg';
import FightCard, { FightCardData } from './FightCard';

type Props = {
  onPublicPrivatePress?: () => void;
};

const NEXT_FIGHT: FightCardData = {
  date: 'Sat, 4/12',
  prize: '$23.5k',
  time: '13:00',
  fighter1: {
    name: 'Nariman Abbassov',
    winPct: '50%',
    odds: '1.89x',
    imageUri: 'https://i.pravatar.cc/46?img=11',
  },
  fighter2: {
    name: 'Tank Abbott',
    winPct: '50%',
    odds: '1.89x',
    imageUri: 'https://i.pravatar.cc/46?img=12',
  },
};

const PICKED_USERS = [
  { id: '1', name: 'You', fighter: 'Nariman A.', fighterColor: colors.teal75, avatarBg: 'rgba(47,194,170,0.25)' },
  { id: '2', name: 'User 21', fighter: 'Tank A.', fighterColor: colors.red75, avatarBg: 'rgba(195,67,99,0.25)' },
  { id: '3', name: 'MMA_Fan2...', fighter: 'Tank A.', fighterColor: colors.red75, avatarBg: 'rgba(7,244,153,0.25)' },
];

const WAITING_USERS = [
  { id: '1', name: 'User123', fighter: 'Nariman A.', fighterColor: colors.teal75, avatarBg: 'rgba(47,194,170,0.25)' },
];

function Divider() {
  return <View style={styles.divider} />;
}

function UserRow({ name, fighter, fighterColor, avatarBg }: { name: string; fighter: string; fighterColor: string; avatarBg: string }) {
  return (
    <View style={styles.userRow}>
      <View style={[styles.userAvatar, { backgroundColor: avatarBg }]}>
        <UserIcon width={36} height={36} color={colors.white60} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName} numberOfLines={1}>{name}</Text>
        <Text style={[styles.userFighter, { color: fighterColor }]}>{fighter}</Text>
      </View>
    </View>
  );
}

export default function HomeSection({ onPublicPrivatePress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.inviteSection}>
          <View style={styles.inviteHeaderRow}>
            <View style={styles.inviteTexts}>
              <Text style={styles.inviteTitle}>Invitation Link</Text>
              <Text style={styles.inviteSubtitle}>Invite friends to play</Text>
            </View>
            <Pressable style={styles.copyBtn}>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <CopyLeftIcon width={24} height={24} color={colors.white60} />
              </View>
            </Pressable>
          </View>
          <View style={styles.urlSection}>
            <View style={styles.urlField}>
              <Text style={styles.urlText} numberOfLines={1}>https://10-8.gg/i/XK9vMn</Text>
            </View>
            <Pressable>
              <LinearGradient
                colors={gradients.authBg.colors}
                locations={gradients.authBg.locations}
                start={gradients.authBg.start}
                end={gradients.authBg.end}
                style={[StyleSheet.absoluteFill, { borderRadius: borderRadius.pill }]}
              />
              <LinearGradient
                colors={[colors.greenStart, colors.greenEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inviteBtn}
              >
                <Text style={styles.inviteBtnText}>Invite Friends to Join</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
        <Divider />
        <Pressable style={styles.publicRow} onPress={onPublicPrivatePress}>
          <View style={styles.publicLeft}>
            <View style={styles.iconWrapper}>
              <GlobeIcon width={24} height={24} color={colors.white60} />
            </View>
            <View style={styles.publicTexts}>
              <Text style={styles.publicTitle}>Open League to Public</Text>
              <Text style={styles.publicSubtitle}>Everyone will be able to join</Text>
            </View>
          </View>
          <View style={styles.iconWrapper}>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <BackIcon color={colors.white60} />
            </View>
          </View>
        </Pressable>
      </View>

      <View style={styles.timeLimitCard}>
        <View style={styles.timeLimitLeft}>
          <View style={styles.iconWrapper}>
            <ClockIcon color={colors.teal} />
          </View>
          <View style={styles.timeLimitTexts}>
            <Text style={styles.timeLimitTitle}>Time limit</Text>
            <View style={styles.timeLimitSubRow}>
              <Text style={styles.timeLimitSub}>Ended</Text>
              <Text style={styles.bulletDot}>⬤</Text>
              <Text style={styles.timeLimitSub}>1 Month</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.extendBtn}>
          <Text style={styles.extendBtnText}>Extend</Text>
        </Pressable>
      </View>

      <View style={styles.nextFightCard}>
        <View style={styles.nextFightHeader}>
          <View style={styles.nextFightTexts}>
            <Text style={styles.nextFightTitle}>Next Fight Card</Text>
            <Text style={styles.nextFightSub}>We&#39;ll post the league in the lobby</Text>
          </View>
          <View style={styles.iconWrapper}>
            <FistIcon width={32} height={32} color={colors.white60} />
          </View>
        </View>
        <FightCard data={NEXT_FIGHT} borderColor={colors.selectedFighterBorder} />
        <View style={styles.accordionSection}>
          <View style={styles.accordionRow}>
            <Text style={styles.accordionLabel}>Main Card</Text>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <BackIcon color={colors.white60} />
            </View>
          </View>
          <Divider />
          <View style={styles.accordionRow}>
            <Text style={styles.accordionLabel}>Prelims</Text>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <BackIcon color={colors.white60} />
            </View>
          </View>
          <Divider />
        </View>
      </View>

      <View style={styles.pickedRow}>
        <View style={styles.pickedCard}>
          <View style={styles.pickedHeader}>
            <Text style={styles.pickedTitle}>Picked</Text>
            <Text style={styles.pickedCount}>3</Text>
          </View>
          <Divider />
          <View style={styles.userList}>
            {PICKED_USERS.map((u) => (
              <UserRow key={u.id} {...u} />
            ))}
          </View>
        </View>
        <View style={styles.pickedCard}>
          <View style={styles.pickedHeader}>
            <Text style={styles.pickedTitle}>Waiting</Text>
            <Text style={styles.pickedCount}>1</Text>
          </View>
          <Divider />
          <View style={styles.userList}>
            {WAITING_USERS.map((u) => (
              <UserRow key={u.id} {...u} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingTop: spacing.base,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing['sm+'],
    gap: spacing.sm,
  },
  inviteSection: {
    gap: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  inviteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inviteTexts: {
    flex: 1,
    gap: 0,
  },
  inviteTitle: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.lg,
    color: colors.white85,
  },
  inviteSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white60,
  },
  copyBtn: {
    width: 44,
    height: 44,
    backgroundColor: colors.black30,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxs,
  },
  urlSection: {
    gap: spacing.md,
  },
  urlField: {
    backgroundColor: colors.white7,
    borderRadius: borderRadius.card,
    height: 44,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingVertical: spacing.xxs,
    justifyContent: 'center',
  },
  urlText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  inviteBtn: {
    borderRadius: borderRadius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.greenGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  inviteBtnText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.black85,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
  },
  publicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  publicLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },
  publicTexts: {
    gap: 2,
  },
  publicTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  publicSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white30,
  },
  timeLimitCard: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeLimitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  timeLimitTexts: {
    gap: 2,
  },
  timeLimitTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  timeLimitSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  timeLimitSub: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white30,
  },
  bulletDot: {
    fontFamily: fonts.regular,
    fontSize: 2,
    color: colors.white30,
  },
  extendBtn: {
    backgroundColor: colors.white7,
    borderWidth: 1,
    borderColor: colors.white3,
    borderRadius: borderRadius.card,
    paddingVertical: spacing['sm+'],
    paddingHorizontal: spacing.base,
  },
  extendBtnText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  nextFightCard: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xl,
    paddingBottom: spacing['sm+'],
    gap: spacing.xl,
  },
  nextFightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextFightTexts: {
    gap: 2,
  },
  nextFightTitle: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.lg,
    color: colors.white85,
  },
  nextFightSub: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white60,
  },
  accordionSection: {
    gap: spacing['sm+'],
  },
  accordionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
  },
  accordionLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  pickedRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pickedCard: {
    flex: 1,
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  pickedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickedTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  pickedCount: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  userList: {
    gap: spacing.base,
    paddingVertical: spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    height: 36,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.white85,
  },
  userFighter: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
  },
});
