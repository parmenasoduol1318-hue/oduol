// frontend/app/payments/failed.tsx

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export default function PaymentFailedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons
            name="close-circle"
            size={110}
            color="#EF4444"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Payment Failed
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Unfortunately your payment could not be completed.
          {"\n\n"}
          This may happen because:
          {"\n"}
          • You cancelled the payment.
          {"\n"}
          • Insufficient balance.
          {"\n"}
          • Network timeout.
          {"\n"}
          • Payment provider error.
        </Text>

        {/* Retry */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/payments/plans")}
        >
          <Ionicons
            name="refresh"
            size={20}
            color="#fff"
          />

          <Text style={styles.primaryText}>
            Try Again
          </Text>
        </TouchableOpacity>

        {/* Back */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.secondaryText}>
            Return Home
          </Text>
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => router.push("/settings")}
        >
          <Ionicons
            name="help-circle-outline"
            size={18}
            color={Colors.primary}
          />

          <Text style={styles.helpText}>
            Contact Support
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
    paddingHorizontal: 28,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  description: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },

  secondaryButton: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  helpButton: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  helpText: {
    marginLeft: 8,
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
});