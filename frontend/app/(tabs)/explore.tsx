// frontend/app/(tabs)/explore.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

const FEATURES = [
  {
    title: "AI Chat",
    subtitle: "Talk with SwiftReply AI",
    icon: "chatbubble-ellipses",
    color: "#3B82F6",
  },
  {
    title: "Image Generator",
    subtitle: "Create AI images",
    icon: "image",
    color: "#EC4899",
  },
  {
    title: "Voice Assistant",
    subtitle: "Speak naturally",
    icon: "mic",
    color: "#10B981",
  },
  {
    title: "Code Assistant",
    subtitle: "Generate & debug code",
    icon: "code-slash",
    color: "#8B5CF6",
  },
  {
    title: "Translator",
    subtitle: "Translate over 100 languages",
    icon: "language",
    color: "#F59E0B",
  },
  {
    title: "Summarizer",
    subtitle: "Summarize PDFs & text",
    icon: "document-text",
    color: "#EF4444",
  },
  {
    title: "Research",
    subtitle: "AI-powered web research",
    icon: "search",
    color: "#06B6D4",
  },
  {
    title: "Memory",
    subtitle: "Personal AI memory",
    icon: "brain",
    color: "#14B8A6",
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Explore</Text>

        <Text style={styles.subtitle}>
          Discover everything SwiftReply can do.
        </Text>

        <View style={styles.grid}>
          {FEATURES.map((feature) => (
            <TouchableOpacity
              key={feature.title}
              style={styles.card}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: feature.color },
                ]}
              >
                <Ionicons
                  name={feature.icon as any}
                  size={30}
                  color={Colors.white}
                />
              </View>

              <Text style={styles.cardTitle}>
                {feature.title}
              </Text>

              <Text style={styles.cardSubtitle}>
                {feature.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },

  subtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginBottom: 24,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  cardSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});