import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import GlobeIcon from '@/assets/icons/globe.svg';
import LockIcon from '@/assets/icons/lock3.svg';

export type PopupMode = 'toPublic' | 'toPrivate';

type Props = {
  visible: boolean;
  mode: PopupMode;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Popup({ visible, mode, onClose, onConfirm }: Props) {
  const isToPublic = mode === 'toPublic';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>
          <View style={styles.content}>
            <View style={styles.infoRow}>
              <View style={styles.iconWrapper}>
                {isToPublic ? (
                  <GlobeIcon width={24} height={24} color={colors.white60} />
                ) : (
                  <LockIcon width={24} height={24} color={colors.white60} />
                )}
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.title}>
                  {isToPublic ? 'Open Your League to Everyone?' : 'Switch to Private Mode?'}
                </Text>
                <Text style={styles.subtitle}>
                  {isToPublic
                    ? 'Making your league public will allow anyone to discover it and join based on your settings'
                    : 'Your league will no longer be open to everyone, and only approved members will be able to join'}
                </Text>
              </View>
            </View>
            <Pressable onPress={onConfirm}>
              <LinearGradient
                colors={[colors.greenStart, colors.greenEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btn}
              >
                <Text style={styles.btnText}>
                  {isToPublic ? 'Change to Public' : 'Change to Private'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: colors.black85,
    borderTopLeftRadius: borderRadius.toggle,
    borderTopRightRadius: borderRadius.toggle,
    padding: spacing.base,
    gap: spacing.md,
    shadowColor: colors.blackSolid,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  handleRow: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  handle: {
    width: 80,
    height: 4,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.white20,
  },
  content: {
    paddingHorizontal: spacing.sm,
    gap: spacing.base,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: spacing.sm,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.lg,
    color: colors.white85,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white60,
  },
  btn: {
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
  btnText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.black85,
  },
});
