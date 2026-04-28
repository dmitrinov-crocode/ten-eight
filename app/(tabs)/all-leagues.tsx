import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components';
import League from '@/assets/icons/league.svg';
import Back from '@/assets/icons/back.svg';
import Logout from '@/assets/icons/logout.svg';
import LeaguePopup, { LeagueData } from '@/components/fantasy/all-leagues/LeaguePopup';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

const JOINED_LEAGUES: LeagueData[] = [
  { id: '1', name: 'NameOftheLeague', members: 23 },
  { id: '2', name: 'League Name very Long Name SO', members: 4 },
  { id: '3', name: 'League Name', members: 8 },
];

const AVAILABLE_LEAGUES: LeagueData[] = [
  { id: '4', name: 'League Name1', members: 23, isPrivate: false },
  { id: '5', name: 'League Name2', members: 23, isPrivate: false },
  { id: '6', name: 'League Name3', members: 23, isPrivate: true },
];

export default function AllLeaguesScreen() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastAnim = useRef(new Animated.Value(0)).current;

  const showToast = () => {
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2500),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  };

  const openPopup = (league: LeagueData) => {
    setSelectedLeague(league);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedLeague(null);
  };

  const handleJoin = () => {
    closePopup();
    router.push('/(tabs)/league');
  };

  const handleRequestAccess = () => {
    closePopup();
    showToast();
  };

  const onSearchPress = () => {
          router.push(`../feed/search`);
  };

  return (
    <View style={styles.screenWrapper}>
      <ScreenContainer title="Leagues" scrollable onSearchPress={onSearchPress}>
        <View style={styles.container}>
          <View style={styles.alreadyJoinedSection}>
            <View style={styles.alreadyJoinedCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionHeaderText}>Already Joined</Text>
                <View
                  style={[
                    styles.chevronContainer,
                    { transform: [{ rotate: isExpanded ? '90deg' : '-90deg' }] },
                  ]}
                >
                  <Back />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.joinedLeaguesList}>
                    {JOINED_LEAGUES.map((league) => (
                      <TouchableOpacity
                        key={league.id}
                        style={styles.leagueCard}
                        onPress={() => router.push('/(tabs)/league')}
                        activeOpacity={0.7}
                      >
                        <View style={styles.leagueCardInner}>
                          <View style={styles.leagueIconContainer}>
                            <League width={36} height={36} />
                          </View>
                          <View style={styles.leagueInfo}>
                            <Text style={styles.leagueName} numberOfLines={1}>
                              {league.name}
                            </Text>
                            <Text style={styles.leagueMembers}>
                              {league.members} Members
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={styles.joinSection}>
            <View style={styles.joinSectionTitleWrapper}>
              <Text style={styles.joinSectionTitle}>Join a League</Text>
            </View>
            <View style={styles.joinLeaguesList}>
              {AVAILABLE_LEAGUES.map((league) => (
                <TouchableOpacity
                  key={league.id}
                  style={styles.joinLeagueCard}
                  onPress={() => openPopup(league)}
                  activeOpacity={0.7}
                >
                  <View style={styles.leagueCardInner}>
                    <View style={styles.leagueIconContainer}>
                      <League width={36} height={36} />
                    </View>
                    <View style={styles.leagueInfo}>
                      <Text style={styles.leagueName} numberOfLines={1}>
                        {league.name}
                      </Text>
                      <Text style={styles.leagueMembers}>
                        {league.members} Members
                      </Text>
                    </View>
                  </View>
                  <View style={styles.logoutButton}>
                    <View style={styles.logoutIconContainer}>
                      <Logout width={14} height={13} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScreenContainer>

      {toastVisible && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toast,
            {
              opacity: toastAnim,
              transform: [
                {
                  translateY: toastAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.toastText}>Request has been saved</Text>
        </Animated.View>
      )}

      <LeaguePopup
        league={selectedLeague}
        visible={popupVisible}
        onClose={closePopup}
        isPrivate={selectedLeague?.isPrivate}
        onJoin={handleJoin}
        onRequestAccess={handleRequestAccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  container: {
    gap: spacing.xl,
  },

  alreadyJoinedSection: {
    paddingHorizontal: spacing['md+'],
  },
  alreadyJoinedCard: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    padding: spacing.base,
    gap: spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.whiteSolid,
  },
  chevronContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: colors.white7,
  },
  joinedLeaguesList: {
    gap: spacing['sm+'],
  },

  leagueCard: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  leagueCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    flex: 1,
  },
  leagueIconContainer: {
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

  joinSection: {
    paddingHorizontal: spacing.base,
    gap: spacing.base,
  },
  joinSectionTitleWrapper: {
    paddingHorizontal: spacing.xxs,
  },
  joinSectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.whiteSolid,
  },
  joinLeaguesList: {
    gap: spacing.sm,
  },
  joinLeagueCard: {
    backgroundColor: colors.black40,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  logoutButton: {
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white3,
    height: 44,
    paddingHorizontal: spacing.xxs,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoutIconContainer: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
  },

  toast: {
    position: 'absolute',
    top: spacing.base,
    left: spacing.base,
    right: spacing.base,
    backgroundColor: colors.white7,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.button,
    padding: spacing.base,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toastText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: colors.white85,
    flex: 1,
  },
});
