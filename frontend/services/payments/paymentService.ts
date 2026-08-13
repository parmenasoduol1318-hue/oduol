// frontend/services/payments/paymentService.ts

import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";

export interface MpesaSTKPushRequest {
  phone_number: string;
  amount: number;
}

export interface PaypalCreateOrderRequest {
  plan: "PRO";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

class PaymentService {
  async createPayment(payload: { amount: number; currency?: string; provider: string }) {
    return api.post(API_ENDPOINTS.PAYMENTS.CREATE, payload);
  }

  async payWithMpesa(payload: { phone_number: string; plan_id?: string; amount?: number }) {
    return api.post("/payments/mpesa", payload);
  }

  async payWithPaypal(payload: { plan_id?: string; amount?: number }) {
    return api.post("/payments/paypal", payload);
  }

  async verifyPayment(payload: { transaction_id: string }) {
    return api.post(API_ENDPOINTS.PAYMENTS.VERIFY, payload);
  }

  async getPaymentHistory() {
    return api.get(API_ENDPOINTS.PAYMENTS.HISTORY);
  }

  async getPaymentDetails(paymentId: number | string) {
    return api.get(API_ENDPOINTS.PAYMENTS.DETAILS(paymentId));
  }

  async getSubscriptionStatus() {
    return api.get(API_ENDPOINTS.SUBSCRIPTIONS.CURRENT);
  }

  async createSubscription(payload: { plan: string; provider: string }) {
    return api.post(API_ENDPOINTS.SUBSCRIPTIONS.CREATE, payload);
  }

  async upgradeSubscription(payload: { plan?: string; provider?: string }) {
    return api.put(API_ENDPOINTS.SUBSCRIPTIONS.UPGRADE, payload);
  }

  async cancelSubscription() {
    return api.delete(API_ENDPOINTS.SUBSCRIPTIONS.CANCEL);
  }

  async renewSubscription() {
    return api.post(API_ENDPOINTS.SUBSCRIPTIONS.RENEW);
  }

  async getSubscriptionHistory() {
    return api.get(API_ENDPOINTS.SUBSCRIPTIONS.HISTORY);
  }
}

const paymentService = new PaymentService();

export default paymentService;