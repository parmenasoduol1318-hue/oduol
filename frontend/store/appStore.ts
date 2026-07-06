// frontend/store/appStore.ts

import { create } from "zustand";

export type ThemeMode =
  | "light"
  | "dark"
  | "system";

export type Language =
  | "en"
  | "sw";

interface AppState {
  /* ==========================================
     App
  ========================================== */

  initialized: boolean;

  loading: boolean;

  online: boolean;

  /* ==========================================
     Theme
  ========================================== */

  theme: ThemeMode;

  /* ==========================================
     Language
  ========================================== */

  language: Language;

  /* ==========================================
     Sidebar
  ========================================== */

  sidebarOpen: boolean;

  /* ==========================================
     Global Search
  ========================================== */

  searchQuery: string;

  /* ==========================================
     Actions
  ========================================== */

  setInitialized: (
    value: boolean
  ) => void;

  setLoading: (
    value: boolean
  ) => void;

  setOnline: (
    value: boolean
  ) => void;

  setTheme: (
    theme: ThemeMode
  ) => void;

  setLanguage: (
    language: Language
  ) => void;

  setSidebarOpen: (
    value: boolean
  ) => void;

  toggleSidebar: () => void;

  setSearchQuery: (
    value: string
  ) => void;

  reset: () => void;
}

const initialState = {
  initialized: false,

  loading: false,

  online: true,

  theme: "system" as ThemeMode,

  language: "en" as Language,

  sidebarOpen: false,

  searchQuery: "",
};

export const useAppStore =
  create<AppState>((set) => ({
    ...initialState,

    setInitialized: (
      value
    ) =>
      set({
        initialized: value,
      }),

    setLoading: (
      value
    ) =>
      set({
        loading: value,
      }),

    setOnline: (
      value
    ) =>
      set({
        online: value,
      }),

    setTheme: (
      theme
    ) =>
      set({
        theme,
      }),

    setLanguage: (
      language
    ) =>
      set({
        language,
      }),

    setSidebarOpen: (
      value
    ) =>
      set({
        sidebarOpen: value,
      }),

    toggleSidebar: () =>
      set((state) => ({
        sidebarOpen:
          !state.sidebarOpen,
      })),

    setSearchQuery: (
      value
    ) =>
      set({
        searchQuery: value,
      }),

    reset: () =>
      set(initialState),
  }));

export default useAppStore;
