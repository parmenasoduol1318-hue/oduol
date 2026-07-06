// frontend/hooks/usePaypal.ts

import { useState } from "react";
import { post } from "../lib/api";

export type PayPalStatus =
  | "idle"
  | "creating"
  | "redirecting"
  | "success"
  | "error";

type PayPalOrderResponse = {
  approval_url: string;
  order_id: string;
};

type UsePaypalOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

/**
 * PayPal checkout hook (backend-driven order creation)
 */
export function usePaypal(options?: UsePaypalOptions) {
  const [status, setStatus] = useState<PayPalStatus>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  /**
   * Create PayPal order via backend
   */
  const createOrder = async (plan: string = "pro") => {
    try {
      setLoading(true);
      setStatus("creating");

      const res = await post<PayPalOrderResponse>(
        "/api/payments/paypal/create-order",
        { plan }
      );

      setStatus("redirecting");

      // redirect user to PayPal approval URL
      if (typeof window !== "undefined") {
        window.location.href = res.approval_url;
      }

      return res;
    } catch (err) {
      setError(err);
      setStatus("error");
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Capture PayPal payment (after redirect return)
   */
  const capturePayment = async (orderId: string) => {
    try {
      setLoading(true);

      const res = await post(
        "/api/payments/paypal/capture",
        { order_id: orderId }
      );

      setStatus("success");
      options?.onSuccess?.(res);

      return res;
    } catch (err) {
      setError(err);
      setStatus("error");
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    capturePayment,
    status,
    loading,
    error,
  };
}