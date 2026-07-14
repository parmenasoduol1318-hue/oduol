import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web";

export const SecureStorage = {
  async set<T>(key: string, value: T): Promise<void> {
    const data = JSON.stringify(value);

    if (isWeb) {
      await AsyncStorage.setItem(key, data);
      return;
    }

    await SecureStore.setItemAsync(key, data);
  },

  async get<T>(key: string): Promise<T | null> {
    let value: string | null;

    if (isWeb) {
      value = await AsyncStorage.getItem(key);
    } else {
      value = await SecureStore.getItemAsync(key);
    }

    if (!value) return null;

    return JSON.parse(value);
  },

  async remove(key: string): Promise<void> {
    if (isWeb) {
      await AsyncStorage.removeItem(key);
      return;
    }

    await SecureStore.deleteItemAsync(key);
  },

  async clear(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.remove(key);
    }
  },
};

export const LocalStorage = {
  async set<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async get<T>(key: string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },

  async clear() {
    await AsyncStorage.clear();
  },
};

export const StorageKeys = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};