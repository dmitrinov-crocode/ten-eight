// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { GradientText } from '@/components/common';
// import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

// export type LoginMode = 'email' | 'phone';

// interface LoginToggleProps {
//   mode: LoginMode;
//   onModeSwitch: (mode: LoginMode) => void;
// }

// export function LoginToggle({ mode, onModeSwitch }: LoginToggleProps) {
//   return (
//     <View style={styles.toggleContainer}>
//       <TouchableOpacity
//         style={[
//           styles.toggleTab,
//           mode === 'email' ? styles.toggleTabActive : styles.toggleTabInactive,
//         ]}
//         onPress={() => onModeSwitch('email')}
//         activeOpacity={0.7}
//       >
//         {mode === 'email' ? (
//           <GradientText
//             style={styles.toggleTextActive}
//             colors={[colors.greenStart, colors.greenEnd]}
//           >
//             Email
//           </GradientText>
//         ) : (
//           <Text style={styles.toggleTextInactive}>Email</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.toggleTab,
//           mode === 'phone' ? styles.toggleTabActive : styles.toggleTabInactive,
//         ]}
//         onPress={() => onModeSwitch('phone')}
//         activeOpacity={0.7}
//       >
//         {mode === 'phone' ? (
//           <GradientText
//             style={styles.toggleTextActive}
//             colors={[colors.greenStart, colors.greenEnd]}
//           >
//             Phone Number
//           </GradientText>
//         ) : (
//           <Text style={styles.toggleTextInactive}>Phone Number</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   toggleContainer: {
//     flexDirection: 'row',
//     backgroundColor: colors.white3,
//     borderWidth: 1,
//     borderColor: colors.white7,
//     borderRadius: borderRadius.toggle,
//     padding: spacing.sm,
//     gap: 2,
//     marginHorizontal: 16,
//   },
//   toggleTab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 42,
//   },
//   toggleTabActive: {
//     borderWidth: 1,
//     borderColor: colors.green40Start,
//     borderRadius: borderRadius.toggle,
//     paddingHorizontal: spacing.xxs,
//   },
//   toggleTabInactive: {
//     borderRadius: borderRadius.button,
//     paddingHorizontal: spacing.base,
//   },
//   toggleTextActive: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//   },
//   toggleTextInactive: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//     color: colors.white85,
//   },
// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientText } from '@/components/common';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

export type LoginMode = 'email' | 'phone';

interface LoginToggleProps {
  mode: LoginMode;
  onModeSwitch: (mode: LoginMode) => void;
}

const GREEN40_GRADIENT: [string, string] = [colors.green40Start, colors.green40End];

export function LoginToggle({ mode, onModeSwitch }: LoginToggleProps) {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={styles.toggleTab}
        onPress={() => onModeSwitch('email')}
        activeOpacity={0.7}
      >
        {mode === 'email' ? (
          <LinearGradient
            colors={GREEN40_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          >
            <View style={styles.activeInner}>
                <GradientText
                    style={styles.toggleTextActive}
                    colors={[colors.greenStart, colors.greenEnd]}
                >
                    Email
                </GradientText>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.inactiveInner}>
            <Text style={styles.toggleTextInactive}>Email</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toggleTab}
        onPress={() => onModeSwitch('phone')}
        activeOpacity={0.7}
      >
        {mode === 'phone' ? (
          <LinearGradient
            colors={GREEN40_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          >
            <View style={styles.activeInner}>
                <GradientText
                    style={styles.toggleTextActive}
                    colors={[colors.greenStart, colors.greenEnd]}
                >
                    Phone Number
                </GradientText>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.inactiveInner}>
            <Text style={styles.toggleTextInactive}>Phone Number</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white3,
    borderWidth: 1,
    borderColor: colors.white7,
    borderRadius: borderRadius.toggle,
    padding: spacing.sm,
    gap: 2,
    marginHorizontal: 16,
  },
  toggleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    width: '100%',
    borderRadius: borderRadius.toggle,
    padding: 1,
  },
  activeInner: {
    backgroundColor: colors.blackSolid,
    borderRadius: borderRadius.toggle,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    minHeight: 40,
  },
  inactiveInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    minHeight: 40,
  },
  toggleTextActive: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
  },
  toggleTextInactive: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
  },
});