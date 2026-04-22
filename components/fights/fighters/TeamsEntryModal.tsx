import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, fontSize } from '@/constants/theme';
import RulesAccordion from '@/components/fights/fighters/RulesAccordion';

const FIGHT_RULES = [
  {
    term: 'Knockout (KO)',
    description: 'A fighter is knocked down and cannot rise before the referee counts to ten.',
  },
  {
    term: 'Technical Knockout (TKO)',
    description:
      'The referee stops the fight to protect a fighter who is not intelligently defending themselves, or if a doctor stops it due to injury.',
  },
  {
    term: 'Submission',
    description:
      'A fighter taps out or verbally submits to a hold or choke applied by their opponent.',
  },
  {
    term: 'Decision',
    description:
      'If the fight goes the full distance, judges score each round to determine a winner by unanimous, split, or majority decision.',
  },
  {
    term: 'Disqualification (DQ)',
    description:
      'A fighter is disqualified for intentional or severe illegal moves (e.g., repeated fouls, illegal blows).',
  },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const TIMING_IN = { duration: 320, easing: Easing.out(Easing.cubic) } as const;
const TIMING_OUT = { duration: 280, easing: Easing.in(Easing.cubic) } as const;
const DISMISS_THRESHOLD = 80;
const DISMISS_VELOCITY = 600;
const EXPAND_THRESHOLD = 60;
const EXPAND_VELOCITY = 500;

type Fighter = {
  image: string;
  name: string;
  odds: string;
  multiplier: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedFighter: 'fighter1' | 'fighter2';
  fighter1: Fighter;
  fighter2: Fighter;
  eventName?: string;
  date: string;
  time: string;
  isVerified?: boolean;
  onSubmit?: () => void;
};

const TeamsEntryModal = ({
  visible,
  onClose,
  selectedFighter,
  fighter1,
  fighter2,
  eventName = 'UFC Event1',
  date,
  time,
  isVerified = true,
  onSubmit,
}: Props) => {
  const insets = useSafeAreaInsets();

  const SNAP_FULL = insets.top;
  const SNAP_HALF = SCREEN_HEIGHT * 0.4;

  const [entryAmount, setEntryAmount] = useState('');
  const [trackMyBet, setTrackMyBet] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(true);
  const [currentFighter, setCurrentFighter] = useState<'fighter1' | 'fighter2'>(selectedFighter);
  const inputRef = useRef<TextInput>(null);

  const sheetTop = useSharedValue(SCREEN_HEIGHT);
  const snapTop = useSharedValue(SNAP_HALF);
  const scrollY = useSharedValue(0);
  const dragStartedAtTop = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const scrollGesture = Gesture.Native();
  const accordionScrollGesture = Gesture.Native();

  useEffect(() => {
    if (visible) {
      setCurrentFighter(selectedFighter);
      setRulesOpen(false);
      snapTop.value = SNAP_HALF;
      sheetTop.value = SCREEN_HEIGHT;
      sheetTop.value = withTiming(SNAP_HALF, TIMING_IN);
    }
  }, [visible, selectedFighter, SNAP_HALF, sheetTop, snapTop]);

  useEffect(() => {
    if (visible) {
      setRulesOpen(false);
    }
  }, [currentFighter]);

  const dismiss = () => {
    sheetTop.value = withTiming(SCREEN_HEIGHT, TIMING_OUT);
    setTimeout(onClose, TIMING_OUT.duration);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetY([-8, 8])
    .runOnJS(true)
    .simultaneousWithExternalGesture(scrollGesture)
    .onStart(() => {
      dragStartedAtTop.value = scrollY.value <= 0;
    })
    .onUpdate((e) => {
      const isExpanded = snapTop.value === SNAP_FULL;
      const draggingDown = e.translationY > 0;

      // When fully expanded: only move sheet if drag started at scroll top AND dragging down
      if (isExpanded && !(dragStartedAtTop.value && draggingDown)) return;

      const raw = snapTop.value + e.translationY;
      if (raw < SNAP_FULL) {
        sheetTop.value = SNAP_FULL + raw * 0.05;
      } else {
        sheetTop.value = raw;
      }
    })
    .onEnd((e) => {
      const isExpanded = snapTop.value === SNAP_FULL;

      if (isExpanded) {
        const shouldCollapse =
          (dragStartedAtTop.value && e.translationY > EXPAND_THRESHOLD) ||
          (dragStartedAtTop.value && e.velocityY > EXPAND_VELOCITY);

        if (shouldCollapse) {
          snapTop.value = SNAP_HALF;
          sheetTop.value = withTiming(SNAP_HALF, TIMING_IN);
        } else {
          sheetTop.value = withTiming(SNAP_FULL, TIMING_IN);
        }
      } else {
        if (e.translationY < -EXPAND_THRESHOLD || e.velocityY < -EXPAND_VELOCITY) {
          snapTop.value = SNAP_FULL;
          sheetTop.value = withTiming(SNAP_FULL, TIMING_IN);
        } else if (e.translationY > DISMISS_THRESHOLD || e.velocityY > DISMISS_VELOCITY) {
          dismiss();
        } else {
          sheetTop.value = withTiming(SNAP_HALF, TIMING_IN);
        }
      }
    });

  const animatedSheet = useAnimatedStyle(() => ({
    top: sheetTop.value,
    borderTopLeftRadius: interpolate(sheetTop.value, [SNAP_FULL, SNAP_HALF], [0, 20], 'clamp'),
    borderTopRightRadius: interpolate(sheetTop.value, [SNAP_FULL, SNAP_HALF], [0, 20], 'clamp'),
  }));

  const selectedName = currentFighter === 'fighter1' ? fighter1.name : fighter2.name;
  const rulesHighlightColor = currentFighter === 'fighter1' ? '#2FC2AA' : '#C34363';

  const handleQuickAmount = (amount: number) => {
    const current = parseFloat(entryAmount) || 0;
    setEntryAmount(String((current + amount).toFixed(2)));
  };

  const potentialPayout =
    entryAmount && parseFloat(entryAmount) > 0
      ? `$${(parseFloat(entryAmount) * 1.89).toFixed(2)}`
      : '$0.00';

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={dismiss}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} />

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.sheet, animatedSheet]}>
            {/* Handle */}
            <View style={styles.handleArea}>
              <View style={styles.handle} />
            </View>

            <GestureDetector gesture={scrollGesture}>
              <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[
                  styles.scrollContent,
                  { paddingBottom: insets.bottom + 24 },
                ]}
              >
                <View style={styles.header}>
                  <View style={styles.headerIcon}>
                    <View style={styles.headerIconLine} />
                    <View style={[styles.headerIconLine, styles.headerIconLineShort]} />
                    <View style={styles.headerIconLine} />
                  </View>
                  <View>
                    <Text style={styles.headerTitle}>Teams Entry</Text>
                    <Text style={styles.headerSubtitle}>
                      {eventName} · {date} {time}
                    </Text>
                  </View>
                </View>

                <View style={styles.fightersRow}>
                  <FighterCard
                    fighter={fighter1}
                    isSelected={currentFighter === 'fighter1'}
                    isBlue
                    onPress={() => setCurrentFighter('fighter1')}
                  />
                  <FighterCard
                    fighter={fighter2}
                    isSelected={currentFighter === 'fighter2'}
                    isBlue={false}
                    onPress={() => setCurrentFighter('fighter2')}
                  />
                </View>

                <View style={styles.section}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Entry Amount</Text>
                    <Text style={styles.balance}>balance: $0.00</Text>
                  </View>
                  <View style={styles.inputRow}>
                    <Pressable
                      style={styles.inputWrapper}
                      onPress={() => inputRef.current?.focus()}
                    >
                      <Text style={styles.inputPrefix}>$</Text>
                      <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="0.00"
                        placeholderTextColor="rgba(245,245,245,0.25)"
                        value={entryAmount}
                        onChangeText={setEntryAmount}
                        keyboardType="decimal-pad"
                        selectionColor="#2FC2AA"
                      />
                    </Pressable>
                    <Pressable style={styles.quickBtn} onPress={() => handleQuickAmount(5)}>
                      <Text style={styles.quickBtnText}>+ $5</Text>
                    </Pressable>
                    <Pressable style={styles.quickBtn} onPress={() => handleQuickAmount(10)}>
                      <Text style={styles.quickBtnText}>+ $10</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.estAmount}>
                    Est final entry amount: $
                    {entryAmount ? parseFloat(entryAmount).toFixed(2) : '0.00'}
                  </Text>
                </View>

                <View style={[styles.row, styles.section]}>
                  <Text style={styles.label}>Track My Bet</Text>
                  <Switch
                    value={trackMyBet}
                    onValueChange={setTrackMyBet}
                    trackColor={{ false: 'rgba(245,245,245,0.15)', true: '#2FC2AA' }}
                    thumbColor="#F5F5F5"
                  />
                </View>

                <View style={styles.divider} />

                <View style={[styles.row, styles.section]}>
                  <Text style={styles.payoutLabel}>Potential Payout</Text>
                  <Text style={styles.payoutValue}>{potentialPayout}</Text>
                </View>

                <View style={styles.divider} />

                <RulesAccordion
                  icon="flame"
                  title="Rules"
                  label={`${selectedName.split(' ')[0]} Win`}
                  labelColor={rulesHighlightColor}
                  rules={FIGHT_RULES}
                  isOpen={rulesOpen}
                  onPress={() => setRulesOpen((v) => !v)}
                  isLast
                  externalScrollGesture={accordionScrollGesture}
                />

                <View style={styles.submitWrapper}>
                  {isVerified ? (
                    <Pressable
                      onPress={onSubmit}
                      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
                    >
                      <LinearGradient
                        colors={['#CBFF00', '#07F499']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submitVerifiedGradient}
                      >
                        <Text style={styles.submitVerifiedText}>Place a Bet</Text>
                      </LinearGradient>
                    </Pressable>
                  ) : (
                    <LinearGradient
                      colors={['rgba(203,255,0,0.4)', 'rgba(7,244,153,0.4)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitGradient}
                    >
                      <View style={styles.submitInner}>
                        <Text style={styles.submitText}>Verify to submit</Text>
                        <Text style={styles.submitSubtext}>Additional info needed</Text>
                      </View>
                    </LinearGradient>
                  )}
                </View>
              </Animated.ScrollView>
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};

type FighterCardProps = {
  fighter: Fighter;
  isSelected: boolean;
  isBlue: boolean;
  onPress: () => void;
};

const FighterCard = ({ fighter, isSelected, isBlue, onPress }: FighterCardProps) => {
  const textColor = isBlue ? '#C34363' : '#2FC2AA';

  const inner = (
    <View style={styles.fighterCardContent}>
      <View style={styles.fighterCardImageWrapper}>
        <Image source={{ uri: fighter.image }} style={styles.fighterCardImage} />
        <LinearGradient
          colors={
            isBlue
              ? ['rgba(231,8,0,0)', 'rgba(231,0,139,0.1)', 'rgba(146,0,231,0.21)']
              : ['rgba(0,189,231,0)', 'rgba(63,240,211,0.15)', 'rgba(182,254,13,0.5)']
          }
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={styles.fighterCardText}>
        <Text style={styles.fighterCardName} numberOfLines={2}>
          {fighter.name}
        </Text>
        <Text style={[styles.fighterCardStat, { color: textColor }]}>Win {fighter.odds}</Text>
        <Text style={[styles.fighterCardStat, { color: textColor }]}>{fighter.multiplier}</Text>
      </View>
    </View>
  );

  if (isSelected) {
    return (
      <Pressable style={styles.fighterCardFlex} onPress={onPress}>
        <LinearGradient
          colors={['#CBFF00', '#07F499']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fighterCardSelectedBorder}
        >
          {inner}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.fighterCardFlex, styles.fighterCardBorder]} onPress={onPress}>
      {inner}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0D0D0D',
  },
  handleArea: {
    paddingTop: 10,
    paddingBottom: 12,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(245,245,245,0.2)',
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  headerIcon: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(245,245,245,0.08)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 6,
    gap: 4,
  },
  headerIconLine: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(245,245,245,0.6)',
    borderRadius: 1,
  },
  headerIconLineShort: {
    width: '60%',
  },
  headerTitle: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.base,
    color: '#F5F5F5',
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.5)',
    marginTop: 2,
  },
  fightersRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  fighterCardFlex: {
    flex: 1,
  },
  fighterCardSelectedBorder: {
    borderRadius: 10,
    padding: 1,
  },
  fighterCardBorder: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.12)',
  },
  fighterCardContent: {
    borderRadius: 9,
    backgroundColor: '#191C1F',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  fighterCardImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 6,
    overflow: 'hidden',
    flexShrink: 0,
  },
  fighterCardImage: {
    width: 40,
    height: 40,
  },
  fighterCardText: {
    flex: 1,
    flexShrink: 1,
  },
  fighterCardName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.85)',
    lineHeight: 16,
    marginBottom: 2,
  },
  fighterCardStat: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
  },
  balance: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.4)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(245,245,245,0.05)',
  },
  inputPrefix: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.4)',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: '#F5F5F5',
    padding: 0,
  },
  quickBtn: {
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(245,245,245,0.05)',
  },
  quickBtnText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.7)',
  },
  estAmount: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.35)',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(245,245,245,0.07)',
    marginBottom: 12,
  },
  payoutLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
  },
  payoutValue: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: '#F5F5F5',
  },
  submitWrapper: {
    marginTop: 8,
  },
  submitGradient: {
    borderRadius: 12,
    padding: 1,
  },
  submitInner: {
    backgroundColor: 'rgba(13,13,13,0.95)',
    borderRadius: 11,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 2,
  },
  submitText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.base,
    color: '#F5F5F5',
  },
  submitSubtext: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.4)',
  },
  submitVerifiedGradient: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(109,251,72,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  submitVerifiedText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(13,13,13,0.85)',
  },
});

export default TeamsEntryModal;
