// frontend/components/sidebar/SidebarHeader.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SidebarHeaderProps {
  title?: string;
  subtitle?: string;

  onMenuPress?: () => void;
  onClose?: () => void;

  showMenuButton?: boolean;
  showCloseButton?: boolean;
}

export default function SidebarHeader({
  title = "SwiftReply",
  subtitle = "AI Assistant",
  onMenuPress,
  onClose,
  showMenuButton = false,
  showCloseButton = false,
}: SidebarHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showMenuButton && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onMenuPress}
          >
            <Ionicons
              name="menu"
              size={26}
              color={Colors.text}
            />
          </TouchableOpacity>
        )}

        <View style={styles.logo}>
          <Ionicons
            name="sparkles"
            size={24}
            color="#FFFFFF"
          />
        </View>

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
      </View>

      {showCloseButton && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onClose}
        >
          <Ionicons
            name="close"
            size={26}
            color={Colors.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  iconButton: {
    padding: 6,
  },
});