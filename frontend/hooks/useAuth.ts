import { useCallback, useState } from "react";
import api from "../lib/api";
import { logger } from "../lib/logger";
import { useLocalStorage } from "./useLocalStorage";

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  is_pro?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export const useAuth = () => {
  const {
    value: token,
    setValue: setToken,
    remove: removeToken,
  } = useLocalStorage<string | null>("access_token", null);

  const {
    value: refreshToken,
    setValue: setRefreshToken,
    remove: removeRefreshToken,
  } = useLocalStorage<string | null>("refresh_token", null);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<AuthResponse>("/auth/login", payload);

      setToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);
      setUser(res.data.user);

      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Login failed";

      setError(message);
      logger.error("Login failed", err);

      return {
        access_token: "",
        refresh_token: "",
        token_type: "bearer",
        user: null as any,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      logger.warn("Logout request failed (ignored)", err);
    }

    setUser(null);
    removeToken();
    removeRefreshToken();
  }, []);

  const fetchMe = useCallback(async () => {
    try {
      const res = await api.get<User>("/auth/me");
      setUser(res.data);
      return res.data;
    } catch (err: any) {
      logger.error("Fetch user failed", err);
      setUser(null);
      return null;
    }
  }, []);

  const isAuthenticated = !!token;

  return {
    user,
    token,
    refreshToken,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchMe,
  };
};