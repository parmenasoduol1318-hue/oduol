// frontend/app/auth/reset-password.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import authService from "../../services/auth/authService";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async () => {
    if (!token) {
      Alert.alert("Invalid Link", "Reset password token is missing.");
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please confirm your password correctly."
      );
      return;
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        token,
        password,
      });

      Alert.alert(
        "Success",
        "Your password has been changed successfully.",
        [
          {
            text: "Login",
            onPress: () => router.replace("/auth/login"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Reset Failed",
        error?.response?.data?.detail ??
          "Unable to reset your password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Ionicons
          name="lock-closed"
          size={80}
          color={Colors.primary}
        />

        <Text style={styles.title}>
          Reset Password
        </Text>

        <Text style={styles.subtitle}>
          Enter your new password below.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Password"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry={!showPassword}
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Reset Password
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/auth/login")}
        >
          <Text style={styles.loginText}>
            Back to Login
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
    justifyContent: "center",
    padding: 24,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 20,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 25,
    color: Colors.textSecondary,
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: Colors.card,
  },

  input: {
    flex: 1,
    paddingVertical: 15,
    color: Colors.text,
    fontSize: 16,
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  loginButton: {
    alignItems: "center",
    marginTop: 18,
  },

  loginText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});