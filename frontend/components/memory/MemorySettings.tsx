// frontend/components/memory/MemorySettings.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import Colors from "../../constants/colors";

interface MemorySettingsProps {
  memoryEnabled?: boolean;
  autoSaveEnabled?: boolean;
  rememberChatsEnabled?: boolean;

  onMemoryToggle?: (enabled: boolean) => void;
  onAutoSaveToggle?: (enabled: boolean) => void;
  onRememberChatsToggle?: (enabled: boolean) => void;
}

export default function MemorySettings({
  memoryEnabled = true,
  autoSaveEnabled = true,
  rememberChatsEnabled = true,
  onMemoryToggle,
  onAutoSaveToggle,
  onRememberChatsToggle,
}: MemorySettingsProps) {
  const [memory, setMemory] = useState(memoryEnabled);
  const [autoSave, setAutoSave] = useState(autoSaveEnabled);
  const [rememberChats, setRememberChats] = useState(
    rememberChatsEnabled
  );

  const toggleMemory = (value: boolean) => {
    setMemory(value);
    onMemoryToggle?.(value);
  };

  const toggleAutoSave = (value: boolean) => {
    setAutoSave(value);
    onAutoSaveToggle?.(value);
  };

  const toggleRememberChats = (value: boolean) => {
    setRememberChats(value);
    onRememberChatsToggle?.(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Memory Settings
      </Text>

      <SettingItem
        title="Enable Memory"
        description="Allow SwiftReply to remember information across conversations."
        value={memory}
        onValueChange={toggleMemory}
      />

      <SettingItem
        title="Auto Save Memories"
        description="Automatically save important memories suggested by the AI."
        value={autoSave}
        onValueChange={toggleAutoSave}
      />

      <SettingItem
        title="Remember Chat Context"
        description="Use previous conversations to personalize responses."
        value={rememberChats}
        onValueChange={toggleRememberChats}
      />
    </View>
  );
}

interface SettingItemProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingItem({
  title,
  description,
  value,
  onValueChange,
}: SettingItemProps) {
  return (
    <View style={styles.settingCard}>
      <View style={styles.textContainer}>
        <Text style={styles.settingTitle}>
          {title}
        </Text>

        <Text style={styles.settingDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#D1D5DB",
          true: Colors.primary,
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 20,
  },

  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  textContainer: {
    flex: 1,
    paddingRight: 16,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },

  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
});