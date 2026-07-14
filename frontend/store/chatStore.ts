// frontend/store/chatStore.ts

import { create } from "zustand";
import chatService from "@/services/chat/chatService";

export type MessageRole =
  | "system"
  | "user"
  | "assistant";

export interface ChatMessage {
  id: number;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface Chat {
  id: number;
  title: string;
  last_message?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatState {
  chats: Chat[];
  currentChatId: number | null;
  loading: boolean;

  fetchChats: () => Promise<void>;

  createChat: (
    title?: string
  ) => Promise<Chat | null>;

  deleteChat: (
    chatId: number
  ) => Promise<void>;

  setChats: (
    chats: Chat[]
  ) => void;

  addChat: (
    chat: Chat
  ) => void;

  updateChat: (
    chatId: number,
    updates: Partial<Chat>
  ) => void;

  setCurrentChat: (
    chatId: number | null
  ) => void;

  addMessage: (
    chatId: number,
    message: ChatMessage
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  clearChats: () => void;

  reset: () => void;
}

const initialState = {
  chats: [] as Chat[],
  currentChatId: null,
  loading: false,
};

export const useChatStore =
  create<ChatState>((set) => ({
    ...initialState,

    fetchChats: async () => {
      try {
        set({ loading: true });

        const response =
          await chatService.getChats();

        const chats: Chat[] =
          response.map((chat) => ({
            id: chat.id,
            title:
              chat.title ??
              "New Chat",
            last_message: "",
            messages: [],
            createdAt:
              chat.created_at,
            updatedAt:
              chat.updated_at,
          }));

        set({
          chats,
          loading: false,
        });
      } catch (error) {
        console.error(
          "fetchChats:",
          error
        );

        set({
          loading: false,
        });
      }
    },

    createChat: async (
      title = "New Chat"
    ) => {
      try {
        const response =
          await chatService.createChat(
            title
          );

        const chat: Chat = {
          id: response.id,
          title:
            response.title ??
            title,
          last_message: "",
          messages: [],
          createdAt:
            response.created_at,
          updatedAt:
            response.updated_at,
        };

        set((state) => ({
          chats: [
            chat,
            ...state.chats,
          ],
          currentChatId:
            chat.id,
        }));

        return chat;
      } catch (error) {
        console.error(
          "createChat:",
          error
        );

        return null;
      }
    },

    deleteChat: async (
      chatId
    ) => {
      try {
        await chatService.deleteChat(
          chatId
        );

        set((state) => ({
          chats:
            state.chats.filter(
              (chat) =>
                chat.id !==
                chatId
            ),
          currentChatId:
            state.currentChatId ===
            chatId
              ? null
              : state.currentChatId,
        }));
      } catch (error) {
        console.error(
          "deleteChat:",
          error
        );
      }
    },

    setChats: (
      chats
    ) =>
      set({
        chats,
      }),

    addChat: (
      chat
    ) =>
      set((state) => ({
        chats: [
          chat,
          ...state.chats,
        ],
      })),

    updateChat: (
      chatId,
      updates
    ) =>
      set((state) => ({
        chats:
          state.chats.map(
            (chat) =>
              chat.id ===
              chatId
                ? {
                    ...chat,
                    ...updates,
                    updatedAt:
                      new Date().toISOString(),
                  }
                : chat
          ),
      })),

    setCurrentChat: (
      chatId
    ) =>
      set({
        currentChatId:
          chatId,
      }),

    addMessage: (
      chatId,
      message
    ) =>
      set((state) => ({
        chats:
          state.chats.map(
            (chat) =>
              chat.id ===
              chatId
                ? {
                    ...chat,
                    messages: [
                      ...chat.messages,
                      message,
                    ],
                    last_message:
                      message.content,
                    updatedAt:
                      new Date().toISOString(),
                  }
                : chat
          ),
      })),

    setLoading: (
      loading
    ) =>
      set({
        loading,
      }),

    clearChats: () =>
      set({
        chats: [],
        currentChatId:
          null,
      }),

    reset: () =>
      set(initialState),
  }));

export default useChatStore;