// components/common/AppButton.tsx

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface AppButtonProps {
  title: string;
  onPress: () => void;

  variant?: ButtonVariant;
  size?: ButtonSize;

  disabled?: boolean;
  loading?: boolean;

  fullWidth?: boolean;

  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = true,
  icon,
  iconPosition = "left",
  style,
  textStyle,
}: AppButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[size],
    getVariantStyle(variant),
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.text,
    getTextStyle(variant),
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Colors.primary : "#fff"}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon}
              size={20}
              color={
                variant === "outline"
                  ? Colors.primary
                  : "#fff"
              }
              style={styles.leftIcon}
            />
          )}

          <Text style={labelStyle}>{title}</Text>

          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon}
              size={20}
              color={
                variant === "outline"
                  ? Colors.primary
                  : "#fff"
              }
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

function getVariantStyle(
  variant: ButtonVariant
): ViewStyle {
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: Colors.secondary,
      };

    case "outline":
      return {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: Colors.primary,
      };

    case "danger":
      return {
        backgroundColor: "#DC2626",
      };

    default:
      return {
        backgroundColor: Colors.primary,
      };
  }
}

function getTextStyle(
  variant: ButtonVariant
): TextStyle {
  switch (variant) {
    case "outline":
      return {
        color: Colors.primary,
      };

    default:
      return {
        color: "#fff",
      };
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  fullWidth: {
    width: "100%",
  },

  disabled: {
    opacity: 0.5,
  },

  small: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  medium: {
    paddingVertical: 15,
    paddingHorizontal: 22,
  },

  large: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },

  leftIcon: {
    marginRight: 8,
  },

  rightIcon: {
    marginLeft: 8,
  },
});