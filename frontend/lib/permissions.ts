// frontend/lib/permissions.ts

export type UserRole = "user" | "admin";

export interface PermissionContext {
  role?: UserRole;
  isPro?: boolean;
  isVerified?: boolean;
}

/**
 * Check if user is admin
 */
export function isAdmin(ctx: PermissionContext): boolean {
  return ctx.role === "admin";
}

/**
 * Check if user has PRO access
 */
export function isPro(ctx: PermissionContext): boolean {
  return ctx.isPro === true;
}

/**
 * Check if user is verified
 */
export function isVerified(ctx: PermissionContext): boolean {
  return ctx.isVerified === true;
}

/**
 * Can user access AI features (SwiftReply core gating)
 */
export function canUseAI(ctx: PermissionContext): boolean {
  return isPro(ctx) || isVerified(ctx);
}

/**
 * Can user access premium features
 */
export function canAccessPremium(ctx: PermissionContext): boolean {
  return isPro(ctx);
}

/**
 * Can user access admin dashboard
 */
export function canAccessAdmin(ctx: PermissionContext): boolean {
  return isAdmin(ctx);
}

/**
 * Feature gating map (extendable for SwiftReply)
 */
export const FEATURES = {
  CHAT: "chat",
  AI: "ai",
  VOICE: "voice",
  IMAGES: "images",
  FILE_UPLOAD: "file_upload",
  ADMIN_PANEL: "admin_panel",
} as const;

export type FeatureKey = typeof FEATURES[keyof typeof FEATURES];

/**
 * Central feature access checker
 */
export function hasAccess(ctx: PermissionContext, feature: FeatureKey): boolean {
  switch (feature) {
    case FEATURES.ADMIN_PANEL:
      return isAdmin(ctx);

    case FEATURES.AI:
      return canUseAI(ctx);

    case FEATURES.VOICE:
    case FEATURES.IMAGES:
    case FEATURES.CHAT:
      return true;

    case FEATURES.FILE_UPLOAD:
      return isPro(ctx);

    default:
      return false;
  }
}