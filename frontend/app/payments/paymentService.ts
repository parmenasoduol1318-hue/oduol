// frontend/app/payments/paymentService.ts

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://swiftreply-njbt.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface MpesaSTKRequest {
  phone_number: string;
  amount?: number;
}

export interface PaypalOrderRequest {
  plan: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Attach JWT token to future requests.
 */
export function setAccessToken(token: string) {
  api.defaults.headers.common.Authorization =
    `Bearer ${token}`;
}

/**
 * Remove JWT token.
 */
export function clearAccessToken() {
  delete api.defaults.headers.common.Authorization;
}

/* ======================================================
   M-PESA
====================================================== */

export async function initiateMpesaPayment(
  payload: MpesaSTKRequest
) {
  const response =
    await api.post<ApiResponse>(
      "/api/payments/mpesa/stkpush",
      payload
    );

  return response.data;
}

export async function checkMpesaPayment(
  checkoutRequestId: string
) {
  const response =
    await api.get<ApiResponse>(
      `/api/payments/mpesa/status/${checkoutRequestId}`
    );

  return response.data;
}

/* ======================================================
   PAYPAL
====================================================== */

export async function createPaypalOrder(
  payload: PaypalOrderRequest
) {
  const response =
    await api.post<ApiResponse>(
      "/api/payments/paypal/create-order",
      payload
    );

  return response.data;
}

export async function capturePaypalOrder(
  orderId: string
) {
  const response =
    await api.post<ApiResponse>(
      `/api/payments/paypal/capture/${orderId}`
    );

  return response.data;
}

/* ======================================================
   SUBSCRIPTION
====================================================== */

export async function getSubscriptionStatus() {
  const response =
    await api.get<ApiResponse>(
      "/api/subscription/me"
    );

  return response.data;
}

export async function cancelSubscription() {
  const response =
    await api.post<ApiResponse>(
      "/api/subscription/cancel"
    );

  return response.data;
}

/* ======================================================
   PAYMENT HISTORY
====================================================== */

export async function getPaymentHistory() {
  const response =
    await api.get<ApiResponse>(
      "/api/payments/history"
    );

  return response.data;
}

/* ======================================================
   EXPORT
====================================================== */

export default {
  setAccessToken,
  clearAccessToken,

  initiateMpesaPayment,
  checkMpesaPayment,

  createPaypalOrder,
  capturePaypalOrder,

  getSubscriptionStatus,
  cancelSubscription,

  getPaymentHistory,
};