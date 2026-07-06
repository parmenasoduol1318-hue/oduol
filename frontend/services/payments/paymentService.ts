// frontend/services/payments/paymentService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:8000";

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
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Sets the Authorization header for authenticated requests.
   */
  setAccessToken(token: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Removes the Authorization header.
   */
  clearAccessToken() {
    delete this.api.defaults.headers.common.Authorization;
  }

  /* ======================================================
     M-Pesa
  ====================================================== */

  async initiateMpesaSTKPush(
    payload: MpesaSTKPushRequest
  ) {
    const response =
      await this.api.post<ApiResponse>(
        "/api/payments/mpesa/stkpush",
        payload
      );

    return response.data;
  }

  async getMpesaPaymentStatus(
    checkoutRequestId: string
  ) {
    const response =
      await this.api.get<ApiResponse>(
        `/api/payments/mpesa/status/${checkoutRequestId}`
      );

    return response.data;
  }

  /* ======================================================
     PayPal
  ====================================================== */

  async createPaypalOrder(
    payload: PaypalCreateOrderRequest
  ) {
    const response =
      await this.api.post<ApiResponse>(
        "/api/payments/paypal/create-order",
        payload
      );

    return response.data;
  }

  async capturePaypalOrder(
    orderId: string
  ) {
    const response =
      await this.api.post<ApiResponse>(
        `/api/payments/paypal/capture/${orderId}`
      );

    return response.data;
  }

  /* ======================================================
     Subscription
  ====================================================== */

  async getSubscriptionStatus() {
    const response =
      await this.api.get<ApiResponse>(
        "/api/subscription/me"
      );

    return response.data;
  }

  async cancelSubscription() {
    const response =
      await this.api.post<ApiResponse>(
        "/api/subscription/cancel"
      );

    return response.data;
  }

  /* ======================================================
     Payment History
  ====================================================== */

  async getPaymentHistory() {
    const response =
      await this.api.get<ApiResponse>(
        "/api/payments/history"
      );

    return response.data;
  }
}

const paymentService = new PaymentService();

export default paymentService;