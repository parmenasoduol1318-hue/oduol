// frontend/components/memory/MemoryStats.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface MemoryStatsProps {
  totalMemories: number;
  personalMemories?: number;
  workMemories?: number;
  favoriteMemories?: number;
}

export default function MemoryStats({
  totalMemories,
  personalMemories = 0,
  workMemories = 0,
  favoriteMemories = 0,
}: MemoryStatsProps) {
  return (
    <View style={styles.container}>
      <StatCard
        icon="library-outline"
        title="Total"
        value={totalMemories}
      />

      <StatCard
        icon="person-outline"
        title="Personal"
        value={personalMemories}
      />

      <StatCard
        icon="briefcase-outline"
        title="Work"
        value={workMemories}
      />

      <StatCard
        icon="star-outline"
        title="Favorites"
        value={favoriteMemories}
      />
    </View>
  );
}

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: number;
}

function StatCard({
  icon,
  title,
  value,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Ionicons
        name={icon}
        size={26}
        color={Colors.primary}
      />

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 10,
  },

  title: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});