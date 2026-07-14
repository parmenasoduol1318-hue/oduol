// frontend/services/api/interceptors.ts

/**
 * ==========================================================
 * SwiftReply API Interceptors
 * ==========================================================
 *
 * Interceptors are now registered directly inside:
 *
 *   frontend/services/api/client.ts
 *
 * This file remains only for backward compatibility.
 * ==========================================================
 */

let initialized = false;

export function initializeInterceptors(): void {
  initialized = true;
}

export function resetInterceptors(): void {
  initialized = false;
}

export function areInterceptorsInitialized(): boolean {
  return initialized;
}