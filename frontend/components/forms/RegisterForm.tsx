// components/forms/RegisterForm.tsx

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

import { useAuthStore } from "../../store/authStore";

export default function RegisterForm() {
  const register = useAuthStore((state) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] =
    useState("");
  const [confirmError, setConfirmError] =
    useState("");

  const validate = () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!name.trim()) {
      setNameError("Full name is required");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError(
        "Password must be at least 8 characters"
      );
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError("Confirm your password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await register({
        full_name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      router.replace("/auth/verify-email");
    } catch (error: any) {
      setEmailError(
        error?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        label="Full Name"
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
        icon="person-outline"
        error={nameError}
        required
      />

      <AppInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="mail-outline"
        error={emailError}
        required
      />

      <AppInput
        label="Password"
        placeholder="Create a password"
        value={password}
        onChangeText={setPassword}
        secure
        icon="lock-closed-outline"
        error={passwordError}
        required
      />

      <AppInput
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secure
        icon="shield-checkmark-outline"
        error={confirmError}
        required
      />

      <AppButton
        title="Create Account"
        icon="person-add-outline"
        loading={loading}
        onPress={handleRegister}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/auth/login")}
        >
          <Text style={styles.link}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  footerText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },

  link: {
    marginLeft: 6,
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
  },
});