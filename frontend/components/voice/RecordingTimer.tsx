// frontend/components/voice/RecordingTimer.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface RecordingTimerProps {
  /**
   * Whether recording is currently active.
   */
  isRecording: boolean;

  /**
   * Whether recording is paused.
   */
  isPaused?: boolean;

  /**
   * Optional initial elapsed time (seconds).
   */
  initialSeconds?: number;

  /**
   * Called every second while recording.
   */
  onTick?: (seconds: number) => void;
}

export default function RecordingTimer({
  isRecording,
  isPaused = false,
  initialSeconds = 0,
  onTick,
}: RecordingTimerProps) {
  const [seconds, setSeconds] =
    useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          onTick?.(next);
          return next;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording, isPaused, onTick]);

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        <Ionicons
          name={
            isPaused
              ? "pause-circle"
              : "radio-button-on"
          }
          size={16}
          color={
            isPaused
              ? "#F59E0B"
              : "#EF4444"
          }
        />

        <Text
          style={[
            styles.status,
            {
              color: isPaused
                ? "#F59E0B"
                : "#EF4444",
            },
          ]}
        >
          {isPaused
            ? "Paused"
            : isRecording
            ? "Recording"
            : "Ready"}
        </Text>
      </View>

      <Text style={styles.timer}>
        {formatTime(seconds)}
      </Text>
    </View>
  );
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours
      .toString()
      .padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  indicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  status: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  timer: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: 1,
  },
});