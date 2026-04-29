import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts, fontSize } from '@/constants/theme';

type TProps = {
  data: {
    image: string;
    name: string;
    stats: string;
    enemy: string;
  };
};

const Card = ({ data }: TProps) => {
  const { image, name, stats, enemy } = data;
  return (
    <Pressable onPress={() => console.log('click')}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.stats}>{stats}</Text>
        <Text style={styles.enemy}>vs {enemy}</Text>
      </View>
    </Pressable>
  );
};

Card.displayName = 'Card';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
    backgroundColor: 'rgba(13, 13, 13, 0.35)',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    minWidth: 140,
  },
  image: {
    width: 60,
    height: 60,
    // borderRadius: 1000,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245, 245, 245, 0.85)',
    marginBottom: 2,
  },
  stats: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.6)',
    marginBottom: 12,
  },
  enemy: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.3)',
  },
});

export default Card;
