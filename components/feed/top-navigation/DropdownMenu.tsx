// import React from 'react';
// import {
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { colors, fonts, fontSize } from '@/constants/theme';

// const SOURCE_ITEMS = ['Official', 'Fighters', 'Media', 'Experts'];

// type Props = {
//   visible: boolean;
//   selectedItem: string;
//   anchorPosition: { x: number; y: number };
//   onSelect: (item: string) => void;
//   onClose: () => void;
// };

// export default function DropdownMenu({
//   visible,
//   selectedItem,
//   anchorPosition,
//   onSelect,
//   onClose,
// }: Props) {
//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="none"
//       onRequestClose={onClose}
//       statusBarTranslucent
//     >
//       <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose}>
//         <Pressable
//           style={[styles.panel, { top: anchorPosition.y, left: anchorPosition.x }]}
//           onPress={() => {}}
//         >
//           <TouchableOpacity
//             style={styles.headerRow}
//             onPress={onClose}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.headerText}>{selectedItem}</Text>
//             <View style={styles.chevronBox}>
//               <Ionicons name="chevron-up" size={20} color={colors.white85} />
//             </View>
//           </TouchableOpacity>

//           {SOURCE_ITEMS.map((item) => (
//             <React.Fragment key={item}>
//               <View style={styles.divider} />
//               <TouchableOpacity
//                 style={styles.itemRow}
//                 onPress={() => {
//                   onSelect(item);
//                   onClose();
//                 }}
//                 activeOpacity={0.7}
//               >
//                 <Text style={styles.itemText}>{item}</Text>
//               </TouchableOpacity>
//             </React.Fragment>
//           ))}
//         </Pressable>
//       </Pressable>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   panel: {
//     position: 'absolute',
//     minWidth: 148,
//     backgroundColor: colors.black85,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.white7,
//     paddingTop: 6,
//     paddingBottom: 12,
//     paddingLeft: 16,
//     paddingRight: 8,
//     gap: 6,
//     shadowColor: colors.blackSolid,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 2,
//     elevation: 4,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   chevronBox: {
//     width: 32,
//     paddingHorizontal: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   divider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: colors.white7,
//     marginLeft: -16,
//     marginRight: -8,
//   },
//   itemRow: {
//     height: 32,
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//     color: colors.white85,
//   },
//   itemText: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//     color: colors.white85,
//   },
// });

import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSize } from '@/constants/theme';

type Props = {
  visible: boolean;
  selectedItem: string;
  anchorPosition: { x: number; y: number };
  menuItems?: string[]; // делаем опциональным с защитой
  onSelect: (item: string) => void;
  onClose: () => void;
};

export default function DropdownMenu({
  visible,
  selectedItem,
  anchorPosition,
  menuItems = [], // значение по умолчанию
  onSelect,
  onClose,
}: Props) {
  // Фильтруем выбранный элемент из списка, чтобы не было дублирования
  const filteredItems = menuItems.filter(item => item !== selectedItem);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose}>
        <Pressable
          style={[styles.panel, { top: anchorPosition.y, left: anchorPosition.x }]}
          onPress={() => {}}
        >
          <TouchableOpacity
            style={styles.headerRow}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.headerText}>{selectedItem}</Text>
            <View style={styles.chevronBox}>
              <Ionicons name="chevron-up" size={20} color={colors.white85} />
            </View>
          </TouchableOpacity>

          {filteredItems.map((item, index) => (
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    minWidth: 148,
    backgroundColor: colors.black85,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.white7,
    paddingTop: 6,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 8,
    gap: 6,
    shadowColor: colors.blackSolid,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chevronBox: {
    width: 32,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white7,
    marginLeft: -16,
    marginRight: -8,
  },
  itemRow: {
    height: 32,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
  itemText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
});