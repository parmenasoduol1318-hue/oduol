import * as SecureStore from "expo-secure-store";

/**
 * ==========================================================
 * SwiftReply Secure Storage
 * ==========================================================
 *
 * Stores sensitive data such as:
 * - JWT Access Token
 * - Refresh Token
 * - User ID (optional)
 * - Device ID
 *
 * Uses Expo Secure Store.
 * ==========================================================
 */

class SecureStorageService {
  /**
   * Save a value securely.
   */
  async set(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  /**
   * Retrieve a value.
   */
  async get(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  /**
   * Remove a value.
   */
  async remove(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  /**
   * Check whether a key exists.
   */
  async has(key: string): Promise<boolean> {
    const value = await SecureStore.getItemAsync(key);
    return value !== null;
  }

  /**
   * Clear multiple keys.
   */
  async clear(keys: string[]): Promise<void> {
    await Promise.all(
      keys.map((key) => SecureStore.deleteItemAsync(key))
    );
  }

  // ==========================================================
  // Access Token
  // ==========================================================

  async setAccessToken(token: string): Promise<void> {
    await this.set("access_token", token);
  }

  async getAccessToken(): Promise<string | null> {
    return await this.get("access_token");
  }

  async removeAccessToken(): Promise<void> {
    await this.remove("access_token");
  }

  // ==========================================================
  // Refresh Token
  // ==========================================================

  async setRefreshToken(token: string): Promise<void> {
    await this.set("refresh_token", token);
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.get("refresh_token");
  }

  async removeRefreshToken(): Promise<void> {
    await this.remove("refresh_token");
  }

  // ==========================================================
  // User ID
  // ==========================================================

  async setUserId(userId: string): Promise<void> {
    await this.set("user_id", userId);
  }

  async getUserId(): Promise<string | null> {
    return await this.get("user_id");
  }

  async removeUserId(): Promise<void> {
    await this.remove("user_id");
  }

  // ==========================================================
  // Clear Everything
  // ==========================================================

  async clearAll(): Promise<void> {
    await this.clear([
      "access_token",
      "refresh_token",
      "user_id",
    ]);
  }
}

export const secureStorage = new SecureStorageService();

export default secureStorage;