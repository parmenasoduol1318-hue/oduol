// frontend/store/imageStore.ts

import { create } from "zustand";

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;

  createdAt: string;

  width?: number;
  height?: number;

  model?: string;
}

interface ImageState {
  /* ==========================================
     State
  ========================================== */

  images: GeneratedImage[];

  selectedImage: GeneratedImage | null;

  generating: boolean;

  progress: number;

  /* ==========================================
     Actions
  ========================================== */

  setGenerating: (
    generating: boolean
  ) => void;

  setProgress: (
    progress: number
  ) => void;

  addImage: (
    image: GeneratedImage
  ) => void;

  removeImage: (
    imageId: string
  ) => void;

  clearImages: () => void;

  setImages: (
    images: GeneratedImage[]
  ) => void;

  selectImage: (
    image: GeneratedImage | null
  ) => void;

  updateImage: (
    imageId: string,
    updates: Partial<GeneratedImage>
  ) => void;

  reset: () => void;
}

const initialState = {
  images: [] as GeneratedImage[],

  selectedImage: null,

  generating: false,

  progress: 0,
};

export const useImageStore =
  create<ImageState>((set) => ({
    ...initialState,

    setGenerating: (
      generating
    ) =>
      set({
        generating,
      }),

    setProgress: (
      progress
    ) =>
      set({
        progress,
      }),

    addImage: (
      image
    ) =>
      set((state) => ({
        images: [
          image,
          ...state.images,
        ],
      })),

    removeImage: (
      imageId
    ) =>
      set((state) => ({
        images:
          state.images.filter(
            (image) =>
              image.id !==
              imageId
          ),

        selectedImage:
          state.selectedImage
            ?.id === imageId
            ? null
            : state.selectedImage,
      })),

    clearImages: () =>
      set({
        images: [],
        selectedImage: null,
      }),

    setImages: (
      images
    ) =>
      set({
        images,
      }),

    selectImage: (
      image
    ) =>
      set({
        selectedImage:
          image,
      }),

    updateImage: (
      imageId,
      updates
    ) =>
      set((state) => ({
        images:
          state.images.map(
            (image) =>
              image.id ===
              imageId
                ? {
                    ...image,
                    ...updates,
                  }
                : image
          ),

        selectedImage:
          state.selectedImage
            ?.id === imageId
            ? {
                ...state.selectedImage,
                ...updates,
              }
            : state.selectedImage,
      })),

    reset: () =>
      set(initialState),
  }));

export default useImageStore;