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
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
  },

  USERS: {
    BASE: "/users",
    ME: "/users/me",
  },

  CHAT: {
    BASE: "/chats",
    MESSAGES: "/messages",
  },

  AI: {
    CHAT: "/ai/chat",
    IMAGE: "/ai/image",
    VOICE: "/ai/voice",
  },

  PAYMENTS: {
    CREATE: "/payments",
    VERIFY: "/payments/verify",
    HISTORY: "/payments/history",
    MPESA_CALLBACK: "/payments/mpesa/callback",
    PAYPAL_WEBHOOK: "/payments/paypal/webhook",
  },

  ANALYTICS: {
    BASE: "/analytics",
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