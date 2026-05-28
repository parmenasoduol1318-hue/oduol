import React from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { getTranslation } from '@locales/i18n';
import { useAppStore } from '@store/appStore';

export default function RootLayout() {
  const settings = useAppStore((state) => state.settings);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark' || settings.theme === 'dark';

  const t = getTranslation(settings.preferredLanguage as 'en' | 'sw' | 'fr' | 'ar');

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#fff',
        },
        headerTintColor: isDark ? '#fff' : '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: t.app.name,
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: t.navigation.favorites,
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: t.navigation.history,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: t.settings.title,
        }}
      />
    </Stack>
  );
}
