// frontend/components/voice/VoiceCallModal.tsx

import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import RecordingTimer from "./RecordingTimer";
import Waveform from "./Waveform";

interface VoiceCallModalProps {
  visible: boolean;

  assistantName?: string;
  status?: string;

  connected?: boolean;
  muted?: boolean;
  speakerEnabled?: boolean;

  callDuration?: number;

  onClose: () => void;
  onMute?: () => void;
  onSpeaker?: () => void;
  onEndCall?: () => void;
}

export default function VoiceCallModal({
  visible,
  assistantName = "Copilot",
  status = "Connecting...",
  connected = false,
  muted = false,
  speakerEnabled = true,
  callDuration = 0,
  onClose,
  onMute,
  onSpeaker,
  onEndCall,
}: VoiceCallModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons
            name="close"
            size={28}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.avatar}>
            <Ionicons
              name="sparkles"
              size={60}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.name}>
            {assistantName}
          </Text>

          <Text style={styles.status}>
            {status}
          </Text>

          <Waveform
            active={connected}
          />

          <RecordingTimer
            isRecording={connected}
            initialSeconds={
              callDuration
            }
          />
        </View>

        <View style={styles.controls}>
          <ControlButton
            icon={
              muted
                ? "mic-off"
                : "mic"
            }
            label="Mute"
            onPress={onMute}
          />

          <ControlButton
            icon={
              speakerEnabled
                ? "volume-high"
                : "volume-mute"
            }
            label="Speaker"
            onPress={onSpeaker}
          />

          <ControlButton
            icon="call"
            label="End"
            color="#DC2626"
            onPress={onEndCall}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

interface ControlButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color?: string;
  onPress?: () => void;
}

function ControlButton({
  icon,
  label,
  color = Colors.primary,
  onPress,
}: ControlButtonProps) {
  return (
    <TouchableOpacity
      style={styles.control}
      onPress={onPress}
    >
      <View
        style={[
          styles.controlIcon,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.controlText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  closeButton: {
    alignSelf: "flex-end",
    margin: 20,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },

  status: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
    color: Colors.textSecondary,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  control: {
    alignItems: "center",
  },

  controlIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  controlText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },
});