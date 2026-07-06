// frontend/components/sidebar/UserProfileCard.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface UserProfileCardProps {
  name: string;
  email: string;

  avatar?: string;
  isPro?: boolean;

  onPress?: () => void;
}

export default function UserProfileCard({
  name,
  email,
  avatar,
  isPro = false,
  onPress,
}: UserProfileCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Ionicons
            name="person"
            size={30}
            color="#FFFFFF"
          />
        </View>
      )}

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {name}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.email}
        >
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
            {isPro ? "PRO" : "FREE"}
          </Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  email: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  proBadge: {
    backgroundColor: "#16A34A",
  },

  freeBadge: {
    backgroundColor: "#F59E0B",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});