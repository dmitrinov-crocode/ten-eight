import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import User1 from '@/assets/icons/user1.svg';
import Pensil from '@/assets/icons/pensil.svg';
import { colors, borderRadius } from '@/constants/theme';

export default function AccountAvatar() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.circle}>
        <User1 width={120} height={120} />
      </View>
      <LinearGradient
        colors={[colors.greenStart, colors.greenEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.editButton}
      >
        <Pensil width={10} height={10} color={colors.blackSolid} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 120,
    height: 120,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  editButton: {
    position: 'absolute',
    width: 29,      
    height: 29, 
    right: 0,
    bottom: 0,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.white7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});