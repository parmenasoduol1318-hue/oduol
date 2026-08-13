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
  images: GeneratedImage[];
  selectedImage: GeneratedImage | null;
  generating: boolean;
  progress: number;
  loading: boolean;
  fetchImages: () => Promise<void>;
  generateImage: (payload: { prompt: string; size?: string }) => Promise<GeneratedImage | null>;

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
    loading: false,
    fetchImages: async () => {
      set({ loading: true });
      try {
        const imageService = (await import("../services/ai/imageService")).default;
        const response = await imageService.getHistory();
        const responseData = (response as any) ?? {};
        const images = Array.isArray(responseData) ? responseData : responseData?.data ?? responseData?.images ?? [];
        set({ images: images.map((image: any) => ({
          id: String(image.id ?? image.image_id ?? Math.random().toString()),
          prompt: image.prompt ?? "Generated image",
          imageUrl: image.image_url ?? image.url ?? "",
          createdAt: image.created_at ?? new Date().toISOString(),
          width: image.width,
          height: image.height,
          model: image.model,
        })), loading: false });
      } catch (error) {
        console.error("fetchImages", error);
        set({ loading: false });
      }
    },
    generateImage: async (payload) => {
      set({ loading: true });
      try {
        const imageService = (await import("../services/ai/imageService")).default;
        const response = await imageService.generateImage(payload as any);
        const responseData = (response as any) ?? {};
        const image = responseData?.image ?? responseData?.data ?? responseData;
        const generated = {
          id: String(image?.id ?? image?.image_id ?? Date.now()),
          prompt: image?.prompt ?? payload.prompt,
          imageUrl: image?.image_url ?? image?.url ?? "",
          createdAt: image?.created_at ?? new Date().toISOString(),
          width: image?.width,
          height: image?.height,
          model: image?.model,
        };
        set((state) => ({ images: [generated, ...state.images], selectedImage: generated, loading: false }));
        return generated;
      } catch (error) {
        console.error("generateImage", error);
        set({ loading: false });
        throw error;
      }
    },
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