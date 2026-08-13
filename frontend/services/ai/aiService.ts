// frontend/services/ai/aiService.ts

import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";

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
  prompt: string;
  chat_id?: number | null;
  temperature?: number;
}

export interface ChatResponse {
  response: string;
  chat_id?: number | null;
  metadata?: Record<string, unknown> | null;
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
  async chat(payload: ChatRequest) {
    return api.post<ChatResponse>(API_ENDPOINTS.AI.CHAT, payload);
  }

  async rewrite(payload: { text: string; tone?: string }) {
    return api.post(API_ENDPOINTS.AI.REWRITE, payload);
  }

  async translate(payload: { text: string; target_language: string }) {
    return api.post(API_ENDPOINTS.AI.TRANSLATE, payload);
  }

  async summarize(payload: { text: string }) {
    return api.post(API_ENDPOINTS.AI.SUMMARIZE, payload);
  }

  async research(payload: { query: string }) {
    return api.post(API_ENDPOINTS.AI.RESEARCH, payload);
  }

  async code(payload: { prompt: string; language?: string | null }) {
    return api.post(API_ENDPOINTS.AI.CODE, payload);
  }

  async generateImage(payload: { prompt: string; size?: string }) {
    return api.post(API_ENDPOINTS.AI.IMAGE, payload);
  }

  async vision(formData: FormData) {
    return api.post(API_ENDPOINTS.AI.VISION, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async speechToText(formData: FormData) {
    return api.post(API_ENDPOINTS.AI.SPEECH_TO_TEXT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async textToSpeech(payload: { text: string; voice?: string }) {
    return api.post(API_ENDPOINTS.AI.TEXT_TO_SPEECH, payload);
  }

  async getPrompts() {
    return api.get(API_ENDPOINTS.AI.PROMPTS);
  }
}

const aiService = new AIService();

export default aiService;