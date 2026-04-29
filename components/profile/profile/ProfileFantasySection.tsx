// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Pressable,
// } from 'react-native';
// import League from '@/assets/icons/league.svg';
// import Globe from '@/assets/icons/globe.svg';
// import { LinearGradient } from 'expo-linear-gradient';
// import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

// type LeagueData = {
//   id: string;
//   name: string;
//   members: number;
// };

// const LEAGUES: LeagueData[] = [
//   { id: '1', name: 'HiLea', members: 23 },
//   { id: '2', name: 'Names Leagues Long Name So', members: 4 },
//   { id: '3', name: 'Names Leagues Long Name So', members: 4 },
// ];

// function LeagueCard({ league, onPress }: { league: LeagueData; onPress: () => void }) {
//   return (
//     <TouchableOpacity style={styles.leagueCard} onPress={onPress} activeOpacity={0.7}>
//       <View style={styles.leagueContent}>
//         <View style={styles.leagueIconWrapper}>
//           <League width={36} height={36} />
//         </View>
//         <View style={styles.leagueInfo}>
//           <Text style={styles.leagueName} numberOfLines={1}>{league.name}</Text>
//           <Text style={styles.leagueMembers}>{league.members} Members</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }

// function LeaguePopup({ league, visible, onClose }: { league: LeagueData | null; visible: boolean; onClose: () => void }) {
//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <Pressable style={styles.modalOverlay} onPress={onClose}>
//         <Pressable style={styles.popupSheet} onPress={() => {}}>
//           <View style={styles.popupHandleContainer}>
//             <View style={styles.popupHandle} />
//           </View>
//           <View style={styles.popupContent}>
//             <View style={styles.popupTopSection}>
//               <View style={styles.popupHeader}>
//                 <View style={styles.leagueIconWrapper}>
//                   <League width={36} height={36} />
//                 </View>
//                 <Text style={styles.popupTitle}>{league?.name ?? ''}</Text>
//               </View>
//               <View style={styles.popupTagsSection}>
//                 <View style={styles.popupTagsRow}>
//                   <View style={styles.popupTag}>
//                     <Text style={styles.popupTagText}>Main Card</Text>
//                   </View>
//                   <View style={styles.popupTag}>
//                     <Text style={styles.popupTagText}>Money Line</Text>
//                   </View>
//                   <View style={styles.popupTag}>
//                     <Text style={styles.popupTagText}>One Card</Text>
//                   </View>
//                 </View>
//                 <View style={styles.popupDescription}>
//                   <Text style={styles.popupDescriptionText}>
//                     {'Welcome to Our League!\n\nNo rules here\n\nHave fun!'}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.popupDivider} />
//             <View style={styles.popupFooter}>
//               <View style={styles.popupInfoRow}>
//                 <View style={styles.popupInfoLeft}>
//                   <View style={styles.popupGlobeContainer}>
//                     <Globe width={24} height={24} />
//                   </View>
//                   <View style={styles.popupInfoText}>
//                     <Text style={styles.popupInfoTitle}>Public League</Text>
//                     <Text style={styles.popupInfoSubtitle}>{league?.members ?? 0} Members</Text>
//                   </View>
//                 </View>
//                 <View style={styles.popupTimeLeft}>
//                   <Text style={styles.popupTimeLeftText}>Time Left: 6d</Text>
//                 </View>
//               </View>
//               <LinearGradient
//                 colors={[colors.greenStart, colors.greenEnd]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.popupJoinButton}
//               >
//                 <Text style={styles.popupJoinButtonText}>Join</Text>
//               </LinearGradient>
//             </View>
//           </View>
//         </Pressable>
//       </Pressable>
//     </Modal>
//   );
// }

// export default function ProfileFantasySection() {
//   const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
//   const [popupVisible, setPopupVisible] = useState(false);

//   const handleLeaguePress = (league: LeagueData) => {
//     setSelectedLeague(league);
//     setPopupVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       {LEAGUES.map((league) => (
//         <LeagueCard
//           key={league.id}
//           league={league}
//           onPress={() => handleLeaguePress(league)}
//         />
//       ))}
//       <LeaguePopup
//         league={selectedLeague}
//         visible={popupVisible}
//         onClose={() => setPopupVisible(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.black40,
//     borderWidth: 1,
//     borderColor: colors.white7,
//     borderRadius: borderRadius.button,
//     paddingHorizontal: spacing.base,
//     paddingVertical: spacing.lg,
//     gap: spacing.md,
//     width: '100%',
//   },
//   leagueCard: {
//     backgroundColor: colors.white3,
//     borderWidth: 1,
//     borderColor: colors.white3,
//     borderRadius: borderRadius.button,
//     paddingHorizontal: spacing.base,
//     paddingVertical: spacing.md,
//   },
//   leagueContent: {
//     flexDirection: 'row',
//     gap: spacing.md,
//     alignItems: 'center',
//     paddingVertical: spacing.sm,
//   },
//   leagueIconWrapper: {
//     width: 36,
//     height: 36,
//     borderRadius: borderRadius.toggle,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0,
//   },
//   leagueInfo: {
//     flex: 1,
//     gap: 2,
//     minWidth: 0,
//   },
//   leagueName: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.base,
//     color: colors.white85,
//   },
//   leagueMembers: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.xs,
//     color: colors.white30,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   popupSheet: {
//     backgroundColor: colors.black85,
//     borderTopLeftRadius: borderRadius.toggle,
//     borderTopRightRadius: borderRadius.toggle,
//     paddingHorizontal: spacing.base,
//     paddingBottom: spacing['2xl'],
//     paddingTop: spacing.md,
//     shadowColor: colors.blackSolid,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.25,
//     shadowRadius: 2,
//     elevation: 4,
//   },
//   popupHandleContainer: {
//     alignItems: 'center',
//     paddingBottom: spacing.md,
//   },
//   popupHandle: {
//     width: 80,
//     height: 4,
//     borderRadius: borderRadius.pill,
//     backgroundColor: colors.white20,
//   },
//   popupContent: {
//     paddingHorizontal: spacing.sm,
//     gap: spacing.base,
//   },
//   popupTopSection: {
//     gap: spacing.base,
//   },
//   popupHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.md,
//   },
//   popupTitle: {
//     fontFamily: fonts.semibold,
//     fontSize: fontSize.lg,
//     color: colors.white85,
//     flex: 1,
//   },
//   popupTagsSection: {
//     gap: spacing.md,
//   },
//   popupTagsRow: {
//     flexDirection: 'row',
//     gap: spacing.xxs,
//   },
//   popupTag: {
//     backgroundColor: colors.white3,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.xxs,
//     borderRadius: borderRadius.xs,
//   },
//   popupTagText: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.xs,
//     color: colors.white50,
//   },
//   popupDescription: {
//     backgroundColor: colors.white7,
//     borderRadius: borderRadius.card,
//     paddingLeft: spacing.md,
//     paddingRight: spacing.sm,
//     paddingVertical: spacing.md,
//   },
//   popupDescriptionText: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.sm,
//     color: colors.white60,
//   },
//   popupDivider: {
//     height: 1,
//     backgroundColor: colors.white7,
//   },
//   popupFooter: {
//     gap: spacing.md,
//   },
//   popupInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: spacing.md,
//   },
//   popupInfoLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.sm,
//   },
//   popupGlobeContainer: {
//     width: 32,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: spacing.xs,
//   },
//   popupInfoText: {
//     gap: 2,
//   },
//   popupInfoTitle: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//     color: colors.white85,
//   },
//   popupInfoSubtitle: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.xs,
//     color: colors.white30,
//   },
//   popupTimeLeft: {
//     backgroundColor: colors.white3,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.xxs,
//     borderRadius: borderRadius.xs,
//   },
//   popupTimeLeftText: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.xs,
//     color: colors.white50,
//   },
//   popupJoinButton: {
//     borderRadius: borderRadius.toggle,
//     paddingVertical: spacing.md,
//     paddingHorizontal: spacing.base,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: colors.greenGlow,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   popupJoinButtonText: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//     color: colors.black85,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import League from '@/assets/icons/league.svg';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';
import LeaguePopup from '../popup/LeaguePopup';

type LeagueData = {
  id: string;
  name: string;
  members: number;
};

const LEAGUES: LeagueData[] = [
  { id: '1', name: 'HiLea', members: 23 },
  { id: '2', name: 'Names Leagues Long Name So', members: 4 },
  { id: '3', name: 'Names Leagues Long Name So', members: 4 },
];

function LeagueCard({ league, onPress }: { league: LeagueData; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.leagueCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.leagueContent}>
        <View style={styles.leagueIconWrapper}>
          <League width={36} height={36} />
        </View>
        <View style={styles.leagueInfo}>
          <Text style={styles.leagueName} numberOfLines={1}>{league.name}</Text>
          <Text style={styles.leagueMembers}>{league.members} Members</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ProfileFantasySection() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleLeaguePress = (league: LeagueData) => {
    setSelectedLeague(league);
    setPopupVisible(true);
  };

  return (
    <View style={styles.container}>
      {LEAGUES.map((league) => (
        <LeagueCard
          key={league.id}
          league={league}
          onPress={() => handleLeaguePress(league)}
        />
      ))}
      <LeaguePopup
        league={selectedLeague}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    width: '100%',
  },
  leagueCard: {
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white3,
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  leagueContent: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  leagueIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.toggle,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  leagueInfo: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  leagueName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  leagueMembers: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.white30,
  },
});