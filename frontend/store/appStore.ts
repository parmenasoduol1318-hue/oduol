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
  CurriculumProgress,
  ModuleProgress,
} from '@types/index';

interface AppState {
  settings: AppSettings;
  recentMessages: Message[];
  suggestedReplies: SuggestedReplies[];
  favorites: Reply[];
  curriculumProgress: CurriculumProgress;

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
  // Curriculum actions
  unlockModule: (moduleId: string) => void;
  markLessonComplete: (moduleId: string, lessonIndex: number, score?: number) => void;
  resetCurriculumProgress: () => void;
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
      curriculumProgress: {
        modulesUnlocked: ['note-reading'],
        modules: {},
      },

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

      unlockModule: (moduleId: string) =>
        set((state) => ({
          curriculumProgress: {
            ...state.curriculumProgress,
            modulesUnlocked: Array.from(new Set([...state.curriculumProgress.modulesUnlocked, moduleId])),
          },
        })),

      markLessonComplete: (moduleId: string, lessonIndex: number, score?: number) =>
        set((state) => {
          const existing = state.curriculumProgress.modules[moduleId] || {
            moduleId,
            lessonsCompleted: 0,
            lessonsTotal: 0,
          } as ModuleProgress;

          const updated: ModuleProgress = {
            ...existing,
            lessonsCompleted: Math.max(existing.lessonsCompleted, lessonIndex + 1),
            lessonsTotal: Math.max(existing.lessonsTotal, lessonIndex + 1),
            lastCompletedAt: Date.now(),
            score: score ?? existing.score,
          };

          return {
            curriculumProgress: {
              ...state.curriculumProgress,
              modules: {
                ...state.curriculumProgress.modules,
                [moduleId]: updated,
              },
            },
          };
        }),

      resetCurriculumProgress: () =>
        set(() => ({
          curriculumProgress: {
            modulesUnlocked: ['note-reading'],
            modules: {},
          },
        })),
    }),
    {
      name: 'swift-reply-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
