// frontend/lib/env.ts

/**
 * Centralized environment config for SwiftReply frontend
 * Supports safe access + fallback defaults
 */

const ENV = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8000",

  APP_NAME:
    process.env.NEXT_PUBLIC_APP_NAME ||
    "SwiftReply",

  APP_ENV:
    process.env.NEXT_PUBLIC_APP_ENV ||
    "development",

  IS_PRODUCTION:
    process.env.NEXT_PUBLIC_APP_ENV === "production",

  IS_DEVELOPMENT:
    process.env.NEXT_PUBLIC_APP_ENV !== "production",

  // Feature flags (extend later)
  ENABLE_VOICE:
    process.env.NEXT_PUBLIC_ENABLE_VOICE === "true",

  ENABLE_IMAGES:
    process.env.NEXT_PUBLIC_ENABLE_IMAGES === "true",

  ENABLE_OFFLINE_MODE:
    process.env.NEXT_PUBLIC_ENABLE_OFFLINE === "true",
};

export default ENV;