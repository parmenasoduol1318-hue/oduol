// frontend/components/voice/VoiceRecorder.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

import MicrophoneButton from "./MicrophoneButton";
import RecordingControls from "./RecordingControls";
import RecordingTimer from "./RecordingTimer";
import Waveform from "./Waveform";

interface VoiceRecorderProps {
  loading?: boolean;

  onStartRecording?: () => Promise<void> | void;
  onPauseRecording?: () => Promise<void> | void;
  onResumeRecording?: () => Promise<void> | void;
  onStopRecording?: () => Promise<void> | void;
  onCancelRecording?: () => Promise<void> | void;
}

export default function VoiceRecorder({
  loading = false,
  onStartRecording,
  onPauseRecording,
  onResumeRecording,
  onStopRecording,
  onCancelRecording,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] =
    useState(false);

  const [isPaused, setIsPaused] =
    useState(false);

  const handleStart = async () => {
    setIsRecording(true);
    setIsPaused(false);

    await onStartRecording?.();
  };

  const handlePause = async () => {
    setIsPaused(true);

    await onPauseRecording?.();
  };

  const handleResume = async () => {
    setIsPaused(false);

    await onResumeRecording?.();
  };

  const handleStop = async () => {
    setIsRecording(false);
    setIsPaused(false);

    await onStopRecording?.();
  };

  const handleCancel = async () => {
    setIsRecording(false);
    setIsPaused(false);

    await onCancelRecording?.();
  };

  return (
    <View style={styles.container}>
      <RecordingTimer
        isRecording={isRecording}
        isPaused={isPaused}
      />

      <Waveform
        active={
          isRecording && !isPaused
        }
      />

      <View style={styles.microphone}>
        <MicrophoneButton
          loading={loading}
          isRecording={isRecording}
          onPress={
            isRecording
              ? handleStop
              : handleStart
          }
        />
      </View>

      <RecordingControls
        isRecording={isRecording}
        isPaused={isPaused}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onCancel={handleCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 20,
  },

  microphone: {
    alignItems: "center",
    marginVertical: 20,
  },
});