// frontend/services/analytics/analyticsService.ts

import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

class AnalyticsService {
  setAccessToken(token: string) {
    return token;
  }

  clearAccessToken() {
    return undefined;
  }

  async trackEvent(event: AnalyticsEvent) {
    return api.get(API_ENDPOINTS.ANALYTICS.ME, {
      params: {
        event: event.name,
        ...event.properties,
      },
    });
  }

  async trackScreenView(screen: string) {
    return this.trackEvent({
      name: "screen_view",
      properties: { screen },
    });
  }

  async trackLogin() {
    return this.trackEvent({ name: "login" });
  }

  async trackLogout() {
    return this.trackEvent({ name: "logout" });
  }

  async trackRegistration() {
    return this.trackEvent({ name: "register" });
  }

  async trackMessageSent() {
    return this.trackEvent({ name: "chat_message_sent" });
  }

  async trackChatCreated() {
    return this.trackEvent({ name: "chat_created" });
  }

  async trackImageGeneration() {
    return this.trackEvent({ name: "image_generated" });
  }

  async trackVoiceRecording() {
    return this.trackEvent({ name: "voice_recording_started" });
  }

  async trackVoiceCall() {
    return this.trackEvent({ name: "voice_call_started" });
  }

  async trackMemoryCreated() {
    return this.trackEvent({ name: "memory_created" });
  }

  async trackSubscriptionStarted(provider: "MPESA" | "PAYPAL") {
    return this.trackEvent({
      name: "subscription_started",
      properties: { provider },
    });
  }

  async trackSubscriptionCancelled() {
    return this.trackEvent({ name: "subscription_cancelled" });
  }

  async trackError(error: Error, location?: string) {
    return this.trackEvent({
      name: "app_error",
      properties: {
        message: error.message,
        stack: error.stack,
        location,
      },
    });
  }
}

const analyticsService = new AnalyticsService();

export default analyticsService;