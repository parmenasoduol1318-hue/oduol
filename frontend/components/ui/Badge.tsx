// frontend/components/ui/Badge.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gray";

interface BadgeProps {
  label: string;

  variant?: BadgeVariant;
  size?: "small" | "medium" | "large";

  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  label,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
}: BadgeProps) {
  const colors = getVariantColors(variant);

  return (
    <View
      style={[
        styles.base,
        styles[size],
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${size}Text`],
          {
            color: colors.text,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function getVariantColors(
  variant: BadgeVariant
) {
  switch (variant) {
    case "success":
      return {
        background: "#DCFCE7",
        border: "#86EFAC",
        text: "#15803D",
      };

    case "warning":
      return {
        background: "#FEF3C7",
        border: "#FCD34D",
        text: "#B45309",
      };

    case "danger":
      return {
        background: "#FEE2E2",
        border: "#FCA5A5",
        text: "#B91C1C",
      };

    case "info":
      return {
        background: "#DBEAFE",
        border: "#93C5FD",
        text: "#1D4ED8",
      };

    case "gray":
      return {
        background: "#F3F4F6",
        border: "#D1D5DB",
        text: "#4B5563",
      };

    default:
      return {
        background: "#EDE9FE",
        border: "#C4B5FD",
        text: "#6D28D9",
      };
  }
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  small: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  medium: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  large: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  text: {
    fontWeight: "700",
  },

  smallText: {
    fontSize: 11,
  },

  mediumText: {
    fontSize: 12,
  },

  largeText: {
    fontSize: 14,
  },
});