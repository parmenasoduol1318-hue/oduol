// frontend/services/ai/aiService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:8000";

/* ======================================================
   Types
====================================================== */

export interface AIModel {
  id: string;
  name: string;
  description?: string;
  supportsVision?: boolean;
  supportsVoice?: boolean;
  supportsStreaming?: boolean;
}

export interface ChatRequest {
  message: string;
  chat_id?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  reply: string;
  chat_id: string;
  message_id?: string;
  model?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/* ======================================================
   AI Service
====================================================== */

class AIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 120000,
      headers: {
        "Content-Type": "application/json",
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
     Chat Completion
  ========================================== */

  async chat(payload: ChatRequest) {
    const response =
      await this.api.post<ApiResponse<ChatResponse>>(
        "/api/chat/send",
        payload
      );

    return response.data;
  }

  /* ==========================================
     Models
  ========================================== */

  async getModels() {
    const response =
      await this.api.get<ApiResponse<AIModel[]>>(
        "/api/models"
      );

    return response.data;
  }

  /* ==========================================
     Health Check
  ========================================== */

  async getAIStatus() {
    const response =
      await this.api.get<ApiResponse>(
        "/api/ai/status"
      );

    return response.data;
  }

  /* ==========================================
     Stop Generation
  ========================================== */

  async stopGeneration(chatId: string) {
    const response =
      await this.api.post<ApiResponse>(
        `/api/chat/${chatId}/stop`
      );

    return response.data;
  }

  /* ==========================================
     Regenerate
  ========================================== */

  async regenerate(chatId: string) {
    const response =
      await this.api.post<ApiResponse<ChatResponse>>(
        `/api/chat/${chatId}/regenerate`
      );

    return response.data;
  }
}

const aiService = new AIService();

export default aiService;