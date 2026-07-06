// frontend/components/sidebar/HistoryItem.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export interface HistoryItemProps {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt?: string;

  selected?: boolean;

  onPress?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}

export default function HistoryItem({
  title,
  lastMessage,
  updatedAt,
  selected = false,
  onPress,
  onRename,
  onDelete,
}: HistoryItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.container,
        selected && styles.selected,
      ]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={22}
          color={
            selected
              ? "#FFFFFF"
              : Colors.primary
          }
        />

        <View style={styles.content}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              selected &&
                styles.selectedText,
            ]}
          >
            {title}
          </Text>

          {lastMessage ? (
            <Text
              numberOfLines={1}
              style={[
                styles.subtitle,
                selected &&
                  styles.selectedSubtitle,
              ]}
            >
              {lastMessage}
            </Text>
          ) : null}

          {updatedAt ? (
            <Text
              style={[
                styles.time,
                selected &&
                  styles.selectedSubtitle,
              ]}
            >
              {updatedAt}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.actions}>
        {onRename && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onRename}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={
                selected
                  ? "#FFFFFF"
                  : Colors.primary
              }
            />
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onDelete}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={
                selected
                  ? "#FFFFFF"
                  : "#DC2626"
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    marginBottom: 8,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  content: {
    marginLeft: 12,
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  time: {
    marginTop: 4,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  selectedText: {
    color: "#FFFFFF",
  },

  selectedSubtitle: {
    color: "#F3F4F6",
  },

  actions: {
    flexDirection: "row",
    marginLeft: 10,
  },

  actionButton: {
    padding: 4,
    marginLeft: 6,
  },
});