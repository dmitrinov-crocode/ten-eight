import Arrow from '@/assets/icons/arrow.svg';
import Coin from '@/assets/icons/coin.svg';
import Cup from '@/assets/icons/cup.svg';
import FistFill from '@/assets/icons/fist-fill.svg';
import FistOutline from '@/assets/icons/fist-outline.svg';
import Flame from '@/assets/icons/flame.svg';
import Group from '@/assets/icons/group.svg';
import Search from '@/assets/icons/search.svg';
import Settings from '@/assets/icons/settings.svg';
import Profile from '@/assets/icons/profile.svg';
import Eye from '@/assets/icons/eye.svg';
import List from '@/assets/icons/list.svg';
import CloseEye from '@/assets/icons/close_eye.svg';
import User from '@/assets/icons/user1.svg';
import { StyleSheet, View } from 'react-native';

const icons = {
  arrow: Arrow,
  coin: Coin,
  cup: Cup,
  'fist-fill': FistFill,
  'fist-outline': FistOutline,
  flame: Flame,
  group: Group,
  search: Search,
  settings: Settings,
  profile: Profile,
  eye: Eye,
  list: List,
  user: User,
  'close-eye': CloseEye,
};

export type IconName = keyof typeof icons;
type IconSize = 16 | 24 | 32 | 48 | 44;
type IconColor = string;

type TProps = {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
};

export default function CommonIcon({ name, size = 24, color = 'white' }: TProps) {
  const Component = icons[name];
  if (!Component) return null;
  return (
    <View style={[styles.wrapper, { height: size, width: size }]}>
      <Component color={color} width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    display: 'flex',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'auto',
    height: 'auto',
  },
});
