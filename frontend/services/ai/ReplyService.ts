// frontend/services/ai/ReplyService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://swiftreply-njbt.onrender.com";

/* ======================================================
   Types
====================================================== */

export interface ReplyRequest {
  message: string;

  chat_id?: string;

  model?: string;

  temperature?: number;

  max_tokens?: number;

  stream?: boolean;
}

export interface AIReply {
  id?: string;

  reply: string;

  chat_id?: string;

  model?: string;

  created_at?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;

  message: string;

  data: T;
}

/* ======================================================
   AI Reply Service
====================================================== */

class ReplyService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 120000,
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
     Generate AI Reply
  ========================================== */

  async generateReply(
    payload: ReplyRequest
  ) {
    const response =
      await this.api.post<
        ApiResponse<AIReply>
      >(
        "/api/chat/reply",
        payload
      );

    return response.data;
  }

  /* ==========================================
     Regenerate Previous Reply
  ========================================== */

  async regenerateReply(
    chatId: string
  ) {
    const response =
      await this.api.post<
        ApiResponse<AIReply>
      >(
        `/api/chat/${chatId}/regenerate`
      );

    return response.data;
  }

  /* ==========================================
     Stop Generation
  ========================================== */

  async stopGeneration(
    chatId: string
  ) {
    const response =
      await this.api.post<
        ApiResponse
      >(
        `/api/chat/${chatId}/stop`
      );

    return response.data;
  }

  /* ==========================================
     Available Models
  ========================================== */

  async getAvailableModels() {
    const response =
      await this.api.get<
        ApiResponse<string[]>
      >("/api/models");

    return response.data;
  }
}

const replyService =
  new ReplyService();

export default replyService;