// frontend/app/index.tsx

import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";

import { useAuthStore } from "../store/authStore";
import { useAppStore } from "../store/appStore";
import { LocalStorage, SecureStorage, StorageKeys } from "../lib/storage";

export default function Index() {
  const {
    authenticated,
    login,
    logout,
  } = useAuthStore();

  const {
    initialized,
    setInitialized,
  } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const accessToken =
        await SecureStorage.get<string>(
          StorageKeys.ACCESS_TOKEN
        );

      const refreshToken =
        await SecureStorage.get<string>(
          StorageKeys.REFRESH_TOKEN
        );

      const user =
        await LocalStorage.get(
          StorageKeys.USER
        );

      if (
        accessToken &&
        refreshToken &&
        user
      ) {
        login(
          user,
          accessToken,
          refreshToken
        );
      } else {
        logout();
      }
    } catch (error) {
      console.error(
        "Initialization failed:",
        error
      );

      logout();
    } finally {
      setInitialized(true);
    }
  };

  if (!initialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (authenticated) {
    return <Redirect href="/chat" />;
  }

  return <Redirect href="/login" />;
}