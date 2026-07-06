// frontend/components/sidebar/SidebarMenu.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export interface SidebarMenuItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;

  badge?: string;
  danger?: boolean;

  onPress: () => void;
}

interface SidebarMenuProps {
  items: SidebarMenuItem[];

  selectedId?: string;
}

export default function SidebarMenu({
  items,
  selectedId,
}: SidebarMenuProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const selected =
          item.id === selectedId;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={item.onPress}
            style={[
              styles.item,
              selected &&
                styles.selectedItem,
            ]}
          >
            <View style={styles.left}>
              <Ionicons
                name={item.icon}
                size={22}
                color={
                  item.danger
                    ? "#DC2626"
                    : selected
                    ? "#FFFFFF"
                    : Colors.primary
                }
              />

              <Text
                style={[
                  styles.title,
                  selected &&
                    styles.selectedTitle,
                  item.danger &&
                    styles.dangerTitle,
                ]}
              >
                {item.title}
              </Text>
            </View>

            {item.badge ? (
              <View
                style={styles.badge}
              >
                <Text
                  style={
                    styles.badgeText
                  }
                >
                  {item.badge}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 8,
  },

  selectedItem: {
    backgroundColor: Colors.primary,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  title: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },

  selectedTitle: {
    color: "#FFFFFF",
  },

  dangerTitle: {
    color: "#DC2626",
  },

  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});