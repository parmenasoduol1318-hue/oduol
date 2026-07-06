// app/auth/forgot-password.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { authService } from "../../services/auth/authService";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await authService.forgotPassword(email.trim());

      Alert.alert(
        "Email Sent",
        "If an account exists with this email, password reset instructions have been sent."
      );

      router.replace("/auth/login");
    } catch (error: any) {
      Alert.alert(
        "Reset Failed",
        error?.message || "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.wrapper}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
          />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons
            name="lock-closed"
            size={70}
            color="#2563EB"
          />

          <Text style={styles.title}>
            Forgot Password?
          </Text>

          <Text style={styles.subtitle}>
            Enter your email and we'll send you a password reset link.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Email Address
          </Text>

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleReset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Send Reset Link
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/auth/login")}
          >
            <Text style={styles.loginText}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 22,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },

  input: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#2563EB",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  loginText: {
    textAlign: "center",
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },
});