import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowIcon from '@/assets/icons/arrow.svg';
import SendIcon from '@/assets/icons/send.svg';
import { borderRadius, colors, fonts, fontSize, spacing } from '@/constants/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

export default function CommentsPanel({ value, onChangeText, onSend }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.panel, { paddingBottom: Math.max(insets.bottom, spacing.base) }]}>
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Comments</Text>
          <View style={styles.arrowFlipped}>
            <View style={styles.arrowContainer}>
              <ArrowIcon width={24} height={24} color={colors.white60} />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Start chatting"
            placeholderTextColor={colors.white20}
            value={value}
            onChangeText={onChangeText}
            selectionColor={colors.greenStart}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={onSend} activeOpacity={0.7}>
          <View style={styles.sendIconContainer}>
            <SendIcon width={24} height={24} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.blackSolid,
    borderTopLeftRadius: borderRadius.toggle,
    borderTopRightRadius: borderRadius.toggle,
    borderWidth: 1,
    borderColor: colors.white7,
    paddingTop: spacing.base,
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  headerSection: {
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  headerTitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.whiteSolid,
  },
  arrowFlipped: {
    transform: [{ scaleY: -1 }],
  },
  arrowContainer: {
    width: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white7,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  inputField: {
    flex: 1,
    height: 44,
    backgroundColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingVertical: spacing.xxs,
    justifyContent: 'center',
  },
  input: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
    paddingVertical: 0,
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIconContainer: {
    width: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
