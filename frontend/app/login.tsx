// frontend/app/login.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { useAuthStore } from "../store/authStore";
import { LocalStorage, SecureStorage, StorageKeys } from "../lib/storage";
import { isValidEmail } from "../lib/validators";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    if (!isValidEmail(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters."
      );
      return;
    }

    try {
      setLoading(true);

      /**
       * Replace this section with your backend API.
       */

      const mockUser = {
        id: "user_001",
        name: "Parmenas Oduol",
        email,
        avatar: null,
        isPro: false,
      };

      const accessToken =
        "mock_access_token";

      const refreshToken =
        "mock_refresh_token";

      login(
        mockUser,
        accessToken,
        refreshToken
      );

      await SecureStorage.set(
        StorageKeys.ACCESS_TOKEN,
        accessToken
      );

      await SecureStorage.set(
        StorageKeys.REFRESH_TOKEN,
        refreshToken
      );

      await LocalStorage.set(
        StorageKeys.USER,
        mockUser
      );

      router.replace("/chat");
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Login Failed",
        "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        SwiftReply
      </Text>

      <Text style={styles.subtitle}>
        Sign in to continue
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: "#fff",
    },

    title: {
      fontSize: 34,
      fontWeight: "700",
      marginBottom: 8,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 16,
      color: "#666",
      marginBottom: 30,
      textAlign: "center",
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 16,
    },

    button: {
      backgroundColor: "#2563EB",
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: "center",
    },

    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
  });