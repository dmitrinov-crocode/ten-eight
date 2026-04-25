import React, { memo, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, fontSize } from '@/constants/theme';

type Props = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const FilterItem = memo(({ title, isActive, onPress }: Props) => {
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 200 });
  }, [isActive, progress]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [colors.green40Start, colors.black85]),
  }));

  return (
    <Pressable onPress={onPress}>
      <View style={isActive ? styles.shadowWrapper : undefined}>
        <View style={[styles.container, isActive && styles.containerActive]}>
          {isActive && (
            <LinearGradient
              colors={['#CBFF00', '#07F499']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <Animated.Text style={[styles.text, animatedTextStyle]}>{title}</Animated.Text>
        </View>
      </View>
    </Pressable>
  );
});

FilterItem.displayName = 'FilterItem';

export default FilterItem;

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: 'rgb(109, 251, 72)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 30,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.black30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(203, 255, 0, 0.4)',
    overflow: 'hidden',
  },
  containerActive: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
});
