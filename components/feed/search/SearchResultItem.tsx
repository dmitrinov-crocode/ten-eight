import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

interface SearchResultItemProps {
  title: string;
  description: string;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white3,
    borderRadius: borderRadius.button,
    padding: spacing.xl,
    gap: 2,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white30,
  },
});
