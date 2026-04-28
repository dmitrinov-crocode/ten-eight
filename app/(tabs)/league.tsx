import { Text } from 'react-native';
import LeagueScreenContainer from '@/components/fantasy/league-main/ScreenContainer';

export default function RanksScreen() {
  return (
    <LeagueScreenContainer title="NameOftheLeague" scrollable>
      <Text style={{ color: 'white' }}>Ranks</Text>
    </LeagueScreenContainer>
  );
}
