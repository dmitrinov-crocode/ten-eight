import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from '@/components';
import ProfileHeader from '@/components/profile/profile/ProfileHeader';
import ProfileStats from '@/components/profile/profile/ProfileStats';
import ProfileTabSelector, { ProfileTab } from '@/components/profile/profile/ProfileTabSelector';
import ProfileActiveSection from '@/components/profile/profile/ProfileActiveSection';
import ProfileBetsHistorySection from '@/components/profile/profile/ProfileBetsHistorySection';
import ProfileFantasySection from '@/components/profile/profile/ProfileFantasySection';
import { spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('active');

  return (
    <ScreenContainer title="Profile" scrollable>
      <View style={styles.content}>
        <View style={styles.topSection}>
          <ProfileHeader />
          <ProfileStats />
        </View>
        <ProfileTabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'active' && <ProfileActiveSection />}
        {activeTab === 'bets' && <ProfileBetsHistorySection />}
        {activeTab === 'fantasy' && <ProfileFantasySection />}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    padding: spacing.base,
  },
  topSection: {
    gap: spacing.xl,
  },
});
