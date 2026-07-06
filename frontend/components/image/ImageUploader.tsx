// components/image/ImageUploader.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface ImageUploaderProps {
  imageUri?: string;

  onImageSelected?: (uri: string) => void;
}

export default function ImageUploader({
  imageUri,
  onImageSelected,
}: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] =
    useState(imageUri || "");

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    setSelectedImage(uri);

    onImageSelected?.(uri);
  };

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow camera access."
      );
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        quality: 1,
        allowsEditing: true,
      });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    setSelectedImage(uri);

    onImageSelected?.(uri);
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            No Image Selected
          </Text>
        </View>
      )}

      <View style={styles.buttons}>
        <AppButton
          title="Gallery"
          size="small"
          icon="images-outline"
          onPress={pickImage}
        />

        <View style={styles.space} />

        <AppButton
          title="Camera"
          size="small"
          variant="outline"
          icon="camera-outline"
          onPress={takePhoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
  },

  placeholder: {
    height: 260,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  placeholderText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },

  buttons: {
    flexDirection: "row",
  },

  space: {
    width: 10,
  },
});