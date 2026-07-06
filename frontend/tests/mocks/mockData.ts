// frontend/tests/mocks/mockData.ts

/* ======================================================
   Mock User
====================================================== */

export const mockUser = {
  id: "user_001",
  name: "Parmenas Oduol",
  email: "parmenas@example.com",
  avatar: null,
  is_pro: true,
  language: "en",
  theme: "system",
  created_at: "2026-01-01T10:00:00Z",
};

/* ======================================================
   Mock Chat
====================================================== */

export const mockChat = {
  id: "chat_001",
  title: "New Conversation",
  created_at: "2026-07-01T09:00:00Z",
  updated_at: "2026-07-01T09:30:00Z",
};

/* ======================================================
   Mock Messages
====================================================== */

export const mockMessages = [
  {
    id: "msg_001",
    role: "user",
    content: "Hello",
    created_at: "2026-07-01T09:00:01Z",
  },
  {
    id: "msg_002",
    role: "assistant",
    content: "Hello! How can I help you today?",
    created_at: "2026-07-01T09:00:03Z",
  },
];

/* ======================================================
   Mock Memory
====================================================== */

export const mockMemory = {
  id: "memory_001",
  title: "Favorite Language",
  content: "The user prefers TypeScript.",
  created_at: "2026-06-15T12:00:00Z",
};

/* ======================================================
   Mock Image
====================================================== */

export const mockImage = {
  id: "image_001",
  prompt: "A futuristic AI assistant",
  image_url: "https://example.com/images/ai.png",
  created_at: "2026-07-01T11:00:00Z",
};

/* ======================================================
   Mock Voice Recording
====================================================== */

export const mockVoiceRecording = {
  id: "voice_001",
  duration: 18,
  transcript: "Hello SwiftReply",
  audio_url: "https://example.com/audio/sample.mp3",
};

/* ======================================================
   Mock Subscription
====================================================== */

export const mockSubscription = {
  plan: "PRO",
  is_pro: true,
  expires_at: "2026-12-31T23:59:59Z",
};

/* ======================================================
   Mock Payment
====================================================== */

export const mockPayment = {
  id: "payment_001",
  provider: "MPESA",
  amount: 499,
  currency: "KES",
  status: "SUCCESS",
  transaction_id: "MPESA123456789",
  created_at: "2026-07-01T10:15:00Z",
};

/* ======================================================
   Mock Notification
====================================================== */

export const mockNotification = {
  id: "notification_001",
  title: "Subscription Activated",
  body: "Your SwiftReply Pro subscription is now active.",
  read: false,
};

/* ======================================================
   Mock Settings
====================================================== */

export const mockSettings = {
  language: "en",
  theme: "system",
  notifications: true,
  biometrics: false,
};

/* ======================================================
   Mock API Responses
====================================================== */

export const mockSuccessResponse = {
  success: true,
  message: "Success",
};

export const mockErrorResponse = {
  success: false,
  message: "Something went wrong.",
};

/* ======================================================
   Combined Export
====================================================== */

export const mockData = {
  user: mockUser,
  chat: mockChat,
  messages: mockMessages,
  memory: mockMemory,
  image: mockImage,
  voice: mockVoiceRecording,
  subscription: mockSubscription,
  payment: mockPayment,
  notification: mockNotification,
  settings: mockSettings,
};