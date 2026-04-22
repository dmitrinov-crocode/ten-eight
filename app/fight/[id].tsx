import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Defs, Line, LinearGradient as SvgGradient, Path, Stop } from 'react-native-svg';

import { CommonIcon } from '@/components/common';
import { fonts, fontSize } from '@/constants/theme';
import TeamsEntryModal from '@/components/fights/fighters/TeamsEntryModal'; // ─── Types ───────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────

type Fighter = {
  image: string;
  name: string;
  odds: string;
  multiplier: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionAccordion({
  title,
  isOpen,
  onPress,
  isLast = false,
  children,
}: {
  title: string;
  isOpen: boolean;
  onPress: () => void;
  isLast?: boolean;
  children?: React.ReactNode;
}) {
  const rotate = useSharedValue(isOpen ? 0 : 180);

  React.useEffect(() => {
    rotate.value = withTiming(isOpen ? 0 : 180, { duration: 250 });
  }, [isOpen, rotate]);

  const animatedArrow = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={!isLast && styles.sectionBorder}>
      <Pressable onPress={onPress} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Animated.View style={[animatedArrow, { width: 24, height: 24 }]}>
          <CommonIcon name="arrow" size={24} color="rgba(245,245,245,0.6)" />
        </Animated.View>
      </Pressable>
      {isOpen && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

// Stat row: dual bar (fighter1 left teal, fighter2 right red)
function StatBar({
  label,
  f1Value,
  f2Value,
  f1Pct,
  f2Pct,
  dual = true,
}: {
  label: string;
  f1Value: string;
  f2Value: string;
  f1Pct: number; // 0-100
  f2Pct: number; // 0-100
  dual?: boolean;
}) {
  return (
    <View style={statBarStyles.row}>
      <View style={statBarStyles.track}>
        {dual ? (
          // Both fighters fill from their sides toward center
          <>
            <View style={[statBarStyles.fillTeal, { flex: f1Pct }]} />
            <View style={[statBarStyles.fillRed, { flex: f2Pct }]} />
          </>
        ) : (
          // Only fighter2 (red) fills from the right
          <>
            <View style={{ flex: 100 - f2Pct, backgroundColor: 'rgba(245,245,245,0.2)' }} />
            <View style={[statBarStyles.fillRed, { flex: f2Pct }]} />
          </>
        )}
      </View>
      <View style={statBarStyles.labels}>
        <Text style={[statBarStyles.val, { color: 'rgba(47,194,170,0.75)' }]}>{f1Value}</Text>
        <Text style={statBarStyles.label}>{label}</Text>
        <Text style={[statBarStyles.val, { color: 'rgba(195,67,99,0.75)', textAlign: 'right' }]}>
          {f2Value}
        </Text>
      </View>
    </View>
  );
}

const statBarStyles = StyleSheet.create({
  row: { gap: 10 },
  track: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fillTeal: {
    backgroundColor: '#2FC2AA',
  },
  fillRed: {
    backgroundColor: '#C34363',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  val: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    flex: 1,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.3)',
    flex: 1,
    textAlign: 'center',
  },
});

// Odds History line chart
const CHART_W = 260;
const CHART_H = 115;
const Y_LABELS = [80, 65, 50, 35, 20];
const DATES = ['Mar 9', 'Mar 10', 'Mar 11', 'Mar 12'];

// Convert percentage value to y coordinate
function pctToY(pct: number) {
  return ((80 - pct) / 60) * CHART_H;
}

const NARIMAN_PTS = [73, 65, 45, 25]; // %
const HAMDY_PTS = [27, 35, 55, 75]; // %

function toSvgPoints(values: number[]) {
  return values.map((v, i) => `${(i / 3) * CHART_W},${pctToY(v)}`).join(' L');
}

function OddsChart({ period, onPeriod }: { period: string; onPeriod: (p: string) => void }) {
  const narimPath = `M${toSvgPoints(NARIMAN_PTS)}`;
  const hamdyPath = `M${toSvgPoints(HAMDY_PTS)}`;

  const narimFill = `M${toSvgPoints(NARIMAN_PTS)} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
  const hamdyFill = `M${toSvgPoints(HAMDY_PTS)} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;

  return (
    <View style={chartStyles.card}>
      {/* Legend */}
      <View style={chartStyles.legend}>
        <View style={chartStyles.legendItem}>
          <Text style={[chartStyles.legendName, { color: '#C34363' }]}>Nariman</Text>
          <View style={[chartStyles.badge, { backgroundColor: 'rgba(195,67,99,0.75)' }]}>
            <Text style={chartStyles.badgeText}>25%</Text>
          </View>
        </View>
        <View style={chartStyles.legendItem}>
          <Text style={[chartStyles.legendName, { color: '#2FC2AA' }]}>Hamdy</Text>
          <View style={[chartStyles.badge, { backgroundColor: 'rgba(47,194,170,0.75)' }]}>
            <Text style={chartStyles.badgeText}>75%</Text>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View style={chartStyles.chartRow}>
        {/* Y-axis labels */}
        <View style={chartStyles.yAxis}>
          {Y_LABELS.map((label) => (
            <Text key={label} style={chartStyles.yLabel}>
              {label}%
            </Text>
          ))}
        </View>

        {/* SVG chart */}
        <View style={{ flex: 1 }}>
          <Svg
            width="100%"
            height={CHART_H}
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            preserveAspectRatio="none"
          >
            <Defs>
              <SvgGradient id="narimFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#C34363" stopOpacity="0.15" />
                <Stop offset="1" stopColor="#C34363" stopOpacity="0" />
              </SvgGradient>
              <SvgGradient id="hamdyFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#2FC2AA" stopOpacity="0.15" />
                <Stop offset="1" stopColor="#2FC2AA" stopOpacity="0" />
              </SvgGradient>
            </Defs>

            {/* Grid lines at 50% */}
            <Line
              x1="0"
              y1={pctToY(50)}
              x2={CHART_W}
              y2={pctToY(50)}
              stroke="rgba(245,245,245,0.07)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            <Line
              x1="0"
              y1={pctToY(20)}
              x2={CHART_W}
              y2={pctToY(20)}
              stroke="rgba(245,245,245,0.07)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />

            {/* Area fills */}
            <Path d={narimFill} fill="url(#narimFill)" />
            <Path d={hamdyFill} fill="url(#hamdyFill)" />

            {/* Lines */}
            <Path d={narimPath} stroke="#C34363" strokeWidth="1.5" fill="none" />
            <Path d={hamdyPath} stroke="#2FC2AA" strokeWidth="1.5" fill="none" />
          </Svg>

          {/* X-axis dates */}
          <View style={chartStyles.xAxis}>
            {DATES.map((d) => (
              <Text key={d} style={chartStyles.xLabel}>
                {d}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Period buttons */}
      <View style={chartStyles.periods}>
        {['1D', '1W', '1M', 'ALL'].map((p) => (
          <Pressable
            key={p}
            onPress={() => onPeriod(p)}
            style={[chartStyles.periodBtn, period === p && chartStyles.periodBtnActive]}
          >
            <Text style={[chartStyles.periodText, period === p && chartStyles.periodTextActive]}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const chartStyles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 8,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 12,
    gap: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendName: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.85)',
  },
  chartRow: {
    flexDirection: 'row',
    gap: 10,
  },
  yAxis: {
    justifyContent: 'space-between',
    height: CHART_H,
  },
  yLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.3)',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  xLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.3)',
  },
  periods: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 2,
  },
  periodBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
  },
  periodBtnActive: {
    backgroundColor: 'rgba(245,245,245,0.1)',
  },
  periodText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.5)',
  },
  periodTextActive: {
    color: 'rgba(245,245,245,0.85)',
  },
});

// Community section
function CommunitySection() {
  const [text, setText] = useState('');
  const f1Pct = 50;
  const f2Pct = 50;

  return (
    <View style={commStyles.card}>
      <Text style={commStyles.title}>Community picks</Text>
      <View style={commStyles.picksRow}>
        <View style={commStyles.picksBar}>
          <View style={[commStyles.picksTeal, { flex: f1Pct }]} />
          <View style={[commStyles.picksRed, { flex: f2Pct }]} />
        </View>
        <View style={commStyles.picksLabels}>
          <Text style={[commStyles.pickLabel, { color: 'rgba(47,194,170,0.75)' }]}>
            Nariman {f1Pct}%
          </Text>
          <Text
            style={[commStyles.pickLabel, { color: 'rgba(195,67,99,0.75)', textAlign: 'right' }]}
          >
            {f2Pct}% Hamdy
          </Text>
        </View>
      </View>
      <View style={commStyles.inputRow}>
        <View style={commStyles.inputWrapper}>
          <TextInput
            style={commStyles.input}
            placeholder="Share your predictions..."
            placeholderTextColor="rgba(245,245,245,0.2)"
            value={text}
            onChangeText={setText}
          />
        </View>
        <Pressable style={commStyles.sendBtn}>
          <CommonIcon name="arrow" size={24} color="rgba(245,245,245,0.6)" />
        </Pressable>
      </View>
    </View>
  );
}

const commStyles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 8,
    padding: 24,
    gap: 12,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
  },
  picksRow: {
    gap: 8,
  },
  picksBar: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  picksTeal: {
    backgroundColor: '#2FC2AA',
  },
  picksRed: {
    backgroundColor: '#C34363',
  },
  picksLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickLabel: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    height: 44,
    backgroundColor: 'rgba(245,245,245,0.07)',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
    padding: 0,
  },
  sendBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }],
  },
});

// Stat card item with divider
function StatItem({
  label,
  value,
  showDivider = true,
}: {
  label: string;
  value: string;
  showDivider?: boolean;
}) {
  return (
    <>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      {showDivider && <View style={styles.statDivider} />}
    </>
  );
}

function StatCard({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <View style={styles.statsCard}>
      {stats.map((s, i) => (
        <StatItem
          key={s.label}
          label={s.label}
          value={s.value}
          showDivider={i < stats.length - 1}
        />
      ))}
    </View>
  );
}

// ─── Comments Panel ──────────────────────────────────────────────────────────

type Comment = {
  id: string;
  avatar: string;
  name: string;
  text: string;
  date: string;
  likes: number;
  liked: boolean;
  isOwn: boolean;
};

function SendIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13"
        stroke="rgba(245,245,245,0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="rgba(245,245,245,0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MessageSquareIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke="rgba(245,245,245,0.3)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DotsIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="rgba(245,245,245,0.3)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
        stroke="rgba(245,245,245,0.3)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
        stroke="rgba(245,245,245,0.3)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function HeartIcon({ liked }: { liked: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={liked ? '#07F499' : 'rgba(245,245,245,0.3)'}
        fill={liked ? '#07F499' : 'none'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CommentItem({
  comment,
  showDivider,
  isMenuOpen,
  onDotsPress,
  onEdit,
  onDelete,
  onLike,
}: {
  comment: Comment;
  showDivider: boolean;
  isMenuOpen: boolean;
  onDotsPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onLike: () => void;
}) {
  return (
    <>
      <View style={ciStyles.row}>
        <Image source={{ uri: comment.avatar }} style={ciStyles.avatar} />
        <View style={ciStyles.body}>
          <Text style={ciStyles.name}>{comment.name}</Text>
          <Text style={ciStyles.text}>{comment.text}</Text>
          <View style={ciStyles.meta}>
            <Text style={ciStyles.metaText}>{comment.date}</Text>
            <Text style={ciStyles.metaText}>Reply</Text>
          </View>
        </View>
        <View style={ciStyles.actions}>
          {comment.isOwn && (
            <Pressable style={ciStyles.actionBtn} onPress={onDotsPress} hitSlop={6}>
              <DotsIcon />
            </Pressable>
          )}
          <Pressable style={ciStyles.likeBtn} onPress={onLike} hitSlop={6}>
            <HeartIcon liked={comment.liked} />
            {comment.likes > 0 && (
              <Text style={[ciStyles.likeCount, comment.liked && ciStyles.likeCountActive]}>
                {comment.likes}
              </Text>
            )}
          </Pressable>
        </View>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <View style={ciStyles.menu}>
            <Pressable style={ciStyles.menuItem} onPress={onEdit}>
              <Text style={ciStyles.menuText}>Edit</Text>
            </Pressable>
            <View style={ciStyles.menuDivider} />
            <Pressable style={ciStyles.menuItem} onPress={onDelete}>
              <Text style={ciStyles.menuText}>Delete</Text>
            </Pressable>
            <View style={ciStyles.menuDivider} />
          </View>
        )}
      </View>
      {showDivider && <View style={ciStyles.divider} />}
    </>
  );
}

const ciStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(245,245,245,0.1)',
    marginTop: 6,
  },
  body: {
    flex: 1,
    gap: 6,
    paddingVertical: 6,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    gap: 6,
  },
  metaText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.3)',
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  actionBtn: {
    padding: 4,
  },
  likeBtn: {
    padding: 4,
    alignItems: 'center',
  },
  likeCount: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.3)',
  },
  likeCountActive: {
    color: '#07F499',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(245,245,245,0.07)',
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: 36,
    width: 150,
    backgroundColor: 'rgba(13,13,13,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 12,
    paddingTop: 6,
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 12,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  menuItem: {
    height: 32,
    justifyContent: 'center',
  },
  menuText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(245,245,245,0.07)',
  },
});

function CommentsPanel() {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (editingId) {
      setComments((prev) => prev.map((c) => (c.id === editingId ? { ...c, text: trimmed } : c)));
      setEditingId(null);
    } else {
      setComments((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          avatar: `https://picsum.photos/seed/${Date.now()}/40/40`,
          name: 'You',
          text: trimmed,
          date:
            new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) +
            ', ' +
            new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          likes: 0,
          liked: false,
          isOwn: true,
        },
      ]);
      if (!isExpanded) setIsExpanded(true);
    }
    setText('');
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    setOpenMenuId(null);
  };

  const handleEdit = (id: string) => {
    const comment = comments.find((c) => c.id === id);
    if (comment) {
      setText(comment.text);
      setEditingId(id);
      setOpenMenuId(null);
    }
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c,
      ),
    );
  };

  const isEmpty = comments.length === 0;
  const paddingBottom = Math.max(insets.bottom, 16) + 12;
  const maxListHeight = screenHeight * 0.55;

  return (
    <View style={[cpStyles.panel, { paddingBottom }]}>
      {/* Transparent backdrop to close menu on outside tap */}
      {openMenuId !== null && (
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => setOpenMenuId(null)}
        />
      )}

      {/* Header */}
      <Pressable
        onPress={() => {
          setOpenMenuId(null);
          if (!isEmpty) setIsExpanded((v) => !v);
        }}
        style={cpStyles.header}
      >
        <View>
          <Text style={cpStyles.title}>
            {isEmpty ? 'Comments' : `Comments (${comments.length})`}
          </Text>
          {isEmpty && <Text style={cpStyles.subtitle}>Be the first to comment!</Text>}
        </View>
        {isEmpty ? (
          <MessageSquareIcon />
        ) : (
          <View style={{ transform: [{ rotate: isExpanded ? '0deg' : '180deg' }] }}>
            <CommonIcon name="arrow" size={24} color="rgba(245,245,245,0.6)" />
          </View>
        )}
      </Pressable>

      <View style={cpStyles.divider} />

      {/* Comments list (expanded) */}
      {isExpanded && comments.length > 0 && (
        <ScrollView
          style={{ maxHeight: maxListHeight }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={openMenuId === null}
        >
          {comments.map((c, i) => (
            <CommentItem
              key={c.id}
              comment={c}
              showDivider={i < comments.length - 1}
              isMenuOpen={openMenuId === c.id}
              onDotsPress={() => setOpenMenuId(openMenuId === c.id ? null : c.id)}
              onEdit={() => handleEdit(c.id)}
              onDelete={() => handleDelete(c.id)}
              onLike={() => handleLike(c.id)}
            />
          ))}
        </ScrollView>
      )}

      {/* Input */}
      <View style={cpStyles.inputRow}>
        <View style={cpStyles.inputWrapper}>
          <TextInput
            style={cpStyles.input}
            placeholder="Start chatting"
            placeholderTextColor="rgba(245,245,245,0.2)"
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
        </View>
        <Pressable
          style={({ pressed }) => [cpStyles.sendBtn, { opacity: pressed ? 0.6 : 1 }]}
          onPress={handleSend}
        >
          <SendIcon />
        </Pressable>
      </View>
    </View>
  );
}

const cpStyles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0d0d0d',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: 'rgba(245,245,245,1)',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.6)',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(245,245,245,0.07)',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    height: 44,
    backgroundColor: 'rgba(245,245,245,0.07)',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  input: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
    padding: 0,
  },
  sendBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function FightDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    date: string;
    time: string;
    prize: string;
    eventName: string;
    fighter1: string;
    fighter2: string;
  }>();

  const fighter1: Fighter = params.fighter1
    ? JSON.parse(params.fighter1)
    : {
        image: 'https://picsum.photos/seed/fighter1/200/200',
        name: 'Nariman Abbassov',
        odds: '50%',
        multiplier: '1.89x',
      };

  const fighter2: Fighter = params.fighter2
    ? JSON.parse(params.fighter2)
    : {
        image: 'https://picsum.photos/seed/fighter2/200/200',
        name: 'Hamdy Abdelwah',
        odds: '50%',
        multiplier: '1.89x',
      };

  const date = params.date ?? 'Sat 4/12';
  const time = params.time ?? '13:00';
  const eventName = params.eventName ?? 'UFC Event1';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState<'fighter1' | 'fighter2'>('fighter1');
  const [detailedOpen, setDetailedOpen] = useState(false);
  const [oddsOpen, setOddsOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [period, setPeriod] = useState('1D');

  const openModal = (fighter: 'fighter1' | 'fighter2') => {
    setSelectedFighter(fighter);
    setModalVisible(true);
  };

  return (
    <View style={styles.root}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 160 },
        ]}
      >
        {/* Nav bar */}
        <View style={styles.navBar}>
          <Pressable onPress={() => router.back()} style={styles.navBtn} hitSlop={8}>
            <View style={styles.backArrow}>
              <CommonIcon name="arrow" size={24} color="rgba(245,245,245,0.85)" />
            </View>
          </Pressable>
          <Text style={styles.navTitle}>Fight Statistics</Text>
          <View style={[styles.navBtn, { opacity: 0 }]} />
        </View>

        <View style={styles.content}>
          {/* Event info */}
          <View style={styles.eventRow}>
            <View style={styles.eventLeft}>
              <Text style={styles.eventName}>{eventName}</Text>
              <Text style={styles.eventRounds}>3 Rounds</Text>
            </View>
            <Text style={styles.eventWeight}>Lightweight</Text>
          </View>

          {/* Fighter images */}
          <View style={styles.fighterImages}>
            <Pressable style={styles.fighterImageCard} onPress={() => openModal('fighter1')}>
              <Image
                source={{ uri: fighter1.image }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0,189,231,0)', 'rgba(63,240,211,0.072)', 'rgba(182,254,13,0.25)']}
                locations={[0.144, 0.649, 1]}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.fighterCardBorder, { borderColor: '#2FC2AA' }]} />
            </Pressable>
            <Pressable style={[styles.fighterImageCard, { backgroundColor: '#1F1919' }]} onPress={() => openModal('fighter2')}>
              <Image
                source={{ uri: fighter2.image }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(231,8,0,0)', 'rgba(231,0,139,0.05)', 'rgba(146,0,231,0.105)']}
                locations={[0.1875, 0.524, 0.88]}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.fighterCardBorder, { borderColor: '#C34363' }]} />
            </Pressable>
          </View>

          {/* Fighter info row */}
          <View style={styles.fighterInfoRow}>
            <View style={styles.fighterInfoLeft}>
              <Text style={styles.fighterName}>{fighter1.name}</Text>
              <View style={styles.fighterRecordRow}>
                <Text style={styles.fighterRecordText}>15-2-1</Text>
                <Text style={styles.fighterRecordText}>+234</Text>
              </View>
              <View style={styles.fighterOddsRow}>
                <Text style={[styles.fighterOddsText, { color: '#2FC2AA' }]}>{fighter1.odds}</Text>
                <Text style={[styles.dot, { color: '#2FC2AA' }]}>⬤</Text>
                <Text style={[styles.fighterOddsText, { color: '#2FC2AA' }]}>
                  {fighter1.multiplier}
                </Text>
              </View>
            </View>
            <View style={styles.centerCol}>
              <Text style={styles.centerTime}>{time}</Text>
              <CommonIcon name="fist-fill" size={16} color="rgba(245,245,245,0.3)" />
              <Text style={styles.centerDate}>{date}</Text>
            </View>
            <View style={styles.fighterInfoRight}>
              <Text style={[styles.fighterName, styles.textRight]}>{fighter2.name}</Text>
              <View style={[styles.fighterRecordRow, styles.rowEnd]}>
                <Text style={styles.fighterRecordText}>15-2-1</Text>
                <Text style={styles.fighterRecordText}>-234</Text>
              </View>
              <View style={[styles.fighterOddsRow, styles.rowEnd]}>
                <Text style={[styles.fighterOddsText, { color: '#C34363' }]}>{fighter2.odds}</Text>
                <Text style={[styles.dot, { color: '#C34363' }]}>⬤</Text>
                <Text style={[styles.fighterOddsText, { color: '#C34363' }]}>
                  {fighter2.multiplier}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats cards */}
          <View style={styles.statsRow}>
            <StatCard
              stats={[
                { label: 'Age', value: '5.7' },
                { label: 'Height', value: '5\'10"' },
                { label: 'Stance', value: 'Orthodox' },
                { label: 'Avg. Fight Time', value: '12:50' },
              ]}
            />
            <StatCard
              stats={[
                { label: 'Age', value: '5.7' },
                { label: 'Height', value: '6\'0"' },
                { label: 'Stance', value: 'Orthodox' },
                { label: 'Avg. Fight Time', value: '12:50' },
              ]}
            />
          </View>

          {/* Place a Bet (secondary) */}
          <Pressable
            style={({ pressed }) => [styles.placeBetBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.placeBetText}>Place a Bet</Text>
          </Pressable>

          {/* Accordions */}
          <View style={styles.accordions}>
            <SectionAccordion
              title="Detailed Stats"
              isOpen={detailedOpen}
              onPress={() => setDetailedOpen((v) => !v)}
            >
              <View style={styles.detailedCard}>
                <StatBar
                  label="Strikes / Min"
                  f1Value="5.98"
                  f2Value="3.24"
                  f1Pct={65}
                  f2Pct={35}
                  dual
                />
                <StatBar
                  label="Strike Accuracy"
                  f1Value="50%"
                  f2Value="48%"
                  f1Pct={51}
                  f2Pct={49}
                  dual
                />
                <StatBar
                  label="Takedowns / Fight"
                  f1Value="0.00"
                  f2Value="5.48"
                  f1Pct={0}
                  f2Pct={90}
                  dual={false}
                />
                <StatBar
                  label="Takedown Accuracy"
                  f1Value="0%"
                  f2Value="45%"
                  f1Pct={0}
                  f2Pct={48}
                  dual={false}
                />
                <StatBar
                  label="Subs / Fight"
                  f1Value="0.0"
                  f2Value="0.6"
                  f1Pct={0}
                  f2Pct={29}
                  dual={false}
                />
              </View>
            </SectionAccordion>

            <SectionAccordion
              title="Odds History"
              isOpen={oddsOpen}
              onPress={() => setOddsOpen((v) => !v)}
            >
              <OddsChart period={period} onPeriod={setPeriod} />
            </SectionAccordion>

            <SectionAccordion
              title="Community"
              isOpen={communityOpen}
              onPress={() => setCommunityOpen((v) => !v)}
              isLast
            >
              <CommunitySection />
            </SectionAccordion>
          </View>
        </View>
      </ScrollView>

      <CommentsPanel />

      <TeamsEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedFighter={selectedFighter}
        fighter1={fighter1}
        fighter2={fighter2}
        date={date}
        time={time}
        eventName={eventName}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },


  scrollContent: { flexGrow: 1 },

  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 24,
  },
  navBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  backArrow: { transform: [{ rotate: '-90deg' }] },
  navTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSize.base,
    color: 'rgba(245,245,245,0.85)',
  },

  content: { paddingHorizontal: 16, gap: 16 },

  // Event info
  eventRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventName: { fontFamily: fonts.regular, fontSize: fontSize.xs, color: 'rgba(245,245,245,0.6)' },
  eventRounds: { fontFamily: fonts.regular, fontSize: fontSize.xs, color: 'rgba(245,245,245,0.2)' },
  eventWeight: { fontFamily: fonts.medium, fontSize: fontSize.xs, color: 'rgba(245,245,245,0.3)' },

  // Fighter images
  fighterImages: { flexDirection: 'row', gap: 12 },
  fighterImageCard: {
    flex: 1,
    height: 96,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#191C1F',
  },
  fighterCardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
    borderBottomWidth: 1,
  },

  // Fighter info
  fighterInfoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fighterInfoLeft: { flex: 1, gap: 2 },
  fighterInfoRight: { flex: 1, gap: 2, alignItems: 'flex-end' },
  fighterName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
    lineHeight: 18,
  },
  textRight: { textAlign: 'right' },
  fighterRecordRow: { flexDirection: 'row', gap: 10 },
  rowEnd: { justifyContent: 'flex-end' },
  fighterRecordText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: 'rgba(245,245,245,0.6)',
  },
  fighterOddsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fighterOddsText: { fontFamily: fonts.regular, fontSize: fontSize.xs },
  dot: { fontSize: 2 },
  centerCol: { alignItems: 'center', gap: 5, paddingHorizontal: 8 },
  centerTime: { fontFamily: fonts.regular, fontSize: fontSize.xs, color: 'rgba(245,245,245,0.6)' },
  centerDate: { fontFamily: fonts.regular, fontSize: fontSize.xs, color: 'rgba(245,245,245,0.5)' },

  // Stats cards
  statsRow: { flexDirection: 'row', gap: 12 },
  statsCard: {
    flex: 1,
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 12,
  },
  statItem: { alignItems: 'center', gap: 2 },
  statLabel: { fontFamily: fonts.regular, fontSize: fontSize.xs, color: 'rgba(245,245,245,0.5)' },
  statValue: { fontFamily: fonts.medium, fontSize: fontSize.base, color: 'rgba(245,245,245,0.85)' },
  statDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(245,245,245,0.07)',
    width: '100%',
  },

  // Place a Bet
  placeBetBtn: {
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  placeBetText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(245,245,245,0.85)',
  },

  // Accordions
  accordions: {},
  sectionBorder: { borderBottomWidth: 1, borderColor: 'rgba(245,245,245,0.07)' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  sectionTitle: { fontFamily: fonts.medium, fontSize: fontSize.sm, color: 'rgba(245,245,245,0.6)' },
  sectionContent: { paddingBottom: 16 },

  // Detailed Stats card wrapper
  detailedCard: {
    backgroundColor: 'rgba(245,245,245,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(245,245,245,0.07)',
    borderRadius: 8,
    padding: 24,
    gap: 32,
  },
});
