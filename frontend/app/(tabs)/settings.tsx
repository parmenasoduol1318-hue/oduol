import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsScreen() {
  const {
    darkMode,
    notifications,
    autoPlayVoice,
    autoSaveChats,
    toggleDarkMode,
    toggleNotifications,
    toggleAutoPlayVoice,
    toggleAutoSaveChats,
  } = useSettingsStore();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Appearance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>

        <SettingSwitch
          icon="moon-outline"
          title="Dark Mode"
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <SettingSwitch
          icon="notifications-outline"
          title="Push Notifications"
          value={notifications}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* AI */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Assistant</Text>

        <SettingSwitch
          icon="volume-high-outline"
          title="Auto Play Voice Responses"
          value={autoPlayVoice}
          onValueChange={toggleAutoPlayVoice}
        />

        <SettingSwitch
          icon="save-outline"
          title="Automatically Save Chats"
          value={autoSaveChats}
          onValueChange={toggleAutoSaveChats}
        />
      </View>

      {/* General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <SettingItem
          icon="language-outline"
          title="Language"
        />

        <SettingItem
          icon="shield-checkmark-outline"
          title="Privacy"
        />

        <SettingItem
          icon="cloud-upload-outline"
          title="Backup & Sync"
        />

        <SettingItem
          icon="card-outline"
          title="Subscription"
        />

        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
        />

        <SettingItem
          icon="information-circle-outline"
          title="About SwiftReply"
        />
      </View>

      <Text style={styles.version}>
        SwiftReply Version 1.0.0
      </Text>
    </ScrollView>
  );
}

function SettingItem({
  icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color="#2563EB"
        />

        <Text style={styles.itemText}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  );
}

function SettingSwitch({
  icon,
  title,
  value,
  onValueChange,
}: {
  icon: any;
  title: string;
  value: boolean;
  onValueChange: () => void;
}) {
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color="#2563EB"
        />

        <Text style={styles.itemText}>
          {title}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 55,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    marginLeft: 14,
    fontSize: 16,
    color: "#111827",
  },

  version: {
    textAlign: "center",
    color: "#9CA3AF",
    marginVertical: 30,
    fontSize: 14,
  },
});