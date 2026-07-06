// app/onboarding/index.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OnboardingScreen() {
  const handleGetStarted = () => {
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons
          name="sparkles"
          size={90}
          color="#2563EB"
        />

        <Text style={styles.title}>
          SwiftReply
        </Text>

        <Text style={styles.subtitle}>
          Your AI Assistant for Everything
        </Text>
      </View>

      <View style={styles.features}>
        <Feature
          icon="chatbubble-ellipses-outline"
          title="AI Chat"
          description="Talk naturally with powerful AI."
        />

        <Feature
          icon="mic-outline"
          title="Voice Assistant"
          description="Speak instead of typing."
        />

        <Feature
          icon="image-outline"
          title="Image Generation"
          description="Create AI images instantly."
        />

        <Feature
          icon="flash-outline"
          title="Fast Responses"
          description="Optimized for speed."
        />

        <Feature
          icon="language-outline"
          title="Multi-language"
          description="Supports many languages."
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.feature}>
      <Ionicons
        name={icon}
        size={26}
        color="#2563EB"
      />

      <View style={{ marginLeft: 14 }}>
        <Text style={styles.featureTitle}>
          {title}
        </Text>

        <Text style={styles.featureDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 60,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#2563EB",
    marginTop: 20,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 17,
    color: "#6B7280",
    textAlign: "center",
  },

  features: {
    marginTop: 25,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    elevation: 1,
  },

  featureTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },

  featureDescription: {
    color: "#6B7280",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
});