/**
 * ==========================================================
 * SwiftReply Backend API Endpoints
 * ==========================================================
 *
 * All backend endpoints should be defined here.
 * Never hardcode endpoint strings elsewhere.
 *
 * Base URL is configured in config/api.ts.
 * Example:
 * api.post(API_ENDPOINTS.AUTH.LOGIN, payload)
 * ==========================================================
 */

export const API_ENDPOINTS = {
  // ==========================================================
  // Authentication
  // ==========================================================
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },

  // ==========================================================
  // Users
  // ==========================================================
  USERS: {
    ME: "/api/users/me",
    UPDATE_ME: "/api/users/me",
    DELETE_ME: "/api/users/me",

    BY_ID: (userId: number | string) => `/api/users/${userId}`,
  },

  // ==========================================================
  // Chats
  // ==========================================================
  CHATS: {
    LIST: "/api/chats",
    CREATE: "/api/chats",

    DETAILS: (chatId: number | string) =>
      `/api/chats/${chatId}`,

    UPDATE: (chatId: number | string) =>
      `/api/chats/${chatId}`,

    DELETE: (chatId: number | string) =>
      `/api/chats/${chatId}`,
  },

  // ==========================================================
  // Messages
  // ==========================================================
  MESSAGES: {
    LIST: (chatId: number | string) =>
      `/api/messages/${chatId}`,

    SEND: "/api/messages",

    DELETE: (messageId: number | string) =>
      `/api/messages/${messageId}`,
  },

  // ==========================================================
  // AI
  // ==========================================================
  AI: {
    CHAT: "/api/ai/chat",
    REWRITE: "/api/ai/rewrite",
    TRANSLATE: "/api/ai/translate",
    SUMMARIZE: "/api/ai/summarize",
    RESEARCH: "/api/ai/research",
    CODE: "/api/ai/code",

    IMAGE: "/api/ai/image",
    VISION: "/api/ai/vision",

    SPEECH_TO_TEXT: "/api/ai/speech-to-text",
    TEXT_TO_SPEECH: "/api/ai/text-to-speech",

    EMBEDDINGS: "/api/ai/embeddings",
    PROMPTS: "/api/ai/prompts",
  },

  // ==========================================================
  // Voice
  // ==========================================================
  VOICE: {
    RECORD: "/api/voice/record",
    TRANSCRIBE: "/api/voice/transcribe",
    SYNTHESIZE: "/api/voice/synthesize",
  },

  // ==========================================================
  // Images
  // ==========================================================
  IMAGES: {
    GENERATE: "/api/images/generate",
    EDIT: "/api/images/edit",
    UPSCALE: "/api/images/upscale",
  },

  // ==========================================================
  // Files
  // ==========================================================
  FILES: {
    UPLOAD: "/api/files/upload",
    DOWNLOAD: (fileId: number | string) =>
      `/api/files/${fileId}`,
  },

  // ==========================================================
  // Memory
  // ==========================================================
  MEMORY: {
    LIST: "/api/memory",
    CREATE: "/api/memory",

    DELETE: (memoryId: number | string) =>
      `/api/memory/${memoryId}`,
  },

  // ==========================================================
  // Notifications
  // ==========================================================
  NOTIFICATIONS: {
    LIST: "/api/notifications",

    READ: (notificationId: number | string) =>
      `/api/notifications/${notificationId}/read`,
  },

  // ==========================================================
  // Subscription
  // ==========================================================
  SUBSCRIPTIONS: {
    CURRENT: "/api/subscriptions/current",
    PLANS: "/api/subscriptions/plans",
    UPGRADE: "/api/subscriptions/upgrade",
    CANCEL: "/api/subscriptions/cancel",
  },

  // ==========================================================
  // Payments
  // ==========================================================
  PAYMENTS: {
    MPESA: "/api/payments/mpesa",
    PAYPAL: "/api/payments/paypal",

    VERIFY: (paymentId: number | string) =>
      `/api/payments/${paymentId}/verify`,
  },

  // ==========================================================
  // Analytics
  // ==========================================================
  ANALYTICS: {
    DASHBOARD: "/api/analytics/dashboard",
    USAGE: "/api/analytics/usage",
  },

  // ==========================================================
  // Health
  // ==========================================================
  HEALTH: {
    CHECK: "/api/health",
  },
} as const;

export default API_ENDPOINTS;