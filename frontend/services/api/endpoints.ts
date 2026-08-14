/**
 * ==========================================================
 * SwiftReply Backend API Endpoints
 * ==========================================================
 *
 * API_BASE_URL already contains "/api"
 * so NEVER prefix endpoints with "/api".
 * ==========================================================
 */

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  USERS: {
    ME: "/users/me",
    UPDATE_ME: "/users/me",
    DELETE_ME: "/users/me",
    BY_ID: (userId: number | string) => `/users/${userId}`,
  },

  CHATS: {
    LIST: "/chats",
    CREATE: "/chats",
    DETAILS: (chatId: number | string) => `/chats/${chatId}`,
    UPDATE: (chatId: number | string) => `/chats/${chatId}`,
    DELETE: (chatId: number | string) => `/chats/${chatId}`,
    ARCHIVE: (chatId: number | string) => `/chats/${chatId}/archive`,
    UNARCHIVE: (chatId: number | string) => `/chats/${chatId}/unarchive`,
  },

  MESSAGES: {
    LIST: (chatId: number | string) => `/messages/chat/${chatId}`,
    SEND: "/messages",
    DELETE: (messageId: number | string) => `/messages/${messageId}`,
  },

  AI: {
    CHAT: "/ai/chat",
    REWRITE: "/ai/rewrite",
    TRANSLATE: "/ai/translate",
    SUMMARIZE: "/ai/summarize",
    RESEARCH: "/ai/research",
    CODE: "/ai/code",
    IMAGE: "/ai/image",
    VISION: "/ai/vision",
    SPEECH_TO_TEXT: "/ai/speech-to-text",
    TEXT_TO_SPEECH: "/ai/text-to-speech",
    EMBEDDINGS: "/ai/embeddings",
    PROMPTS: "/ai/prompts",
  },

  VOICE: {
    SPEECH_TO_TEXT: "/voice/speech-to-text",
    TEXT_TO_SPEECH: "/voice/text-to-speech",
    CONVERSATION: "/voice/conversation",
    CLONE: "/voice/clone",
    VOICES: "/voice/voices",
    SETTINGS: "/voice/settings",
  },

  IMAGES: {
    GENERATE: "/images/generate",
    EDIT: "/images/edit",
    UPSCALE: "/images/upscale",
    REMOVE_BACKGROUND: "/images/remove-background",
    OCR: "/images/ocr",
    DESCRIBE: "/images/describe",
    SAVE: "/images/save",
    HISTORY: "/images/history",
    DELETE: (imageId: number | string) => `/images/${imageId}`,
  },

  FILES: {
    UPLOAD: "/files/upload",
    DOWNLOAD: (id: number | string) => `/files/${id}`,
  },

  MEMORY: {
    LIST: "/memory",
    CREATE: "/memory",
    SEARCH: "/memory/search",
    DETAILS: (id: number | string) => `/memory/${id}`,
    DELETE: (id: number | string) => `/memory/${id}`,
  },

  NOTIFICATIONS: {
    LIST: "/notifications",
    READ: (id: number | string) => `/notifications/${id}/read`,
    READ_ALL: "/notifications/read/all",
  },

  SUBSCRIPTIONS: {
    CREATE: "/subscriptions",
    CURRENT: "/subscriptions/me",
    HISTORY: "/subscriptions/history",
    UPGRADE: "/subscriptions/upgrade",
    CANCEL: "/subscriptions/cancel",
    RENEW: "/subscriptions/renew",
    STATUS: "/subscriptions/status",
  },

  PAYMENTS: {
    CREATE: "/payments",
    VERIFY: "/payments/verify",
    HISTORY: "/payments/history",
    DETAILS: (id: number | string) => `/payments/${id}`,
    REFUND: (id: number | string) => `/payments/${id}/refund`,
    STATUS: (id: number | string) => `/payments/${id}/status`,
    MPESA_CALLBACK: "/payments/mpesa/callback",
    PAYPAL_WEBHOOK: "/payments/paypal/webhook",
  },

  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    ME: "/analytics/me",
    USAGE: "/analytics/usage",
    AI: "/analytics/ai",
    MESSAGES: "/analytics/messages",
    VOICE: "/analytics/voice",
    IMAGES: "/analytics/images",
    SUBSCRIPTION: "/analytics/subscription",
    PAYMENTS: "/analytics/payments",
    SUMMARY: "/analytics/summary",
  },

  HEALTH: {
    CHECK: "/health",
    READY: "/health/ready",
    LIVE: "/health/live",
    VERSION: "/version",
    CONFIG: "/config",
    PING: "/ping",
  },
} as const;

export default API_ENDPOINTS;