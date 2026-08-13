import { useCallback, useState } from "react";
import { api } from "../services/api/client";
import API_ENDPOINTS from "../services/api/endpoints";
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
      const res = await api.post<{ image_url?: string; image?: string }>(
        API_ENDPOINTS.IMAGES.GENERATE,
        payload
      );

      const imageUrl = res.image_url ?? res.image ?? "";
      setImages(imageUrl ? [imageUrl] : []);

      return {
        success: true,
        images: imageUrl ? [imageUrl] : [],
        message: "Image generated successfully",
      } as ImageGenerationResponse;
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