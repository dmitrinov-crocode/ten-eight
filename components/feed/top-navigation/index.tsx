import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import NavItem from '@/components/fights/top-navigation/Item';

const LIST = [
  { title: 'UFC Event1' },
  { title: 'UFC Event2' },
  { title: 'UFC Event3' },
  { title: 'UFC Event4' },
  { title: 'UFC Event5' },
];

export default function TopNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {LIST.map((item, i) => (
        <NavItem key={i} index={i} item={item} isActive={activeIndex === i} onPress={handlePress} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
  },
});
