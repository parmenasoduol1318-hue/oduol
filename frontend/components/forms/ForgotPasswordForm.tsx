// components/forms/ForgotPasswordForm.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

import authService from "../../services/auth/authService";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const validate = () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return false;
    }

    return true;
  };

  const handleReset = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await authService.forgotPassword(
        email.trim().toLowerCase()
      );

      setSuccessMessage(
        "Password reset instructions have been sent to your email."
      );
    } catch (error: any) {
      setEmailError(
        error?.message ||
          "Unable to send reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Enter your registered email address.
        We'll send you instructions to reset
        your password.
      </Text>

      <AppInput
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        icon="mail-outline"
        error={emailError}
        required
      />

      {successMessage ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            {successMessage}
          </Text>
        </View>
      ) : null}

      <AppButton
        title="Send Reset Link"
        icon="mail-open-outline"
        loading={loading}
        onPress={handleReset}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.replace("/auth/login")
        }
      >
        <Text style={styles.backText}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },

  successBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },

  successText: {
    color: "#166534",
    fontWeight: "600",
    textAlign: "center",
  },

  backButton: {
    alignItems: "center",
    marginTop: 28,
  },

  backText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
  },
});