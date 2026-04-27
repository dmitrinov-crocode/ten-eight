import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

type TProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export default function RadioOption({ label, description, selected, onPress }: TProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.radioWrapper}>
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
    width: '100%',
  },
  radioWrapper: {
    width: 32,
    height: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 15,
    height: 15,
    aspectRatio: 1,
    borderRadius: 7.5,
    borderWidth: 1.2,
    borderColor: colors.white60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.white60,
  },
  radioInner: {
    width: 7.5,
    height: 7.5,
    borderRadius: 3.75,
    backgroundColor: colors.white60,
  },
  textContainer: {
    flexShrink: 1,
    gap: spacing.xs,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    lineHeight: fontSize.base,
    color: colors.white85,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm,
    color: colors.white60,
  },
});