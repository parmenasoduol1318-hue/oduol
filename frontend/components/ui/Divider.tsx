// frontend/components/ui/Divider.tsx

import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Colors from "../../constants/colors";

interface DividerProps {
  orientation?: "horizontal" | "vertical";

  thickness?: number;

  color?: string;

  spacing?: number;

  style?: ViewStyle;
}

export default function Divider({
  orientation = "horizontal",
  thickness = StyleSheet.hairlineWidth,
  color = Colors.border,
  spacing = 12,
  style,
}: DividerProps) {
  const dividerStyle: ViewStyle =
    orientation === "horizontal"
      ? {
          height: thickness,
          width: "100%",
          marginVertical: spacing,
        }
      : {
          width: thickness,
          height: "100%",
          marginHorizontal: spacing,
        };

  return (
    <View
      style={[
        styles.divider,
        dividerStyle,
        { backgroundColor: color },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    alignSelf: "stretch",
  },
});