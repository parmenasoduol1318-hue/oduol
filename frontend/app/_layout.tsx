// frontend/app/_layout.tsx

import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useAuthStore } from "../store/authStore";
import Colors from "../constants/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    async function prepare() {
      try {
        await initialize();
      } catch (error) {
        console.log("Initialization Error:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <>
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        {/* Authentication */}

        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="auth/reset-password" />
        <Stack.Screen name="auth/verify-email" />

        {/* Onboarding */}

        <Stack.Screen name="onboarding/index" />

        {/* Main App */}

        <Stack.Screen name="(tabs)" />

        {/* Chat */}

        <Stack.Screen
          name="chat/[id]"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="chat/new"
          options={{
            animation: "slide_from_right",
          }}
        />

        {/* Payments */}

        <Stack.Screen name="payments/index" />
        <Stack.Screen name="payments/plans" />
        <Stack.Screen name="payments/mpesa" />
        <Stack.Screen name="payments/paypal" />
        <Stack.Screen name="payments/success" />
        <Stack.Screen name="payments/failed" />

        {/* Subscription */}

        <Stack.Screen name="subscription/index" />
        <Stack.Screen name="subscription/upgrade" />
        <Stack.Screen name="subscription/manage" />
        <Stack.Screen name="subscription/history" />
        <Stack.Screen name="subscription/success" />
      </Stack>
    </>
  );
}