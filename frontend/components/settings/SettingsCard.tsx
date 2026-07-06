// frontend/components/settings/SettingsCard.tsx

import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Colors from "../../constants/colors";

interface SettingsCardProps {
  children: ReactNode;

  style?: ViewStyle;
}

export default function SettingsCard({
  children,
  style,
}: SettingsCardProps) {
  return (
    <View
      style={[
        styles.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },
});