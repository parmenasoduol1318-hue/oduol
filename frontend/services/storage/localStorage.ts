import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * ==========================================================
 * SwiftReply Local Storage
 * ==========================================================
 *
 * Stores NON-sensitive data.
 *
 * Examples:
 * - Theme
 * - Language
 * - Settings
 * - Cached AI responses
 * - Last opened chat
 * - Onboarding status
 *
 * Never store passwords or JWT tokens here.
 * Those belong in Secure Storage.
 * ==========================================================
 */

class LocalStorageService {
  /**
   * Save any value.
   */
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error("LocalStorage SET Error:", error);
    }
  }

  /**
   * Get any value.
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);

      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      console.error("LocalStorage GET Error:", error);
      return null;
    }
  }

  /**
   * Remove one value.
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("LocalStorage REMOVE Error:", error);
    }
  }

  /**
   * Check whether a key exists.
   */
  async has(key: string): Promise<boolean> {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  }

  /**
   * Clear everything.
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("LocalStorage CLEAR Error:", error);
    }
  }

  /**
   * Remove multiple keys.
   */
  async removeMany(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("LocalStorage REMOVE MANY Error:", error);
    }
  }

  /**
   * Get all stored keys.
   */
  async keys(): Promise<string[]> {
    return [...(await AsyncStorage.getAllKeys())] as string[];
  }

  /**
   * ==========================================================
   * App Settings
   * ==========================================================
   */

  async setTheme(theme: string) {
    await this.set("theme", theme);
  }

  async getTheme() {
    return this.get<string>("theme");
  }

  async setLanguage(language: string) {
    await this.set("language", language);
  }

  async getLanguage() {
    return this.get<string>("language");
  }

  async setOnboardingCompleted(value: boolean) {
    await this.set("onboarding_completed", value);
  }

  async getOnboardingCompleted() {
    return this.get<boolean>("onboarding_completed");
  }

  async setLastChat(chatId: number) {
    await this.set("last_chat_id", chatId);
  }

  async getLastChat() {
    return this.get<number>("last_chat_id");
  }

  /**
   * ==========================================================
   * Generic Cache Helpers
   * ==========================================================
   */

  async cache<T>(key: string, value: T): Promise<void> {
    await this.set(`cache_${key}`, value);
  }

  async getCache<T>(key: string): Promise<T | null> {
    return this.get<T>(`cache_${key}`);
  }

  async removeCache(key: string): Promise<void> {
    await this.remove(`cache_${key}`);
  }
}

export const localStorage = new LocalStorageService();

export default localStorage;