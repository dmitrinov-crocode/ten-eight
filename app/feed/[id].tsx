import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import BackIcon from '@/assets/icons/back.svg';
import User1Icon from '@/assets/icons/user1.svg';
import CommentsPanel from '@/components/feed/post/CommentsPanel';
import PostActions from '@/components/feed/post/PostActions';
import PostMedia, { PostMediaType } from '@/components/feed/post/PostMedia';
import { borderRadius, colors, fonts, fontSize, spacing } from '@/constants/theme';

const MOCK_POST = {
  id: '1',
  type: 'image' as PostMediaType,
  thumbnail: { uri: 'https://picsum.photos/seed/mma1/254/170' },
  authorName: 'Hamdy Abdelwah',
  body: `For the first time in more than eight years, UFC returns to the Winnipeg, Manitoba for a Fight Night event at Canada Life Centre this weekend, headlined by a fascinating welterweight matchup between former title challenger Gilbert Burns and ascending Canadian Mike Malott.\n\nNine Canadians are set to make the walk in their home country, including three newcomers, and the card is giving off a real "action is coming" vibe as the week begins, so rather than continue to wax poetic, let's dive into the matchups that are coming your way on Saturday night just down the block from the "Crossroads of Canada."`,
  likesCount: 2,
  commentsCount: 3,
  timeAgo: '3d ago',
};

export default function FeedPostScreen() {
  const [comment, setComment] = useState('');

  const handleSend = () => {
    setComment('');
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <View style={styles.navBar}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                activeOpacity={0.7}
              >
                <BackIcon />
              </TouchableOpacity>

              <View style={styles.authorGroup}>
                <View style={styles.avatarContainer}>
                  <User1Icon width={36} height={36} />
                </View>
                <Text style={styles.authorName}>{MOCK_POST.authorName}</Text>
              </View>
            </View>

            <Text style={styles.body}>{MOCK_POST.body}</Text>
          </View>

          <View style={styles.section}>
            <PostMedia type={MOCK_POST.type} source={MOCK_POST.thumbnail} />
            <PostActions
              likesCount={MOCK_POST.likesCount}
              commentsCount={MOCK_POST.commentsCount}
              timeAgo={MOCK_POST.timeAgo}
            />
          </View>
        </ScrollView>

        <CommentsPanel
          value={comment}
          onChangeText={setComment}
          onSend={handleSend}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black40,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    gap: spacing.xl,
    paddingBottom: spacing.xl,
  },
  section: {
    gap: spacing.base,
    width: '100%',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: '100%',
  },
  backButton: {
    width: 32,
    height: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  authorGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.toggle,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  authorName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
    textAlign: 'right',
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white85,
    lineHeight: fontSize.sm * 1.4,
  },
});
