// components/chat/MessageActions.tsx

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";

interface MessageActionsProps {
  message: string;

  onCopy?: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

export default function MessageActions({
  message,
  onCopy,
  onRegenerate,
  onEdit,
  onDelete,
  onShare,
}: MessageActionsProps) {
  const copyMessage = async () => {
    await Clipboard.setStringAsync(message);

    if (onCopy) {
      onCopy();
      return;
    }

    Alert.alert("Copied", "Message copied to clipboard.");
  };

  const shareMessage = async () => {
    try {
      if (onShare) {
        onShare();
        return;
      }

      if (await Sharing.isAvailableAsync()) {
        Alert.alert(
          "Share",
          "Sharing from raw text will be implemented with exported files."
        );
      } else {
        Alert.alert(
          "Unavailable",
          "Sharing is not available on this device."
        );
      }
    } catch {
      Alert.alert("Error", "Unable to share message.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={copyMessage}
      >
        <Ionicons
          name="copy-outline"
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={shareMessage}
      >
        <Ionicons
          name="share-social-outline"
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onRegenerate}
      >
        <Ionicons
          name="refresh-outline"
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onEdit}
      >
        <Ionicons
          name="create-outline"
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onDelete}
      >
        <Ionicons
          name="trash-outline"
          size={18}
          color="#EF4444"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },

  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#F3F4F6",
  },
});