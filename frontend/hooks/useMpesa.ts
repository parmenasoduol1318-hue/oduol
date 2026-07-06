import { useCallback, useState } from "react";
import api from "../lib/api";
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
      const res = await api.post<MpesaPaymentResponse>(
        "/payments/mpesa/stkpush",
        payload
      );

      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to initiate M-Pesa payment";

      setError(message);
      logger.error("M-Pesa STK Push failed", err);

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
      const res = await api.get<MpesaStatusResponse>(
        `/payments/mpesa/status/${checkoutRequestId}`
      );

      return res.data;
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