// components/image/ImageCard.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export interface ImageCardProps {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt?: string;

  onPress?: () => void;
  onDelete?: () => void;
}

export default function ImageCard({
  imageUrl,
  prompt,
  createdAt,
  onPress,
  onDelete,
}: ImageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          style={styles.prompt}
          numberOfLines={2}
        >
          {prompt}
        </Text>

        {createdAt ? (
          <Text style={styles.date}>
            {createdAt}
          </Text>
        ) : null}

        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 18,
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 220,
    backgroundColor: Colors.border,
  },

  content: {
    padding: 14,
  },

  prompt: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  date: {
    color: Colors.textSecondary,
    fontSize: 13,
  },

  deleteButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },
});