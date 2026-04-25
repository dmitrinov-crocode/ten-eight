import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { fonts, fontSize } from '@/constants/theme';
import { CommonIcon } from '@/components/auth';
import CommonGradientText from '../../auth/CommonGradientText';
import TeamsEntryModal from './TeamsEntryModal';

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
  onPress?: () => void;
};

const RED_GRADIENT_COLORS: [string, string, string] = [
  'rgba(231, 8, 0, 0)',
  'rgba(231, 0, 139, 0.08)',
  'rgba(146, 0, 231, 0.17)',
];

const Card = ({ date, prize, time, fighter1, fighter2, onPress }: TProps) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState<'fighter1' | 'fighter2'>('fighter1');

  const openModal = (fighter: 'fighter1' | 'fighter2') => {
    setSelectedFighter(fighter);
    setModalVisible(true);
  };

  const openDetails = () => {
    router.push({
      pathname: '/fight/[id]',
      params: {
        id: `${fighter1.name}-${fighter2.name}`.replace(/\s/g, '-').toLowerCase(),
        date,
        time,
        prize,
        eventName: 'UFC Event1',
        fighter1: JSON.stringify(fighter1),
        fighter2: JSON.stringify(fighter2),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.head}>
          <Text style={styles.headText}>{date}</Text>
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
                <Text style={[styles.blockBottomText, styles.blockBottomDot, styles.blueText]}>
                  ●
                </Text>
                <Text style={[styles.blockBottomText, styles.blueText]}>
                  {fighter1?.multiplier}
                </Text>
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
            <CommonGradientText style={styles.blockBg} colors={RED_GRADIENT_COLORS}>
              DEF
            </CommonGradientText>
            <View style={styles.fighterImageContainer}>
              <Image style={styles.blockImage} source={{ uri: fighter2?.image }} />
              <LinearGradient
                colors={['rgba(231, 8, 0, 0)', 'rgba(231, 0, 139, 0.1)', 'rgba(146, 0, 231, 0.21)']}
                style={[StyleSheet.absoluteFill, styles.imageGradient]}
              />
            </View>
            <View style={[styles.blockTextWrapper, styles.blockTextEnd]}>
              <Text
                style={[styles.blockTitle, styles.textRight]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {fighter2?.name?.replace(' ', '\n')}
              </Text>
              <View style={styles.blockBottom}>
                <Text style={[styles.blockBottomText, styles.redText]}>{fighter2?.odds}</Text>
                <Text style={[styles.blockBottomText, styles.blockBottomDot, styles.redText]}>
                  ●
                </Text>
                <Text style={[styles.blockBottomText, styles.redText]}>{fighter2?.multiplier}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
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
  headText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245, 245, 245, 0.5)',
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
