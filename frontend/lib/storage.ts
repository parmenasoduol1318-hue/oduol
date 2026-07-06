// frontend/lib/storage.ts

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ======================================================
   Secure Storage
====================================================== */

export const SecureStorage = {
  async set<T>(
    key: string,
    value: T
  ): Promise<void> {
    await SecureStore.setItemAsync(
      key,
      JSON.stringify(value)
    );
  },

  async get<T>(
    key: string
  ): Promise<T | null> {
    const value =
      await SecureStore.getItemAsync(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  },

  async remove(
    key: string
  ): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },

  async clear(
    keys: string[]
  ): Promise<void> {
    await Promise.all(
      keys.map((key) =>
        SecureStore.deleteItemAsync(key)
      )
    );
  },
};

/* ======================================================
   Async Storage
====================================================== */

export const LocalStorage = {
  async set<T>(
    key: string,
    value: T
  ): Promise<void> {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
  },

  async get<T>(
    key: string
  ): Promise<T | null> {
    const value =
      await AsyncStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  },

  async remove(
    key: string
  ): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  },

  async getKeys(): Promise<string[]> {
    return AsyncStorage.getAllKeys();
  },
};

/* ======================================================
   Common Keys
====================================================== */

export const StorageKeys = {
  ACCESS_TOKEN: "access_token",

  REFRESH_TOKEN: "refresh_token",

  USER: "user",

  SETTINGS: "settings",

  CHAT_HISTORY: "chat_history",

  MEMORIES: "memories",

  IMAGE_HISTORY: "image_history",

  SUBSCRIPTION: "subscription",

  APP_STATE: "app_state",
} as const;

/* ======================================================
   Token Helpers
====================================================== */

export async function saveTokens(
  accessToken: string,
  refreshToken: string
) {
  await SecureStorage.set(
    StorageKeys.ACCESS_TOKEN,
    accessToken
  );

  await SecureStorage.set(
    StorageKeys.REFRESH_TOKEN,
    refreshToken
  );
}

export async function getAccessToken() {
  return SecureStorage.get<string>(
    StorageKeys.ACCESS_TOKEN
  );
}

export async function getRefreshToken() {
  return SecureStorage.get<string>(
    StorageKeys.REFRESH_TOKEN
  );
}

export async function clearTokens() {
  await SecureStorage.remove(
    StorageKeys.ACCESS_TOKEN
  );

  await SecureStorage.remove(
    StorageKeys.REFRESH_TOKEN
  );
}

/* ======================================================
   Logout Helper
====================================================== */

export async function clearUserData() {
  await clearTokens();

  await LocalStorage.remove(
    StorageKeys.USER
  );

  await LocalStorage.remove(
    StorageKeys.SUBSCRIPTION
  );

  await LocalStorage.remove(
    StorageKeys.SETTINGS
  );
}