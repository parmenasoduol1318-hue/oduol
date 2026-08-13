// frontend/store/chatStore.ts

import { create } from "zustand";
import chatService from "@/services/chat/chatService";

export type MessageRole =
  | "system"
  | "user"
  | "assistant";

export interface ChatMessage {
  id: number | string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface Chat {
  id: number | string;
  title: string;
  last_message?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatState {
  chats: Chat[];
  currentChatId: number | string | null;
  loading: boolean;

  fetchChats: () => Promise<void>;
  fetchMessages: (chatId: number | string) => Promise<void>;
  sendMessage: (chatId: number | string, content: string) => Promise<void>;
  createChat: (title?: string) => Promise<Chat | null>;
  deleteChat: (chatId: number | string) => Promise<void>;
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  updateChat: (chatId: number | string, updates: Partial<Chat>) => void;
  setCurrentChat: (chatId: number | string | null) => void;
  addMessage: (chatId: number | string, message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearChats: () => void;
  reset: () => void;
}

const initialState = {
  chats: [] as Chat[],
  currentChatId: null as number | string | null,
  loading: false,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  fetchChats: async () => {
    try {
      set({ loading: true });

      const response = await chatService.getChats();

      const chats: Chat[] = response.map((chat: any) => ({
        id: chat.id,
        title: chat.title ?? "New Chat",
        last_message: chat.last_message ?? "",
        messages: Array.isArray(chat.messages)
          ? chat.messages.map((message: any) => ({
              id: String(message.id ?? Date.now()),
              role: (message.role ?? "assistant") as MessageRole,
              content: message.content ?? "",
              createdAt: message.created_at ?? message.createdAt ?? new Date().toISOString(),
            }))
          : [],
        createdAt: chat.created_at ?? new Date().toISOString(),
        updatedAt: chat.updated_at ?? new Date().toISOString(),
      }));

      set({ chats, loading: false });
    } catch (error) {
      console.error("fetchChats:", error);
      set({ loading: false });
    }
  },

  fetchMessages: async (chatId) => {
    try {
      set({ loading: true });
      const response = await chatService.getChat(Number(chatId));
      const messages = Array.isArray((response as any).messages)
        ? (response as any).messages.map((message: any) => ({
            id: String(message.id ?? Date.now()),
            role: (message.role ?? "assistant") as MessageRole,
            content: message.content ?? "",
            createdAt: message.created_at ?? message.createdAt ?? new Date().toISOString(),
          }))
        : [];

      set((state) => ({
        chats: state.chats.some((chat) => chat.id === chatId)
          ? state.chats.map((chat) =>
              chat.id === chatId ? { ...chat, messages } : chat
            )
          : [...state.chats, { id: chatId, title: "Chat", messages, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
        loading: false,
      }));
    } catch (error) {
      console.error("fetchMessages:", error);
      set({ loading: false });
    }
  },

  sendMessage: async (chatId, content) => {
    const createdAt = new Date().toISOString();
    const userMessage: ChatMessage = { id: String(Date.now()), role: "user", content, createdAt };
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, userMessage], updatedAt: createdAt }
          : chat
      ),
    }));

    try {
      const response = await chatService.getChat(Number(chatId));
      const reply = (response as any)?.last_message ?? "Thanks!";
      const aiMessage: ChatMessage = { id: String(Date.now() + 1), role: "assistant", content: reply, createdAt: new Date().toISOString() };
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, aiMessage], last_message: reply, updatedAt: new Date().toISOString() }
            : chat
        ),
      }));
    } catch (error) {
      console.error("sendMessage:", error);
    }
  },

  createChat: async (title = "New Chat") => {
    try {
      const response = await chatService.createChat(title);

      const chat: Chat = {
        id: response.id,
        title: response.title ?? title,
        last_message: "",
        messages: [],
        createdAt: response.created_at ?? new Date().toISOString(),
        updatedAt: response.updated_at ?? new Date().toISOString(),
      };

      set((state) => ({
        chats: [chat, ...state.chats],
        currentChatId: chat.id,
      }));

      return chat;
    } catch (error) {
      console.error("createChat:", error);
      return null;
    }
  },

  deleteChat: async (chatId) => {
    try {
      await chatService.deleteChat(Number(chatId));

      set((state) => ({
        chats: state.chats.filter((chat) => chat.id !== chatId),
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
      }));
    } catch (error) {
      console.error("deleteChat:", error);
    }
  },

  setChats: (chats) => set({ chats }),

  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats],
    })),

  updateChat: (chatId, updates) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, ...updates, updatedAt: new Date().toISOString() }
          : chat
      ),
    })),

  setCurrentChat: (chatId) => set({ currentChatId: chatId }),

  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              last_message: message.content,
              updatedAt: new Date().toISOString(),
            }
          : chat
      ),
    })),

  setLoading: (loading) => set({ loading }),

  clearChats: () =>
    set({
      chats: [],
      currentChatId: null,
    }),

  reset: () => set(initialState),
}));

export default useChatStore;