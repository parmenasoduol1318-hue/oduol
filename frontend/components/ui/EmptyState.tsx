// frontend/components/ui/EmptyState.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface EmptyStateProps {
  title: string;
  message?: string;

  icon?: keyof typeof Ionicons.glyphMap;

  buttonTitle?: string;
  onButtonPress?: () => void;
}

export default function EmptyState({
  title,
  message,
  icon = "folder-open-outline",
  buttonTitle,
  onButtonPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name={icon}
          size={64}
          color={Colors.primary}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      {message ? (
        <Text style={styles.message}>
          {message}
        </Text>
      ) : null}

      {buttonTitle && onButtonPress ? (
        <View style={styles.buttonContainer}>
          <AppButton
            title={buttonTitle}
            onPress={onButtonPress}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 250,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
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
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 320,
  },

  buttonContainer: {
    marginTop: 28,
    width: "100%",
    maxWidth: 220,
  },
});