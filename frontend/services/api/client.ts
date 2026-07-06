import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { API_BASE_URL } from "../../config/api";
import { tokenService } from "../auth/tokenService";

/**
 * ==========================================================
 * Axios Client
 * ==========================================================
 */

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * ==========================================================
 * Request Interceptor
 * Automatically attach JWT token
 * ==========================================================
 */

apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    try {
      const token = await tokenService.getAccessToken();

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
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

  async (error) => {
    if (error.response?.status === 401) {
      await tokenService.clearTokens();
    }

    return Promise.reject(error);
  }
);

/**
 * ==========================================================
 * HTTP Helpers
 * ==========================================================
 */

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

export default apiClient;