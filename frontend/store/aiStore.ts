// frontend/store/aiStore.ts

import { create } from "zustand";

export type AIModel =
  | "gpt-5.5"
  | "gpt-5.5-mini"
  | "gpt-4.1";

export interface AIState {
  /* Current model */
  model: AIModel;

  /* Whether AI is responding */
  isGenerating: boolean;

  /* Whether response is streaming */
  isStreaming: boolean;

  /* Current partial streamed response */
  streamedResponse: string;

  /* Temperature */
  temperature: number;

  /* Max output tokens */
  maxTokens: number;

  /* Actions */
  setModel: (model: AIModel) => void;

  setGenerating: (
    generating: boolean
  ) => void;

  setStreaming: (
    streaming: boolean
  ) => void;

  setStreamedResponse: (
    text: string
  ) => void;

  appendStreamChunk: (
    chunk: string
  ) => void;

  clearStream: () => void;

  setTemperature: (
    value: number
  ) => void;

  setMaxTokens: (
    value: number
  ) => void;

  reset: () => void;
}

const DEFAULT_STATE = {
  model: "gpt-5.5" as AIModel,
  isGenerating: false,
  isStreaming: false,
  streamedResponse: "",
  temperature: 0.7,
  maxTokens: 4096,
};

export const useAIStore =
  create<AIState>((set) => ({
    ...DEFAULT_STATE,

    setModel: (model) =>
      set({ model }),

    setGenerating: (
      isGenerating
    ) =>
      set({
        isGenerating,
      }),

    setStreaming: (
      isStreaming
    ) =>
      set({
        isStreaming,
      }),

    setStreamedResponse: (
      streamedResponse
    ) =>
      set({
        streamedResponse,
      }),

    appendStreamChunk: (
      chunk
    ) =>
      set((state) => ({
        streamedResponse:
          state.streamedResponse +
          chunk,
      })),

    clearStream: () =>
      set({
        streamedResponse: "",
      }),

    setTemperature: (
      temperature
    ) =>
      set({
        temperature,
      }),

    setMaxTokens: (
      maxTokens
    ) =>
      set({
        maxTokens,
      }),

    reset: () =>
      set({
        ...DEFAULT_STATE,
      }),
  }));

export default useAIStore;