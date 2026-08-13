// frontend/app/payments/paymentService.ts

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://swiftreply-njbt.onrender.com/api";

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

export function setAccessToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAccessToken() {
  delete api.defaults.headers.common.Authorization;
}

export async function initiateMpesaPayment(payload: MpesaSTKRequest) {
  const response = await api.post<ApiResponse>("/payments", {
    amount: payload.amount ?? 0,
    currency: "KES",
    provider: "MPESA",
    phone_number: payload.phone_number,
  });

  return response.data;
}

export async function checkMpesaPayment(checkoutRequestId: string) {
  const response = await api.get<ApiResponse>(`/payments/${checkoutRequestId}`);
  return response.data;
}

export async function createPaypalOrder(payload: PaypalOrderRequest) {
  const response = await api.post<ApiResponse>("/payments", {
    amount: 0,
    currency: "USD",
    provider: "PAYPAL",
    plan: payload.plan,
  });

  return response.data;
}

export async function capturePaypalOrder(orderId: string) {
  const response = await api.get<ApiResponse>(`/payments/${orderId}`);
  return response.data;
}

export async function getSubscriptionStatus() {
  const response = await api.get<ApiResponse>("/subscriptions/me");
  return response.data;
}

export async function cancelSubscription() {
  const response = await api.delete<ApiResponse>("/subscriptions/cancel");
  return response.data;
}

export async function getPaymentHistory() {
  const response = await api.get<ApiResponse>("/payments/history");
  return response.data;
}

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