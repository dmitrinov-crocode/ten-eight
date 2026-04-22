import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonIcon } from '@/components/common';
import { IconName } from '@/components/common/CommonIcon';
import { fonts, fontSize } from '@/constants/theme';

export type TTab = {
  name: string;
  route: string;
  icon: IconName;
  label: string;
};

type TProps = {
  tab: TTab;
  focused: boolean;
  onPress: () => void;
};

const DURATION = 250;

export default function Tab({ tab, focused, onPress }: TProps) {
  const textOpacity = useSharedValue(focused ? 1 : 0);
  const flex = useSharedValue(focused ? 2 : 1);
  const paddingLeft = useSharedValue(focused ? 12 : 6);
  const paddingRight = useSharedValue(focused ? 16 : 6);

  useEffect(() => {
    textOpacity.value = withTiming(focused ? 1 : 0, { duration: DURATION });
    flex.value = withTiming(focused ? 2 : 1, { duration: DURATION });
    paddingLeft.value = withTiming(focused ? 12 : 6, { duration: DURATION });
    paddingRight.value = withTiming(focused ? 16 : 6, { duration: DURATION });
  }, [flex, focused, paddingLeft, paddingRight, textOpacity]);

  const containerStyle = useAnimatedStyle(() => ({
    flexGrow: flex.value,
    height: 44,
    maxHeight: 44,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingLeft: paddingLeft.value,
    paddingRight: paddingRight.value,
    paddingVertical: 6,
    borderRadius: 30,
    ...(focused
      ? {
          shadowColor: '#6DFB48',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
        }
      : {}),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    marginLeft: 4,
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(13, 13, 13, 0.85)',
  }));

  return (
    <Pressable onPress={onPress} style={{ flexGrow: 1, alignItems: 'center' }}>
      <Animated.View style={containerStyle}>
        {focused && (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 30,
              overflow: 'hidden',
            }}
          >
            <LinearGradient
              colors={['#CBFF00', '#07F499']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        )}
        <CommonIcon
          name={tab.icon}
          size={24}
          color={focused ? 'rgba(13, 13, 13, 1)' : 'rgba(245, 245, 245, 0.6)'}
        />
        {focused && <Animated.Text style={labelStyle}>{tab.label}</Animated.Text>}
      </Animated.View>
    </Pressable>
  );
}
