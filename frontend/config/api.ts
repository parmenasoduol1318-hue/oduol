// config/api.ts

/**
 * ==========================================================
 * SwiftReply API Configuration
 * ==========================================================
 */

const DEV_API =
  "http://127.0.0.1:8000/api";

/**
 * Replace with your production backend URL
 * after deployment.
 */
const PROD_API =
  "https://api.swiftreply.ai/api";

export const API_CONFIG = {
  BASE_URL: __DEV__ ? DEV_API : PROD_API,

  TIMEOUT: 30000,

  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  RETRY_COUNT: 2,

  RETRY_DELAY: 1000,

  ENDPOINTS: {
    // Authentication
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    ME: "/auth/me",

    // Users
    USERS: "/users",
    PROFILE: "/users/me",

    // Chats
    CHATS: "/chats",
    CHAT: (id: number | string) => `/chats/${id}`,

    // Messages
    MESSAGES: "/messages",
    MESSAGE: (id: number | string) => `/messages/${id}`,

    // AI
    AI_CHAT: "/ai/chat",
    AI_REWRITE: "/ai/rewrite",
    AI_TRANSLATE: "/ai/translate",
    AI_SUMMARIZE: "/ai/summarize",
    AI_RESEARCH: "/ai/research",
    AI_CODE: "/ai/code",
    AI_IMAGE: "/ai/image",
    AI_VISION: "/ai/vision",
    AI_PROMPTS: "/ai/prompts",
    AI_EMBEDDINGS: "/ai/embeddings",
    AI_SPEECH_TO_TEXT: "/ai/speech-to-text",
    AI_TEXT_TO_SPEECH: "/ai/text-to-speech",

    // Voice
    VOICE: "/voice",

    // Images
    IMAGES: "/images",

    // Files
    FILES: "/files",

    // Memory
    MEMORY: "/memory",

    // Notifications
    NOTIFICATIONS: "/notifications",

    // Analytics
    ANALYTICS: "/analytics",

    // Payments
    PAYMENTS: "/payments",

    // Subscriptions
    SUBSCRIPTIONS: "/subscriptions",

    // Health
    HEALTH: "/health",
  },
};

export default API_CONFIG;