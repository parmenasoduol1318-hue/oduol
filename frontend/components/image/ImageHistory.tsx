// components/image/ImageHistory.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Colors from "../../constants/colors";
import ImageCard, {
  ImageCardProps,
} from "./ImageCard";

interface ImageHistoryProps {
  images: ImageCardProps[];
  loading?: boolean;

  onImagePress?: (
    image: ImageCardProps
  ) => void;

  onDelete?: (
    image: ImageCardProps
  ) => void;
}

export default function ImageHistory({
  images,
  loading = false,
  onImagePress,
  onDelete,
}: ImageHistoryProps) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text style={styles.loadingText}>
          Loading image history...
        </Text>
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>
          No Image History
        </Text>

        <Text style={styles.subtitle}>
          Images you generate will appear here
          for easy access.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <ImageCard
          {...item}
          onPress={() =>
            onImagePress?.(item)
          }
          onDelete={() =>
            onDelete?.(item)
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 14,
    color: Colors.textSecondary,
    fontSize: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
});