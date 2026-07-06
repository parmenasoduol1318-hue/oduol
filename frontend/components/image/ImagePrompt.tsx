// components/image/ImagePrompt.tsx

import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface ImagePromptProps {
  value: string;
  loading?: boolean;

  onChangeText: (text: string) => void;
  onGenerate: () => void;
}

export default function ImagePrompt({
  value,
  loading = false,
  onChangeText,
  onGenerate,
}: ImagePromptProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        AI Image Generator
      </Text>

      <Text style={styles.subtitle}>
        Describe the image you want SwiftReply
        to generate. Be as detailed as possible
        for the best results.
      </Text>

      <AppInput
        label="Image Prompt"
        placeholder="Example: A futuristic Nairobi skyline at sunset in a cyberpunk style..."
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        style={styles.input}
        icon="image-outline"
        required
      />

      <AppButton
        title="Generate Image"
        icon="sparkles-outline"
        loading={loading}
        onPress={onGenerate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },

  input: {
    minHeight: 140,
    paddingTop: 14,
  },
});