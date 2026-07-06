// frontend/components/voice/AudioPlayer.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface AudioPlayerProps {
  duration?: number; // seconds
  isPlaying?: boolean;
  title?: string;

  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (seconds: number) => void;
}

export default function AudioPlayer({
  duration = 0,
  isPlaying = false,
  title = "Voice Response",
  onPlay,
  onPause,
}: AudioPlayerProps) {
  const [position, setPosition] = useState(0);

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => {
        setPosition((prev) => {
          if (prev >= duration) {
            if (timer.current) {
              clearInterval(timer.current);
            }
            return duration;
          }

          return prev + 1;
        });
      }, 1000);
    } else {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isPlaying, duration]);

  const progress =
    duration === 0 ? 0 : (position / duration) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={isPlaying ? onPause : onPlay}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={26}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.track}>
            <View
              style={[
                styles.progress,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.time}>
              {formatTime(position)}
            </Text>

            <Text style={styles.time}>
              {formatTime(duration)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
  },

  playButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  progressContainer: {
    flex: 1,
  },

  track: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: Colors.primary,
  },

  timeRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  time: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});