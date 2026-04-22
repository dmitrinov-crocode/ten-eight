import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { CommonIcon } from '@/components/common';
import Card from '@/components/fights/fighters/Card';
import { fonts, fontSize } from '@/constants/theme';

type Fighter = {
  image: string;
  name: string;
  odds: string;
  multiplier: string;
};

type FightCard = {
  date: string;
  prize: string;
  time: string;
  fighter1: Fighter;
  fighter2: Fighter;
};

const MOCK_FIGHTS: FightCard[] = [
  {
    date: 'Sat, 4/12',
    prize: '$23.5k',
    time: '13:00',
    fighter1: {
      image: 'https://picsum.photos/seed/fighter1/46/46',
      name: 'Nariman Abbassov',
      odds: '50%',
      multiplier: '1.89x',
    },
    fighter2: {
      image: 'https://picsum.photos/seed/fighter2/46/46',
      name: 'Tank Abbott',
      odds: '50%',
      multiplier: '1.89x',
    },
  },
  {
    date: 'Sat, 4/12',
    prize: '$18k',
    time: '14:30',
    fighter1: {
      image: 'https://picsum.photos/seed/fighter3/46/46',
      name: 'Conor McGregor',
      odds: '60%',
      multiplier: '1.67x',
    },
    fighter2: {
      image: 'https://picsum.photos/seed/fighter4/46/46',
      name: 'Dustin Poirier',
      odds: '40%',
      multiplier: '2.50x',
    },
  },
  {
    date: 'Sat, 4/12',
    prize: '$31k',
    time: '16:00',
    fighter1: {
      image: 'https://picsum.photos/seed/fighter5/46/46',
      name: 'Islam Makhachev',
      odds: '70%',
      multiplier: '1.43x',
    },
    fighter2: {
      image: 'https://picsum.photos/seed/fighter6/46/46',
      name: 'Charles Oliveira',
      odds: '30%',
      multiplier: '3.33x',
    },
  },
];

type Props = {
  title: string;
  list?: FightCard[];
  isOpen: boolean;
  onPress: () => void;
  isLast?: boolean;
};

const Accordion = ({ title, list = MOCK_FIGHTS, isOpen, onPress, isLast = false }: Props) => {
  const [contentHeight, setContentHeight] = useState(0);

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(isOpen ? 180 : 0);

  useEffect(() => {
    height.value = withTiming(isOpen ? contentHeight : 0, { duration: 250 });
    opacity.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
    rotate.value = withTiming(isOpen ? 0 : 180, { duration: 250 });
  }, [isOpen, contentHeight, height, opacity, rotate]);

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
          {list.map((item, i) => (
            <Card key={i} {...item} />
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
});
