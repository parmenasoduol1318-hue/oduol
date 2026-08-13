// frontend/services/ai/voiceService.ts

import { api } from "../api/client";
import API_ENDPOINTS from "../api/endpoints";

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
  async transcribeAudio(audio: FormData) {
    return api.post(API_ENDPOINTS.AI.SPEECH_TO_TEXT, audio, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async textToSpeech(payload: TextToSpeechRequest) {
    return api.post(API_ENDPOINTS.AI.TEXT_TO_SPEECH, payload);
  }

  async sendVoiceMessage(payload: VoiceChatRequest) {
    return api.post(API_ENDPOINTS.VOICE.CONVERSATION, payload);
  }

  async endVoiceSession(conversationId: string) {
    return api.post(API_ENDPOINTS.VOICE.CONVERSATION, {
      conversation_id: conversationId,
      action: "end",
    });
  }
}

const voiceService = new VoiceService();

export default voiceService;