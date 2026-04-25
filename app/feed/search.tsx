import { CommonInputField } from '@/components/common/CommonInputField';
import { colors, spacing } from '@/constants/theme';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, router } from 'expo-router';

export default function PicksScreen() {
const [search, setSearch] = useState('');
  return (
     <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
        <View style={[StyleSheet.absoluteFill, styles.overlay]} />
        <View style={styles.inputsAndButton}>
            <View style={styles.inputsContainer}>
                <CommonInputField
                    placeholder="Search..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
        </View>
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
    inputsAndButton: {
        display: 'flex',
        padding: 16,
        paddingRight: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    inputsContainer: {
        gap: spacing.xl,
    },
})