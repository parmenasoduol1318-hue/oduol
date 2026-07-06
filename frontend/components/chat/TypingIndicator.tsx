// components/chat/TypingIndicator.tsx

import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
} from "react-native";

interface DotProps {
  delay: number;
}

function TypingDot({ delay }: DotProps) {
  const scale = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),

        Animated.timing(scale, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),

        Animated.timing(scale, {
          toValue: 0.4,
          duration: 350,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [delay, scale]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          transform: [{ scale }],
        },
      ]}
    />
  );
}

interface TypingIndicatorProps {
  visible?: boolean;
  label?: string;
}

export default function TypingIndicator({
  visible = true,
  label = "SwiftReply is thinking...",
}: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.bubble}>
        <View style={styles.dots}>
          <TypingDot delay={0} />
          <TypingDot delay={180} />
          <TypingDot delay={360} />
        </View>

        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 16,
  },

  bubble: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    maxWidth: "75%",
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563EB",
    marginRight: 6,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
  },
});