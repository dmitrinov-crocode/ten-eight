import { useState, useMemo } from 'react';
import { ScreenContainer } from '@/components';
import TopNavigation from '@/components/feed/top-navigation';
import PostCard, { PostCardItem } from '@/components/feed/PostCard';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

const MOCK_POSTS: PostCardItem[] = [
  {
    id: '1',
    type: 'image',
    thumbnail: { uri: 'https://picsum.photos/seed/mma1/254/170' },
    category: 'MMA',
    title: 'Nariman Abbassov VS Hamdy Abdelwah',
    author: 'Ivan John',
    timeAgo: '2d ago',
  },
  {
    id: '2',
    type: 'podcast',
    thumbnail: { uri: 'https://picsum.photos/seed/ufc2/254/170' },
    category: 'UFC',
    title: 'Fight By Fight Preview | UFC Winnipeg',
    author: 'Hamdy Abdelwah',
    timeAgo: '3d ago',
  },
  {
    id: '3',
    type: 'video',
    thumbnail: { uri: 'https://picsum.photos/seed/ufc3/254/170' },
    category: 'UFC',
    title: 'UFC And Crypto.Com Team Up For Historic White House Event, UFC Freedom 250 - Co-Presented By Crypto.Com',
    author: 'Ivan John',
    timeAgo: '5d ago',
  },
  {
    id: '4',
    type: 'image',
    thumbnail: { uri: 'https://picsum.photos/seed/mma4/254/170' },
    category: 'MMA',
    title: 'Dana White Talks UFC 327, Lewis vs Hokit Added To White House Card, Gable Steveson, Kayla Harrison And More',
    author: 'Hamdy Abdelwah',
    timeAgo: '1w ago',
  },
  {
    id: '5',
    type: 'image',
    thumbnail: { uri: 'https://picsum.photos/seed/ufc5/254/170' },
    category: 'UFC',
    title: 'The Bigger Picture | UFC 327',
    author: 'Ivan John',
    timeAgo: '2w ago',
  },
];

const getFilteredPosts = (posts: PostCardItem[], filterType: string) => {
  switch (filterType) {
    case 'Articles':
      return posts.filter(post => post.type === 'image');
    case 'Videos':
      return posts.filter(post => post.type === 'video');
    case 'Podcasts':
      return posts.filter(post => post.type === 'podcast');
    case 'All':
    default:
      return posts;
  }
};

export default function PicksScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = useMemo(() => {
    return getFilteredPosts(MOCK_POSTS, activeFilter);
  }, [activeFilter]);

  const onSearchPress = () => {
        router.push(`../feed/search`);
  };

  return (
    <ScreenContainer title="Feed" scrollable onSearchPress={onSearchPress}>
      <View style={styles.wrapper}>
        <TopNavigation 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Stories</Text>
        </View>

        <View style={styles.cardsWrapper}>
          <View style={styles.cardsContainer}>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} item={post} />
            ))}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.base,
  },
  sectionHeader: {
    paddingHorizontal: 22,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  cardsWrapper: {
    paddingHorizontal: 8,
  },
  cardsContainer: {
    backgroundColor: colors.black40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.white7,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xl,
    gap: spacing.xl,
  },
});
