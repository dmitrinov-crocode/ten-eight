import React from 'react';
import { Tabs } from 'expo-router';
import { TTab } from '@/components/bottomNavigation/Tab';
import Navigation from '@/components/bottomNavigation/Navigation';

const TABS: TTab[] = [
  { name: 'index', route: 'index', icon: 'fist-outline', label: 'Fights' },
  { name: 'all-leagues', route: 'all-leagues', icon: 'fist-outline', label: 'Fights2' },
  { name: 'ranks', route: 'ranks', icon: 'cup', label: 'Pros' },
  { name: 'picks', route: 'picks', icon: 'list', label: 'Feed' },
  { name: 'groups', route: 'groups', icon: 'group', label: 'Fantasy' },
  { name: 'league', route: 'league', icon: 'group', label: 'Fantasy2' },
  { name: 'profile', route: 'profile', icon: 'user', label: 'Account' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
      }}
      tabBar={(props) => <Navigation tabs={TABS} {...props} />}
    >
      {TABS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.label }} />
      ))}
    </Tabs>
  );
}
