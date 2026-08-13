// frontend/types/index.ts

export type MessageIntent =
  | "question"
  | "statement"
  | "request"
  | "warning"
  | "flirting"
  | "joking"
  | "help_request"
  | "complaint"
  | "compliment";

export type MessageTone =
  | "friendly"
  | "serious"
  | "angry"
  | "formal"
  | "joking"
  | "confused"
  | "supportive"
  | "neutral";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type ISODateString = string;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export type ThemeMode = "light" | "dark" | "system";
export type AppLanguage = "en" | "sw";
export type UserRole = "user" | "admin";
export type SubscriptionPlan = "FREE" | "PRO";
export type PaymentProvider = "MPESA" | "PAYPAL";
export type NetworkStatus = "online" | "offline";

export interface SelectOption {
  label: string;
  value: string;
}

export interface KeyValue<T = string> {
  key: string;
  value: T;
}