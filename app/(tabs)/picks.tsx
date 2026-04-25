import { ScreenContainer } from '@/components';
import TopNavigation from '@/components/feed/top-navigation';

export default function PicksScreen() {
  return (
    <ScreenContainer title="Feed" scrollable>
      <TopNavigation />
    </ScreenContainer>
  );
}
