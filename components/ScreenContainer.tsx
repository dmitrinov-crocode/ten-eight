import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './Header';
import { tabBarHeight } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TProps = {
  title: string;
  children: React.ReactNode;
  scrollable?: boolean;
  onSearchPress?: () => void;
};

export default function ScreenContainer({ title, children, scrollable = false, onSearchPress }: TProps) {
  const insets = useSafeAreaInsets();
  const Container = scrollable ? ScrollView : View;

  return (
    <View style={styles.container}>
      <Header title={title} onSearchPress={onSearchPress} />
      <Container
        style={styles.content}
        contentContainerStyle={
          scrollable
            ? [styles.scrollContent, { paddingBottom: tabBarHeight + insets.bottom + 20 }]
            : undefined
        }
      >
        <View
          style={
            !scrollable ? { flex: 1, paddingBottom: tabBarHeight + insets.bottom + 20 } : undefined
          }
        >
          {children}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
