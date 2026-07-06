// frontend/lib/logger.ts

/**
 * SwiftReply Logger Utility
 * Centralized logging for debugging + production control
 */

const isDev = process.env.NODE_ENV === "development";

export type LogLevel = "info" | "warn" | "error" | "debug";

function formatMessage(level: LogLevel, message: string, meta?: any) {
  return {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Core logger
 */
function log(level: LogLevel, message: string, meta?: any) {
  const formatted = formatMessage(level, message, meta);

  if (isDev) {
    switch (level) {
      case "info":
        console.info(formatted);
        break;
      case "warn":
        console.warn(formatted);
        break;
      case "error":
        console.error(formatted);
        break;
      default:
        console.log(formatted);
    }
  } else {
    // Production hook (can be replaced with Sentry / backend logging)
    if (level === "error") {
      // send to monitoring service here
    }
  }
}

/**
 * Public API
 */
export const logger = {
  info: (message: string, meta?: any) => log("info", message, meta),
  warn: (message: string, meta?: any) => log("warn", message, meta),
  error: (message: string, meta?: any) => log("error", message, meta),
  debug: (message: string, meta?: any) => log("debug", message, meta),
};