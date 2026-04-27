import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenContainer } from '@/components';
import { WalletPickerModal } from '@/components/wallet/WalletPickerModal';
import { useActiveAccount } from 'thirdweb/react';

export default function ProfileScreen() {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const account = useActiveAccount();

  const label = account
    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
    : 'Connect Wallet';

  return (
    <ScreenContainer title="Profile" scrollable>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setWalletModalOpen(true)}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
      </View>

      <WalletPickerModal visible={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontFamily: 'Geist_600SemiBold',
    fontSize: 15,
  },
});
