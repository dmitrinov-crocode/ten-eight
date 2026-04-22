import React, { memo, useEffect } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts, fontSize } from '@/constants/theme';

type TProps = {
  item: { title: string };
  isActive: boolean;
  index: number;
  onPress: (index: number) => void;
};

const NavItem = memo(({ item, isActive, index, onPress }: TProps) => {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 250 });
  }, [isActive, progress]);

  const animatedBgStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.98 + progress.value * 0.02 }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [
        'linear-gradient(90deg, rgba(203, 255, 0, 0.4) 0%, rgba(7, 244, 153, 0.4) 100%)',
        'rgba(13, 13, 13, 0.85)',
      ],
    ),
  }));

  const handlePress = () => onPress(index);

  return (
    <Pressable onPress={handlePress}>
      <View style={[isActive && styles.activeShadow]}>
        <View style={styles.itemContainer}>
          <Animated.View style={[StyleSheet.absoluteFillObject, animatedBgStyle]}>
            <LinearGradient
              colors={['#CBFF00', '#07F499']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>

          <Animated.Text style={[styles.text, animatedTextStyle]}>{item.title}</Animated.Text>
        </View>
      </View>
    </Pressable>
  );
});

NavItem.displayName = 'NavItem';

const styles = StyleSheet.create({
  activeShadow: {
    shadowColor: 'rgb(109, 251, 72)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(13, 13, 13, 0.3)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(203, 255, 0, 0.4)',
    overflow: 'hidden',
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
});

export default NavItem;
