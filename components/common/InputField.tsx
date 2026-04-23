import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
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
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = secureTextEntry && !showPassword;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.white30}
          selectionColor={colors.greenStart}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeText}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
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
    gap: spacing.xs,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.white60,
    marginLeft: spacing.xs,
  },
  labelFocused: {
    color: colors.greenStart,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white7,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.white20,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  inputWrapperFocused: {
    borderColor: colors.greenStart,
    backgroundColor: colors.white20,
  },
  inputWrapperError: {
    borderColor: colors.greenEnd,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSize.base,
    color: colors.whiteSolid,
    paddingVertical: spacing.sm,
  },
  eyeButton: {
    padding: spacing.xs,
  },
  eyeText: {
    fontSize: fontSize.lg,
    opacity: 0.6,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.greenEnd,
    marginLeft: spacing.xs,
  },
});