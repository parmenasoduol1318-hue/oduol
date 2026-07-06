// components/image/ImageActions.tsx

import React from "react";
import {
  View,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface ImageActionsProps {
  imageUrl: string;

  prompt?: string;

  onDownload?: () => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
}

export default function ImageActions({
  imageUrl,
  prompt,
  onDownload,
  onDelete,
  onRegenerate,
}: ImageActionsProps) {
  const shareImage = async () => {
    try {
      await Share.share({
        message: imageUrl,
        url: imageUrl,
      });
    } catch {
      Alert.alert(
        "Error",
        "Unable to share image."
      );
    }
  };

  const copyPrompt = async () => {
    if (!prompt) return;

    await Clipboard.setStringAsync(prompt);

    Alert.alert(
      "Copied",
      "Prompt copied to clipboard."
    );
  };

  const openImage = async () => {
    try {
      await Linking.openURL(imageUrl);
    } catch {
      Alert.alert(
        "Error",
        "Unable to open image."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppButton
          title="Download"
          size="small"
          icon="download-outline"
          onPress={() =>
            onDownload?.()
          }
        />

        <View style={styles.space} />

        <AppButton
          title="Share"
          size="small"
          variant="outline"
          icon="share-social-outline"
          onPress={shareImage}
        />
      </View>

      <View style={styles.row}>
        <AppButton
          title="Open"
          size="small"
          variant="secondary"
          icon="open-outline"
          onPress={openImage}
        />

        <View style={styles.space} />

        <AppButton
          title="Copy Prompt"
          size="small"
          variant="outline"
          icon="copy-outline"
          onPress={copyPrompt}
        />
      </View>

      {onRegenerate && (
        <>
          <View style={styles.separator} />

          <AppButton
            title="Regenerate Image"
            icon="refresh-outline"
            onPress={onRegenerate}
          />
        </>
      )}

      {onDelete && (
        <>
          <View style={styles.separator} />

          <AppButton
            title="Delete Image"
            variant="danger"
            icon="trash-outline"
            onPress={onDelete}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },

  row: {
    flexDirection: "row",
    marginBottom: 12,
  },

  space: {
    width: 10,
  },

  separator: {
    height: 14,
  },
});