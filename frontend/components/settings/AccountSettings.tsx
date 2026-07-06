// frontend/components/settings/AccountSettings.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface AccountSettingsProps {
  name: string;
  email: string;
  isPro?: boolean;

  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onManageSubscription?: () => void;
}

export default function AccountSettings({
  name,
  email,
  isPro = false,
  onEditProfile,
  onChangePassword,
  onManageSubscription,
}: AccountSettingsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={36}
            color="#FFFFFF"
          />
        </View>

        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.email}>
          {email}
        </Text>

        <View
          style={[
            styles.badge,
            isPro
              ? styles.proBadge
              : styles.freeBadge,
          ]}
        >
          <Text style={styles.badgeText}>
            {isPro
              ? "PRO MEMBER"
              : "FREE PLAN"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <SettingRow
          icon="create-outline"
          title="Edit Profile"
          onPress={onEditProfile}
        />

        <SettingRow
          icon="lock-closed-outline"
          title="Change Password"
          onPress={onChangePassword}
        />

        <SettingRow
          icon="card-outline"
          title="Manage Subscription"
          onPress={onManageSubscription}
        />
      </View>
    </View>
  );
}

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

function SettingRow({
  icon,
  title,
  onPress,
}: SettingRowProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color={Colors.primary}
        />

        <Text style={styles.rowText}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  profileCard: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  email: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 6,
  },

  badge: {
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  proBadge: {
    backgroundColor: "#16A34A",
  },

  freeBadge: {
    backgroundColor: "#F59E0B",
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  section: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowText: {
    marginLeft: 14,
    fontSize: 16,
    color: Colors.text,
  },
});