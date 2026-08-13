// frontend/services/auth/tokenService.ts

import {
  SecureStorage,
  StorageKeys,
} from "../../lib/storage";

/**
 * ==========================================================
 * Token Service
 * ==========================================================
 * The ONLY place responsible for:
 * - access token
 * - refresh token
 * - authenticated session
 * ==========================================================
 */

class TokenService {
  private readonly USER_ID_KEY = "user_id";

  /**
   * ==========================================================
   * Save Complete Session
   * ==========================================================
   */
  async saveSession(
    accessToken: string,
    refreshToken: string,
    userId?: number | string
  ): Promise<void> {
    await Promise.all([
      SecureStorage.set(
        StorageKeys.ACCESS_TOKEN,
        accessToken
      ),

      SecureStorage.set(
        StorageKeys.REFRESH_TOKEN,
        refreshToken
      ),

      userId !== undefined
        ? SecureStorage.set(
            this.USER_ID_KEY,
            String(userId)
          )
        : Promise.resolve(),
    ]);
  }

  /**
   * ==========================================================
   * Access Token
   * ==========================================================
   */

  async getAccessToken(): Promise<string | null> {
    return SecureStorage.get<string>(
      StorageKeys.ACCESS_TOKEN
    );
  }

  async setAccessToken(
    token: string
  ): Promise<void> {
    await SecureStorage.set(
      StorageKeys.ACCESS_TOKEN,
      token
    );
  }

  /**
   * ==========================================================
   * Refresh Token
   * ==========================================================
   */

  async getRefreshToken(): Promise<string | null> {
    return SecureStorage.get<string>(
      StorageKeys.REFRESH_TOKEN
    );
  }

  async setRefreshToken(
    token: string
  ): Promise<void> {
    await SecureStorage.set(
      StorageKeys.REFRESH_TOKEN,
      token
    );
  }

  /**
   * ==========================================================
   * User Id
   * ==========================================================
   */

  async getUserId(): Promise<string | null> {
    return SecureStorage.get<string>(
      this.USER_ID_KEY
    );
  }

  /**
   * ==========================================================
   * Clear Session
   * ==========================================================
   */

  async clearSession(): Promise<void> {
    await Promise.all([
      SecureStorage.remove(
        StorageKeys.ACCESS_TOKEN
      ),

      SecureStorage.remove(
        StorageKeys.REFRESH_TOKEN
      ),

      SecureStorage.remove(
        this.USER_ID_KEY
      ),
    ]);
  }

  /**
   * Backward compatibility
   */

  async clearTokens(): Promise<void> {
    await this.clearSession();
  }

  /**
   * ==========================================================
   * Authentication Status
   * ==========================================================
   */

  async isAuthenticated(): Promise<boolean> {
    return !!(await this.getAccessToken());
  }
}

export const tokenService = new TokenService();

export default tokenService;



