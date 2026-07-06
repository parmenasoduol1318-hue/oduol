// frontend/constants/routes.ts

/**
 * ==========================================================
 * SwiftReply Route Constants
 * ==========================================================
 */

export const ROUTES = {
  // Root
  ROOT: "/",

  // Authentication
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",

  // Onboarding
  ONBOARDING: "/onboarding",

  // Tabs
  HOME: "/",
  CHATS: "/chats",
  HISTORY: "/history",
  IMAGES: "/images",
  SETTINGS: "/settings",
  PROFILE: "/profile",

  // Chat
  CHAT: (id: number | string) => `/chat/${id}`,

  // AI Features
  AI_CHAT: "/ai/chat",
  AI_IMAGE: "/ai/image",
  AI_REWRITE: "/ai/rewrite",
  AI_TRANSLATE: "/ai/translate",
  AI_SUMMARIZE: "/ai/summarize",
  AI_RESEARCH: "/ai/research",
  AI_CODE: "/ai/code",

  // Voice
  VOICE: "/voice",

  // Memory
  MEMORY: "/memory",

  // Notifications
  NOTIFICATIONS: "/notifications",

  // Payments
  PAYMENTS: "/payments",

  // Subscription
  SUBSCRIPTIONS: "/subscriptions",

  // Analytics
  ANALYTICS: "/analytics",
} as const;

/**
 * Tab Routes
 */
export const TAB_ROUTES = [
  ROUTES.HOME,
  ROUTES.CHATS,
  ROUTES.HISTORY,
  ROUTES.IMAGES,
  ROUTES.SETTINGS,
  ROUTES.PROFILE,
];

/**
 * Authentication Routes
 */
export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
];

/**
 * Protected Routes
 */
export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.CHATS,
  ROUTES.HISTORY,
  ROUTES.IMAGES,
  ROUTES.SETTINGS,
  ROUTES.PROFILE,
  ROUTES.MEMORY,
  ROUTES.NOTIFICATIONS,
  ROUTES.SUBSCRIPTIONS,
  ROUTES.PAYMENTS,
  ROUTES.ANALYTICS,
];

export default ROUTES;