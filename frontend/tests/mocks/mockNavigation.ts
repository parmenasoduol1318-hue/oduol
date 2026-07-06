// frontend/tests/mocks/mockNavigation.ts

import { jest } from "@jest/globals";

/* ======================================================
   Mock Navigation Functions
====================================================== */

export const mockNavigate = jest.fn();
export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockGoBack = jest.fn();
export const mockReset = jest.fn();
export const mockPop = jest.fn();
export const mockPopToTop = jest.fn();
export const mockSetParams = jest.fn();
export const mockDispatch = jest.fn();

/* ======================================================
   React Navigation Mock
====================================================== */

export const mockNavigation = {
  navigate: mockNavigate,
  push: mockPush,
  replace: mockReplace,
  goBack: mockGoBack,
  reset: mockReset,
  pop: mockPop,
  popToTop: mockPopToTop,
  setParams: mockSetParams,
  dispatch: mockDispatch,

  canGoBack: jest.fn(() => true),

  isFocused: jest.fn(() => true),

  addListener: jest.fn(() => jest.fn()),

  removeListener: jest.fn(),
};

/* ======================================================
   Mock Route
====================================================== */

export const mockRoute = {
  key: "mock-route-key",
  name: "ChatScreen",

  params: {},

  path: "",
};

/* ======================================================
   Expo Router Mock
====================================================== */

export const mockRouter = {
  push: mockPush,
  replace: mockReplace,
  back: mockGoBack,

  canGoBack: jest.fn(() => true),
};

/* ======================================================
   Reset Helpers
====================================================== */

export function resetNavigationMocks() {
  [
    mockNavigate,
    mockPush,
    mockReplace,
    mockGoBack,
    mockReset,
    mockPop,
    mockPopToTop,
    mockSetParams,
    mockDispatch,
  ].forEach((fn) => fn.mockClear());
}

/* ======================================================
   Common Route Parameters
====================================================== */

export const mockChatParams = {
  chatId: "chat_001",
};

export const mockImageParams = {
  imageId: "image_001",
};

export const mockMemoryParams = {
  memoryId: "memory_001",
};

export const mockUserParams = {
  userId: "user_001",
};