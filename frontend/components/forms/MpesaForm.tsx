// components/forms/MpesaForm.tsx

import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

import paymentService from "../../services/payments/paymentService";

interface MpesaFormProps {
  planId: string;
  amount?: number;
  onSuccess?: () => void;
}

export default function MpesaForm({
  planId,
  amount,
  onSuccess,
}: MpesaFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePhone = () => {
    const phone = phoneNumber.trim();

    if (!phone) {
      setError("Phone number is required.");
      return false;
    }

    const regex =
      /^(?:2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/;

    if (!regex.test(phone.replace(/\s/g, ""))) {
      setError("Enter a valid Kenyan phone number.");
      return false;
    }

    return true;
  };

  const normalizePhone = (phone: string) => {
    let value = phone.replace(/\s/g, "");

    if (value.startsWith("07")) {
      value = "254" + value.substring(1);
    }

    if (value.startsWith("01")) {
      value = "254" + value.substring(1);
    }

    return value;
  };

  const handlePayment = async () => {
    setError("");
    setSuccess("");

    if (!validatePhone()) return;

    try {
      setLoading(true);

      await paymentService.payWithMpesa({
        phone_number: normalizePhone(phoneNumber),
        plan_id: planId,
      });

      setSuccess(
        "STK Push sent successfully. Check your phone and enter your M-Pesa PIN."
      );

      onSuccess?.();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to initiate payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Ionicons
          name="phone-portrait"
          size={40}
          color={Colors.primary}
        />

        <Text style={styles.title}>
          M-Pesa Payment
        </Text>

        <Text style={styles.subtitle}>
          Enter the Safaricom number that will
          receive the STK Push.
        </Text>

        {amount ? (
          <Text style={styles.amount}>
            Amount: KSh {amount}
          </Text>
        ) : null}
      </View>

      <AppInput
        label="Safaricom Phone Number"
        placeholder="07XXXXXXXX"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        icon="call-outline"
        required
      />

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
        title="Pay with M-Pesa"
        icon="wallet-outline"
        loading={loading}
        onPress={handlePayment}
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
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  amount: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },

  error: {
    color: "#DC2626",
    marginBottom: 16,
    fontSize: 14,
  },

  success: {
    color: "#16A34A",
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "600",
  },
});