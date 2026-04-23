import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
} from '@expo-google-fonts/geist';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { StyleSheet, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ImageBackground
          source={require('@/assets/backgrounds/main-bg.png')}
          style={StyleSheet.absoluteFill}
          contentFit="fill"
        >
          <Stack
            initialRouteName="auth/get-started"
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              contentStyle: { backgroundColor: 'transparent' },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="auth/get-started" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="fight/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
          </Stack>
        </ImageBackground>
      </View>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
