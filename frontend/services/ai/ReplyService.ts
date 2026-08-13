// frontend/services/ai/ReplyService.ts

import { api } from "./../api/client";
import API_ENDPOINTS from "../api/endpoints";

export interface ReplyRequest {
  prompt: string;
  chat_id?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface AIReply {
  id?: string;
  response: string;
  chat_id?: string;
  model?: string;
  created_at?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

class ReplyService {
  setAccessToken(token: string) {
    return token;
  }

  clearAccessToken() {
    return undefined;
  }

  async generateReply(payload: ReplyRequest) {
    return api.post<{ response?: string; chat_id?: number; metadata?: Record<string, unknown> }>(API_ENDPOINTS.AI.CHAT, {
      prompt: payload.prompt,
      chat_id: payload.chat_id ? Number(payload.chat_id) : undefined,
      temperature: payload.temperature ?? 0.7,
    });
  }

  async regenerateReply(chatId: string) {
    return api.get(API_ENDPOINTS.CHATS.DETAILS(chatId));
  }

  async stopGeneration(chatId: string) {
    return api.delete(API_ENDPOINTS.CHATS.DETAILS(chatId));
  }

  async getAvailableModels() {
    return api.get(API_ENDPOINTS.AI.PROMPTS);
  }
}

const replyService = new ReplyService();

export default replyService;