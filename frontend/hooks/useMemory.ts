import { useCallback, useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";
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
      const res = await api.get<MemoryItem[]>(API_ENDPOINTS.MEMORY.LIST);

      setMemories(res || []);
      return { success: true, data: res || [], message: "Memories loaded" };
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
      const res = await api.post<MemoryItem>(API_ENDPOINTS.MEMORY.CREATE, {
        content,
        metadata: { type },
      });

      setMemories((prev) => [...prev, { ...res, id: String(res.id ?? prev.length), type, createdAt: new Date().toISOString() }]);

      return { success: true, data: [{ ...res, id: String(res.id ?? Date.now()), type, createdAt: new Date().toISOString() }], message: "Memory saved" };
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
      await api.delete(API_ENDPOINTS.MEMORY.DELETE(id));

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