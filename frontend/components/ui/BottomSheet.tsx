// frontend/components/ui/BottomSheet.tsx

import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface BottomSheetProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;

  onClose: () => void;

  showHandle?: boolean;
  closeOnBackdrop?: boolean;
}

export default function BottomSheet({
  visible,
  title,
  children,
  onClose,
  showHandle = true,
  closeOnBackdrop = true,
}: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={() => {
            if (closeOnBackdrop) {
              onClose();
            }
          }}
        />

        <SafeAreaView style={styles.sheet}>
          {showHandle && (
            <View style={styles.handle} />
          )}

          <View style={styles.header}>
            <Text style={styles.title}>
              {title}
            </Text>

            <TouchableOpacity
              onPress={onClose}
            >
              <Ionicons
                name="close"
                size={24}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {children}
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:
      "rgba(0,0,0,0.45)",
  },

  backdrop: {
    flex: 1,
  },

  sheet: {
    backgroundColor:
      Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  handle: {
    alignSelf: "center",
    width: 50,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#D1D5DB",
    marginTop: 10,
    marginBottom: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  content: {
    paddingBottom: 10,
  },
});