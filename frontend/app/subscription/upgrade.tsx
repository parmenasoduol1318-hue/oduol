// frontend/app/subscription/upgrade.tsx

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

export default function UpgradeSubscriptionScreen() {
  const features = [
    "Unlimited AI conversations",
    "Unlimited AI image generation",
    "Voice assistant",
    "Personal AI memory",
    "Priority AI responses",
    "File & document analysis",
    "Cloud sync across devices",
    "Premium customer support",
    "Early access to new features",
  ];

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
            Upgrade to Pro
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Hero */}

        <View style={styles.heroCard}>
          <Ionicons
            name="diamond"
            size={70}
            color="#FBBF24"
          />

          <Text style={styles.heroTitle}>
            SwiftReply Pro
          </Text>

          <Text style={styles.heroSubtitle}>
            Unlock the complete AI experience with unlimited access to every premium feature.
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              KSh 499
            </Text>

            <Text style={styles.period}>
              / month
            </Text>
          </View>
        </View>

        {/* Features */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            What's Included
          </Text>

          {features.map((feature) => (
            <View
              key={feature}
              style={styles.featureRow}
            >
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#22C55E"
              />

              <Text style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Options */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Choose Payment Method
          </Text>

          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => router.push("/payments/mpesa")}
          >
            <Ionicons
              name="phone-portrait"
              size={24}
              color="#16A34A"
            />

            <View style={styles.paymentText}>
              <Text style={styles.paymentTitle}>
                M-Pesa
              </Text>

              <Text style={styles.paymentSubtitle}>
                Pay instantly using Safaricom M-Pesa
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => router.push("/payments/paypal")}
          >
            <Ionicons
              name="logo-paypal"
              size={24}
              color="#0070BA"
            />

            <View style={styles.paymentText}>
              <Text style={styles.paymentTitle}>
                PayPal
              </Text>

              <Text style={styles.paymentSubtitle}>
                Pay securely using your PayPal account
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Terms */}

        <Text style={styles.note}>
          Your subscription renews automatically every month unless cancelled.
          You can manage or cancel your subscription anytime.
        </Text>
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
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 15,
  },

  heroSubtitle: {
    marginTop: 10,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 25,
  },

  price: {
    fontSize: 42,
    fontWeight: "700",
    color: Colors.primary,
  },

  period: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 6,
    marginLeft: 6,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 18,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  featureText: {
    marginLeft: 12,
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },

  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  paymentText: {
    flex: 1,
    marginLeft: 15,
  },

  paymentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  paymentSubtitle: {
    marginTop: 3,
    color: Colors.textSecondary,
    fontSize: 13,
  },

  note: {
    textAlign: "center",
    color: Colors.textSecondary,
    lineHeight: 22,
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});