import { ScreenContainer } from '@/components';
import { Favorites, Fighters, TopNavigation } from '@/components/fights';

export default function FightsScreen() {
  return (
    <ScreenContainer title="Fights" scrollable>
      <TopNavigation />
      <Fighters />
      <Favorites />
    </ScreenContainer>
  );
}
