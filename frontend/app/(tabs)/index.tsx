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

export default function HomeScreen() {
  const quickActions = [
    {
      title: "New Chat",
      icon: "chatbubble-ellipses",
      route: "/(tabs)/chats",
      color: "#2563EB",
    },
    {
      title: "Generate Image",
      icon: "images",
      route: "/(tabs)/images",
      color: "#9333EA",
    },
    {
      title: "Voice Assistant",
      icon: "mic",
      route: "/(tabs)/voice",
      color: "#059669",
    },
    {
      title: "Explore",
      icon: "compass",
      route: "/(tabs)/explore",
      color: "#10B981",
    },
    {
      title: "History",
      icon: "time",
      route: "/(tabs)/history",
      color: "#EA580C",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome to
        </Text>

        <Text style={styles.logo}>
          SwiftReply
        </Text>

        <Text style={styles.subtitle}>
          Your intelligent AI assistant for chatting,
          writing, coding, voice, images, and more.
        </Text>
      </View>

      <View style={styles.card}>
        <Ionicons
          name="sparkles"
          size={36}
          color="#2563EB"
        />

        <Text style={styles.cardTitle}>
          Ready to help
        </Text>

        <Text style={styles.cardDescription}>
          Ask anything, generate images, translate,
          summarize documents, write content, or code
          with AI.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(tabs)/chats")}
        >
          <Ionicons
            name="chatbubble"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.primaryButtonText}>
            Start Chatting
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.grid}>
        {quickActions.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.actionCard}
            onPress={() => router.push(item.route as any)}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: `${item.color}20`,
                },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={28}
                color={item.color}
              />
            </View>

            <Text style={styles.actionTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        SwiftReply Features
      </Text>

      <View style={styles.featureCard}>
        <Feature
          icon="chatbubble"
          text="AI Conversations"
        />

        <Feature
          icon="mic"
          text="Voice Assistant"
        />

        <Feature
          icon="images"
          text="AI Image Generation"
        />

        <Feature
          icon="document-text"
          text="Writing & Summaries"
        />

        <Feature
          icon="code-slash"
          text="Coding Assistant"
        />

        <Feature
          icon="globe"
          text="Translation"
        />
      </View>
    </ScrollView>
  );
}

function Feature({
  icon,
  text,
}: {
  icon: any;
  text: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Ionicons
        name={icon}
        size={20}
        color="#2563EB"
      />

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    marginBottom: 28,
  },

  greeting: {
    fontSize: 20,
    color: "#6B7280",
  },

  logo: {
    fontSize: 36,
    fontWeight: "700",
    color: "#2563EB",
    marginTop: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 10,
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 30,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
  },

  cardDescription: {
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 20,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 14,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  actionTitle: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    color: "#111827",
  },

  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  featureText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
  },
});