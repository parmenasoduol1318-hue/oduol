// frontend/lib/constants.ts

/**
 * Global app constants for SwiftReply frontend
 */

export const APP_NAME = "SwiftReply";

export const APP_VERSION = "1.0.0";

export const STORAGE_KEYS = {
  TOKEN: "swiftreply_token",
  REFRESH_TOKEN: "swiftreply_refresh_token",
  USER: "swiftreply_user",
  THEME: "swiftreply_theme",
  SETTINGS: "swiftreply_settings",
  CHAT_HISTORY: "swiftreply_chat_history",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    REFRESH: "/api/auth/refresh",
    ME: "/api/auth/me",
    LOGOUT: "/api/auth/logout",
  },

  USERS: {
    BASE: "/api/users",
    ME: "/api/users/me",
  },

  CHAT: {
    BASE: "/api/chats",
    MESSAGES: "/api/messages",
  },

  AI: {
    CHAT: "/api/ai/chat",
    IMAGE: "/api/ai/image",
    VOICE: "/api/ai/voice",
  },

  PAYMENTS: {
    MPESA_STK: "/api/payments/mpesa/stkpush",
    MPESA_CALLBACK: "/api/payments/mpesa/callback",
  },

  ANALYTICS: {
    BASE: "/api/analytics",
  },
};

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const TIMEOUTS = {
  REQUEST: 15000, // 15s
  UPLOAD: 60000, // 60s
};

export const APP_THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export const LANGUAGES = ["en", "sw", "sh"] as const;