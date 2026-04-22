import { useThemedStyles } from '@/hooks/useThemedStyles';
import { tabBarHeight } from '@/constants/theme';
import Animated from 'react-native-reanimated';
import Tab, { TTab } from '@/components/bottomNavigation/Tab';
import React from 'react';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type TProps = {
  state: any;
  navigation: any;
  tabs: TTab[];
};

export default function Navigation({ state, navigation, tabs }: TProps) {
  const styles = useThemedStyles(
    (theme) => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: 10,
      height: tabBarHeight,
      borderRadius: 60,
      backgroundColor: 'rgba(13, 13, 13, 0.5)',
      borderWidth: 1,
      borderColor: theme['color-1'] + '08',
      overflow: 'hidden' as const,
      position: 'absolute' as const,
      bottom: 33,
      width: SCREEN_WIDTH - 40,
      marginHorizontal: 20,
      boxShadow: '0px 4px 10px 0px rgba(13, 13, 13, 0.15)',
    }),
    { animated: true },
  );

  return (
    <Animated.View style={styles}>
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;

        const tab = tabs.find((t: TTab) => t.name === route.name);
        if (!tab) return null;

        return (
          <Tab
            key={route.key}
            tab={tab}
            focused={focused}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </Animated.View>
  );
}
