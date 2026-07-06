// components/forms/LoginForm.tsx

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

export default function LoginForm() {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters"
      );
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await login(email.trim(), password);

      router.replace("/(tabs)");
    } catch (error: any) {
      setPasswordError(
        error?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        icon="mail-outline"
        error={emailError}
        required
      />

      <AppInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secure
        icon="lock-closed-outline"
        error={passwordError}
        required
      />

      <TouchableOpacity
        onPress={() =>
          router.push("/auth/forgot-password")
        }
      >
        <Text style={styles.forgot}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <AppButton
        title="Login"
        loading={loading}
        icon="log-in-outline"
        onPress={handleLogin}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push("/auth/register")
          }
        >
          <Text style={styles.link}>
            Register
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

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 24,
    color: Colors.primary,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  footerText: {
    color: Colors.textSecondary,
  },

  link: {
    marginLeft: 6,
    color: Colors.primary,
    fontWeight: "700",
  },
});