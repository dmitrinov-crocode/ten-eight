import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import League from '@/assets/icons/league.svg';
import Globe from '@/assets/icons/globe.svg';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

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

function LeaguePopup({ league, visible, onClose }: { league: LeagueData | null; visible: boolean; onClose: () => void }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.popupSheet} onPress={() => {}}>
          <View style={styles.popupHandle} />
          <View style={styles.popupHeader}>
            <View style={styles.leagueIconWrapper}>
              <League width={36} height={36} />
            </View>
            <View style={styles.leagueInfo}>
              <Text style={styles.popupTitle}>{league?.name ?? ''}</Text>
              <Text style={styles.leagueMembers}>{league?.members ?? 0} Members</Text>
            </View>
            <View style={styles.globeWrapper}>
              <Globe width={20} height={20} color={colors.white50} />
            </View>
          </View>
          <View style={styles.popupPlaceholder}>
            <Text style={styles.popupPlaceholderText}>League details coming soon</Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupSheet: {
    backgroundColor: colors.darkBlueBg,
    borderTopLeftRadius: borderRadius.modal,
    borderTopRightRadius: borderRadius.modal,
    borderWidth: 1,
    borderColor: colors.white7,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing['2xl'],
    paddingTop: spacing.md,
    gap: spacing.base,
  },
  popupHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white30,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  popupTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  globeWrapper: {
    marginLeft: 'auto',
  },
  popupPlaceholder: {
    height: 120,
    backgroundColor: colors.white3,
    borderRadius: borderRadius.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.white7,
  },
  popupPlaceholderText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white50,
  },
});
