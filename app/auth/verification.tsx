// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Stack, router, useLocalSearchParams } from 'expo-router';
// import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
// import { BlackButton } from '@/components/common/BlackButton';
// import { PrimaryButton } from '@/components/common/PrimaryButton';
// import { GradientText } from '@/components/common';
// import Back from '@/assets/icons/back.svg';

// const CODE_LENGTH = 4;

// const maskEmail = (email: string): string => {
//   const [localPart, domain] = email.split('@');
//   if (!domain) return email;
  
//   const localLength = localPart.length;

//   if (localLength === 1) {
//     return `*@${domain}`;
//   }
  
//   if (localLength === 2) {
//     return `${localPart[0]}*@${domain}`;
//   }
  
//   if (localLength === 3) {
//     return `${localPart[0]}*${localPart[2]}@${domain}`;
//   }
  
//   const firstTwo = localPart.slice(0, 2);
//   const lastTwo = localPart.slice(-2);
//   const starsCount = localLength - 4;
//   const stars = '*'.repeat(starsCount);
  
//   return `${firstTwo}${stars}${lastTwo}@${domain}`;
// };

// const maskPhoneNumber = (phone: string): string => {
//   const digits = phone.replace(/\D/g, '');
  
//   if (digits.length <= 3) {
//     return '*'.repeat(digits.length);
//   }
  
//   const prefixLength = Math.min(3, Math.floor(digits.length / 2));
//   const suffixLength = Math.min(1, digits.length - prefixLength);
  
//   const prefix = digits.slice(0, prefixLength);
//   const suffix = digits.slice(-suffixLength);
//   const starsCount = digits.length - prefixLength - suffixLength;
//   const stars = '*'.repeat(starsCount);

//   if (phone.startsWith('+')) {
//     return `+${prefix}${stars}${suffix}`;
//   }
  
//   return `${prefix}${stars}${suffix}`;
// };

// const maskContact = (contact: string, type: 'email' | 'phone'): string => {
//   if (type === 'email') {
//     return maskEmail(contact);
//   }
//   return maskPhoneNumber(contact);
// };

// export default function Verification() {
//   const params = useLocalSearchParams<{ contact: string; contactType: 'email' | 'phone' }>();
//   const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
//   const inputRefs = useRef<Array<TextInput | null>>(Array(CODE_LENGTH).fill(null));

//   const contact = params.contact || '';
//   const contactType = params.contactType || 'email';
//   const maskedContact = maskContact(contact, contactType);

//   const isFilled = code.every((c) => c.length === 1);

//   const handleChangeText = (text: string, index: number) => {
//     const digit = text.replace(/[^0-9]/g, '').slice(-1);
//     const newCode = [...code];
//     newCode[index] = digit;
//     setCode(newCode);
//     if (digit && index < CODE_LENGTH - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (key: string, index: number) => {
//     if (key === 'Backspace' && !code[index] && index > 0) {
//       const newCode = [...code];
//       newCode[index - 1] = '';
//       setCode(newCode);
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleContinue = () => {
//     router.replace('/auth/customize-account');
//   };

//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ headerShown: false }} />

//       <LinearGradient
//         colors={gradients.authBg.colors}
//         locations={gradients.authBg.locations}
//         start={gradients.authBg.start}
//         end={gradients.authBg.end}
//         style={StyleSheet.absoluteFill}
//       />

//       <View style={[StyleSheet.absoluteFill, styles.overlay]} />

//       <SafeAreaView style={styles.safeArea}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.keyboardView}
//         >
//           <ScrollView
//             contentContainerStyle={styles.scrollContent}
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//           >
//             <View style={styles.navBar}>
//               <TouchableOpacity onPress={() => router.back()} style={styles.navButton}>
//                 <Back color={colors.whiteSolid} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.content}>
//               <View style={styles.titleSection}>
//                 <Text style={styles.title}>Verification</Text>
//                 <Text style={styles.subtitle}>
//                   {`Please enter the code we sent to\n${maskedContact}`}
//                 </Text>
//               </View>

//               <View style={styles.formSection}>
//                 <View style={styles.inputsGroup}>
//                   <View style={styles.divider} />
//                   <View style={styles.otpRow}>
//                     {code.map((digit, index) => (
//                       <TextInput
//                         key={index}
//                         ref={(ref) => {
//                           inputRefs.current[index] = ref;
//                         }}
//                         style={styles.otpInput}
//                         value={digit}
//                         onChangeText={(text) => handleChangeText(text, index)}
//                         onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
//                         keyboardType="number-pad"
//                         maxLength={1}
//                         textAlign="center"
//                         selectionColor={colors.greenEnd}
//                       />
//                     ))}
//                   </View>
//                   <View style={styles.divider} />
//                 </View>

//                 <View style={styles.buttonSection}>
//                   {isFilled ? (
//                     <PrimaryButton
//                       label="Continue"
//                       onPress={handleContinue}
//                       style={styles.button}
//                     />
//                   ) : (
//                     <BlackButton label="Continue" style={styles.button} />
//                   )}

//                   <View style={styles.resendRow}>
//                     <Text style={styles.resendText}>{"Didn't get a code? "}</Text>
//                     <TouchableOpacity activeOpacity={0.7}>
//                       <GradientText
//                         style={styles.resendLink}
//                         colors={[colors.greenStart, colors.greenEnd]}
//                       >
//                         Resend
//                       </GradientText>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   overlay: {
//     backgroundColor: colors.black85,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   navBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.xxs,
//   },
//   navButton: {
//     width: 32,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: spacing.xl,
//   },
//   content: {
//     gap: spacing.xl,
//     marginTop: spacing.md,
//   },
//   titleSection: {
//     paddingHorizontal: spacing.xl,
//     paddingVertical: spacing.md,
//     gap: spacing.xxs,
//   },
//   title: {
//     fontFamily: fonts.semibold,
//     fontSize: fontSize['32pt'],
//     color: colors.whiteSolid,
//   },
//   subtitle: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.sm,
//     color: colors.white60,
//   },
//   formSection: {
//     paddingHorizontal: spacing.xl,
//     gap: spacing['3xl'],
//   },
//   inputsGroup: {
//     gap: spacing['3xl'],
//   },
//   divider: {
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: colors.white7,
//   },
//   otpRow: {
//     flexDirection: 'row',
//     gap: spacing.sm,
//     justifyContent: 'center',
//   },
//   otpInput: {
//     width: 52,
//     height: 64,
//     backgroundColor: colors.white7,
//     borderRadius: borderRadius.card,
//     fontFamily: fonts.medium,
//     fontSize: fontSize.xl,
//     color: colors.white85,
//     textAlign: 'center',
//   },
//   buttonSection: {
//     gap: spacing.base,
//   },
//   button: {
//     width: '100%',
//   },
//   resendRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: spacing.xxs,
//   },
//   resendText: {
//     fontFamily: fonts.regular,
//     fontSize: fontSize.sm,
//     color: colors.white60,
//   },
//   resendLink: {
//     fontFamily: fonts.medium,
//     fontSize: fontSize.sm,
//     textDecorationLine: 'underline',
//   },
// });

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { colors, fonts, fontSize, spacing, borderRadius, gradients } from '@/constants/theme';
import { BlackButton } from '@/components/common/BlackButton';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { GradientText } from '@/components/common';
import Back from '@/assets/icons/back.svg';

const CODE_LENGTH = 4;
const RESEND_COOLDOWN_SECONDS = 60;

const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  
  const localLength = localPart.length;

  if (localLength === 1) {
    return `*@${domain}`;
  }
  
  if (localLength === 2) {
    return `${localPart[0]}*@${domain}`;
  }
  
  if (localLength === 3) {
    return `${localPart[0]}*${localPart[2]}@${domain}`;
  }
  
  const firstTwo = localPart.slice(0, 2);
  const lastTwo = localPart.slice(-2);
  const starsCount = localLength - 4;
  const stars = '*'.repeat(starsCount);
  
  return `${firstTwo}${stars}${lastTwo}@${domain}`;
};

const maskPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length <= 3) {
    return '*'.repeat(digits.length);
  }
  
  const prefixLength = Math.min(3, Math.floor(digits.length / 2));
  const suffixLength = Math.min(1, digits.length - prefixLength);
  
  const prefix = digits.slice(0, prefixLength);
  const suffix = digits.slice(-suffixLength);
  const starsCount = digits.length - prefixLength - suffixLength;
  const stars = '*'.repeat(starsCount);

  if (phone.startsWith('+')) {
    return `+${prefix}${stars}${suffix}`;
  }
  
  return `${prefix}${stars}${suffix}`;
};

const maskContact = (contact: string, type: 'email' | 'phone'): string => {
  if (type === 'email') {
    return maskEmail(contact);
  }
  return maskPhoneNumber(contact);
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return ` ${mins}:${secs.toString().padStart(2, '0')} `;
};

export default function Verification() {
  const params = useLocalSearchParams<{ contact: string; contactType: 'email' | 'phone' }>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>(Array(CODE_LENGTH).fill(null));
  
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const contact = params.contact || '';
  const contactType = params.contactType || 'email';
  const maskedContact = maskContact(contact, contactType);

  const isFilled = code.every((c) => c.length === 1);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      timerRef.current = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resendCooldown]);

  const handleChangeText = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    router.replace('/auth/customize-account');
  };

  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    
    console.log('Resending code to:', contact);
    
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
  };

  const renderResendButton = () => {
    if (resendCooldown > 0) {
      return (
        <GradientText
          style={styles.resendTimer}
          colors={[colors.greenStart, colors.greenEnd]}
        >
          {`(${formatTime(resendCooldown)})`}
        </GradientText>
      );
    }
    
    return (
      <GradientText
        style={styles.resendLink}
        colors={[colors.greenStart, colors.greenEnd]}
      >
        Resend
      </GradientText>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={gradients.authBg.colors}
        locations={gradients.authBg.locations}
        start={gradients.authBg.start}
        end={gradients.authBg.end}
        style={StyleSheet.absoluteFill}
      />

      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => router.back()} style={styles.navButton}>
                <Back color={colors.whiteSolid} />
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>
                  {`Please enter the code we sent to\n${maskedContact}`}
                </Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.inputsGroup}>
                  <View style={styles.divider} />
                  <View style={styles.otpRow}>
                    {code.map((digit, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => {
                          inputRefs.current[index] = ref;
                        }}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        selectionColor={colors.greenEnd}
                      />
                    ))}
                  </View>
                  <View style={styles.divider} />
                </View>

                <View style={styles.buttonSection}>
                  {isFilled ? (
                    <PrimaryButton
                      label="Continue"
                      onPress={handleContinue}
                      style={styles.button}
                    />
                  ) : (
                    <BlackButton label="Continue" style={styles.button} />
                  )}

                  <View style={styles.resendRow}>
                    <Text style={styles.resendText}>{"Didn't get a code? "}</Text>
                    <TouchableOpacity 
                      activeOpacity={resendCooldown > 0 ? 1 : 0.7}
                      onPress={handleResendCode}
                      disabled={resendCooldown > 0}
                    >
                      {renderResendButton()}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: colors.black85,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
  },
  navButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  titleSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.xxs,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSize['32pt'],
    color: colors.whiteSolid,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  formSection: {
    paddingHorizontal: spacing.xl,
    gap: spacing['3xl'],
  },
  inputsGroup: {
    gap: spacing['3xl'],
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.white7,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  otpInput: {
    width: 52,
    height: 64,
    backgroundColor: colors.white7,
    borderRadius: borderRadius.card,
    fontFamily: fonts.medium,
    fontSize: fontSize.xl,
    color: colors.white85,
    textAlign: 'center',
  },
  buttonSection: {
    gap: spacing.base,
  },
  button: {
    width: '100%',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  resendText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
  },
  resendLink: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
  },
  resendTimer: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    textDecorationLine: 'none',
  },
});