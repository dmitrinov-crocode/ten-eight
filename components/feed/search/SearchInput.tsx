import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CrossIcon from '@/assets/icons/cross.svg';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void
  onClose: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, onClose }) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.white60}
          value={value}
          onChangeText={onChangeText}
          selectionColor={colors.greenStart}
          autoFocus
        />
      </View>
      <TouchableOpacity
        onPress={onClose}
        style={styles.clearBtnOuter}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.clearBtnInner}>
          <CrossIcon width={12} height={12} color={colors.white60} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.base,
    paddingRight: spacing.sm,
    paddingVertical: spacing.base,
    width: '100%',
  },
  inputField: {
    flex: 1,
    backgroundColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    paddingVertical: spacing.md,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white85,
    padding: 0,
  },
  clearBtnOuter: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnInner: {
    padding: 16,
    borderRadius: borderRadius.toggle,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
