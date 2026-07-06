// frontend/components/ui/ProgressBar.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Colors from "../../constants/colors";

interface ProgressBarProps {
  progress: number; // 0 - 100

  label?: string;

  showPercentage?: boolean;

  height?: number;

  color?: string;

  backgroundColor?: string;

  style?: ViewStyle;
}

export default function ProgressBar({
  progress,
  label,
  showPercentage = true,
  height = 10,
  color = Colors.primary,
  backgroundColor = "#E5E7EB",
  style,
}: ProgressBarProps) {
  const safeProgress = Math.max(
    0,
    Math.min(progress, 100)
  );

  return (
    <View style={style}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label ? (
            <Text style={styles.label}>
              {label}
            </Text>
          ) : (
            <View />
          )}

          {showPercentage && (
            <Text style={styles.percent}>
              {safeProgress.toFixed(0)}%
            </Text>
          )}
        </View>
      )}

      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor,
            borderRadius: height / 2,
          },
        ]}
      >
        <View
          style={{
            width: `${safeProgress}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },

  percent: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "600",
  },

  track: {
    width: "100%",
    overflow: "hidden",
  },
});