// frontend/app/payments/plans.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

const FREE_FEATURES = [
  "15 AI messages per day",
  "Basic AI Chat",
  "Image Analysis",
  "Limited AI Images",
  "Community Support",
];

const PRO_FEATURES = [
  "Unlimited AI Messages",
  "Unlimited AI Images",
  "Voice Assistant",
  "File & PDF Analysis",
  "Memory",
  "Priority AI",
  "Code Assistant",
  "Research Mode",
  "Translation",
  "Premium Support",
];

export default function PlansScreen() {
  return (
    <SafeAreaView style={styles.container}>
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
          Choose a Plan
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Free Plan */}
        <View style={styles.card}>
          <Text style={styles.planName}>
            SwiftReply Free
          </Text>

          <Text style={styles.price}>
            KSh 0
          </Text>

          <Text style={styles.period}>
            Forever
          </Text>

          {FREE_FEATURES.map((item) => (
            <View
              key={item}
              style={styles.feature}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#22C55E"
              />

              <Text style={styles.featureText}>
                {item}
              </Text>
            </View>
          ))}

          <View style={styles.currentPlan}>
            <Text style={styles.currentPlanText}>
              Current Plan
            </Text>
          </View>
        </View>

        {/* Pro Plan */}
        <View style={styles.proCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              MOST POPULAR
            </Text>
          </View>

          <Text style={styles.planName}>
            SwiftReply Pro
          </Text>

          <Text style={styles.price}>
            KSh 499
          </Text>

          <Text style={styles.period}>
            per month
          </Text>

          {PRO_FEATURES.map((item) => (
            <View
              key={item}
              style={styles.feature}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#22C55E"
              />

              <Text style={styles.featureText}>
                {item}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/payments/mpesa")}
          >
            <Text style={styles.primaryButtonText}>
              Pay with M-Pesa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/payments/paypal")}
          >
            <Ionicons
              name="logo-paypal"
              size={18}
              color={Colors.primary}
            />

            <Text style={styles.secondaryButtonText}>
              Pay with PayPal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Coming Soon */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Coming Soon
          </Text>

          <Text style={styles.infoText}>
            • Business Plan{"\n"}
            • Team Workspaces{"\n"}
            • Annual Discounts{"\n"}
            • Student Plans{"\n"}
            • Family Sharing{"\n"}
            • Enterprise AI
          </Text>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
  },

  proCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 15,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  planName: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },

  price: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.primary,
    marginTop: 10,
  },

  period: {
    color: Colors.textSecondary,
    marginBottom: 20,
    fontSize: 15,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  featureText: {
    marginLeft: 10,
    color: Colors.text,
    fontSize: 15,
  },

  currentPlan: {
    marginTop: 20,
    backgroundColor: "#22C55E",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  currentPlanText: {
    color: "#fff",
    fontWeight: "700",
  },

  primaryButton: {
    marginTop: 25,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryButton: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  secondaryButtonText: {
    marginLeft: 8,
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 20,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },

  infoText: {
    color: Colors.textSecondary,
    lineHeight: 24,
    fontSize: 15,
  },
});