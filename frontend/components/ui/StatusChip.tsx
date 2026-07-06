// frontend/components/ui/StatusChip.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

type StatusType =
  | "online"
  | "offline"
  | "success"
  | "warning"
  | "error"
  | "processing"
  | "pro"
  | "free";

interface StatusChipProps {
  status: StatusType;

  label?: string;

  style?: ViewStyle;
}

export default function StatusChip({
  status,
  label,
  style,
}: StatusChipProps) {
  const config = getStatusConfig(status);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            config.background,
          borderColor:
            config.border,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              config.dot,
          },
        ]}
      />

      <Text
        style={[
          styles.text,
          {
            color: config.text,
          },
        ]}
      >
        {label ?? config.label}
      </Text>
    </View>
  );
}

function getStatusConfig(
  status: StatusType
) {
  switch (status) {
    case "online":
      return {
        label: "Online",
        background: "#ECFDF5",
        border: "#BBF7D0",
        dot: "#16A34A",
        text: "#166534",
      };

    case "offline":
      return {
        label: "Offline",
        background: "#F3F4F6",
        border: "#D1D5DB",
        dot: "#6B7280",
        text: "#4B5563",
      };

    case "success":
      return {
        label: "Success",
        background: "#DCFCE7",
        border: "#86EFAC",
        dot: "#22C55E",
        text: "#166534",
      };

    case "warning":
      return {
        label: "Warning",
        background: "#FEF3C7",
        border: "#FCD34D",
        dot: "#F59E0B",
        text: "#92400E",
      };

    case "error":
      return {
        label: "Error",
        background: "#FEE2E2",
        border: "#FCA5A5",
        dot: "#EF4444",
        text: "#991B1B",
      };

    case "processing":
      return {
        label: "Processing",
        background: "#DBEAFE",
        border: "#93C5FD",
        dot: "#3B82F6",
        text: "#1D4ED8",
      };

    case "pro":
      return {
        label: "PRO",
        background: "#EDE9FE",
        border: "#C4B5FD",
        dot: "#7C3AED",
        text: "#6D28D9",
      };

    default:
      return {
        label: "FREE",
        background: "#F3F4F6",
        border: "#D1D5DB",
        dot: "#6B7280",
        text: "#374151",
      };
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});