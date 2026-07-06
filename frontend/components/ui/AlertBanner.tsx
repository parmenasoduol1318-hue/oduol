// frontend/components/ui/AlertBanner.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

type AlertType =
  | "success"
  | "error"
  | "warning"
  | "info";

interface AlertBannerProps {
  title: string;
  message?: string;

  type?: AlertType;

  dismissible?: boolean;

  onDismiss?: () => void;
}

export default function AlertBanner({
  title,
  message,
  type = "info",
  dismissible = true,
  onDismiss,
}: AlertBannerProps) {
  const config = getAlertConfig(type);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            config.background,
          borderColor: config.border,
        },
      ]}
    >
      <Ionicons
        name={config.icon}
        size={24}
        color={config.color}
      />

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: config.color },
          ]}
        >
          {title}
        </Text>

        {message ? (
          <Text style={styles.message}>
            {message}
          </Text>
        ) : null}
      </View>

      {dismissible && (
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.closeButton}
        >
          <Ionicons
            name="close"
            size={20}
            color={config.color}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

function getAlertConfig(type: AlertType) {
  switch (type) {
    case "success":
      return {
        icon:
          "checkmark-circle-outline" as const,
        color: "#16A34A",
        background: "#ECFDF5",
        border: "#BBF7D0",
      };

    case "error":
      return {
        icon:
          "close-circle-outline" as const,
        color: "#DC2626",
        background: "#FEF2F2",
        border: "#FECACA",
      };

    case "warning":
      return {
        icon:
          "warning-outline" as const,
        color: "#D97706",
        background: "#FFFBEB",
        border: "#FCD34D",
      };

    default:
      return {
        icon:
          "information-circle-outline" as const,
        color: Colors.primary,
        background: "#EFF6FF",
        border: "#BFDBFE",
      };
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  message: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  closeButton: {
    marginLeft: 8,
    padding: 2,
  },
});