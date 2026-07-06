// frontend/components/voice/Waveform.tsx

import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

interface WaveformProps {
  active?: boolean;

  bars?: number;

  height?: number;

  color?: string;
}

export default function Waveform({
  active = false,
  bars = 24,
  height = 70,
  color = Colors.primary,
}: WaveformProps) {
  const animations = useRef(
    Array.from(
      { length: bars },
      () => new Animated.Value(0.3)
    )
  ).current;

  useEffect(() => {
    if (!active) {
      animations.forEach((value) =>
        value.setValue(0.3)
      );
      return;
    }

    const loops = animations.map(
      (value) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration:
                250 +
                Math.random() * 250,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
            Animated.timing(value, {
              toValue: 0.25,
              duration:
                250 +
                Math.random() * 250,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ])
        )
    );

    Animated.stagger(
      40,
      loops
    ).start();

    return () => {
      loops.forEach((loop) =>
        loop.stop()
      );
    };
  }, [active, animations]);

  return (
    <View
      style={[
        styles.container,
        {
          height,
        },
      ]}
    >
      {animations.map(
        (animation, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                backgroundColor:
                  color,
                height:
                  animation.interpolate({
                    inputRange: [
                      0,
                      1,
                    ],
                    outputRange: [
                      height * 0.2,
                      height,
                    ],
                  }),
              },
            ]}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "flex-end",
    width: "100%",
    marginVertical: 20,
  },

  bar: {
    width: 5,
    borderRadius: 999,
  },
});