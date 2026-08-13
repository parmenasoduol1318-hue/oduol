// frontend/hooks/useNotifications.ts

import { useEffect, useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";
import { getCache, setCache } from "../lib/cache";
import { STORAGE_KEYS } from "../lib/constants";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  created_at: string;
};

export type NotificationState = {
  items: NotificationItem[];
  unreadCount: number;
};

export function useNotifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await api.get<NotificationItem[]>(API_ENDPOINTS.NOTIFICATIONS.LIST);

      setItems(data);

      const unread = data.filter((n) => !n.is_read).length;
      setUnreadCount(unread);

      setCache(STORAGE_KEYS.SETTINGS + "_notifications", data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);

      const cached = getCache<NotificationItem[]>(
        STORAGE_KEYS.SETTINGS + "_notifications"
      );

      if (cached) {
        setItems(cached);
        setUnreadCount(cached.filter((n) => !n.is_read).length);
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.patch(API_ENDPOINTS.NOTIFICATIONS.READ(id));

      setItems((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );

      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch(API_ENDPOINTS.NOTIFICATIONS.READ_ALL);

      setItems((prev) =>
        prev.map((n) => ({ ...n, is_read: true }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const refresh = () => {
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    items,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    refresh,
  };
}