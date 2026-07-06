// frontend/store/subscriptionStore.ts

import { create } from "zustand";

export type SubscriptionPlan =
  | "FREE"
  | "PRO";

export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "EXPIRED"
  | "PENDING";

export interface Subscription {
  plan: SubscriptionPlan;

  status: SubscriptionStatus;

  isPro: boolean;

  startedAt?: string;

  expiresAt?: string;

  autoRenew?: boolean;
}

interface SubscriptionState {
  /* ==========================================
     State
  ========================================== */

  subscription: Subscription;

  loading: boolean;

  /* ==========================================
     Actions
  ========================================== */

  setSubscription: (
    subscription: Subscription
  ) => void;

  updateSubscription: (
    updates: Partial<Subscription>
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  activatePro: (
    expiresAt: string
  ) => void;

  deactivatePro: () => void;

  reset: () => void;
}

const initialSubscription: Subscription =
  {
    plan: "FREE",

    status: "INACTIVE",

    isPro: false,

    autoRenew: false,
  };

export const useSubscriptionStore =
  create<SubscriptionState>(
    (set) => ({
      subscription:
        initialSubscription,

      loading: false,

      setSubscription: (
        subscription
      ) =>
        set({
          subscription,
        }),

      updateSubscription: (
        updates
      ) =>
        set((state) => ({
          subscription: {
            ...state.subscription,
            ...updates,
          },
        })),

      setLoading: (
        loading
      ) =>
        set({
          loading,
        }),

      activatePro: (
        expiresAt
      ) =>
        set({
          subscription: {
            plan: "PRO",
            status: "ACTIVE",
            isPro: true,
            startedAt:
              new Date().toISOString(),
            expiresAt,
            autoRenew: true,
          },
        }),

      deactivatePro: () =>
        set({
          subscription: {
            plan: "FREE",
            status: "EXPIRED",
            isPro: false,
            autoRenew: false,
          },
        }),

      reset: () =>
        set({
          subscription:
            initialSubscription,
          loading: false,
        }),
    })
  );

export default useSubscriptionStore;