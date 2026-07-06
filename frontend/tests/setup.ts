// frontend/tests/setup.ts

import "@testing-library/jest-native/extend-expect";

import "react-native-gesture-handler/jestSetup";

/* ======================================================
   Silence Animated warnings
====================================================== */

jest.mock(
  "react-native/Libraries/Animated/NativeAnimatedHelper"
);

/* ======================================================
   Expo Secure Store
====================================================== */

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

/* ======================================================
   Async Storage
====================================================== */

jest.mock(
  "@react-native-async-storage/async-storage",
  () =>
    require(
      "@react-native-async-storage/async-storage/jest/async-storage-mock"
    )
);

/* ======================================================
   Expo Notifications
====================================================== */

jest.mock("expo-notifications", () => ({
  requestPermissionsAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync:
    jest.fn(),
}));

/* ======================================================
   Expo Image Picker
====================================================== */

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  requestCameraPermissionsAsync:
    jest.fn(),
  requestMediaLibraryPermissionsAsync:
    jest.fn(),
}));

/* ======================================================
   Expo Audio
====================================================== */

jest.mock("expo-audio", () => ({
  Audio: {},
}));

/* ======================================================
   Expo Speech
====================================================== */

jest.mock("expo-speech", () => ({
  speak: jest.fn(),
  stop: jest.fn(),
  isSpeakingAsync: jest.fn(),
}));

/* ======================================================
   Expo Router
====================================================== */

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

/* ======================================================
   React Navigation
====================================================== */

jest.mock(
  "@react-navigation/native",
  () => {
    const actual = jest.requireActual(
      "@react-navigation/native"
    );

    return {
      ...actual,
      useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
        replace: jest.fn(),
        push: jest.fn(),
      }),
      useRoute: () => ({
        params: {},
      }),
    };
  }
);

/* ======================================================
   Fetch
====================================================== */

global.fetch = jest.fn();

/* ======================================================
   Console filtering
====================================================== */

const originalWarn =
  console.warn;

console.warn = (...args) => {
  const message = String(args[0]);

  if (
    message.includes(
      "Animated"
    ) ||
    message.includes(
      "Require cycle"
    )
  ) {
    return;
  }

  originalWarn(...args);
};

/* ======================================================
   Global helpers
====================================================== */

beforeEach(() => {
  jest.clearAllMocks();
});