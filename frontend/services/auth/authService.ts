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

export interface AuthUser {
  id: number;
  username: string;
  full_name: string;
  email: string;
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

  async register(payload: RegisterRequest) {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  }

  async getCurrentUser() {
    return api.get<AuthUser>(API_ENDPOINTS.AUTH.ME);
  }

  async logout() {
    // Only clear local session.
    // No backend request required.
    await tokenService.clearTokens();
  }

  async isAuthenticated() {
    return tokenService.isAuthenticated();
  }
}

export const authService = new AuthService();
export default authService;


