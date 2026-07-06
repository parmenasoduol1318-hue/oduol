// frontend/store/voiceStore.ts

import { create } from "zustand";

export type VoiceCallStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "listening"
  | "speaking"
  | "ended"
  | "error";

interface VoiceState {
  /* ==========================================
     Recording
  ========================================== */

  isRecording: boolean;

  isPaused: boolean;

  duration: number;

  transcript: string;

  /* ==========================================
     Voice Call
  ========================================== */

  callStatus: VoiceCallStatus;

  isMuted: boolean;

  speakerEnabled: boolean;

  /* ==========================================
     Audio
  ========================================== */

  isPlaying: boolean;

  currentAudioUrl: string | null;

  /* ==========================================
     Actions
  ========================================== */

  startRecording: () => void;

  pauseRecording: () => void;

  resumeRecording: () => void;

  stopRecording: () => void;

  setDuration: (
    seconds: number
  ) => void;

  setTranscript: (
    transcript: string
  ) => void;

  appendTranscript: (
    text: string
  ) => void;

  clearTranscript: () => void;

  setCallStatus: (
    status: VoiceCallStatus
  ) => void;

  toggleMute: () => void;

  toggleSpeaker: () => void;

  startPlayback: (
    audioUrl: string
  ) => void;

  stopPlayback: () => void;

  reset: () => void;
}

const initialState = {
  isRecording: false,

  isPaused: false,

  duration: 0,

  transcript: "",

  callStatus: "idle" as VoiceCallStatus,

  isMuted: false,

  speakerEnabled: true,

  isPlaying: false,

  currentAudioUrl: null,
};

export const useVoiceStore =
  create<VoiceState>((set) => ({
    ...initialState,

    startRecording: () =>
      set({
        isRecording: true,
        isPaused: false,
        duration: 0,
      }),

    pauseRecording: () =>
      set({
        isPaused: true,
      }),

    resumeRecording: () =>
      set({
        isPaused: false,
      }),

    stopRecording: () =>
      set({
        isRecording: false,
        isPaused: false,
      }),

    setDuration: (
      duration
    ) =>
      set({
        duration,
      }),

    setTranscript: (
      transcript
    ) =>
      set({
        transcript,
      }),

    appendTranscript: (
      text
    ) =>
      set((state) => ({
        transcript:
          state.transcript +
          text,
      })),

    clearTranscript: () =>
      set({
        transcript: "",
      }),

    setCallStatus: (
      callStatus
    ) =>
      set({
        callStatus,
      }),

    toggleMute: () =>
      set((state) => ({
        isMuted:
          !state.isMuted,
      })),

    toggleSpeaker: () =>
      set((state) => ({
        speakerEnabled:
          !state.speakerEnabled,
      })),

    startPlayback: (
      currentAudioUrl
    ) =>
      set({
        isPlaying: true,
        currentAudioUrl,
      }),

    stopPlayback: () =>
      set({
        isPlaying: false,
        currentAudioUrl: null,
      }),

    reset: () =>
      set(initialState),
  }));

export default useVoiceStore;