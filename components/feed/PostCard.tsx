import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSize } from '@/constants/theme';

export type PostCardItem = {
  id: string;
  type: 'image' | 'video';
  thumbnail: ImageSourcePropType;
  category: string;
  title: string;
  author: string;
  timeAgo: string;
};

export default function PostCard({ item }: { item: PostCardItem }) {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnail}>
        <Image source={item.thumbnail} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        {item.type === 'video' && (
          <>
            <View style={styles.videoOverlay} />
            <Ionicons name="play-circle" size={28} color={colors.whiteSolid} />
          </>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{item.author}</Text>
          <Text style={styles.dot}>⬤</Text>
          <Text style={styles.metaText}>{item.timeAgo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  thumbnail: {
    width: 127,
    height: 85,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.white7,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black40,
  },
  info: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 8,
  },
  category: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white60,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.white85,
    lineHeight: fontSize.xs * 1.4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white30,
  },
  dot: {
    fontFamily: fonts.regular,
    fontSize: 4,
    color: colors.white30,
    lineHeight: fontSize.xs,
  },
});
