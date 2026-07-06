// frontend/components/memory/MemoryDeleteModal.tsx

import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";

import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

interface MemoryDeleteModalProps {
  visible: boolean;
  memoryTitle?: string;

  loading?: boolean;

  onCancel: () => void;
  onConfirm: () => void;
}

export default function MemoryDeleteModal({
  visible,
  memoryTitle,
  loading = false,
  onCancel,
  onConfirm,
}: MemoryDeleteModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            Delete Memory
          </Text>

          <Text style={styles.message}>
            Are you sure you want to permanently
            delete
            {memoryTitle
              ? ` "${memoryTitle}"?`
              : " this memory?"}
          </Text>

          <View style={styles.buttons}>
            <View style={styles.button}>
              <AppButton
                title="Cancel"
                variant="outline"
                onPress={onCancel}
              />
            </View>

            <View style={styles.space} />

            <View style={styles.button}>
              <AppButton
                title="Delete"
                variant="danger"
                loading={loading}
                icon="trash-outline"
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 24,
  },

  modal: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 14,
  },

  message: {
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 28,
  },

  buttons: {
    flexDirection: "row",
  },

  button: {
    flex: 1,
  },

  space: {
    width: 12,
  },
});