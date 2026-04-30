import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { fonts, fontSize } from '@/constants/theme';
import { CommonIcon } from '@/components/common';
import CommonGradientText from '../../common/CommonGradientText';
import TeamsEntryModal, { PolyTokenIds } from './TeamsEntryModal';
import { usePolymarketBet } from '@/hooks/usePolymarketBet';

type Fighter = {
  image: string;
  name: string;
  odds: string;
  multiplier: string;
};

type TProps = {
  date: string;
  prize: string;
  time: string;
  fighter1: Fighter;
  fighter2: Fighter;
  polyTokenIds?: PolyTokenIds;
  eventName?: string;
  weightClass?: string;
  cardPosition?: string;
};

const RED_GRADIENT_COLORS: [string, string, string] = [
  'rgba(231, 8, 0, 0)',
  'rgba(231, 0, 139, 0.08)',
  'rgba(146, 0, 231, 0.17)',
];

const Card = ({ date, prize, time, fighter1, fighter2, polyTokenIds, eventName = 'UFC Event', weightClass = '', cardPosition = '' }: TProps) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState<'fighter1' | 'fighter2'>('fighter1');
  const [usdcBalance, setUsdcBalance] = useState<number | undefined>(undefined);
  const [placedBet, setPlacedBet] = useState<{ fighter: 'fighter1' | 'fighter2'; amount: number } | null>(null);

  const { placeBet, getUsdcBalance, loading: betLoading, isConnected } = usePolymarketBet();

  const openModal = async (fighter: 'fighter1' | 'fighter2') => {
    setSelectedFighter(fighter);
    setModalVisible(true);
    if (isConnected) {
      try {
        const bal = await getUsdcBalance();
        setUsdcBalance(bal);
      } catch {
        // balance stays undefined — shown as "—"
      }
    }
  };

  const openDetails = () => {
    router.push({
      pathname: '/fight/[id]',
      params: {
        id: `${fighter1.name}-${fighter2.name}`.replace(/\s/g, '-').toLowerCase(),
        date,
        time,
        prize,
        eventName,
        weightClass,
        cardPosition,
        fighter1: JSON.stringify(fighter1),
        fighter2: JSON.stringify(fighter2),
        ...(polyTokenIds ? { polyTokenIds: JSON.stringify(polyTokenIds) } : {}),
      },
    });
  };

  const handlePlaceBet = async (amount: number, fighter: 'fighter1' | 'fighter2') => {
    if (!polyTokenIds) return;

    if (!isConnected) {
      Alert.alert('Wallet not connected', 'Connect your wallet first to place a bet.');
      return;
    }

    const tokenId = fighter === 'fighter1' ? polyTokenIds.fighter1 : polyTokenIds.fighter2;
    await placeBet({ tokenId, usdcAmount: amount });
    setPlacedBet({ fighter, amount });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.head}>
          <View style={styles.headLeft}>
            <Text style={styles.headText}>{date}</Text>
            {weightClass ? <Text style={styles.headBadge}>{weightClass}</Text> : null}
            {cardPosition ? <Text style={styles.headText}>{cardPosition}</Text> : null}
          </View>
          <View style={styles.headRight}>
            <CommonIcon name="flame" size={16} color="rgba(245, 245, 245, 0.5)" />
            <Text style={styles.headText}>{prize}</Text>
          </View>
        </View>
        <View style={styles.body}>
          {/* Left fighter */}
          <Pressable style={styles.block} onPress={() => openModal('fighter1')}>
            <CommonGradientText style={styles.blockBg}>ABC</CommonGradientText>
            <View style={styles.fighterImageContainer}>
              <Image style={styles.blockImage} source={{ uri: fighter1?.image }} />
              <LinearGradient
                colors={[
                  'rgba(0, 189, 231, 0)',
                  'rgba(63, 240, 211, 0.145)',
                  'rgba(182, 254, 13, 0.5)',
                ]}
                style={[StyleSheet.absoluteFill, styles.imageGradient]}
              />
            </View>
            <View style={styles.blockTextWrapper}>
              <Text style={styles.blockTitle} numberOfLines={2} ellipsizeMode="tail">
                {fighter1?.name?.replace(' ', '\n')}
              </Text>
              <View style={styles.blockBottom}>
                <Text style={[styles.blockBottomText, styles.blueText]}>{fighter1?.odds}</Text>
                <Text style={[styles.blockBottomText, styles.blockBottomDot, styles.blueText]}>●</Text>
                <Text style={[styles.blockBottomText, styles.blueText]}>{fighter1?.multiplier}</Text>
              </View>
            </View>
          </Pressable>

          {/* Middle */}
          <View style={styles.middle}>
            <Text style={styles.middleText}>{time}</Text>
            <CommonIcon name="fist-fill" size={24} color="rgba(245, 245, 245, 0.3)" />
          </View>

          {/* Right fighter */}
          <Pressable style={[styles.block, styles.blockReverse]} onPress={() => openModal('fighter2')}>
            <CommonGradientText style={styles.blockBg} colors={RED_GRADIENT_COLORS}>DEF</CommonGradientText>
            <View style={styles.fighterImageContainer}>
              <Image style={styles.blockImage} source={{ uri: fighter2?.image }} />
              <LinearGradient
                colors={['rgba(231, 8, 0, 0)', 'rgba(231, 0, 139, 0.1)', 'rgba(146, 0, 231, 0.21)']}
                style={[StyleSheet.absoluteFill, styles.imageGradient]}
              />
            </View>
            <View style={[styles.blockTextWrapper, styles.blockTextEnd]}>
              <Text style={[styles.blockTitle, styles.textRight]} numberOfLines={2} ellipsizeMode="tail">
                {fighter2?.name?.replace(' ', '\n')}
              </Text>
              <View style={styles.blockBottom}>
                <Text style={[styles.blockBottomText, styles.redText]}>{fighter2?.odds}</Text>
                <Text style={[styles.blockBottomText, styles.blockBottomDot, styles.redText]}>●</Text>
                <Text style={[styles.blockBottomText, styles.redText]}>{fighter2?.multiplier}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      {placedBet && (
        <View style={styles.betBanner}>
          <View style={styles.betDot} />
          <Text style={styles.betBannerText}>
            Your bet: ${placedBet.amount.toFixed(2)} on{' '}
            {placedBet.fighter === 'fighter1' ? fighter1.name : fighter2.name}
          </Text>
        </View>
      )}

      <Pressable onPress={openDetails}>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>More Details</Text>
        </View>
      </Pressable>

      <TeamsEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedFighter={selectedFighter}
        fighter1={fighter1}
        fighter2={fighter2}
        date={date}
        time={time}
        eventName={eventName}
        polyTokenIds={polyTokenIds}
        usdcBalance={usdcBalance}
        betLoading={betLoading}
        onSubmit={polyTokenIds ? handlePlaceBet : undefined}
      />
    </View>
  );
};

Card.displayName = 'Card';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.2)',
    borderRadius: 12,
    backgroundColor: 'rgba(13, 13, 13, 0.45)',
    overflow: 'hidden',
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    gap: 2,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  headText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.5)',
  },
  headBadge: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.85)',
    backgroundColor: 'rgba(245, 245, 245, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  headRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  blockReverse: {
    flexDirection: 'row-reverse',
  },
  blockBg: {
    fontFamily: fonts.italic,
    fontSize: fontSize['3xl'],
    fontWeight: 'bold',
    letterSpacing: -10,
  },
  fighterImageContainer: {
    width: 46,
    height: 46,
    borderRadius: 6,
    overflow: 'hidden',
    flexShrink: 0,
  },
  blockImage: {
    width: 46,
    height: 46,
    borderRadius: 6,
    backgroundColor: '#191C1F',
  },
  imageGradient: {
    borderRadius: 6,
  },
  blockTextWrapper: {
    flex: 1,
    flexShrink: 1,
    flexDirection: 'column',
    minWidth: 0,
  },
  blockTextEnd: {
    alignItems: 'flex-end',
  },
  blockTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    lineHeight: 18,
    minHeight: 36,
    color: 'rgba(245, 245, 245, 0.85)',
    marginBottom: 2,
  },
  textRight: {
    textAlign: 'right',
  },
  blockBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  blockBottomText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
  },
  blockBottomDot: {
    fontSize: 4,
  },
  blueText: {
    color: '#2FC2AA',
  },
  redText: {
    color: '#C34363',
  },
  middle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    paddingBottom: 24,
    width: 32,
    flexShrink: 0,
  },
  middleText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.5)',
  },
  betBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(7, 244, 153, 0.07)',
    borderTopWidth: 1,
    borderColor: 'rgba(7, 244, 153, 0.2)',
  },
  betDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#07F499',
  },
  betBannerText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: '#07F499',
  },
  bottom: {
    borderTopWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.2)',
    backgroundColor: 'rgba(13, 13, 13, 0.3)',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.6)',
  },
});

export default Card;
