// frontend/store/authStore.ts

import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;

  isPro: boolean;

  createdAt?: string;
}

interface AuthState {
  /* ==========================================
     Authentication
  ========================================== */

  user: User | null;

  accessToken: string | null;

  refreshToken: string | null;

  authenticated: boolean;

  loading: boolean;

  /* ==========================================
     Actions
  ========================================== */

  login: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => void;

  updateUser: (
    user: Partial<User>
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setAccessToken: (
    token: string
  ) => void;

  setRefreshToken: (
    token: string
  ) => void;

  reset: () => void;
}

const initialState = {
  user: null,

  accessToken: null,

  refreshToken: null,

  authenticated: false,

  loading: false,
};

export const useAuthStore =
  create<AuthState>((set) => ({
    ...initialState,

    login: (
      user,
      accessToken,
      refreshToken
    ) =>
      set({
        user,
        accessToken,
        refreshToken,
        authenticated: true,
        loading: false,
      }),

    logout: () =>
      set({
        ...initialState,
      }),

    updateUser: (user) =>
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              ...user,
            }
          : null,
      })),

    setLoading: (
      loading
    ) =>
      set({
        loading,
      }),

    setAccessToken: (
      accessToken
    ) =>
      set({
        accessToken,
      }),

    setRefreshToken: (
      refreshToken
    ) =>
      set({
        refreshToken,
      }),

    reset: () =>
      set({
        ...initialState,
      }),
  }));

export default useAuthStore;