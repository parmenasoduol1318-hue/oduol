// components/chat/ChatBubble.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface ChatBubbleProps {
  role: "user" | "assistant";
  message: string;
  timestamp?: string;
  copied?: boolean;
  onCopy?: () => void;
}

export default function ChatBubble({
  role,
  message,
  timestamp,
  copied = false,
  onCopy,
}: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons
            name="sparkles"
            size={18}
            color="#2563EB"
          />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.message,
            isUser
              ? styles.userMessage
              : styles.aiMessage,
          ]}
        >
          {message}
        </Text>

        <View style={styles.footer}>
          {timestamp && (
            <Text
              style={[
                styles.time,
                isUser
                  ? styles.userTime
                  : styles.aiTime,
              ]}
            >
              {timestamp}
            </Text>
          )}

          {!isUser && (
            <TouchableOpacity
              onPress={onCopy}
              style={styles.copyButton}
            >
              <Ionicons
                name={
                  copied
                    ? "checkmark"
                    : "copy-outline"
                }
                size={16}
                color="#6B7280"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isUser && (
        <View style={styles.userAvatar}>
          <Ionicons
            name="person"
            size={18}
            color="#FFFFFF"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "flex-end",
  },

  userContainer: {
    justifyContent: "flex-end",
  },

  aiContainer: {
    justifyContent: "flex-start",
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },

  userBubble: {
    backgroundColor: "#2563EB",
    borderBottomRightRadius: 4,
  },

  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  message: {
    fontSize: 16,
    lineHeight: 24,
  },

  userMessage: {
    color: "#FFFFFF",
  },

  aiMessage: {
    color: "#111827",
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    fontSize: 11,
  },

  userTime: {
    color: "#DBEAFE",
  },

  aiTime: {
    color: "#9CA3AF",
  },

  copyButton: {
    padding: 4,
  },
});