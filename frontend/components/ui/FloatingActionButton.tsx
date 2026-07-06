// frontend/components/ui/FloatingActionButton.tsx

import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface FloatingActionButtonProps {
  onPress: () => void;

  icon?: keyof typeof Ionicons.glyphMap;

  size?: number;

  bottom?: number;
  right?: number;
  left?: number;

  disabled?: boolean;

  style?: ViewStyle;
}

export default function FloatingActionButton({
  onPress,
  icon = "add",
  size = 60,
  bottom = 24,
  right,
  left,
  disabled = false,
  style,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.fab,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          bottom,
          right,
          left,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Ionicons
        name={icon}
        size={size * 0.45}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.primary,

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