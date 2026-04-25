import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import FilterItem from './Item';
import DropdownMenu from './DropdownMenu';
import { colors, fonts, fontSize } from '@/constants/theme';

const FILTER_ITEMS = ['All', 'Articles', 'Videos', 'Podcasts'];

export default function TopNavigation() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSource, setSelectedSource] = useState('All');
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });
  const dropdownButtonRef = useRef<View>(null);

  const handleDropdownPress = useCallback(() => {
    dropdownButtonRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
      setAnchorPosition({ x: pageX, y: pageY + _h });
      setDropdownVisible(true);
    });
  }, []);

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View ref={dropdownButtonRef} collapsable={false}>
          <TouchableOpacity onPress={handleDropdownPress} activeOpacity={0.85}>
            <View style={styles.dropdownShadow}>
              <LinearGradient
                colors={['#CBFF00', '#07F499']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.dropdownButton}
              >
                <Animated.Text style={styles.dropdownText}>{selectedSource}</Animated.Text>
                <View style={styles.chevronContainer}>
                  <Ionicons
                    name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.black85}
                  />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        {FILTER_ITEMS.map((item, i) => (
          <FilterItem
            key={item}
            title={item}
            isActive={activeFilter === i}
            onPress={() => setActiveFilter(i)}
          />
        ))}
      </ScrollView>

      <DropdownMenu
        visible={dropdownVisible}
        selectedItem={selectedSource}
        anchorPosition={anchorPosition}
        onSelect={setSelectedSource}
        onClose={() => setDropdownVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  dropdownShadow: {
    shadowColor: 'rgb(109, 251, 72)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 30,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 6,
    borderRadius: 30,
    overflow: 'hidden',
  },
  dropdownText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.black85,
  },
  chevronContainer: {
    width: 32,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
