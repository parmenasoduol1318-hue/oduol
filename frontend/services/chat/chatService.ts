// frontend/services/chat/chatService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:8000";

/* ======================================================
   Types
====================================================== */

export type MessageRole =
  | "system"
  | "user"
  | "assistant";

export interface ChatMessage {
  id?: string;

  role: MessageRole;

  content: string;

  created_at?: string;
}

export interface ChatSession {
  id: string;

  title: string;

  created_at: string;

  updated_at: string;
}

export interface SendMessageRequest {
  chat_id: string;

  message: string;
}

export interface RenameChatRequest {
  title: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;

  message: string;

  data: T;
}

/* ======================================================
   Service
====================================================== */

class ChatService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        "Content-Type":
          "application/json",
      },
    });
  }

  /* ==========================================
     Authentication
  ========================================== */

  setAccessToken(token: string) {
    this.api.defaults.headers.common.Authorization =
      `Bearer ${token}`;
  }

  clearAccessToken() {
    delete this.api.defaults.headers.common.Authorization;
  }

  /* ==========================================
     Chat Sessions
  ========================================== */

  async getChats() {
    const response =
      await this.api.get<
        ApiResponse<ChatSession[]>
      >("/api/chat/history");

    return response.data;
  }

  async createChat() {
    const response =
      await this.api.post<
        ApiResponse<ChatSession>
      >("/api/chat/new");

    return response.data;
  }

  async renameChat(
    chatId: string,
    payload: RenameChatRequest
  ) {
    const response =
      await this.api.put<
        ApiResponse<ChatSession>
      >(
        `/api/chat/${chatId}`,
        payload
      );

    return response.data;
  }

  async deleteChat(chatId: string) {
    const response =
      await this.api.delete<
        ApiResponse
      >(`/api/chat/${chatId}`);

    return response.data;
  }

  /* ==========================================
     Messages
  ========================================== */

  async getMessages(chatId: string) {
    const response =
      await this.api.get<
        ApiResponse<ChatMessage[]>
      >(
        `/api/chat/${chatId}/messages`
      );

    return response.data;
  }

  async sendMessage(
    payload: SendMessageRequest
  ) {
    const response =
      await this.api.post<
        ApiResponse<ChatMessage>
      >(
        "/api/chat/send",
        payload
      );

    return response.data;
  }

  async regenerateResponse(
    chatId: string
  ) {
    const response =
      await this.api.post<
        ApiResponse<ChatMessage>
      >(
        `/api/chat/${chatId}/regenerate`
      );

    return response.data;
  }

  async stopGeneration(
    chatId: string
  ) {
    const response =
      await this.api.post<
        ApiResponse
      >(
        `/api/chat/${chatId}/stop`
      );

    return response.data;
  }
}

const chatService =
  new ChatService();

export default chatService;