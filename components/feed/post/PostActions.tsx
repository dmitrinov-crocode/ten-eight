import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessageSquareIcon from '@/assets/icons/message-square.svg';
import SendLikeIcon from '@/assets/icons/send_like.svg';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

type Props = {
  likesCount: number;
  commentsCount: number;
  timeAgo: string;
};

export default function PostActions({ likesCount, commentsCount, timeAgo }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftActions}>
        <View style={styles.actionFrame}>
          <View style={styles.likeIcon}>
            <SendLikeIcon width={32} height={32} />
          </View>
          <Text style={styles.count}>{likesCount}</Text>
        </View>

        <View style={styles.actionFrame}>
          <View style={styles.commentIconFlipped}>
            <View style={styles.commentIconInner}>
              <MessageSquareIcon width={24} height={24} />
            </View>
          </View>
          <Text style={styles.count}>{commentsCount}</Text>
        </View>
      </View>

      <Text style={styles.timeAgo}>{timeAgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  likeIcon: {
    width: 32,
    height: 32,
  },
  commentIconFlipped: {
    transform: [{ scaleX: -1 }],
  },
  commentIconInner: {
    width: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white50,
  },
  timeAgo: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white50,
  },
});
