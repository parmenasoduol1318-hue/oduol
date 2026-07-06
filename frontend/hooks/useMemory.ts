import { useCallback, useState } from "react";
import api from "../lib/api";
import { logger } from "../lib/logger";

export interface MemoryItem {
  id: string;
  content: string;
  type: "fact" | "preference" | "conversation" | "note";
  createdAt: string;
}

export interface MemoryResponse {
  success: boolean;
  data: MemoryItem[];
  message?: string;
}

export const useMemory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memories, setMemories] = useState<MemoryItem[]>([]);

  const fetchMemories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<MemoryResponse>("/memory");

      setMemories(res.data.data || []);
      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to fetch memories";

      setError(message);
      logger.error("Fetch memories failed", err);

      return {
        success: false,
        data: [],
        message,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const saveMemory = useCallback(async (content: string, type: MemoryItem["type"]) => {
    try {
      const res = await api.post<MemoryResponse>("/memory", {
        content,
        type,
      });

      setMemories((prev) => [...prev, ...(res.data.data || [])]);

      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to save memory";

      logger.error("Save memory failed", err);

      return {
        success: false,
        data: [],
        message,
      };
    }
  }, []);

  const clearMemory = useCallback(async (id: string) => {
    try {
      await api.delete(`/memory/${id}`);

      setMemories((prev) => prev.filter((m) => m.id !== id));

      return { success: true };
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to delete memory";

      logger.error("Delete memory failed", err);

      return {
        success: false,
        message,
      };
    }
  }, []);

  return {
    memories,
    loading,
    error,
    fetchMemories,
    saveMemory,
    clearMemory,
  };
};