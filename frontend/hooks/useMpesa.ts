import { useCallback, useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";
import { logger } from "../lib/logger";

export interface MpesaPaymentRequest {
  phone: string;
  amount: number;
  accountReference?: string;
  description?: string;
}

export interface MpesaPaymentResponse {
  success: boolean;
  message: string;
  checkoutRequestId?: string;
  customerMessage?: string;
}

export interface MpesaStatusResponse {
  success: boolean;
  status: "PENDING" | "SUCCESS" | "FAILED";
  message?: string;
}

export const useMpesa = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(async (payload: MpesaPaymentRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<MpesaPaymentResponse>(API_ENDPOINTS.PAYMENTS.CREATE, {
        amount: payload.amount,
        currency: "KES",
        provider: "MPESA",
        phone_number: payload.phone,
      });

      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to initiate M-Pesa payment";

      setError(message);
      logger.error("M-Pesa payment failed", err);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const checkStatus = useCallback(async (checkoutRequestId: string) => {
    try {
      const res = await api.get<MpesaStatusResponse>(API_ENDPOINTS.PAYMENTS.DETAILS(checkoutRequestId));

      return res;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to check payment status";

      logger.error("M-Pesa status check failed", err);

      return {
        success: false,
        status: "FAILED" as const,
        message,
      };
    }
  }, []);

  return {
    initiatePayment,
    checkStatus,
    loading,
    error,
  };
};