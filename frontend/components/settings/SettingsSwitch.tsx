// frontend/components/settings/SettingsSwitch.tsx

import React from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SettingsSwitchProps {
  title: string;
  description?: string;

  value: boolean;
  onValueChange: (value: boolean) => void;

  icon?: keyof typeof Ionicons.glyphMap;

  disabled?: boolean;
}

export default function SettingsSwitch({
  title,
  description,
  value,
  onValueChange,
  icon = "settings-outline",
  disabled = false,
}: SettingsSwitchProps) {
  return (
    <View
      style={[
        styles.container,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={22}
            color={Colors.primary}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          {description ? (
            <Text style={styles.description}>
              {description}
            </Text>
          ) : null}
        </View>
      </View>

      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        trackColor={{
          false: "#D1D5DB",
          true: Colors.primary,
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D1D5DB"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 14,
  },

  disabled: {
    opacity: 0.5,
  },

  left: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginRight: 16,
  },

  iconContainer: {
    marginTop: 2,
  },

  textContainer: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
  },
});