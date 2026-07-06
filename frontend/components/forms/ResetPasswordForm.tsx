// components/forms/ResetPasswordForm.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

import authService from "../../services/auth/authService";

export default function ResetPasswordForm() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [tokenError, setTokenError] =
    useState("");
  const [passwordError, setPasswordError] =
    useState("");
  const [confirmError, setConfirmError] =
    useState("");

  const validate = () => {
    let valid = true;

    setTokenError("");
    setPasswordError("");
    setConfirmError("");

    if (!token.trim()) {
      setTokenError("Reset token is required.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError(
        "Password must be at least 8 characters."
      );
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError(
        "Confirm your password."
      );
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmError(
        "Passwords do not match."
      );
      valid = false;
    }

    return valid;
  };

  const handleResetPassword = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await authService.resetPassword({
        token: token.trim(),
        new_password: password,
      });

      Alert.alert(
        "Password Reset",
        "Your password has been reset successfully.",
        [
          {
            text: "Login",
            onPress: () =>
              router.replace("/auth/login"),
          },
        ]
      );
    } catch (err: any) {
      setTokenError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Enter the password reset token you
        received together with your new
        password.
      </Text>

      <AppInput
        label="Reset Token"
        placeholder="Enter reset token"
        value={token}
        onChangeText={setToken}
        icon="key-outline"
        error={tokenError}
        required
      />

      <AppInput
        label="New Password"
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        secure
        icon="lock-closed-outline"
        error={passwordError}
        required
      />

      <AppInput
        label="Confirm Password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secure
        icon="shield-checkmark-outline"
        error={confirmError}
        required
      />

      <AppButton
        title="Reset Password"
        icon="refresh-outline"
        loading={loading}
        onPress={handleResetPassword}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          router.replace("/auth/login")
        }
      >
        <Text style={styles.loginText}>
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
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
    fontSize: 15,
  },

  loginButton: {
    marginTop: 28,
    alignItems: "center",
  },

  loginText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
  },
});