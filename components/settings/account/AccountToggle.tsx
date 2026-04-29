import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, animation } from '@/constants/theme';

const TOGGLE_WIDTH = 56;
const TOGGLE_HEIGHT = 31;
const THUMB_SIZE = 19;
const TOGGLE_PADDING = 6;
const THUMB_TRAVEL = TOGGLE_WIDTH - TOGGLE_PADDING * 2 - THUMB_SIZE;

type TProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function AccountToggle({ value, onValueChange }: TProps) {
  const translateX = useRef(new Animated.Value(value ? THUMB_TRAVEL : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? THUMB_TRAVEL : 0,
      useNativeDriver: true,
      damping: animation.spring.damping,
      stiffness: animation.spring.stiffness,
    }).start();
  }, [value]);

  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} activeOpacity={0.8}>
      <View style={styles.container}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
          {value ? (
            <LinearGradient
              colors={[colors.greenStart, colors.greenEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.thumbFill}
            />
          ) : (
            <View style={[styles.thumbFill, styles.thumbOff]} />
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: TOGGLE_HEIGHT / 2,
    backgroundColor: colors.white7,
    padding: TOGGLE_PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    overflow: 'hidden',
  },
  thumbFill: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
  thumbOff: {
    backgroundColor: colors.white50,
  },
});
