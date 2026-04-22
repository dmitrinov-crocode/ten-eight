import { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { themes } from '@/constants/theme';
import { AnimatedStyle } from 'react-native-reanimated';

type StylesCallback<T> = (theme: typeof themes.light) => T;

export function useThemedStyles<T extends Record<string, any>>(
  callback: StylesCallback<T>,
  options?: { animated?: boolean },
): T | AnimatedStyle<ViewStyle> {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return useMemo(() => {
    const styles = callback(currentTheme);
    if (options?.animated) {
      return styles as AnimatedStyle<ViewStyle>;
    } else {
      return StyleSheet.create(styles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, options?.animated]);
}
