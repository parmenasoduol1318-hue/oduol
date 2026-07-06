// components/forms/PaypalForm.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

import paymentService from "../../services/payments/paymentService";

interface PaypalFormProps {
  planId: string;
  amount?: number;
  onSuccess?: () => void;
}

export default function PaypalForm({
  planId,
  amount,
  onSuccess,
}: PaypalFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePaypalPayment = async () => {
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response =
        await paymentService.payWithPaypal({
          plan_id: planId,
        });

      if (response.checkout_url) {
        setSuccess(
          "Redirecting to PayPal..."
        );

        await Linking.openURL(
          response.checkout_url
        );

        onSuccess?.();
      } else {
        throw new Error(
          "No PayPal checkout link returned."
        );
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to start PayPal checkout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Ionicons
          name="logo-paypal"
          size={42}
          color="#0070BA"
        />

        <Text style={styles.title}>
          PayPal Checkout
        </Text>

        <Text style={styles.subtitle}>
          You'll be redirected to the official
          PayPal checkout page to complete your
          payment securely.
        </Text>

        {amount ? (
          <Text style={styles.amount}>
            Amount: KSh {amount}
          </Text>
        ) : null}
      </View>

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {!!success && (
        <Text style={styles.success}>
          {success}
        </Text>
      )}

      <AppButton
        title="Continue with PayPal"
        icon="logo-paypal"
        loading={loading}
        onPress={handlePaypalPayment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  infoCard: {
    backgroundColor: Colors.surface,
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 10,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  amount: {
    marginTop: 16,
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 18,
  },

  error: {
    color: "#DC2626",
    marginBottom: 16,
    fontSize: 14,
  },

  success: {
    color: "#16A34A",
    marginBottom: 16,
    fontWeight: "600",
    fontSize: 14,
  },
});