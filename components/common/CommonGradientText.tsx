import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const DEFAULT_COLORS: [string, string, string] = [
  'rgba(0, 189, 231, 0)',
  'rgba(63, 240, 211, 0.08)',
  'rgba(182, 254, 13, 0.25)',
];

type TProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  colors?: [string, string, string];
};

export default function CommonGradientText({ children, style, colors = DEFAULT_COLORS }: TProps) {
  return (
    <MaskedView
      style={{ position: 'absolute' }}
      maskElement={<Text style={[style, { flex: 1 }]}>{children}</Text>}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
