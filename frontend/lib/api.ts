// frontend/lib/api.ts

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ENV from "./env";
import { getCache } from "./cache";
import { STORAGE_KEYS } from "./constants";
import { getErrorMessage } from "./errors";

/**
 * Base Axios instance
 */
const api: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach token automatically
 */
api.interceptors.request.use(
  (config) => {
    const token =
      getCache<string>(STORAGE_KEYS.TOKEN) ||
      (typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEYS.TOKEN)
        : null);

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle responses globally
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getErrorMessage(error);

    // optional global logging hook
    console.error("API Error:", message);

    return Promise.reject(error);
  }
);

/**
 * Generic GET
 */
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await api.get<T>(url, config);
  return res.data;
};

/**
 * Generic POST
 */
export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await api.post<T>(url, data, config);
  return res.data;
};

/**
 * Generic PUT
 */
export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await api.put<T>(url, data, config);
  return res.data;
};

/**
 * Generic DELETE
 */
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await api.delete<T>(url, config);
  return res.data;
};

/**
 * Raw axios instance export (for advanced use)
 */
export default api;