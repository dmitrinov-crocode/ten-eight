import React from 'react';
import { Tabs } from 'expo-router';
import { TTab } from '@/components/bottomNavigation/Tab';
import Navigation from '@/components/bottomNavigation/Navigation';

const TABS: TTab[] = [
  { name: 'index', route: 'index', icon: 'fist-outline', label: 'Fights' },
  { name: 'ranks', route: 'ranks', icon: 'cup', label: 'Pros' },
  { name: 'picks', route: 'picks', icon: 'coin', label: 'Feed' },
  { name: 'groups', route: 'groups', icon: 'group', label: 'Fantasy' },
  { name: 'profile', route: 'profile', icon: 'profile', label: 'Account' },
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
