// components/image/ImageGenerator.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
} from "react-native";

import ImagePrompt from "./ImagePrompt";
import ImagePreview from "./ImagePreview";

import imageService from "../../services/image/imageService";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");

  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert(
        "Prompt Required",
        "Please describe the image you want to generate."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await imageService.generateImage({
          prompt,
        });

      setImageUrl(
        response.image_url
      );
    } catch (error: any) {
      Alert.alert(
        "Generation Failed",
        error?.message ||
          "Unable to generate image."
      );
    } finally {
      setLoading(false);
    }
  };

  const regenerateImage = () => {
    generateImage();
  };

  return (
    <View style={styles.container}>
      <ImagePrompt
        value={prompt}
        onChangeText={setPrompt}
        loading={loading}
        onGenerate={generateImage}
      />

      <ImagePreview
        imageUrl={imageUrl}
        prompt={prompt}
        loading={loading}
        onRegenerate={
          regenerateImage
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});