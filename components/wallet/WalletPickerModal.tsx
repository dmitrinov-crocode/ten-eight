import { useActiveAccount, useActiveWallet, useConnect, useDisconnect } from 'thirdweb/react';
import { createWallet, inAppWallet, preAuthenticate } from 'thirdweb/wallets';
import { thirdwebClient } from '@/constants/thirdweb';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';

type Screen = 'menu' | 'email' | 'otp';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function WalletPickerModal({ visible, onClose }: Props) {
  const { connect } = useConnect();
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();

  const [screen, setScreen] = useState<Screen>('menu');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleClose() {
    setScreen('menu');
    setEmail('');
    setOtp('');
    setError('');
    onClose();
  }

  async function handleSendOtp() {
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      await preAuthenticate({
        client: thirdwebClient,
        strategy: 'email',
        email: email.trim(),
      });
      setScreen('otp');
    } catch (e: any) {
      setError(e?.message ?? 'Ошибка отправки кода');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otp.trim()) return;
    setLoading(true);
    setError('');
    try {
      await connect(async () => {
        const w = inAppWallet();
        await w.connect({
          client: thirdwebClient,
          strategy: 'email',
          email: email.trim(),
          verificationCode: otp.trim(),
        });
        return w;
      });
      handleClose();
    } catch (e: any) {
      setError(e?.message ?? 'Неверный код');
    } finally {
      setLoading(false);
    }
  }

  // @ts-ignore
  async function handleExternalWallet(walletId) {
    setError('');
    setLoading(true);

    try {
      // 1. проверяем доступность приложения

      let scheme = '';

      if (walletId === 'io.metamask') {
        scheme = 'metamask://';
      } else if (walletId === 'com.coinbase.wallet') {
        scheme = 'cbwallet://';
      } else {
        scheme = 'wc://'; // walletconnect
      }

      const canOpen = await Linking.canOpenURL(scheme);

      if (!canOpen) {
        throw new Error('WALLET_NOT_INSTALLED');
      }

      // 2. если ок → подключаемся
      const w = createWallet(walletId);

      await connect(async () => {
        await w.connect({ client: thirdwebClient });
        return w;
      });

      handleClose();
    } catch (e) {
      console.log('wallet error:', e);

      const storeUrl =
        walletId === 'io.metamask'
          ? 'https://metamask.io/download/'
          : walletId === 'com.coinbase.wallet'
            ? 'https://www.coinbase.com/wallet'
            : 'https://walletconnect.com/';

      Alert.alert('Кошелёк не установлен', 'Установи приложение или используй email вход', [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Установить',
          onPress: () => Linking.openURL(storeUrl),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleDisconnect() {
    if (wallet) disconnect(wallet);
    handleClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          {/* Connected */}
          {account ? (
            <>
              <Text style={styles.title}>Кошелёк подключён</Text>
              <Text style={styles.address}>
                {account.address.slice(0, 8)}...{account.address.slice(-6)}
              </Text>
              <TouchableOpacity style={[styles.btn, styles.btnRed]} onPress={handleDisconnect}>
                <Text style={styles.btnRedLabel}>Отключить</Text>
              </TouchableOpacity>
            </>
          ) : screen === 'menu' ? (
            <>
              <Text style={styles.title}>Подключить кошелёк</Text>

              {/* Email (works on simulator) */}
              <TouchableOpacity style={styles.btn} onPress={() => setScreen('email')}>
                <Text style={styles.btnLabel}>Email</Text>
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>или</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* External wallets */}
              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                disabled={loading}
                onPress={() => handleExternalWallet('io.metamask')}
              >
                <Text style={styles.btnSecondaryLabel}>MetaMask</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                disabled={loading}
                onPress={() => handleExternalWallet('com.coinbase.wallet')}
              >
                <Text style={styles.btnSecondaryLabel}>Coinbase Wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                disabled={loading}
                onPress={() => handleExternalWallet('walletConnect')}
              >
                <Text style={styles.btnSecondaryLabel}>WalletConnect</Text>
              </TouchableOpacity>

              {!!error && <Text style={styles.error}>{error}</Text>}
            </>
          ) : screen === 'email' ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setScreen('menu');
                  setError('');
                }}
              >
                <Text style={styles.back}>← Назад</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Введи email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              {!!error && <Text style={styles.error}>{error}</Text>}
              <TouchableOpacity
                style={[styles.btn, loading && styles.btnDisabled]}
                disabled={loading}
                onPress={handleSendOtp}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnLabel}>Отправить код</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setScreen('email');
                  setError('');
                  setOtp('');
                }}
              >
                <Text style={styles.back}>← Назад</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Введи код из письма</Text>
              <Text style={styles.subtitle}>Код отправлен на {email}</Text>
              <TextInput
                style={[styles.input, styles.inputOtp]}
                placeholder="123456"
                placeholderTextColor="#666"
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
              {!!error && <Text style={styles.error}>{error}</Text>}
              <TouchableOpacity
                style={[styles.btn, loading && styles.btnDisabled]}
                disabled={loading}
                onPress={handleVerifyOtp}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnLabel}>Войти</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 44,
    gap: 12,
  },
  title: {
    color: '#fff',
    fontFamily: 'Geist_700Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: '#a0a0b0',
    fontFamily: 'Geist_400Regular',
    fontSize: 13,
  },
  address: {
    color: '#a0a0b0',
    fontFamily: 'Geist_400Regular',
    fontSize: 14,
  },
  back: {
    color: '#7c3aed',
    fontFamily: 'Geist_500Medium',
    fontSize: 14,
  },
  btn: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnLabel: {
    color: '#fff',
    fontFamily: 'Geist_600SemiBold',
    fontSize: 15,
  },
  btnSecondary: {
    backgroundColor: '#2d2d4e',
  },
  btnSecondaryLabel: {
    color: '#fff',
    fontFamily: 'Geist_600SemiBold',
    fontSize: 15,
  },
  btnRed: {
    backgroundColor: '#4a1a1a',
  },
  btnRedLabel: {
    color: '#f87171',
    fontFamily: 'Geist_600SemiBold',
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2d2d4e',
  },
  dividerText: {
    color: '#666',
    fontFamily: 'Geist_400Regular',
    fontSize: 13,
  },
  input: {
    backgroundColor: '#2d2d4e',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
    fontFamily: 'Geist_400Regular',
    fontSize: 15,
  },
  inputOtp: {
    letterSpacing: 8,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Geist_600SemiBold',
  },
  error: {
    color: '#f87171',
    fontFamily: 'Geist_400Regular',
    fontSize: 13,
  },
});
