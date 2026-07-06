// frontend/app/payments/index.tsx

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

export default function PaymentsScreen() {
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

        <Text style={styles.title}>Payments</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Subscription */}
        <View style={styles.card}>
          <Ionicons
            name="diamond-outline"
            size={42}
            color={Colors.primary}
          />

          <Text style={styles.cardTitle}>
            SwiftReply Free Plan
          </Text>

          <Text style={styles.cardSubtitle}>
            You're currently using the free plan.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/payments/plans")}
          >
            <Text style={styles.primaryButtonText}>
              Upgrade to Pro
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>
          Payment Methods
        </Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/payments/mpesa")}
        >
          <View style={styles.optionLeft}>
            <Ionicons
              name="phone-portrait-outline"
              size={24}
              color={Colors.primary}
            />

            <View>
              <Text style={styles.optionTitle}>
                M-Pesa
              </Text>

              <Text style={styles.optionSubtitle}>
                Pay securely using Safaricom M-Pesa.
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/payments/paypal")}
        >
          <View style={styles.optionLeft}>
            <Ionicons
              name="logo-paypal"
              size={24}
              color="#0070BA"
            />

            <View>
              <Text style={styles.optionTitle}>
                PayPal
              </Text>

              <Text style={styles.optionSubtitle}>
                Pay using your PayPal account.
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>

        {/* Billing */}
        <Text style={styles.sectionTitle}>
          Billing
        </Text>

        <View style={styles.billingCard}>
          <Text style={styles.billingLabel}>
            Current Plan
          </Text>

          <Text style={styles.billingValue}>
            Free
          </Text>

          <View style={styles.divider} />

          <Text style={styles.billingLabel}>
            Messages
          </Text>

          <Text style={styles.billingValue}>
            15 AI messages/day
          </Text>

          <View style={styles.divider} />

          <Text style={styles.billingLabel}>
            Status
          </Text>

          <Text
            style={[
              styles.billingValue,
              { color: "#4CAF50" },
            ]}
          >
            Active
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  title: {
    fontSize: 22,
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
    padding: 24,
    alignItems: "center",
    marginBottom: 30,
  },

  cardTitle: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  cardSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  primaryButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 14,
    marginTop: 5,
  },

  option: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },

  optionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text,
  },

  optionSubtitle: {
    marginTop: 4,
    color: Colors.textSecondary,
    fontSize: 13,
  },

  billingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 18,
    marginTop: 5,
  },

  billingLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
  },

  billingValue: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
});