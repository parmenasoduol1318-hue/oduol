import { useCallback, useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";
import { logger } from "../lib/logger";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
  stream?: boolean;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  conversationId?: string;
  reply?: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      setLoading(true);
      setError(null);

      const userMessage: ChatMessage = {
        role: "user",
        content: text,
      };

      addMessage(userMessage);

      try {
        const res = await api.post<{ response?: string; chat_id?: number; message?: string }>(
          API_ENDPOINTS.AI.CHAT,
          {
            prompt: text,
            chat_id: conversationId ? Number(conversationId) : undefined,
            temperature: 0.7,
          } as unknown as SendMessageRequest
        );

        const reply = res.response ?? res.message ?? "";

        if (reply) {
          const assistantMessage: ChatMessage = {
            role: "assistant",
            content: reply,
          };

          addMessage(assistantMessage);
        }

        if (res.chat_id) {
          setConversationId(String(res.chat_id));
        }

        return {
          success: true,
          message: "Chat response received",
          conversationId: res.chat_id ? String(res.chat_id) : undefined,
          reply,
        } as SendMessageResponse;
      } catch (err: any) {
        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to send message";

        setError(message);
        logger.error("Chat send failed", err);

        return {
          success: false,
          message,
        };
      } finally {
        setLoading(false);
      }
    },
    [conversationId, addMessage]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    conversationId,
    sendMessage,
    clearChat,
    addMessage,
  };
};