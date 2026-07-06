// components/chat/ChatHeader.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  online?: boolean;
  onMenuPress?: () => void;
  onNewChat?: () => void;
  onBackPress?: () => void;
}

export default function ChatHeader({
  title = "SwiftReply AI",
  subtitle = "Online",
  online = true,
  onMenuPress,
  onNewChat,
  onBackPress,
}: ChatHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.left}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBackPress ?? (() => router.back())}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />
        </TouchableOpacity>

        <View style={styles.avatar}>
          <Ionicons
            name="sparkles"
            size={22}
            color="#2563EB"
          />
        </View>

        <View>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: online
                    ? "#10B981"
                    : "#EF4444",
                },
              ]}
            />

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNewChat}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color="#2563EB"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMenuPress}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={22}
            color="#111827"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
  },
});