import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';

interface CardTypeOptionProps {
  title: string;
  description: string;
  tags?: string[];
  Icon: React.FC<SvgProps>;
  showPopular?: boolean;
  isSelected: boolean;
  onPress: () => void;
}

const GREEN_GRADIENT: [string, string] = [colors.greenStart, colors.greenEnd];

export function CardTypeOption({
  title,
  description,
  tags,
  Icon,
  showPopular = false,
  isSelected,
  onPress,
}: CardTypeOptionProps) {
  const gradient = isSelected ? gradients.cardSelected : gradients.cardDefault;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={[...gradient.colors]}
        locations={[...gradient.locations]}
        start={gradient.start}
        end={gradient.end}
        style={[styles.card, isSelected && styles.cardSelected]}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.iconWrapper}>
              <Icon width={24} height={24} />
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          {showPopular && (
            <LinearGradient
              colors={GREEN_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.popularBadge}
            >
              <Text style={styles.popularText}>Popular</Text>
            </LinearGradient>
          )}
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <Text style={styles.description}>{description}</Text>
          {tags && tags.length > 0 && (
            <View style={styles.tagsRow}>
              {tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.button,
    borderWidth: 1,
    borderColor: colors.white7,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardSelected: {
    borderColor: colors.greenStart,
    // shadowColor: colors.greenGlow,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.sm,
    paddingVertical: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  iconWrapper: {
    padding: spacing.xs,
    borderRadius: borderRadius.toggle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.whiteSolid,
  },
  popularBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.black85,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
    width: '100%',
  },
  body: {
    padding: spacing.sm,
    gap: spacing.base,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
    lineHeight: fontSize.xs * 1.5,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xxs,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.white3,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.xs,
  },
  tagText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white50,
  },
});
