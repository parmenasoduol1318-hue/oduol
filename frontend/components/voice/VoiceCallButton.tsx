// frontend/components/voice/VoiceCallButton.tsx

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface VoiceCallButtonProps {
  onPress: () => void;

  disabled?: boolean;
  loading?: boolean;
  connected?: boolean;

  title?: string;

  style?: ViewStyle;
}

export default function VoiceCallButton({
  onPress,
  disabled = false,
  loading = false,
  connected = false,
  title,
  style,
}: VoiceCallButtonProps) {
  const buttonTitle = title
    ? title
    : connected
    ? "Connected"
    : "Start Voice Call";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: connected
            ? "#16A34A"
            : Colors.primary,
          opacity:
            disabled || loading ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Ionicons
        name={
          connected
            ? "call"
            : "call-outline"
        }
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.title}>
        {loading
          ? "Connecting..."
          : buttonTitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,

    elevation: 5,
  },

  title: {
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});