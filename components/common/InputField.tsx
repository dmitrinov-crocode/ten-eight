import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Eye from '@/assets/icons/eye.svg';
import CloseEye from '@/assets/icons/close_eye.svg';
import { colors, fonts, fontSize, spacing, borderRadius } from '@/constants/theme';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerStyle,
  secureTextEntry,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isSecure = secureTextEntry && !showPassword;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error ? styles.inputWrapperError : undefined]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.white20}
          selectionColor={colors.greenStart}
          secureTextEntry={isSecure}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {showPassword ? (
              <Eye width={24} height={24} color={colors.white60} />
            ) : (
              <CloseEye width={24} height={24} color={colors.white60} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing.sm,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.whiteSolid,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white7,
    borderRadius: borderRadius.card,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    height: 44,
  },
  inputWrapperError: {
    borderWidth: 1,
    borderColor: colors.greenEnd,
  },
  input: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.white85,
    paddingVertical: 0,
  },
  eyeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.greenEnd,
  },
});
