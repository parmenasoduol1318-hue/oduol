import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { logger } from "../lib/logger";

export const useAppState = () => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  const [isActive, setIsActive] = useState(appState === "active");

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      logger.info("App state changed", nextState);

      setAppState(nextState);
      setIsActive(nextState === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appState,
    isActive,
  };
};