// frontend/services/ai/imageService.ts

import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";

/* ======================================================
   Types
====================================================== */

export interface ImageGenerationRequest {
  prompt: string;
  size?: "1024x1024" | "1024x1536" | "1536x1024";
  quality?: "standard" | "high";
  n?: number;
}

export interface GeneratedImage {
  id: string;
  image_url: string;
  prompt: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/* ======================================================
   Image Service
====================================================== */

class ImageService {
  async generateImage(payload: ImageGenerationRequest) {
    return api.post(API_ENDPOINTS.IMAGES.GENERATE, payload);
  }

  async editImage(formData: FormData) {
    return api.post(API_ENDPOINTS.IMAGES.EDIT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async upscaleImage(formData: FormData) {
    return api.post(API_ENDPOINTS.IMAGES.UPSCALE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async removeBackground(formData: FormData) {
    return api.post(API_ENDPOINTS.IMAGES.REMOVE_BACKGROUND, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getHistory() {
    return api.get(API_ENDPOINTS.IMAGES.HISTORY);
  }

  async getImage(imageId: string | number) {
    return api.get(API_ENDPOINTS.IMAGES.DELETE(imageId));
  }

  async deleteImage(imageId: string | number) {
    return api.delete(API_ENDPOINTS.IMAGES.DELETE(imageId));
  }
}

const imageService = new ImageService();

export default imageService;