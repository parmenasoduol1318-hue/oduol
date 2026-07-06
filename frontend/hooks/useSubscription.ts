// frontend/hooks/useSubscription.ts

import { useEffect, useState } from "react";
import { get, post } from "../lib/api";
import ENV from "../lib/env";
import { STORAGE_KEYS } from "../lib/constants";
import { getCache, setCache } from "../lib/cache";

export type SubscriptionStatus = {
  is_pro: boolean;
  plan?: "free" | "pro" | "enterprise";
  expires_at?: string | null;
};

/**
 * Hook to manage PRO subscription state
 */
export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    is_pro: false,
    plan: "free",
    expires_at: null,
  });

  const [loading, setLoading] = useState(true);

  /**
   * Fetch subscription from backend
   */
  const fetchSubscription = async () => {
    try {
      setLoading(true);

      const data = await get<SubscriptionStatus>("/api/subscriptions/me");

      setStatus(data);

      // cache locally
      setCache(STORAGE_KEYS.USER, {
        ...getCache(STORAGE_KEYS.USER),
        subscription: data,
      });
    } catch (err) {
      console.error("Failed to fetch subscription", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Trigger M-Pesa STK Push
   */
  const subscribe = async (phone: string) => {
    return post("/api/payments/mpesa/stkpush", {
      phone,
      plan: "pro",
    });
  };

  /**
   * Check if user has PRO access
   */
  const isPro = status.is_pro === true;

  useEffect(() => {
    fetchSubscription();
  }, []);

  return {
    status,
    loading,
    isPro,
    fetchSubscription,
    subscribe,
  };
}