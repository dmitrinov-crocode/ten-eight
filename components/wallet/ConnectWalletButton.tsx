import { useConnect, useActiveAccount, useDisconnect, useActiveWallet } from 'thirdweb/react';
import { thirdwebClient, supportedWallets } from '@/constants/thirdweb';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export function ConnectWalletButton() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { connect, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  if (account) {
    const short = `${account.address.slice(0, 6)}...${account.address.slice(-4)}`;
    return (
      <TouchableOpacity style={styles.button} onPress={() => wallet && disconnect(wallet)}>
        <Text style={styles.label}>{short}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.button}
      disabled={isConnecting}
      onPress={() =>
        connect(async () => {
          const wallet = supportedWallets[0];
          await wallet.connect({ client: thirdwebClient });
          return wallet;
        })
      }
    >
      {isConnecting ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>Connect Wallet</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontFamily: 'Geist_600SemiBold',
    fontSize: 15,
  },
});
