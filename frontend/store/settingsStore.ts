// frontend/store/settingsStore.ts

import { create } from "zustand";

export type ThemeMode =
  | "light"
  | "dark"
  | "system";

export type AppLanguage =
  | "en"
  | "sw";

interface SettingsState {
  /* ==========================================
     Appearance
  ========================================== */

  theme: ThemeMode;

  fontScale: number;

  /* ==========================================
     Language
  ========================================== */

  language: AppLanguage;

  /* ==========================================
     Notifications
  ========================================== */

  notificationsEnabled: boolean;

  soundEnabled: boolean;

  vibrationEnabled: boolean;

  /* ==========================================
     Privacy
  ========================================== */

  biometricLogin: boolean;

  saveChatHistory: boolean;

  saveMemories: boolean;

  analyticsEnabled: boolean;

  /* ==========================================
     AI
  ========================================== */

  autoPlayVoice: boolean;

  autoDetectLanguage: boolean;

  /* ==========================================
     Actions
  ========================================== */

  setTheme: (
    theme: ThemeMode
  ) => void;

  setFontScale: (
    scale: number
  ) => void;

  setLanguage: (
    language: AppLanguage
  ) => void;

  setNotificationsEnabled: (
    value: boolean
  ) => void;

  setSoundEnabled: (
    value: boolean
  ) => void;

  setVibrationEnabled: (
    value: boolean
  ) => void;

  setBiometricLogin: (
    value: boolean
  ) => void;

  setSaveChatHistory: (
    value: boolean
  ) => void;

  setSaveMemories: (
    value: boolean
  ) => void;

  setAnalyticsEnabled: (
    value: boolean
  ) => void;

  setAutoPlayVoice: (
    value: boolean
  ) => void;

  setAutoDetectLanguage: (
    value: boolean
  ) => void;

  reset: () => void;
}

const initialState = {
  theme: "system" as ThemeMode,

  fontScale: 1,

  language: "en" as AppLanguage,

  notificationsEnabled: true,

  soundEnabled: true,

  vibrationEnabled: true,

  biometricLogin: false,

  saveChatHistory: true,

  saveMemories: true,

  analyticsEnabled: true,

  autoPlayVoice: true,

  autoDetectLanguage: true,
};

export const useSettingsStore =
  create<SettingsState>((set) => ({
    ...initialState,

    setTheme: (
      theme
    ) =>
      set({
        theme,
      }),

    setFontScale: (
      fontScale
    ) =>
      set({
        fontScale,
      }),

    setLanguage: (
      language
    ) =>
      set({
        language,
      }),

    setNotificationsEnabled: (
      notificationsEnabled
    ) =>
      set({
        notificationsEnabled,
      }),

    setSoundEnabled: (
      soundEnabled
    ) =>
      set({
        soundEnabled,
      }),

    setVibrationEnabled: (
      vibrationEnabled
    ) =>
      set({
        vibrationEnabled,
      }),

    setBiometricLogin: (
      biometricLogin
    ) =>
      set({
        biometricLogin,
      }),

    setSaveChatHistory: (
      saveChatHistory
    ) =>
      set({
        saveChatHistory,
      }),

    setSaveMemories: (
      saveMemories
    ) =>
      set({
        saveMemories,
      }),

    setAnalyticsEnabled: (
      analyticsEnabled
    ) =>
      set({
        analyticsEnabled,
      }),

    setAutoPlayVoice: (
      autoPlayVoice
    ) =>
      set({
        autoPlayVoice,
      }),

    setAutoDetectLanguage: (
      autoDetectLanguage
    ) =>
      set({
        autoDetectLanguage,
      }),

    reset: () =>
      set(initialState),
  }));

export default useSettingsStore;