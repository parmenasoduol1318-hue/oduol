import { useCallback, useState } from "react";
import api from "../lib/api";
import { logger } from "../lib/logger";

export interface ImageGenerationRequest {
  prompt: string;
  size?: "256x256" | "512x512" | "1024x1024";
  n?: number;
}

export interface ImageGenerationResponse {
  success: boolean;
  images: string[];
  message?: string;
}

export const useImageGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const generateImage = useCallback(async (payload: ImageGenerationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<ImageGenerationResponse>(
        "/ai/image/generate",
        payload
      );

      setImages(res.data.images || []);

      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Image generation failed";

      setError(message);
      logger.error("Image generation failed", err);

      return {
        success: false,
        images: [],
        message,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images,
    loading,
    error,
    generateImage,
    clearImages,
  };
};