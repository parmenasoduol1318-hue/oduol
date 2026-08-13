import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";
import { tokenService } from "./tokenService";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  username?: string;
  email: string;
  password: string;
}

export interface SocialLoginRequest {
  provider: "google" | "github";
  token: string;
}

export interface AuthUser {
  id: number;
  username: string;
  full_name: string;
  name?: string;
  email: string;
  avatar?: string | null;
  phone_number?: string | null;
  profile_picture?: string | null;
  auth_provider?: string;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthUser;
}

export class AuthService {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );

    if (!response?.access_token)
      throw new Error("Access token missing.");

    if (!response?.refresh_token)
      throw new Error("Refresh token missing.");

    if (!response?.user)
      throw new Error("User missing.");

    await tokenService.saveSession(
      response.access_token,
      response.refresh_token,
      response.user.id
    );

    return response;
  }

  async loginWithGoogle(token: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/auth/social-login",
      { provider: "google", token }
    );

    if (!response?.access_token) throw new Error("Google login failed.");

    await tokenService.saveSession(
      response.access_token,
      response.refresh_token,
      response.user.id
    );

    return response;
  }

  async register(payload: RegisterRequest) {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  }

  async forgotPassword(email: string) {
    return api.post("/auth/forgot-password", { email });
  }

  async resetPassword(payload: { token: string; password: string }) {
    return api.post("/auth/reset-password", payload);
  }

  async changePassword(payload: { current_password: string; new_password: string }) {
    return api.post("/auth/change-password", payload);
  }

  async verifyEmail(token: string) {
    return api.post("/auth/verify-email", { token });
  }

  async getCurrentUser() {
    return api.get<AuthUser>(API_ENDPOINTS.AUTH.ME);
  }

  async logout() {
    await tokenService.clearTokens();
  }

  async isAuthenticated() {
    return tokenService.isAuthenticated();
  }
}

export const authService = new AuthService();
export default authService;


