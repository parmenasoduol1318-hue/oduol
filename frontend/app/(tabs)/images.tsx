import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useImageStore } from "@/store/imageStore";

export default function ImagesScreen() {
  const {
    images,
    loading,
    fetchImages,
    generateImage,
  } = useImageStore();

  useEffect(() => {
    fetchImages();
  }, []);

  const handleGenerate = async () => {
    try {
      await generateImage({
        prompt: "A futuristic AI assistant",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.loadingText}>
          Loading images...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          AI Images
        </Text>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
        >
          <Ionicons
            name="sparkles"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Generate
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={images}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />

            <Text
              numberOfLines={2}
              style={styles.prompt}
            >
              {item.prompt}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="images-outline"
              size={80}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No Images Yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Generate your first AI image to see it
              here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 55,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontWeight: "600",
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 180,
  },

  prompt: {
    padding: 12,
    fontSize: 14,
    color: "#374151",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 90,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
    fontSize: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    color: "#6B7280",
    fontSize: 16,
  },
});