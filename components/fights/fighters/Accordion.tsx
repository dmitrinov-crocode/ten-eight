import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { CommonIcon } from '@/components/common';
import Card from '@/components/fights/fighters/Card';
import { fonts, fontSize } from '@/constants/theme';
import { FightCard, useUFCMarkets } from '@/hooks/useUFCMarkets';

type Props = {
  title: string;
  isOpen: boolean;
  onPress: () => void;
  isLast?: boolean;
};

const Accordion = ({ title, isOpen, onPress, isLast = false }: Props) => {
  const { fights, loading, error } = useUFCMarkets();
  const [contentHeight, setContentHeight] = useState(0);

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(isOpen ? 180 : 0);

  useEffect(() => {
    height.value = withTiming(isOpen ? contentHeight : 0, { duration: 250 });
    opacity.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
    rotate.value = withTiming(isOpen ? 0 : 180, { duration: 250 });
  }, [isOpen, contentHeight, height, opacity, rotate]);

  // Re-animate when content height changes (e.g. fights loaded)
  useEffect(() => {
    if (isOpen) {
      height.value = withTiming(contentHeight, { duration: 200 });
    }
  }, [contentHeight, isOpen, height]);

  const animatedContent = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    overflow: 'hidden',
  }));

  const animatedArrow = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const list: FightCard[] = fights;

  return (
    <View style={!isOpen && !isLast && styles.bottomBorder}>
      <Pressable onPress={onPress} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={[animatedArrow, { width: 16, height: 16 }]}>
          <CommonIcon name="arrow" size={16} color="rgba(245, 245, 245, 0.6)" />
        </Animated.View>
      </Pressable>

      <Animated.View style={animatedContent}>
        <View
          style={styles.measure}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h !== contentHeight) setContentHeight(h);
          }}
        >
          {loading && (
            <View style={styles.center}>
              <ActivityIndicator color="rgba(245,245,245,0.4)" />
            </View>
          )}

          {!loading && error ? <Text style={styles.errorText}>Failed to load fights</Text> : null}

          {!loading && !error && list.length === 0 && (
            <Text style={styles.emptyText}>No active UFC markets</Text>
          )}

          {list.map((item) => (
            <Card
              key={item.id}
              date={item.date}
              time={item.time}
              prize={item.prize}
              fighter1={item.fighter1}
              fighter2={item.fighter2}
              polyTokenIds={item.polyTokenIds}
              eventName={item.eventName}
              weightClass={item.weightClass}
              cardPosition={item.cardPosition}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245, 245, 245, 0.6)',
  },
  measure: {
    position: 'absolute',
    width: '100%',
    gap: 12,
    paddingBottom: 8,
  },
  center: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(195,67,99,0.7)',
    textAlign: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.3)',
    textAlign: 'center',
    paddingVertical: 16,
  },
});
