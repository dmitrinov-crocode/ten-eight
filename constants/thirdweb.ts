import { createThirdwebClient } from 'thirdweb';
import { createWallet } from 'thirdweb/wallets';

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.EXPO_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const supportedWallets = [
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('walletConnect'),
];
