// frontend/store/authStore.ts

import { create } from "zustand";

import {
  LocalStorage,
  StorageKeys,
} from "../lib/storage";

import {
  authService,
  AuthUser,
} from "../services/auth/authService";

interface AuthState {
  user: AuthUser | null;

  authenticated: boolean;

  loading: boolean;

  initialize: () => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<AuthUser>;

  register: (
    full_name: string,
    email: string,
    password: string
  ) => Promise<any>;

  logout: () => Promise<void>;

  setUser: (user: AuthUser | null) => void;

  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  authenticated: false,

  loading: false,

  initialize: async () => {
    set({ loading: true });

    try {
      const authenticated =
        await authService.isAuthenticated();

      if (!authenticated) {
        set({
          user: null,
          authenticated: false,
          loading: false,
        });
        return;
      }

      const storedUser =
        await LocalStorage.get<AuthUser>(
          StorageKeys.USER
        );

      if (storedUser) {
        set({
          user: storedUser,
          authenticated: true,
          loading: false,
        });
        return;
      }

      const user =
        await authService.getCurrentUser();

      await LocalStorage.set(
        StorageKeys.USER,
        user
      );

      set({
        user,
        authenticated: true,
        loading: false,
      });
    } catch (err) {
  console.log(err);

  await authService.logout();

  await LocalStorage.remove(
    StorageKeys.USER
  );

  set({
    user: null,
    authenticated: false,
    loading: false,
  });
}
  },

  login: async (email, password) => {
  set({ loading: true });

  try {
    console.log("STORE 1");

    const response = await authService.login({
      email,
      password,
    });

    console.log("STORE 2", response);

    await LocalStorage.set(
      StorageKeys.USER,
      response.user
    );

    console.log("STORE 3");

    set({
      user: response.user,
      authenticated: true,
      loading: false,
    });

    console.log("STORE 4");

    return response.user;
  } catch (err) {
    console.log("STORE ERROR", err);

    set({
      loading: false,
    });

    throw err;
  }
},

  register: async (
    full_name,
    email,
    password
  ) => {
    set({ loading: true });

    try {
      const user =
        await authService.register({
          full_name,
          username: email.split("@")[0],
          email,
          password,
        });

      set({
        loading: false,
      });

      return user;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  logout: async () => {
    await authService.logout();

    await LocalStorage.remove(
      StorageKeys.USER
    );

    set({
      user: null,
      authenticated: false,
      loading: false,
    });
  },

  setUser: (user) =>
    set({
      user,
      authenticated: !!user,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),
}));

