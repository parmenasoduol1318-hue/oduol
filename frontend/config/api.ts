// frontend/config/api.ts

/**
 * ==========================================================
 * SwiftReply API Configuration
 * ==========================================================
 */

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://swiftreply-njbt.onrender.com/api";

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,

  TIMEOUT: 30000,

  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  RETRY_COUNT: 2,

  RETRY_DELAY: 1000,
};

export default API_CONFIG;