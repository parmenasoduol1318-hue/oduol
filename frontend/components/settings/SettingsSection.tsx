// frontend/components/settings/SettingsSection.tsx

import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Colors from "../../constants/colors";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;

  style?: ViewStyle;
}

export default function SettingsSection({
  title,
  subtitle,
  children,
  style,
}: SettingsSectionProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginBottom: 14,
  },

  content: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },
});