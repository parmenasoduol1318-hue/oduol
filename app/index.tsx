import React from 'react';
import { View, useColorScheme, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { getTranslation } from '@locales/i18n';
import { useAppStore } from '@store/appStore';
import HomeScreen from '@components/HomeScreen';

export default function Home() {
  const settings = useAppStore((state) => state.settings);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark' || settings.theme === 'dark';
  const t = getTranslation(settings.preferredLanguage as 'en' | 'sw' | 'fr' | 'ar');

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#2a2a2a' : '#fff',
          borderTopColor: isDark ? '#333' : '#ddd',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDark ? '#666' : '#ccc',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.navigation.home,
          tabBarLabel: t.navigation.home,
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { color }]}>
              💬
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t.navigation.favorites,
          tabBarLabel: t.navigation.favorites,
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { color }]}>
              ⭐
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t.navigation.history,
          tabBarLabel: t.navigation.history,
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { color }]}>
              📜
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings.title,
          tabBarLabel: t.settings.title,
          tabBarIcon: ({ color }) => (
            <View style={[styles.iconContainer, { color }]}>
              ⚙️
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    fontSize: 20,
  },
});
