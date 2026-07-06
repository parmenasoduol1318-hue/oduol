// frontend/components/voice/RecordingControls.tsx

import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface RecordingControlsProps {
  isRecording?: boolean;
  isPaused?: boolean;

  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onCancel?: () => void;
}

export default function RecordingControls({
  isRecording = false,
  isPaused = false,
  onStart,
  onPause,
  onResume,
  onStop,
  onCancel,
}: RecordingControlsProps) {
  if (!isRecording) {
    return (
      <View style={styles.container}>
        <ActionButton
          icon="mic"
          label="Start"
          color={Colors.primary}
          onPress={onStart}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActionButton
        icon="close"
        label="Cancel"
        color="#EF4444"
        onPress={onCancel}
      />

      {isPaused ? (
        <ActionButton
          icon="play"
          label="Resume"
          color="#10B981"
          onPress={onResume}
        />
      ) : (
        <ActionButton
          icon="pause"
          label="Pause"
          color="#F59E0B"
          onPress={onPause}
        />
      )}

      <ActionButton
        icon="stop"
        label="Stop"
        color="#DC2626"
        onPress={onStop}
      />
    </View>
  );
}

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress?: () => void;
}

function ActionButton({
  icon,
  label,
  color,
  onPress,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 20,
  },

  button: {
    alignItems: "center",
    width: 80,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  label: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },
});