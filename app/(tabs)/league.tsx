import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { gradients, spacing, tabBarHeight } from '@/constants/theme';
import Header from '@/components/fantasy/league-main/Header';
import SectionSelector, { LeagueTab } from '@/components/fantasy/league-main/SectionSelector';
import HomeSection from '@/components/fantasy/league-main/HomeSection';
import LeaderboardSection from '@/components/fantasy/league-main/LeaderboardSection';
import FightsSection from '@/components/fantasy/league-main/FightsSection';
import Popup from '@/components/fantasy/league-main/Popup';

export default function LeagueScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<LeagueTab>('Home');
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <LinearGradient
      colors={gradients.authBg.colors}
      locations={gradients.authBg.locations}
      start={gradients.authBg.start}
      end={gradients.authBg.end}
      style={styles.container}
    >
      <Header
        title="NameOftheLeague"
        paddingTop={insets.top + spacing.sm}
        onBackPress={() => router.back()}
        onSettingsPress={() => router.push('../settings/settings')}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <SectionSelector activeTab={activeTab} onTabPress={setActiveTab} />
          {activeTab === 'Home' && (
            <HomeSection onPublicPrivatePress={() => setPopupVisible(true)} />
          )}
          {activeTab === 'Leaderboard' && <LeaderboardSection />}
          {activeTab === 'Fights' && <FightsSection />}
        </View>
      </ScrollView>
      <Popup
        league={{ id: '1', name: 'NameOftheLeague', members: 24 }}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onJoin={() => setPopupVisible(false)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    gap: spacing.base,
  },
});
