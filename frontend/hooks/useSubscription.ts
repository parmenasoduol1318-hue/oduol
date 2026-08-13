// frontend/hooks/useSubscription.ts

import { useEffect, useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";
import { STORAGE_KEYS } from "../lib/constants";
import { getCache, setCache } from "../lib/cache";

export type SubscriptionStatus = {
  is_pro: boolean;
  plan?: "free" | "pro" | "enterprise";
  expires_at?: string | null;
};

export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    is_pro: false,
    plan: "free",
    expires_at: null,
  });

  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    try {
      setLoading(true);

      const data = await api.get<{ status?: string; plan?: string; expires_at?: string | null; is_pro?: boolean }>(
        API_ENDPOINTS.SUBSCRIPTIONS.CURRENT
      );

      const normalized: SubscriptionStatus = {
        is_pro: Boolean(data?.is_pro || data?.status === "active" || data?.plan === "pro"),
        plan: (data?.plan as SubscriptionStatus["plan"]) ?? "free",
        expires_at: data?.expires_at ?? null,
      };

      setStatus(normalized);

      const cached = getCache<Record<string, unknown>>(STORAGE_KEYS.USER) ?? {};
      setCache(STORAGE_KEYS.USER, {
        ...(cached as Record<string, unknown>),
        subscription: normalized,
      });
    } catch (err) {
      console.error("Failed to fetch subscription", err);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (provider: string = "MPESA", plan: string = "pro") => {
    return api.post(API_ENDPOINTS.SUBSCRIPTIONS.CREATE, {
      plan,
      provider,
    });
  };

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