// frontend/store/uiStore.ts

import { create } from "zustand";

interface ToastState {
  visible: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface ModalState {
  settings: boolean;
  memory: boolean;
  imageViewer: boolean;
  voiceCall: boolean;
  payment: boolean;
}

interface UIState {
  /* ==========================================
     Loading
  ========================================== */

  globalLoading: boolean;

  /* ==========================================
     Sidebar
  ========================================== */

  sidebarOpen: boolean;

  /* ==========================================
     Modals
  ========================================== */

  modals: ModalState;

  /* ==========================================
     Toast
  ========================================== */

  toast: ToastState;

  /* ==========================================
     Actions
  ========================================== */

  setGlobalLoading: (
    value: boolean
  ) => void;

  setSidebarOpen: (
    value: boolean
  ) => void;

  toggleSidebar: () => void;

  openModal: (
    modal: keyof ModalState
  ) => void;

  closeModal: (
    modal: keyof ModalState
  ) => void;

  closeAllModals: () => void;

  showToast: (
    message: string,
    type?: ToastState["type"]
  ) => void;

  hideToast: () => void;

  reset: () => void;
}

const initialState = {
  globalLoading: false,

  sidebarOpen: false,

  modals: {
    settings: false,
    memory: false,
    imageViewer: false,
    voiceCall: false,
    payment: false,
  },

  toast: {
    visible: false,
    message: "",
    type: "info" as const,
  },
};

export const useUIStore = create<UIState>((set) => ({
  ...initialState,

  setGlobalLoading: (value) =>
    set({
      globalLoading: value,
    }),

  setSidebarOpen: (value) =>
    set({
      sidebarOpen: value,
    }),

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  openModal: (modal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: true,
      },
    })),

  closeModal: (modal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: false,
      },
    })),

  closeAllModals: () =>
    set({
      modals: {
        settings: false,
        memory: false,
        imageViewer: false,
        voiceCall: false,
        payment: false,
      },
    }),

  showToast: (message, type = "info") =>
    set({
      toast: {
        visible: true,
        message,
        type,
      },
    }),

  hideToast: () =>
    set((state) => ({
      toast: {
        ...state.toast,
        visible: false,
      },
    })),

  reset: () =>
    set(initialState),
}));

export default useUIStore;