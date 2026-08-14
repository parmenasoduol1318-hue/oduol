import React from "react";
import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubbles"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="compass"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="history"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="images"
        options={{
          title: "Images",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="images"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="voice"
        options={{
          title: "Voice",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="mic"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}