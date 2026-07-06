// frontend/components/settings/AppearanceSettings.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

type ThemeMode = "system" | "light" | "dark";

interface AppearanceSettingsProps {
  initialTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

export default function AppearanceSettings({
  initialTheme = "system",
  onThemeChange,
}: AppearanceSettingsProps) {
  const [theme, setTheme] =
    useState<ThemeMode>(initialTheme);

  const changeTheme = (
    value: ThemeMode
  ) => {
    setTheme(value);
    onThemeChange?.(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Appearance
      </Text>

      <ThemeOption
        icon="phone-portrait-outline"
        title="Use System Theme"
        description="Automatically follow your device theme."
        selected={theme === "system"}
        onPress={() =>
          changeTheme("system")
        }
      />

      <ThemeOption
        icon="sunny-outline"
        title="Light Mode"
        description="Always use the light theme."
        selected={theme === "light"}
        onPress={() =>
          changeTheme("light")
        }
      />

      <ThemeOption
        icon="moon-outline"
        title="Dark Mode"
        description="Always use the dark theme."
        selected={theme === "dark"}
        onPress={() =>
          changeTheme("dark")
        }
      />
    </View>
  );
}

interface ThemeOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

function ThemeOption({
  icon,
  title,
  description,
  selected,
  onPress,
}: ThemeOptionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.option,
        selected &&
          styles.selectedOption,
      ]}
    >
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={24}
          color={Colors.primary}
        />

        <View style={styles.textArea}>
          <Text style={styles.optionTitle}>
            {title}
          </Text>

          <Text
            style={
              styles.optionDescription
            }
          >
            {description}
          </Text>
        </View>
      </View>

      <Ionicons
        name={
          selected
            ? "radio-button-on"
            : "radio-button-off"
        }
        size={24}
        color={Colors.primary}
      />
    </TouchableOpacity>
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

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 18,
    marginBottom: 14,
  },

  selectedOption: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  left: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },

  textArea: {
    marginLeft: 14,
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },

  optionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});