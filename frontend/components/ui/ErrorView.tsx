// frontend/components/ui/ErrorView.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface ErrorViewProps {
  title?: string;
  message?: string;

  icon?: keyof typeof Ionicons.glyphMap;

  buttonTitle?: string;
  onRetry?: () => void;
}

export default function ErrorView({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  icon = "alert-circle-outline",
  buttonTitle = "Try Again",
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={70}
          color="#DC2626"
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {onRetry && (
        <View style={styles.buttonContainer}>
          <AppButton
            title={buttonTitle}
            icon="refresh-outline"
            onPress={onRetry}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  message: {
    marginTop: 10,
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 340,
  },

  buttonContainer: {
    width: "100%",
    maxWidth: 220,
    marginTop: 30,
  },
});