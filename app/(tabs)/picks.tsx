import { Text } from 'react-native';
import { ScreenContainer } from '@/components';

export default function PicksScreen() {
  return (
    <ScreenContainer title="Picks" scrollable>
      <Text style={{ color: 'white' }}>Picks</Text>
    </ScreenContainer>
  );
}
