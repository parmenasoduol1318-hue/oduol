import { useCallback, useState } from "react";
import api from "../lib/api";
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
  const [conversationId, setConversationId] = useState<string | undefined>(
    undefined
  );

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
        const res = await api.post<SendMessageResponse>("/chat/send", {
          message: text,
          conversationId,
        } as SendMessageRequest);

        if (res.data.reply) {
          const assistantMessage: ChatMessage = {
            role: "assistant",
            content: res.data.reply,
          };

          addMessage(assistantMessage);
        }

        if (res.data.conversationId) {
          setConversationId(res.data.conversationId);
        }

        return res.data;
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