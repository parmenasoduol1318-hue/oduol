import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logger } from "../lib/logger";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  // Load from storage
  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);

        if (stored !== null) {
          setValue(JSON.parse(stored));
        }
      } catch (err) {
        logger.error("Failed to load local storage", err);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key]);

  // Save to storage
  const setStoredValue = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          typeof newValue === "function"
            ? (newValue as (prev: T) => T)(value)
            : newValue;

        setValue(valueToStore);

        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        logger.error("Failed to save local storage", err);
      }
    },
    [key, value]
  );

  const remove = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(initialValue);
    } catch (err) {
      logger.error("Failed to remove local storage key", err);
    }
  }, [key, initialValue]);

  return {
    value,
    setValue: setStoredValue,
    remove,
    loading,
  };
};