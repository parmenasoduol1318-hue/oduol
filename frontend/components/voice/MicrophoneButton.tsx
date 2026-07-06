// frontend/components/voice/MicrophoneButton.tsx

import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface MicrophoneButtonProps {
  onPress: () => void;

  isRecording?: boolean;
  loading?: boolean;
  disabled?: boolean;

  size?: number;

  style?: ViewStyle;
}

export default function MicrophoneButton({
  onPress,
  isRecording = false,
  loading = false,
  disabled = false,
  size = 70,
  style,
}: MicrophoneButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isRecording
            ? "#DC2626"
            : Colors.primary,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
        />
      ) : (
        <Ionicons
          name={
            isRecording
              ? "stop"
              : "mic"
          }
          size={size * 0.42}
          color="#FFFFFF"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    elevation: 8,
  },
});