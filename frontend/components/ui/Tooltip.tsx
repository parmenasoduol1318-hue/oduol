// frontend/components/ui/Tooltip.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface TooltipProps {
  text: string;
  children: React.ReactNode;

  position?: "top" | "bottom";

  width?: number;
}

export default function Tooltip({
  text,
  children,
  position = "top",
  width = 220,
}: TooltipProps) {
  const [visible, setVisible] =
    useState(false);

  return (
    <Pressable
      onPress={() =>
        setVisible(!visible)
      }
      style={styles.wrapper}
    >
      {children}

      {visible && (
        <View
          style={[
            styles.tooltip,
            {
              width,
            },
            position === "top"
              ? styles.top
              : styles.bottom,
          ]}
        >
          <View
            style={styles.content}
          >
            <Ionicons
              name="information-circle"
              size={18}
              color="#FFFFFF"
              style={styles.icon}
            />

            <Text
              style={styles.text}
            >
              {text}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              setVisible(false)
            }
            style={
              styles.closeButton
            }
          >
            <Ionicons
              name="close"
              size={14}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start",
  },

  tooltip: {
    position: "absolute",
    backgroundColor:
      "rgba(30,30,30,0.95)",
    borderRadius: 12,
    padding: 12,
    zIndex: 999,
    elevation: 10,
  },

  top: {
    bottom: "120%",
    left: 0,
  },

  bottom: {
    top: "120%",
    left: 0,
  },

  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 18,
  },

  icon: {
    marginRight: 8,
    marginTop: 1,
  },

  text: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
  },

  closeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 2,
  },
});