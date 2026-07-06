// frontend/app/payments/paypal.tsx

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export default function PayPalScreen() {
  const [loading, setLoading] = useState(false);

  const handlePayPal = async () => {
    try {
      setLoading(true);

      /**
       * TODO
       * Replace with:
       *
       * const url = await paymentService.createPayPalCheckout();
       * Linking.openURL(url);
       */

      setTimeout(() => {
        setLoading(false);

        Alert.alert(
          "PayPal Checkout",
          "Backend integration will redirect you to the PayPal payment page."
        );
      }, 1800);
    } catch (error) {
      setLoading(false);

      Alert.alert(
        "Payment Failed",
        "Unable to start PayPal checkout."
      );
    }
  };

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
            PayPal Payment
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Logo */}

        <View style={styles.logoContainer}>
          <Ionicons
            name="logo-paypal"
            size={90}
            color="#0070BA"
          />
        </View>

        <Text style={styles.title}>
          Upgrade to SwiftReply Pro
        </Text>

        <Text style={styles.subtitle}>
          Securely subscribe using your PayPal account.
        </Text>

        {/* Plan */}

        <View style={styles.planCard}>
          <Text style={styles.planTitle}>
            SwiftReply Pro
          </Text>

          <Text style={styles.price}>
            KSh 499
          </Text>

          <Text style={styles.period}>
            Per Month
          </Text>
        </View>

        {/* Benefits */}

        <View style={styles.features}>
          <Text style={styles.feature}>
            ✓ Unlimited AI Chat
          </Text>

          <Text style={styles.feature}>
            ✓ Unlimited AI Images
          </Text>

          <Text style={styles.feature}>
            ✓ Voice Assistant
          </Text>

          <Text style={styles.feature}>
            ✓ AI Memory
          </Text>

          <Text style={styles.feature}>
            ✓ File Analysis
          </Text>

          <Text style={styles.feature}>
            ✓ Faster AI Responses
          </Text>

          <Text style={styles.feature}>
            ✓ Premium Support
          </Text>
        </View>

        {/* Info */}

        <View style={styles.infoBox}>
          <Ionicons
            name="shield-checkmark"
            size={22}
            color="#0070BA"
          />

          <Text style={styles.infoText}>
            You will be redirected to PayPal to complete
            your payment securely.
          </Text>
        </View>

        {/* Button */}

        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayPal}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name="logo-paypal"
                size={20}
                color="#fff"
              />

              <Text style={styles.payButtonText}>
                Continue with PayPal
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.text,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 25,
    fontSize: 15,
  },

  planCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
  },

  planTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  price: {
    fontSize: 38,
    fontWeight: "800",
    color: "#0070BA",
    marginTop: 10,
  },

  period: {
    color: Colors.textSecondary,
    marginTop: 6,
  },

  features: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  feature: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 12,
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 30,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: Colors.textSecondary,
    lineHeight: 21,
  },

  payButton: {
    backgroundColor: "#0070BA",
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  payButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },

  cancelButton: {
    marginTop: 18,
    alignItems: "center",
  },

  cancelText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});