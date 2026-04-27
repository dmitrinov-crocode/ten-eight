import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/theme';
import { SearchInput } from '@/components/feed/search/SearchInput';
import { SearchResultItem } from '@/components/feed/search/SearchResultItem';

const MOCK_RESULTS = [
  {
    id: '1',
    title: 'The Bigger Picture | UFC 327',
    description: 'Nine Canadians are set to make the walk in their hometown this weekend.',
  },
  {
    id: '2',
    title: 'Fight By Fight Preview | UFC Winnipeg',
    description:
      'For the first time in more than eight years, UFC returns to the Winnipeg, Manitoba for a Fight Night event at Canada Life Centre this weekend.',
  },
  {
    id: '3',
    title: 'UFC And Crypto.Com Team Up For Historic White House Event, UFC Freedom 250 - Co-Presented By Crypto.Com',
    description:
      'And the card is giving off a real "action is coming" vibe as the week begins, so rather than continue to wax poetic, let\'s dive into the matchups.',
  },
  {
    id: '4',
    title: 'Dana White Talks UFC 327, Lewis vs Hokit Added To White House Card, Gable Steveson, Kayla Harrison And More',
    description: 'Saturday night just down the block from the "Crossroads of Canada."',
  },
];

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.topSection}>
        <SearchInput value={search} onChangeText={setSearch} onClose={handleClose} />
        <View style={styles.divider} />
      </View>
      {search.length > 0 && (
        <ScrollView
          style={styles.resultsScroll}
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_RESULTS.map((item) => (
            <SearchResultItem key={item.id} title={item.title} description={item.description} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.blackSolid,
  },
  topSection: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  divider: {
    width: 343,
    height: 1,
    backgroundColor: colors.white7,
  },
  resultsScroll: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
});
