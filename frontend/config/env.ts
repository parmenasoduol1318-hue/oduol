// config/env.ts

/**
 * ==========================================================
 * SwiftReply Environment Configuration
 * ==========================================================
 */

import Constants from "expo-constants";

const extra =
  (Constants.expoConfig?.extra ||
    Constants.manifest2?.extra ||
    {}) as Record<string, any>;

export const ENV = {
  APP_NAME: extra.APP_NAME ?? "SwiftReply",

  ENVIRONMENT: extra.ENVIRONMENT ?? (__DEV__ ? "development" : "production"),

  API_URL:
    extra.API_URL ??
    (__DEV__
      ? "https://swiftreply-njbt.onrender.com/api"
      : "https://api.swiftreply.ai/api"),

  OPENAI_MODEL:
    extra.OPENAI_MODEL ?? "gpt-5.5",

  DEBUG:
    extra.DEBUG ?? __DEV__,

  ENABLE_ANALYTICS:
    extra.ENABLE_ANALYTICS ?? true,

  ENABLE_NOTIFICATIONS:
    extra.ENABLE_NOTIFICATIONS ?? true,

  ENABLE_MEMORY:
    extra.ENABLE_MEMORY ?? true,

  ENABLE_VOICE:
    extra.ENABLE_VOICE ?? true,

  ENABLE_IMAGES:
    extra.ENABLE_IMAGES ?? true,

  ENABLE_OFFLINE:
    extra.ENABLE_OFFLINE ?? true,

  REQUEST_TIMEOUT:
    extra.REQUEST_TIMEOUT ?? 30000,
};

export default ENV;