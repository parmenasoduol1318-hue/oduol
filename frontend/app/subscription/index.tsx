// frontend/app/subscription/index.tsx

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export default function SubscriptionScreen() {
  const isPro = true;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            My Subscription
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Status */}

        <View style={styles.statusCard}>
          <Ionicons
            name={
              isPro
                ? "checkmark-circle"
                : "close-circle"
            }
            size={80}
            color={isPro ? "#22C55E" : "#EF4444"}
          />

          <Text style={styles.planTitle}>
            {isPro ? "SwiftReply Pro" : "Free Plan"}
          </Text>

          <Text style={styles.planDescription}>
            {isPro
              ? "Your subscription is active."
              : "Upgrade to unlock premium AI features."}
          </Text>
        </View>

        {/* Details */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Status
            </Text>

            <Text
              style={[
                styles.value,
                {
                  color: isPro
                    ? "#22C55E"
                    : "#EF4444",
                },
              ]}
            >
              {isPro ? "Active" : "Inactive"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Plan
            </Text>

            <Text style={styles.value}>
              {isPro ? "Pro Monthly" : "Free"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Renewal Date
            </Text>

            <Text style={styles.value}>
              28 July 2026
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment Method
            </Text>

            <Text style={styles.value}>
              M-Pesa
            </Text>
          </View>
        </View>

        {/* Features */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Your Benefits
          </Text>

          {[
            "Unlimited AI Chat",
            "Unlimited AI Images",
            "Voice Assistant",
            "AI Memory",
            "Priority Responses",
            "File Analysis",
            "Premium Support",
          ].map((feature) => (
            <View
              key={feature}
              style={styles.featureRow}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#22C55E"
              />

              <Text style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Buttons */}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            router.push("/subscription/manage")
          }
        >
          <Ionicons
            name="settings-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.primaryText}>
            Manage Subscription
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            router.push("/subscription/history")
          }
        >
          <Ionicons
            name="receipt-outline"
            size={20}
            color={Colors.primary}
          />

          <Text style={styles.secondaryText}>
            Payment History
          </Text>
        </TouchableOpacity>

        {!isPro && (
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() =>
              router.push("/subscription/upgrade")
            }
          >
            <Ionicons
              name="rocket-outline"
              size={20}
              color="#fff"
            />

            <Text style={styles.primaryText}>
              Upgrade to Pro
            </Text>
          </TouchableOpacity>
        )}
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  planTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
    color: Colors.text,
  },

  planDescription: {
    marginTop: 8,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  label: {
    color: Colors.textSecondary,
    fontSize: 15,
  },

  value: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 15,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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

  upgradeButton: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
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