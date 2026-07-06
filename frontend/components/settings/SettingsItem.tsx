// frontend/components/settings/SettingsItem.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SettingsItemProps {
  title: string;
  subtitle?: string;

  icon?: keyof typeof Ionicons.glyphMap;

  value?: string;

  danger?: boolean;
  disabled?: boolean;
  showChevron?: boolean;

  onPress?: () => void;
}

export default function SettingsItem({
  title,
  subtitle,
  icon = "settings-outline",
  value,
  danger = false,
  disabled = false,
  showChevron = true,
  onPress,
}: SettingsItemProps) {
  const textColor = danger
    ? "#DC2626"
    : Colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color={
            danger
              ? "#DC2626"
              : Colors.primary
          }
        />

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: textColor },
            ]}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.right}>
        {value ? (
          <Text style={styles.value}>
            {value}
          </Text>
        ) : null}

        {showChevron && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  disabled: {
    opacity: 0.5,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },

  value: {
    marginRight: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});