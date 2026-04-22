import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fonts, fontSize } from '@/constants/theme';
import Card from '@/components/fights/favorites/Card';

const LIST = [
  { id: 1, image: '', name: 'Emma Li', stats: '19-0-0', enemy: 'Emmett' },
  { id: 2, image: '', name: 'John Vel', stats: '19-0-0', enemy: 'Evan' },
  { id: 3, image: '', name: 'Emma Li', stats: '19-0-0', enemy: 'Emmett' },
  { id: 4, image: '', name: 'John Vel', stats: '19-0-0', enemy: 'Evan' },
  { id: 5, image: '', name: 'Emma Li', stats: '19-0-0', enemy: 'Emmett' },
  { id: 6, image: '', name: 'John Vel', stats: '19-0-0', enemy: 'Evan' },
];

export const Favorites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Favorites</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {LIST.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    marginTop: 30,
    marginBottom: 20,
    color: 'rgba(217, 217, 217, 1)',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
