// frontend/app/splash.tsx

import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import Colors from "../constants/colors";
import { useAuthStore } from "../store/authStore";

export default function SplashScreen() {
  const { isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await initialize();

        // Small delay for branding
        await new Promise((resolve) => setTimeout(resolve, 1800));

        if (isAuthenticated) {
          router.replace("/(tabs)");
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Splash Error:", error);
        router.replace("/auth/login");
      }
    };

    bootstrap();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}

      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Name */}

      <Text style={styles.title}>
        SwiftReply
      </Text>

      <Text style={styles.subtitle}>
        Your Intelligent AI Assistant
      </Text>

      {/* Loader */}

      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.loader}
      />

      <Text style={styles.loadingText}>
        Loading...
      </Text>

      {/* Footer */}

      <View style={styles.footer}>
        <Text style={styles.version}>
          Version 1.0.0
        </Text>

        <Text style={styles.copyright}>
          © 2026 SwiftReply
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  loader: {
    marginTop: 60,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: Colors.textSecondary,
  },

  footer: {
    position: "absolute",
    bottom: 45,
    alignItems: "center",
  },

  version: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  copyright: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.textSecondary,
  },
});