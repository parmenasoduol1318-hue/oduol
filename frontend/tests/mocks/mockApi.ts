// frontend/tests/mocks/mockApi.ts

import { jest } from "@jest/globals";

/* ======================================================
   Generic Mock Response
====================================================== */

export const successResponse = <T>(
  data: T,
  message = "Success"
) => ({
  success: true,
  message,
  data,
});

export const errorResponse = (
  message = "Request failed"
) => ({
  success: false,
  message,
  data: null,
});

/* ======================================================
   Mock API Client
====================================================== */

export const mockApi = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

/* ======================================================
   Reset Helper
====================================================== */

export function resetMockApi() {
  Object.values(mockApi).forEach((fn) =>
    fn.mockReset()
  );
}

/* ======================================================
   Authentication
====================================================== */

export function mockLoginSuccess() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
      token_type: "bearer",
    }),
  });
}

export function mockLoginFailure() {
  mockApi.post.mockRejectedValue({
    response: {
      status: 401,
      data: errorResponse(
        "Invalid credentials"
      ),
    },
  });
}

/* ======================================================
   User Profile
====================================================== */

export function mockUserProfile() {
  mockApi.get.mockResolvedValue({
    data: successResponse({
      id: "user_001",
      name: "Parmenas Oduol",
      email: "parmenas@example.com",
      is_pro: true,
    }),
  });
}

/* ======================================================
   Chat
====================================================== */

export function mockChatResponse() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      id: "msg_001",
      role: "assistant",
      content:
        "Hello! How can I help you today?",
    }),
  });
}

/* ======================================================
   Image Generation
====================================================== */

export function mockImageGeneration() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      image_url:
        "https://example.com/image.png",
    }),
  });
}

/* ======================================================
   Voice
====================================================== */

export function mockSpeechToText() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      transcript:
        "Hello SwiftReply",
    }),
  });
}

export function mockTextToSpeech() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      audio_url:
        "https://example.com/audio.mp3",
    }),
  });
}

/* ======================================================
   Payments
====================================================== */

export function mockMpesaPayment() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      checkout_request_id:
        "ws_CO_123456789",
      merchant_request_id:
        "mr_987654321",
    }),
  });
}

export function mockPaypalOrder() {
  mockApi.post.mockResolvedValue({
    data: successResponse({
      order_id: "PAYPAL_ORDER_001",
      approval_url:
        "https://paypal.com/checkout",
    }),
  });
}

/* ======================================================
   Subscription
====================================================== */

export function mockSubscriptionStatus() {
  mockApi.get.mockResolvedValue({
    data: successResponse({
      plan: "PRO",
      is_pro: true,
      expires_at:
        "2026-12-31T23:59:59Z",
    }),
  });
}

/* ======================================================
   Network Error
====================================================== */

export function mockNetworkError() {
  mockApi.get.mockRejectedValue(
    new Error("Network Error")
  );

  mockApi.post.mockRejectedValue(
    new Error("Network Error")
  );

  mockApi.put.mockRejectedValue(
    new Error("Network Error")
  );

  mockApi.delete.mockRejectedValue(
    new Error("Network Error")
  );
}