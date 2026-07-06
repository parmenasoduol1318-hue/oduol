// components/image/ImageViewer.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import ImageActions from "./ImageActions";

interface ImageViewerProps {
  visible: boolean;
  imageUrl: string;
  prompt?: string;

  onClose: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
}

export default function ImageViewer({
  visible,
  imageUrl,
  prompt,
  onClose,
  onDownload,
  onDelete,
  onRegenerate,
}: ImageViewerProps) {
  const [imageLoaded, setImageLoaded] =
    useState(false);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      statusBarTranslucent
    >
      <StatusBar
        backgroundColor="#000"
        barStyle="light-content"
      />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons
            name="close"
            size={30}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {!imageLoaded && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Loading image...
            </Text>
          </View>
        )}

        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
          onLoad={() =>
            setImageLoaded(true)
          }
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    zIndex: 10,
  },

  image: {
    width: "100%",
    height: "60%",
    borderRadius: 16,
  },

  loadingContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  prompt: {
    color: "#FFFFFF",
    marginTop: 20,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});