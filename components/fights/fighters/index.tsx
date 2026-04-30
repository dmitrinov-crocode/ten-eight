import { StyleSheet, Text, View } from 'react-native';
import { fonts, fontSize } from '@/constants/theme';
import { useState } from 'react';
import Accordion from '@/components/fights/fighters/Accordion';

export default function Fighters() {
  const [activeAccordion, setActiveAccordion] = useState<null | string>('Main Card');

  const handlePress = (title: string) => {
    setActiveAccordion((prev) => (prev === title ? null : title));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming fights</Text>
      <View style={styles.content}>
        <Accordion
          title="Main Card"
          isOpen={activeAccordion === 'Main Card'}
          onPress={() => handlePress('Main Card')}
        />
        {/*<Accordion*/}
        {/*  title="Prelims"*/}
        {/*  isOpen={activeAccordion === 'Prelims'}*/}
        {/*  onPress={() => handlePress('Prelims')}*/}
        {/*/>*/}
        {/*<Accordion*/}
        {/*  title="Early Prelims"*/}
        {/*  isOpen={activeAccordion === 'Early Prelims'}*/}
        {/*  onPress={() => handlePress('Early Prelims')}*/}
        {/*  isLast*/}
        {/*/>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: 'rgba(245, 245, 245, 0.85)',
    marginBottom: 14,
    paddingLeft: 6,
  },
  content: {
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
    borderRadius: 12,
    backgroundColor: 'rgba(13, 13, 13, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'column',
  },
});
