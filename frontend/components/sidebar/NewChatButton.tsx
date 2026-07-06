// frontend/components/sidebar/NewChatButton.tsx

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface NewChatButtonProps {
  loading?: boolean;
  disabled?: boolean;

  onPress: () => void;
}

export default function NewChatButton({
  loading = false,
  disabled = false,
  onPress,
}: NewChatButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        (disabled || loading) &&
          styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color="#FFFFFF"
        />
      ) : (
        <>
          <Ionicons
            name="add-circle-outline"
            size={22}
            color="#FFFFFF"
            style={styles.icon}
          />

          <Text style={styles.text}>
            New Chat
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  disabled: {
    opacity: 0.6,
  },

  icon: {
    marginRight: 8,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});