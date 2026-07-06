import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAuthStore } from "@/store/authStore";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/auth/login");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              user?.avatar ||
              "https://ui-avatars.com/api/?name=SwiftReply&background=2563EB&color=fff",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user?.full_name || "Guest User"}
        </Text>

        <Text style={styles.email}>
          {user?.email || "No email"}
        </Text>
      </View>

      <View style={styles.section}>
        <ProfileItem
          icon="person-outline"
          title="Edit Profile"
        />

        <ProfileItem
          icon="card-outline"
          title="Subscription"
        />

        <ProfileItem
          icon="wallet-outline"
          title="Payments"
        />

        <ProfileItem
          icon="notifications-outline"
          title="Notifications"
        />

        <ProfileItem
          icon="cloud-upload-outline"
          title="Backup & Sync"
        />

        <ProfileItem
          icon="shield-checkmark-outline"
          title="Privacy"
        />

        <ProfileItem
          icon="help-circle-outline"
          title="Help Center"
        />

        <ProfileItem
          icon="information-circle-outline"
          title="About SwiftReply"
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

      <Text style={styles.version}>
        SwiftReply v1.0.0
      </Text>
    </ScrollView>
  );
}

function ProfileItem({
  icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.left}>
        <Ionicons
          name={icon}
          size={22}
          color="#2563EB"
        />

        <Text style={styles.itemText}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    marginLeft: 14,
    fontSize: 16,
    color: "#111827",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },

  version: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 25,
    marginBottom: 40,
  },
});