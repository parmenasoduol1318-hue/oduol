// frontend/app/subscription/success.tsx

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export default function SubscriptionSuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}

        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-circle"
            size={120}
            color="#22C55E"
          />
        </View>

        {/* Title */}

        <Text style={styles.title}>
          Subscription Activated!
        </Text>

        {/* Description */}

        <Text style={styles.description}>
          Congratulations!
          {"\n\n"}
          Your SwiftReply Pro subscription is now active.
          You can now enjoy all premium AI features without
          limits.
        </Text>

        {/* Features */}

        <View style={styles.card}>
          <View style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#22C55E"
            />
            <Text style={styles.featureText}>
              Unlimited AI Chat
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#22C55E"
            />
            <Text style={styles.featureText}>
              Unlimited Image Generation
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#22C55E"
            />
            <Text style={styles.featureText}>
              Voice Assistant
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#22C55E"
            />
            <Text style={styles.featureText}>
              AI Memory
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#22C55E"
            />
            <Text style={styles.featureText}>
              Faster AI Responses
            </Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#22C55E"
            />
            <Text style={styles.featureText}>
              Premium Support
            </Text>
          </View>
        </View>

        {/* Buttons */}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Ionicons
            name="chatbubble-ellipses"
            size={20}
            color="#fff"
          />

          <Text style={styles.primaryText}>
            Start Chatting
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/subscription")}
        >
          <Ionicons
            name="diamond-outline"
            size={20}
            color={Colors.primary}
          />

          <Text style={styles.secondaryText}>
            View Subscription
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  description: {
    marginTop: 18,
    textAlign: "center",
    color: Colors.textSecondary,
    lineHeight: 25,
    fontSize: 16,
    marginBottom: 30,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 20,
    marginBottom: 35,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  featureText: {
    marginLeft: 10,
    color: Colors.text,
    fontSize: 15,
  },

  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  secondaryText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
});