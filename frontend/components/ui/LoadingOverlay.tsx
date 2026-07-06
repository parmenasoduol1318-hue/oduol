// frontend/components/ui/LoadingOverlay.tsx

import React from "react";
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

interface LoadingOverlayProps {
  visible: boolean;

  message?: string;

  transparent?: boolean;
}

export default function LoadingOverlay({
  visible,
  message = "Loading...",
  transparent = true,
}: LoadingOverlayProps) {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />

          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: 220,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 8,
  },

  message: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    textAlign: "center",
  },
});