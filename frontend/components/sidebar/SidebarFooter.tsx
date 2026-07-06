// frontend/components/sidebar/SidebarFooter.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SidebarFooterProps {
  userName: string;
  userEmail: string;
  isPro?: boolean;

  onProfile?: () => void;
  onSettings?: () => void;
  onUpgrade?: () => void;
  onLogout?: () => void;
}

export default function SidebarFooter({
  userName,
  userEmail,
  isPro = false,
  onProfile,
  onSettings,
  onUpgrade,
  onLogout,
}: SidebarFooterProps) {
  return (
    <View style={styles.container}>
      {/* User Card */}
      <TouchableOpacity
        style={styles.profileCard}
        activeOpacity={0.85}
        onPress={onProfile}
      >
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={22}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.userInfo}>
          <Text
            numberOfLines={1}
            style={styles.name}
          >
            {userName}
          </Text>

          <Text
            numberOfLines={1}
            style={styles.email}
          >
            {userEmail}
          </Text>
        </View>

        {isPro && (
          <View style={styles.proBadge}>
            <Text style={styles.proText}>
              PRO
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Footer Menu */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={onSettings}
      >
        <Ionicons
          name="settings-outline"
          size={22}
          color={Colors.primary}
        />

        <Text style={styles.menuText}>
          Settings
        </Text>
      </TouchableOpacity>

      {!isPro && (
        <TouchableOpacity
          style={styles.menuItem}
          onPress={onUpgrade}
        >
          <Ionicons
            name="diamond-outline"
            size={22}
            color="#F59E0B"
          />

          <Text style={styles.menuText}>
            Upgrade to PRO
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={onLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#DC2626"
        />

        <Text
          style={[
            styles.menuText,
            { color: "#DC2626" },
          ]}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 16,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  email: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  proBadge: {
    backgroundColor: "#16A34A",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  proText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
});