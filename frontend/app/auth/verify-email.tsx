// frontend/app/auth/verify-email.tsx

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import authService from "../../services/auth/authService";

export default function VerifyEmailScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      await authService.verifyEmail(token);

      setVerified(true);
    } catch (error: any) {
      Alert.alert(
        "Verification Failed",
        error?.response?.data?.detail ??
          "Your verification link is invalid or has expired."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />

        <Text style={styles.loadingText}>
          Verifying your email...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Ionicons
          name={verified ? "checkmark-circle" : "close-circle"}
          size={90}
          color={verified ? "#16A34A" : "#DC2626"}
        />

        <Text style={styles.title}>
          {verified
            ? "Email Verified!"
            : "Verification Failed"}
        </Text>

        <Text style={styles.subtitle}>
          {verified
            ? "Your email has been verified successfully. You can now sign in to SwiftReply."
            : "We couldn't verify your email. Please request a new verification link."}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/auth/login")}
        >
          <Text style={styles.buttonText}>
            Go to Login
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
    alignItems: "center",
    padding: 24,
  },

  loadingText: {
    marginTop: 18,
    fontSize: 16,
    color: Colors.textSecondary,
  },

  card: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },

  button: {
    marginTop: 30,
    width: "100%",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});