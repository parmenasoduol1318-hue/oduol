// frontend/services/api/client.ts

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import API_CONFIG from "../../config/api";
import { tokenService } from "../auth/tokenService";

/**
 * ==========================================================
 * SwiftReply HTTP Client
 * ==========================================================
 * This is the ONLY Axios client that should exist.
 * All services must import from here.
 * ==========================================================
 */

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

/**
 * ==========================================================
 * Request Interceptor
 * Automatically attach JWT access token.
 * ==========================================================
 */

apiClient.interceptors.request.use(
  async (config) => {
    const token = await tokenService.getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ==========================================================
 * Response Interceptor
 * ==========================================================
 */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await tokenService.clearTokens();
    }

    return Promise.reject(error);
  }
);

/**
 * ==========================================================
 * Typed HTTP Helpers
 * ==========================================================
 */

export const api = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.get<T>(url, config).then((r) => r.data);
  },

  post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  return apiClient.post<T>(url, data, config).then((r) => {
    console.log("AXIOS RESPONSE");
    console.log(r.status);
    console.log(r.data);
    return r.data;
  });
},

  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.put<T>(url, data, config).then((r) => r.data);
  },

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.patch<T>(url, data, config).then((r) => r.data);
  },

  delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return apiClient.delete<T>(url, config).then((r) => r.data);
  },
};

export { apiClient };

export default api;