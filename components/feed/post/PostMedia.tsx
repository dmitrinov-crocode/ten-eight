import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import PlayIcon from '@/assets/icons/play.svg';
import PlayWithSoundIcon from '@/assets/icons/play_with_sound.svg';
import { borderRadius, colors } from '@/constants/theme';

export type PostMediaType = 'image' | 'video' | 'podcast';

type Props = {
  type: PostMediaType;
  source: ImageSourcePropType;
};

export default function PostMedia({ type, source }: Props) {
  const isVideoOrPodcast = type === 'video' || type === 'podcast';
  
  return (
    <View style={styles.container}>
      <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" />
      {isVideoOrPodcast && <View style={styles.overlay} />}
      {type === 'video' && (
        <View style={styles.playWrapper}>
          <PlayIcon width={24} height={24} />
        </View>
      )}
      {type === 'podcast' && (
        <View style={styles.playWrapper}>
          <PlayWithSoundIcon width={24} height={24} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 343 / 185,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: colors.white7,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black35,
  },
  playWrapper: {
    padding: 4,
    borderRadius: borderRadius.toggle,
  },
});
