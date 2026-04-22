import { View, Text, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View>
        <Text>Screen not found</Text>

        <Link href="/" asChild>
          <Pressable>
            <Text>Go to home</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
