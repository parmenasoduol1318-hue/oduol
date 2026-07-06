import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import apiClient from "./client";
import { tokenService } from "../auth/tokenService";

/**
 * ==========================================================
 * SwiftReply API Interceptors
 * ==========================================================
 *
 * Registers all Axios interceptors in one place.
 * Call initializeInterceptors() once when the app starts.
 * ==========================================================
 */

let initialized = false;

/**
 * ==========================================================
 * Initialize Interceptors
 * ==========================================================
 */

export function initializeInterceptors(): void {
  if (initialized) {
    return;
  }

  initialized = true;

  /**
   * ----------------------------------------------------------
   * Request Interceptor
   * ----------------------------------------------------------
   */

  apiClient.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<any> => {
      const token = await tokenService.getAccessToken();

      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    (error: AxiosError) => Promise.reject(error)
  );

  /**
   * ----------------------------------------------------------
   * Response Interceptor
   * ----------------------------------------------------------
   */

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError) => {
      const status = error.response?.status;

      switch (status) {
        case 401:
          console.warn("Unauthorized. Clearing saved tokens.");
          await tokenService.clearTokens();
          break;

        case 403:
          console.warn("Access forbidden.");
          break;

        case 404:
          console.warn("Requested resource not found.");
          break;

        case 429:
          console.warn("Too many requests.");
          break;

        case 500:
          console.warn("Internal server error.");
          break;

        default:
          break;
      }

      return Promise.reject(error);
    }
  );
}

/**
 * ==========================================================
 * Remove All Interceptors
 * ==========================================================
 */

export function resetInterceptors(): void {
  initialized = false;

  apiClient.interceptors.request.clear();
  apiClient.interceptors.response.clear();
}

/**
 * ==========================================================
 * Check Initialization
 * ==========================================================
 */

export function areInterceptorsInitialized(): boolean {
  return initialized;
}