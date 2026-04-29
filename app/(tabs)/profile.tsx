// import React, { useState } from 'react';
// import { useState } from 'react';
// import { StyleSheet, View, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { ScreenContainer } from '@/components';
// import ProfileHeader from '@/components/profile/profile/ProfileHeader';
// import ProfileStats from '@/components/profile/profile/ProfileStats';
// import ProfileTabSelector, { ProfileTab } from '@/components/profile/profile/ProfileTabSelector';
// import ProfileActiveSection from '@/components/profile/profile/ProfileActiveSection';
// import ProfileBetsHistorySection from '@/components/profile/profile/ProfileBetsHistorySection';
// import ProfileFantasySection from '@/components/profile/profile/ProfileFantasySection';
// import { spacing } from '@/constants/theme';
// import { WalletPickerModal } from '@/components/wallet/WalletPickerModal';
// import { useActiveAccount } from 'thirdweb/react';

// export default function ProfileScreen() {
//   const [walletModalOpen, setWalletModalOpen] = useState(false);
//   const account = useActiveAccount();

//   const label = account
//     ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
//     : 'Connect Wallet';

//   const [activeTab, setActiveTab] = useState<ProfileTab>('active');

//   return (
//     <ScreenContainer title="Profile" scrollable>
//       <View style={styles.content}>
//         <View style={styles.topSection}>
//           <ProfileHeader />
//           <ProfileStats />
//         </View>
//         <ProfileTabSelector activeTab={activeTab} onTabChange={setActiveTab} />
//         {activeTab === 'active' && <ProfileActiveSection />}
//         {activeTab === 'bets' && <ProfileBetsHistorySection />}
//         {activeTab === 'fantasy' && <ProfileFantasySection />}
//       </View>
//     </ScreenContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   button: {
//     backgroundColor: '#7c3aed',
//     borderRadius: 12,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   buttonLabel: {
//     color: '#fff',
//     fontFamily: 'Geist_600SemiBold',
//     fontSize: 15,
//   },
// });

// const styles = StyleSheet.create({
//   content: {
//     gap: spacing.md,
//     padding: spacing.base,
//   },
//   topSection: {
//     gap: spacing.xl,
//   },
// });

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ScreenContainer } from '@/components';
import { WalletPickerModal } from '@/components/wallet/WalletPickerModal';
import { useActiveAccount } from 'thirdweb/react';
import ProfileHeader from '@/components/profile/profile/ProfileHeader';
import ProfileStats from '@/components/profile/profile/ProfileStats';
import ProfileTabSelector, { ProfileTab } from '@/components/profile/profile/ProfileTabSelector';
import ProfileActiveSection from '@/components/profile/profile/ProfileActiveSection';
import ProfileBetsHistorySection from '@/components/profile/profile/ProfileBetsHistorySection';
import ProfileFantasySection from '@/components/profile/profile/ProfileFantasySection';
import { spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('active');
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const account = useActiveAccount();

  const label = account
    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
    : 'Connect Wallet';

  return (
    <ScreenContainer title="Profile" scrollable>
      <View style={styles.content}>
        <View style={styles.topSection}>
          <ProfileHeader />
          <ProfileStats />
          
          {/* Кнопка подключения кошелька из master */}
          <TouchableOpacity style={styles.walletButton} onPress={() => setWalletModalOpen(true)}>
            <Text style={styles.walletButtonLabel}>{label}</Text>
          </TouchableOpacity>
        </View>
        
        <ProfileTabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'active' && <ProfileActiveSection />}
        {activeTab === 'bets' && <ProfileBetsHistorySection />}
        {activeTab === 'fantasy' && <ProfileFantasySection />}
      </View>

      <WalletPickerModal visible={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
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
  walletButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  walletButtonLabel: {
    color: '#fff',
    fontFamily: 'Geist_600SemiBold',
    fontSize: 15,
  },
});