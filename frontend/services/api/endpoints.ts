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
  },

  MESSAGES: {
    LIST: (chatId: number | string) => `/messages/${chatId}`,
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
  },

  IMAGES: {
    GENERATE: "/images",
    EDIT: "/images/edit",
    UPSCALE: "/images/upscale",
    REMOVE_BACKGROUND: "/images/remove-background",
    OCR: "/images/ocr",
    DESCRIBE: "/images/describe",
    SAVE: "/images/save",
  },

  FILES: {
    UPLOAD: "/files/upload",
    DOWNLOAD: (id: number | string) => `/files/${id}`,
  },

  MEMORY: {
    LIST: "/memory",
    CREATE: "/memory",
    DELETE: (id: number | string) => `/memory/${id}`,
  },

  NOTIFICATIONS: {
    LIST: "/notifications",
    READ: (id: number | string) => `/notifications/${id}/read`,
  },

  SUBSCRIPTIONS: {
    CURRENT: "/subscriptions/current",
    PLANS: "/subscriptions/plans",
    UPGRADE: "/subscriptions",
    CANCEL: "/subscriptions/cancel",
  },

  PAYMENTS: {
    MPESA: "/payments",
    PAYPAL: "/payments/paypal",
    VERIFY: (id: number | string) => `/payments/${id}/verify`,
  },

  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    USAGE: "/analytics/usage",
  },

  HEALTH: {
    CHECK: "/health",
  },
} as const;

export default API_ENDPOINTS;