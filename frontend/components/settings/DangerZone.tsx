// frontend/components/settings/DangerZone.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface DangerZoneProps {
  loading?: boolean;

  onLogout?: () => void;
  onDeleteAccount?: () => void;
}

export default function DangerZone({
  loading = false,
  onLogout,
  onDeleteAccount,
}: DangerZoneProps) {
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => onLogout?.(),
        },
      ]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone.\n\nDo you really want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            onDeleteAccount?.(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Danger Zone
      </Text>

      <Text style={styles.description}>
        These actions affect your account.
        Please proceed carefully.
      </Text>

      <View style={styles.card}>
        <AppButton
          title="Log Out"
          icon="log-out-outline"
          variant="outline"
          loading={loading}
          onPress={confirmLogout}
        />

        <View style={styles.spacing} />

        <AppButton
          title="Delete Account"
          icon="trash-outline"
          variant="danger"
          loading={loading}
          onPress={confirmDelete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 18,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

  spacing: {
    height: 14,
  },
});