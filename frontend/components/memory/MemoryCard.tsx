// frontend/components/memory/MemoryCard.tsx

import React from "react";
import {
  View,
  Text,
 StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export interface MemoryCardProps {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;

  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MemoryCard({
  title,
  content,
  category,
  updatedAt,
  onPress,
  onEdit,
  onDelete,
}: MemoryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>

          {category ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {category}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity
              onPress={onEdit}
              style={styles.iconButton}
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
              onPress={onDelete}
              style={styles.iconButton}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#DC2626"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text
        style={styles.content}
        numberOfLines={4}
      >
        {content}
      </Text>

      {updatedAt ? (
        <Text style={styles.date}>
          Updated: {updatedAt}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  titleContainer: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
  },

  iconButton: {
    marginLeft: 12,
  },

  content: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },

  date: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});