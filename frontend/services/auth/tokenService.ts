import secureStorage from "../storage/secureStorage";

/**
 * ==========================================================
 * SwiftReply Token Service
 * ==========================================================
 *
 * Responsible for:
 * - Access Token
 * - Refresh Token
 * - User ID
 * - Authentication state
 *
 * Every authentication request in the app should use
 * this service instead of interacting with Secure Storage
 * directly.
 * ==========================================================
 */

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_ID_KEY = "user_id";

class TokenService {
  /**
   * ==========================================================
   * Access Token
   * ==========================================================
   */

  async setAccessToken(token: string): Promise<void> {
    await secureStorage.set(ACCESS_TOKEN_KEY, token);
  }

  async getAccessToken(): Promise<string | null> {
    return await secureStorage.get(ACCESS_TOKEN_KEY);
  }

  async removeAccessToken(): Promise<void> {
    await secureStorage.remove(ACCESS_TOKEN_KEY);
  }

  /**
   * ==========================================================
   * Refresh Token
   * ==========================================================
   */

  async setRefreshToken(token: string): Promise<void> {
    await secureStorage.set(REFRESH_TOKEN_KEY, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return await secureStorage.get(REFRESH_TOKEN_KEY);
  }

  async removeRefreshToken(): Promise<void> {
    await secureStorage.remove(REFRESH_TOKEN_KEY);
  }

  /**
   * ==========================================================
   * User ID
   * ==========================================================
   */

  async setUserId(userId: number | string): Promise<void> {
    await secureStorage.set(USER_ID_KEY, String(userId));
  }

  async getUserId(): Promise<number | null> {
    const value = await secureStorage.get(USER_ID_KEY);

    if (!value) {
      return null;
    }

    return Number(value);
  }

  async removeUserId(): Promise<void> {
    await secureStorage.remove(USER_ID_KEY);
  }

  /**
   * ==========================================================
   * Save Login Session
   * ==========================================================
   */

  async saveSession(
    accessToken: string,
    refreshToken: string,
    userId: number | string
  ): Promise<void> {
    await Promise.all([
      this.setAccessToken(accessToken),
      this.setRefreshToken(refreshToken),
      this.setUserId(userId),
    ]);
  }

  /**
   * ==========================================================
   * Clear Session
   * ==========================================================
   */

  async clearTokens(): Promise<void> {
    await Promise.all([
      this.removeAccessToken(),
      this.removeRefreshToken(),
      this.removeUserId(),
    ]);
  }

  /**
   * ==========================================================
   * Alias
   * ==========================================================
   */

  async logout(): Promise<void> {
    await this.clearTokens();
  }

  /**
   * ==========================================================
   * Authentication
   * ==========================================================
   */

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();

    return token !== null && token.length > 0;
  }

  /**
   * ==========================================================
   * Authorization Header
   * ==========================================================
   */

  async getAuthorizationHeader(): Promise<
    Record<string, string>
  > {
    const token = await this.getAccessToken();

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

export const tokenService = new TokenService();

export default tokenService;