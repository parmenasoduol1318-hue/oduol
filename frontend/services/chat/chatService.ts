// frontend/services/chat/chatService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://swiftreply-njbt.onrender.com";

/* ===========================================================
   TYPES
=========================================================== */

export type MessageRole =
  | "system"
  | "user"
  | "assistant";

export interface ChatMessage {
  id: number;
  chat_id: number;
  role: MessageRole;
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: number;
  user_id: number;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface RenameChatRequest {
  title: string;
}

class ChatService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /* ===========================================================
     AUTH
  =========================================================== */

  setAccessToken(token: string) {
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  clearAccessToken() {
    delete this.api.defaults.headers.common[
      "Authorization"
    ];
  }

  /* ===========================================================
     CHATS
  =========================================================== */

  async getChats(): Promise<ChatSession[]> {
    const response = await this.api.get<ChatSession[]>(
      "/api/chats"
    );

    return response.data;
  }

  async createChat(
    title = "New Chat"
  ): Promise<ChatSession> {
    const response =
      await this.api.post<ChatSession>(
        "/api/chats",
        {
          title,
        }
      );

    return response.data;
  }

  async getChat(
    chatId: number
  ): Promise<ChatSession> {
    const response =
      await this.api.get<ChatSession>(
        `/api/chats/${chatId}`
      );

    return response.data;
  }

  async renameChat(
    chatId: number,
    title: string
  ): Promise<ChatSession> {
    const response =
      await this.api.put<ChatSession>(
        `/api/chats/${chatId}`,
        {
          title,
        }
      );

    return response.data;
  }

  async deleteChat(
    chatId: number
  ): Promise<void> {
    await this.api.delete(
      `/api/chats/${chatId}`
    );
  }

  async archiveChat(
    chatId: number
  ): Promise<ChatSession> {
    const response =
      await this.api.patch<ChatSession>(
        `/api/chats/${chatId}/archive`
      );

    return response.data;
  }

  async unarchiveChat(
    chatId: number
  ): Promise<ChatSession> {
    const response =
      await this.api.patch<ChatSession>(
        `/api/chats/${chatId}/unarchive`
      );

    return response.data;
  }
}

export default new ChatService();