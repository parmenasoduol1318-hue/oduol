// frontend/services/analytics/analyticsService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://swiftreply-njbt.onrender.com";

/* ======================================================
   Types
====================================================== */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<
    string,
    unknown
  >;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/* ======================================================
   Analytics Service
====================================================== */

class AnalyticsService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 15000,
      headers: {
        "Content-Type":
          "application/json",
      },
    });
  }

  /* ==========================================
     Authentication
  ========================================== */

  setAccessToken(token: string) {
    this.api.defaults.headers.common.Authorization =
      `Bearer ${token}`;
  }

  clearAccessToken() {
    delete this.api.defaults.headers.common.Authorization;
  }

  /* ==========================================
     Generic Event
  ========================================== */

  async trackEvent(
    event: AnalyticsEvent
  ) {
    const response =
      await this.api.post<
        ApiResponse
      >(
        "/api/analytics/event",
        event
      );

    return response.data;
  }

  /* ==========================================
     Screen Views
  ========================================== */

  async trackScreenView(
    screen: string
  ) {
    return this.trackEvent({
      name: "screen_view",
      properties: {
        screen,
      },
    });
  }

  /* ==========================================
     Authentication
  ========================================== */

  async trackLogin() {
    return this.trackEvent({
      name: "login",
    });
  }

  async trackLogout() {
    return this.trackEvent({
      name: "logout",
    });
  }

  async trackRegistration() {
    return this.trackEvent({
      name: "register",
    });
  }

  /* ==========================================
     Chat
  ========================================== */

  async trackMessageSent() {
    return this.trackEvent({
      name: "chat_message_sent",
    });
  }

  async trackChatCreated() {
    return this.trackEvent({
      name: "chat_created",
    });
  }

  /* ==========================================
     Images
  ========================================== */

  async trackImageGeneration() {
    return this.trackEvent({
      name: "image_generated",
    });
  }

  /* ==========================================
     Voice
  ========================================== */

  async trackVoiceRecording() {
    return this.trackEvent({
      name: "voice_recording_started",
    });
  }

  async trackVoiceCall() {
    return this.trackEvent({
      name: "voice_call_started",
    });
  }

  /* ==========================================
     Memory
  ========================================== */

  async trackMemoryCreated() {
    return this.trackEvent({
      name: "memory_created",
    });
  }

  /* ==========================================
     Subscription
  ========================================== */

  async trackSubscriptionStarted(
    provider:
      | "MPESA"
      | "PAYPAL"
  ) {
    return this.trackEvent({
      name:
        "subscription_started",
      properties: {
        provider,
      },
    });
  }

  async trackSubscriptionCancelled() {
    return this.trackEvent({
      name:
        "subscription_cancelled",
    });
  }

  /* ==========================================
     Errors
  ========================================== */

  async trackError(
    error: Error,
    location?: string
  ) {
    return this.trackEvent({
      name: "app_error",
      properties: {
        message:
          error.message,
        stack:
          error.stack,
        location,
      },
    });
  }
}

const analyticsService =
  new AnalyticsService();

export default analyticsService;