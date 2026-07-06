// components/chat/HomeScreen.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const suggestions = [
  "Explain Quantum Computing",
  "Write a professional email",
  "Generate a business idea",
  "Help me debug Python code",
  "Summarize a PDF",
  "Translate English to Swahili",
];

export default function HomeScreen() {
  const openNewChat = () => {
    router.push("/chat/1");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Ionicons
            name="sparkles"
            size={48}
            color="#2563EB"
          />
        </View>

        <Text style={styles.title}>SwiftReply</Text>

        <Text style={styles.subtitle}>
          Your intelligent AI assistant
        </Text>
      </View>

      <TouchableOpacity
        style={styles.newChatButton}
        onPress={openNewChat}
      >
        <Ionicons
          name="add-circle-outline"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.newChatText}>
          Start New Chat
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Try asking...
      </Text>

      {suggestions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={openNewChat}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color="#2563EB"
          />

          <Text style={styles.cardText}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.features}>
        <Feature
          icon="chatbubble-outline"
          title="AI Chat"
        />

        <Feature
          icon="mic-outline"
          title="Voice Assistant"
        />

        <Feature
          icon="image-outline"
          title="AI Images"
        />

        <Feature
          icon="document-text-outline"
          title="Summaries"
        />

        <Feature
          icon="language-outline"
          title="Translation"
        />

        <Feature
          icon="code-slash-outline"
          title="Coding"
        />
      </View>
    </ScrollView>
  );
}

function Feature({
  icon,
  title,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <View style={styles.feature}>
      <Ionicons
        name={icon}
        size={30}
        color="#2563EB"
      />

      <Text style={styles.featureText}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#2563EB",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },

  newChatButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  newChatText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },

  features: {
    marginTop: 35,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  feature: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    marginBottom: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  featureText: {
    marginTop: 10,
    fontWeight: "600",
    color: "#374151",
  },
});