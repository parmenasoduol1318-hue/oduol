import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppSettings,
  Message,
  Reply,
  SuggestedReplies,
  ReplyStyle,
  MessageTone,
} from '@types/index';

interface AppState {
  settings: AppSettings;
  recentMessages: Message[];
  suggestedReplies: SuggestedReplies[];
  favorites: Reply[];

  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  setApiKey: (apiKey: string) => void;
  setPreferredLanguage: (language: string) => void;
  setPreferredReplyStyle: (style: ReplyStyle) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  // Message actions
  addMessage: (message: Message) => void;
  clearMessages: () => void;

  // Reply actions
  addSuggestedReplies: (replies: SuggestedReplies) => void;
  addFavoriteReply: (reply: Reply) => void;
  removeFavoriteReply: (replyId: string) => void;
}

const defaultSettings: AppSettings = {
  openaiApiKey: '',
  preferredLanguage: 'en',
  preferredReplyStyle: 'friendly',
  enableOfflineMode: true,
  theme: 'light',
  autoDetectTone: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      recentMessages: [],
      suggestedReplies: [],
      favorites: [],

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      setApiKey: (apiKey) =>
        set((state) => ({
          settings: { ...state.settings, openaiApiKey: apiKey },
        })),

      setPreferredLanguage: (language) =>
        set((state) => ({
          settings: { ...state.settings, preferredLanguage: language },
        })),

      setPreferredReplyStyle: (style) =>
        set((state) => ({
          settings: { ...state.settings, preferredReplyStyle: style },
        })),

      setTheme: (theme) =>
        set((state) => ({
          settings: { ...state.settings, theme },
        })),

      addMessage: (message) =>
        set((state) => ({
          recentMessages: [message, ...state.recentMessages].slice(0, 50),
        })),

      clearMessages: () =>
        set(() => ({
          recentMessages: [],
        })),

      addSuggestedReplies: (replies) =>
        set((state) => ({
          suggestedReplies: [replies, ...state.suggestedReplies].slice(0, 20),
        })),

      addFavoriteReply: (reply) =>
        set((state) => ({
          favorites: [reply, ...state.favorites],
        })),

      removeFavoriteReply: (replyId) =>
        set((state) => ({
          favorites: state.favorites.filter((r) => r.id !== replyId),
        })),
    }),
    {
      name: 'swift-reply-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
