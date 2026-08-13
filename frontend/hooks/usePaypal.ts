// frontend/hooks/usePaypal.ts

import { useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";

export type PayPalStatus =
  | "idle"
  | "creating"
  | "redirecting"
  | "success"
  | "error";

type UsePaypalOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export function usePaypal(options?: UsePaypalOptions) {
  const [status, setStatus] = useState<PayPalStatus>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const createOrder = async (plan: string = "pro") => {
    try {
      setLoading(true);
      setStatus("creating");

      const res = await api.post(API_ENDPOINTS.SUBSCRIPTIONS.CREATE, {
        plan,
        provider: "PAYPAL",
      });

      setStatus("success");
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

  const capturePayment = async (orderId: string) => {
    try {
      setLoading(true);

      const res = await api.get(API_ENDPOINTS.SUBSCRIPTIONS.STATUS);

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