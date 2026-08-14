// frontend/services/chat/chatService.ts

import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";

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
  last_message?: string | null;
  messages?: ChatMessage[];
}

export interface RenameChatRequest {
  title: string;
}

class ChatService {
  async getChats(): Promise<ChatSession[]> {
    return api.get<ChatSession[]>(API_ENDPOINTS.CHATS.LIST);
  }

  async createChat(title = "New Chat"): Promise<ChatSession> {
    return api.post<ChatSession>(API_ENDPOINTS.CHATS.CREATE, { title });
  }

  async getChat(chatId: number): Promise<ChatSession> {
    return api.get<ChatSession>(API_ENDPOINTS.CHATS.DETAILS(chatId));
  }

  async getMessages(chatId: number): Promise<ChatMessage[]> {
    return api.get<ChatMessage[]>(API_ENDPOINTS.MESSAGES.LIST(chatId));
  }

  async sendMessage(chatId: number, content: string): Promise<ChatMessage> {
    return api.post<ChatMessage>(API_ENDPOINTS.MESSAGES.SEND, {
      chat_id: chatId,
      content,
    });
  }

  async renameChat(chatId: number, title: string): Promise<ChatSession> {
    return api.put<ChatSession>(API_ENDPOINTS.CHATS.UPDATE(chatId), { title });
  }

  async deleteChat(chatId: number): Promise<void> {
    return api.delete<void>(API_ENDPOINTS.CHATS.DELETE(chatId));
  }

  async archiveChat(chatId: number): Promise<ChatSession> {
    return api.patch<ChatSession>(API_ENDPOINTS.CHATS.ARCHIVE(chatId));
  }

  async unarchiveChat(chatId: number): Promise<ChatSession> {
    return api.patch<ChatSession>(API_ENDPOINTS.CHATS.UNARCHIVE(chatId));
  }
}

export default new ChatService();