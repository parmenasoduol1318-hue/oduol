// frontend/app/index.tsx

import React from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import { Redirect } from "expo-router";

import { useAuthStore } from "../store/authStore";

export default function Index() {
  const authenticated = useAuthStore(
    (state: ReturnType<typeof useAuthStore.getState>) => state.authenticated
  );

  const loading = useAuthStore(
    (state: ReturnType<typeof useAuthStore.getState>) => state.loading
  );

  if (loading) {
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
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/auth/login" />;
}