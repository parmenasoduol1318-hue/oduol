export type MessageTone =
  | 'friendly'
  | 'serious'
  | 'angry'
  | 'formal'
  | 'joking'
  | 'confused'
  | 'supportive'
  | 'neutral';

export type ReplyStyle = 'short' | 'formal' | 'funny' | 'friendly' | 'creative';

export type MessageIntent =
  | 'question'
  | 'statement'
  | 'request'
  | 'warning'
  | 'flirting'
  | 'joking'
  | 'help_request'
  | 'complaint'
  | 'compliment';

export interface Message {
  id: string;
  content: string;
  detectedTone: MessageTone;
  detectedIntent: MessageIntent;
  language: string;
  timestamp: number;
}

export interface Reply {
  id: string;
  content: string;
  style: ReplyStyle;
  tone: MessageTone;
  confidence: number;
}

export interface SuggestedReplies {
  messageId: string;
  replies: Reply[];
  generatedAt: number;
}

export interface AppSettings {
  openaiApiKey: string;
  preferredLanguage: string;
  preferredReplyStyle: ReplyStyle;
  enableOfflineMode: boolean;
  theme: 'light' | 'dark' | 'auto';
  autoDetectTone: boolean;
}

export interface CachedReply {
  messageContent: string;
  replies: Reply[];
  cachedAt: number;
}
