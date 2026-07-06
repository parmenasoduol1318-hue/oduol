// frontend/store/memoryStore.ts

import { create } from "zustand";

export interface MemoryItem {
  id: string;
  title: string;
  content: string;

  category?: string;

  pinned?: boolean;

  createdAt: string;
  updatedAt: string;
}

interface MemoryState {
  /* ==========================================
     State
  ========================================== */

  memories: MemoryItem[];

  selectedMemory: MemoryItem | null;

  loading: boolean;

  searchQuery: string;

  /* ==========================================
     Actions
  ========================================== */

  setLoading: (
    loading: boolean
  ) => void;

  setSearchQuery: (
    query: string
  ) => void;

  setMemories: (
    memories: MemoryItem[]
  ) => void;

  addMemory: (
    memory: MemoryItem
  ) => void;

  updateMemory: (
    memoryId: string,
    updates: Partial<MemoryItem>
  ) => void;

  deleteMemory: (
    memoryId: string
  ) => void;

  selectMemory: (
    memory: MemoryItem | null
  ) => void;

  togglePinned: (
    memoryId: string
  ) => void;

  clearMemories: () => void;

  reset: () => void;
}

const initialState = {
  memories: [] as MemoryItem[],

  selectedMemory: null,

  loading: false,

  searchQuery: "",
};

export const useMemoryStore =
  create<MemoryState>((set) => ({
    ...initialState,

    setLoading: (
      loading
    ) =>
      set({
        loading,
      }),

    setSearchQuery: (
      searchQuery
    ) =>
      set({
        searchQuery,
      }),

    setMemories: (
      memories
    ) =>
      set({
        memories,
      }),

    addMemory: (
      memory
    ) =>
      set((state) => ({
        memories: [
          memory,
          ...state.memories,
        ],
      })),

    updateMemory: (
      memoryId,
      updates
    ) =>
      set((state) => ({
        memories:
          state.memories.map(
            (memory) =>
              memory.id ===
              memoryId
                ? {
                    ...memory,
                    ...updates,
                    updatedAt:
                      new Date().toISOString(),
                  }
                : memory
          ),

        selectedMemory:
          state.selectedMemory
            ?.id === memoryId
            ? {
                ...state.selectedMemory,
                ...updates,
                updatedAt:
                  new Date().toISOString(),
              }
            : state.selectedMemory,
      })),

    deleteMemory: (
      memoryId
    ) =>
      set((state) => ({
        memories:
          state.memories.filter(
            (memory) =>
              memory.id !==
              memoryId
          ),

        selectedMemory:
          state.selectedMemory
            ?.id === memoryId
            ? null
            : state.selectedMemory,
      })),

    selectMemory: (
      memory
    ) =>
      set({
        selectedMemory:
          memory,
      }),

    togglePinned: (
      memoryId
    ) =>
      set((state) => ({
        memories:
          state.memories.map(
            (memory) =>
              memory.id ===
              memoryId
                ? {
                    ...memory,
                    pinned:
                      !memory.pinned,
                    updatedAt:
                      new Date().toISOString(),
                  }
                : memory
          ),
      })),

    clearMemories: () =>
      set({
        memories: [],
        selectedMemory: null,
      }),

    reset: () =>
      set(initialState),
  }));

export default useMemoryStore;