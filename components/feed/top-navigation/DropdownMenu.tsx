import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, fonts, fontSize } from '@/constants/theme';

const SOURCE_ITEMS = ['All', 'Official', 'Fighters', 'Media', 'Experts'];

type Props = {
  visible: boolean;
  selectedItem: string;
  anchorPosition: { x: number; y: number };
  onSelect: (item: string) => void;
  onClose: () => void;
};

export default function DropdownMenu({ visible, selectedItem, anchorPosition, onSelect, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.menu, { top: anchorPosition.y + 4, left: anchorPosition.x }]}>
          <View style={styles.headerRow}>
            <Text style={styles.itemText}>{selectedItem}</Text>
            <View style={styles.chevronBox}>
              <Ionicons name="chevron-up" size={20} color={colors.white85} />
            </View>
          </View>

          {SOURCE_ITEMS.slice(1).map((item) => (
            <React.Fragment key={item}>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.itemRow}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    backgroundColor: colors.black85,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.white7,
    paddingTop: 6,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    minWidth: 160,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
  },
  chevronBox: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white7,
    marginRight: -8,
  },
  itemRow: {
    height: 32,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
});
