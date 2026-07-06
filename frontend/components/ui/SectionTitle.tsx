// frontend/components/ui/SectionTitle.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SectionTitleProps {
  title: string;
  subtitle?: string;

  actionText?: string;
  onActionPress?: () => void;

  icon?: keyof typeof Ionicons.glyphMap;
}

export default function SectionTitle({
  title,
  subtitle,
  actionText,
  onActionPress,
  icon,
}: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={Colors.primary}
            style={styles.icon}
          />
        )}

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {actionText && onActionPress ? (
        <TouchableOpacity
          onPress={onActionPress}
          activeOpacity={0.8}
        >
          <Text style={styles.action}>
            {actionText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    marginRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  action: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
});