// frontend/services/ai/imageService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:8000";

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
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 180000,
      headers: {
        "Content-Type":
          "application/json",
      },
    });
  }

  /* ==========================================
     Authentication
  ========================================== */

  setAccessToken(token: string) {
    this.api.defaults.headers.common.Authorization =
      `Bearer ${token}`;
  }

  clearAccessToken() {
    delete this.api.defaults.headers.common.Authorization;
  }

  /* ==========================================
     Generate Images
  ========================================== */

  async generateImage(
    payload: ImageGenerationRequest
  ) {
    const response =
      await this.api.post<
        ApiResponse<GeneratedImage[]>
      >(
        "/api/images/generate",
        payload
      );

    return response.data;
  }

  /* ==========================================
     Image History
  ========================================== */

  async getHistory() {
    const response =
      await this.api.get<
        ApiResponse<GeneratedImage[]>
      >("/api/images/history");

    return response.data;
  }

  /* ==========================================
     Get Single Image
  ========================================== */

  async getImage(
    imageId: string
  ) {
    const response =
      await this.api.get<
        ApiResponse<GeneratedImage>
      >(
        `/api/images/${imageId}`
      );

    return response.data;
  }

  /* ==========================================
     Delete Image
  ========================================== */

  async deleteImage(
    imageId: string
  ) {
    const response =
      await this.api.delete<
        ApiResponse
      >(
        `/api/images/${imageId}`
      );

    return response.data;
  }
}

const imageService =
  new ImageService();

export default imageService;