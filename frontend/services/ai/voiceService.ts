// frontend/services/ai/voiceService.ts

import axios, { AxiosInstance } from "axios";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:8000";

/* ======================================================
   Types
====================================================== */

export interface VoiceChatRequest {
  message: string;
  conversation_id?: string;
}

export interface TextToSpeechRequest {
  text: string;
  voice?: string;
}

export interface SpeechToTextResponse {
  transcript: string;
}

export interface VoiceChatResponse {
  reply: string;
  audio_url?: string;
  conversation_id?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/* ======================================================
   Voice Service
====================================================== */

class VoiceService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 60000,
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
     Speech-to-Text
  ========================================== */

  async transcribeAudio(
    audio: FormData
  ) {
    const response =
      await this.api.post<
        ApiResponse<SpeechToTextResponse>
      >(
        "/api/voice/transcribe",
        audio,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  }

  /* ==========================================
     Text-to-Speech
  ========================================== */

  async textToSpeech(
    payload: TextToSpeechRequest
  ) {
    const response =
      await this.api.post<
        ApiResponse<{
          audio_url: string;
        }>
      >(
        "/api/voice/speak",
        payload
      );

    return response.data;
  }

  /* ==========================================
     Voice Conversation
  ========================================== */

  async sendVoiceMessage(
    payload: VoiceChatRequest
  ) {
    const response =
      await this.api.post<
        ApiResponse<VoiceChatResponse>
      >(
        "/api/voice/chat",
        payload
      );

    return response.data;
  }

  /* ==========================================
     End Voice Session
  ========================================== */

  async endVoiceSession(
    conversationId: string
  ) {
    const response =
      await this.api.post<
        ApiResponse
      >(
        "/api/voice/end",
        {
          conversation_id:
            conversationId,
        }
      );

    return response.data;
  }
}

const voiceService =
  new VoiceService();

export default voiceService;