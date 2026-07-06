// components/image/ImagePreview.tsx

import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";

import Colors from "../../constants/colors";
import ImageActions from "./ImageActions";

interface ImagePreviewProps {
  imageUrl: string | null;
  prompt?: string;
  loading?: boolean;

  onDownload?: () => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
}

export default function ImagePreview({
  imageUrl,
  prompt,
  loading = false,
  onDownload,
  onDelete,
  onRegenerate,
}: ImagePreviewProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text style={styles.loadingText}>
          Generating your image...
        </Text>
      </View>
    );
  }

  if (!imageUrl) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No Image Yet
        </Text>

        <Text style={styles.emptyText}>
          Enter a prompt above and tap
          Generate to create an AI image.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {prompt ? (
        <Text style={styles.prompt}>
          {prompt}
        </Text>
      ) : null}

      <ImageActions
        imageUrl={imageUrl}
        prompt={prompt}
        onDownload={onDownload}
        onDelete={onDelete}
        onRegenerate={onRegenerate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  image: {
    width: "100%",
    height: 320,
    borderRadius: 18,
    backgroundColor: Colors.surface,
  },

  prompt: {
    marginTop: 14,
    color: Colors.text,
    fontSize: 15,
    lineHeight: 22,
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  loadingText: {
    marginTop: 14,
    color: Colors.textSecondary,
    fontSize: 15,
  },

  emptyContainer: {
    marginTop: 40,
    padding: 30,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
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