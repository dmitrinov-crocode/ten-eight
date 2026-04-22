import React, { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { CommonIcon } from '@/components/common';
import type { IconName } from '@/components/common/CommonIcon';
import { fonts, fontSize } from '@/constants/theme';

export type RuleItem = {
  term: string;
  description: string;
};

type Props = {
  icon?: IconName;
  title: string;
  label: string;
  labelColor?: string;
  rules: RuleItem[];
  isOpen: boolean;
  onPress: () => void;
  isLast?: boolean;
  externalScrollGesture?: ReturnType<typeof Gesture.Native>;
};

const MAX_HEIGHT = 160;

const RulesAccordion = ({
  icon = 'flame',
  title,
  label,
  labelColor = '#C34363',
  rules,
  isOpen,
  onPress,
  isLast = false,
  externalScrollGesture,
}: Props) => {
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(isOpen ? 0 : 180);

  useEffect(() => {
    height.value = withTiming(isOpen ? MAX_HEIGHT : 0, { duration: 250 });
    opacity.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
    rotate.value = withTiming(isOpen ? 0 : 180, { duration: 250 });
  }, [isOpen, height, opacity, rotate]);

  const animatedContent = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    overflow: 'hidden',
  }));

  const animatedArrow = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={!isOpen && !isLast && styles.bottomBorder}>
      <Pressable onPress={onPress} style={styles.header}>
        <View style={styles.headerLeft}>
          <CommonIcon name={icon} size={16} color="rgba(245, 245, 245, 0.85)" />
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.dot, { backgroundColor: labelColor }]} />
          <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        </View>

        <Animated.View style={[animatedArrow, { width: 16, height: 16 }]}>
          <CommonIcon name="arrow" size={16} color="rgba(245, 245, 245, 0.6)" />
        </Animated.View>
      </Pressable>

      <Animated.View style={animatedContent}>
        <GestureDetector gesture={externalScrollGesture ?? Gesture.Native()}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {rules.map((rule, i) => (
              <Text key={i} style={[styles.ruleText, i > 0 && styles.ruleSpacing]}>
                <Text style={styles.ruleTerm}>{rule.term}: </Text>
                {rule.description}
              </Text>
            ))}
          </ScrollView>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

export default RulesAccordion;

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  title: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245, 245, 245, 0.85)',
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C34363',
  },

  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: '#C34363',
  },

  scroll: {
    flex: 1,
  },

  content: {
    gap: 12,
    paddingBottom: 12,
  },

  ruleText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.6)',
    lineHeight: 18,
  },

  ruleSpacing: {
    marginTop: 0,
  },

  ruleTerm: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.6)',
  },
});
