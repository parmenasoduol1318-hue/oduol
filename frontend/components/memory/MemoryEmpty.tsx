// frontend/components/memory/MemoryEmpty.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import AppButton from "../common/AppButton";

interface MemoryEmptyProps {
  title?: string;
  message?: string;

  onCreate?: () => void;
}

export default function MemoryEmpty({
  title = "No Memories Yet",
  message = "SwiftReply hasn't saved any memories yet. Create one to help personalize your experience.",
  onCreate,
}: MemoryEmptyProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="library-outline"
        size={72}
        color={Colors.primary}
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {onCreate && (
        <AppButton
          title="Create Memory"
          icon="add-circle-outline"
          onPress={onCreate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  message: {
    marginTop: 12,
    marginBottom: 28,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});