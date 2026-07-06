// frontend/components/ui/Skeleton.tsx

import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number;

  borderRadius?: number;

  style?: ViewStyle;
}

export default function Skeleton({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  const opacity = useRef(
    new Animated.Value(0.4)
  ).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E5E7EB",
  },
});