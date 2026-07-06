// frontend/store/chatStore.ts

import { create } from "zustand";

export type MessageRole =
  | "system"
  | "user"
  | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatState {
  /* ==========================================
     State
  ========================================== */

  chats: Chat[];

  currentChatId: string | null;

  loading: boolean;

  /* ==========================================
     Actions
  ========================================== */

  setChats: (
    chats: Chat[]
  ) => void;

  addChat: (
    chat: Chat
  ) => void;

  updateChat: (
    chatId: string,
    updates: Partial<Chat>
  ) => void;

  deleteChat: (
    chatId: string
  ) => void;

  setCurrentChat: (
    chatId: string | null
  ) => void;

  addMessage: (
    chatId: string,
    message: ChatMessage
  ) => void;

  updateMessage: (
    chatId: string,
    messageId: string,
    updates: Partial<ChatMessage>
  ) => void;

  deleteMessage: (
    chatId: string,
    messageId: string
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

    setChats: (chats) =>
      set({ chats }),

    addChat: (chat) =>
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
        chats: state.chats.map(
          (chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  ...updates,
                  updatedAt:
                    new Date().toISOString(),
                }
              : chat
        ),
      })),

    deleteChat: (
      chatId
    ) =>
      set((state) => ({
        chats: state.chats.filter(
          (chat) =>
            chat.id !== chatId
        ),
        currentChatId:
          state.currentChatId ===
          chatId
            ? null
            : state.currentChatId,
      })),

    setCurrentChat: (
      chatId
    ) =>
      set({
        currentChatId: chatId,
      }),

    addMessage: (
      chatId,
      message
    ) =>
      set((state) => ({
        chats: state.chats.map(
          (chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    message,
                  ],
                  updatedAt:
                    new Date().toISOString(),
                }
              : chat
        ),
      })),

    updateMessage: (
      chatId,
      messageId,
      updates
    ) =>
      set((state) => ({
        chats: state.chats.map(
          (chat) => {
            if (
              chat.id !== chatId
            )
              return chat;

            return {
              ...chat,
              messages:
                chat.messages.map(
                  (message) =>
                    message.id ===
                    messageId
                      ? {
                          ...message,
                          ...updates,
                        }
                      : message
                ),
            };
          }
        ),
      })),

    deleteMessage: (
      chatId,
      messageId
    ) =>
      set((state) => ({
        chats: state.chats.map(
          (chat) => {
            if (
              chat.id !== chatId
            )
              return chat;

            return {
              ...chat,
              messages:
                chat.messages.filter(
                  (message) =>
                    message.id !==
                    messageId
                ),
            };
          }
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
        currentChatId: null,
      }),

    reset: () =>
      set(initialState),
  }));

export default useChatStore;