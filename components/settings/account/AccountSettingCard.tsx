import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Back from '@/assets/icons/back.svg';
import { colors, fonts, fontSize, spacing } from '@/constants/theme';

type TProps = {
  title: string;
  subtitle: string;
};

export default function AccountSettingCard({ title, subtitle }: TProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/settings/setting-name/1' as any)}
      activeOpacity={0.7}
    >
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.arrowWrapper}>
        <View style={styles.arrowFlip}>
          <Back color={colors.white85} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    width: '100%',
  },
  textGroup: {
    flexDirection: 'column',
    gap: spacing.xs,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.white85,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  arrowWrapper: {
    width: 32,
    height: 32,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowFlip: {
    transform: [{ scaleX: -1 }],
  },
});
