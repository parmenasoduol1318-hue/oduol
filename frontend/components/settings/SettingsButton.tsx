// frontend/components/settings/SettingsButton.tsx

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SettingsButtonProps {
  title: string;
  onPress: () => void;

  icon?: keyof typeof Ionicons.glyphMap;

  variant?: "primary" | "outline" | "danger";

  loading?: boolean;
  disabled?: boolean;

  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function SettingsButton({
  title,
  onPress,
  icon,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: SettingsButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === "primary" && styles.primary,
    variant === "outline" && styles.outline,
    variant === "danger" && styles.danger,
    disabled && styles.disabled,
    style,
  ];

  const textColor =
    variant === "outline"
      ? Colors.primary
      : "#FFFFFF";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
    >
      {loading ? (
        <ActivityIndicator
          color={textColor}
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={textColor}
              style={styles.icon}
            />
          )}

          <Text
            style={[
              styles.text,
              { color: textColor },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  primary: {
    backgroundColor: Colors.primary,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },

  danger: {
    backgroundColor: "#DC2626",
  },

  disabled: {
    opacity: 0.5,
  },

  icon: {
    marginRight: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});