import { Text } from 'react-native';
import { ScreenContainer } from '@/components';

export default function ProfileScreen() {
  return (
    <ScreenContainer title="Profile" scrollable>
      <Text style={{ color: 'white' }}>Profile</Text>
    </ScreenContainer>
  );
}
