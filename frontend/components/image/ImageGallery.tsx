// components/image/ImageGallery.tsx

import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";

import ImageCard, {
  ImageCardProps,
} from "./ImageCard";
import Colors from "../../constants/colors";

interface ImageGalleryProps {
  images: ImageCardProps[];

  loading?: boolean;

  onImagePress?: (
    image: ImageCardProps
  ) => void;

  onDelete?: (
    image: ImageCardProps
  ) => void;
}

export default function ImageGallery({
  images,
  loading = false,
  onImagePress,
  onDelete,
}: ImageGalleryProps) {
  if (!loading && images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No Images Yet
        </Text>

        <Text style={styles.emptyText}>
          Images you generate with SwiftReply
          will appear here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
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
    paddingBottom: 24,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: Colors.textSecondary,
    lineHeight: 24,
    fontSize: 15,
  },
});