import api from "../api/client";
import API_ENDPOINTS from "../api/endpoints";
import { tokenService } from "./tokenService";

/**
 * ==========================================================
 * Authentication Types
 * ==========================================================
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    is_active: boolean;
    is_verified: boolean;
    created_at?: string;
  };
}

/**
 * ==========================================================
 * Authentication Service
 * ==========================================================
 */

class AuthService {
  /**
   * ==========================================================
   * Register
   * ==========================================================
   */

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload
    );

    await tokenService.saveSession(
      response.access_token,
      response.refresh_token,
      response.user.id
    );

    return response;
  }

  /**
   * ==========================================================
   * Login
   * ==========================================================
   */

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );

    await tokenService.saveSession(
      response.access_token,
      response.refresh_token,
      response.user.id
    );

    return response;
  }

  /**
   * ==========================================================
   * Logout
   * ==========================================================
   */

  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Ignore backend logout failures.
    }

    await tokenService.clearTokens();
  }

  /**
   * ==========================================================
   * Refresh Token
   * ==========================================================
   */

  async refreshToken(): Promise<string | null> {
    const refreshToken = await tokenService.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    const response = await api.post<{
      access_token: string;
      refresh_token?: string;
    }>(
      API_ENDPOINTS.AUTH.REFRESH,
      {
        refresh_token: refreshToken,
      }
    );

    await tokenService.setAccessToken(response.access_token);

    if (response.refresh_token) {
      await tokenService.setRefreshToken(response.refresh_token);
    }

    return response.access_token;
  }

  /**
   * ==========================================================
   * Current User
   * ==========================================================
   */

  async getCurrentUser() {
    return api.get(API_ENDPOINTS.AUTH.ME);
  }

  /**
   * ==========================================================
   * Authentication Status
   * ==========================================================
   */

  async isAuthenticated(): Promise<boolean> {
    return tokenService.isAuthenticated();
  }

  /**
   * ==========================================================
   * Access Token
   * ==========================================================
   */

  async getAccessToken(): Promise<string | null> {
    return tokenService.getAccessToken();
  }
}

export const authService = new AuthService();

export default authService;