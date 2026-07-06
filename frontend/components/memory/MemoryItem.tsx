// frontend/components/memory/MemoryItem.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export interface MemoryItemProps {
  id: string;
  title: string;
  content: string;
  category?: string;
  updatedAt?: string;

  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MemoryItem({
  title,
  content,
  category,
  updatedAt,
  onPress,
  onEdit,
  onDelete,
}: MemoryItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="bookmark-outline"
          size={24}
          color={Colors.primary}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>

          {category ? (
            <View style={styles.category}>
              <Text
                style={styles.categoryText}
              >
                {category}
              </Text>
            </View>
          ) : null}
        </View>

        <Text
          style={styles.content}
          numberOfLines={2}
        >
          {content}
        </Text>

        {updatedAt ? (
          <Text style={styles.date}>
            Updated {updatedAt}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onEdit}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={Colors.primary}
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
              size={20}
              color="#DC2626"
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
    alignItems: "flex-start",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  iconContainer: {
    marginRight: 14,
    marginTop: 2,
  },

  contentContainer: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginRight: 8,
  },

  category: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  categoryText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  content: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  actions: {
    marginLeft: 10,
    alignItems: "center",
  },

  actionButton: {
    padding: 6,
    marginBottom: 8,
  },
});