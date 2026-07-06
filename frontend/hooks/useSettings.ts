// frontend/hooks/useSettings.ts

import { useEffect, useState } from "react";
import { getCache, setCache } from "../lib/cache";
import { STORAGE_KEYS } from "../lib/constants";

export type UserSettings = {
  notifications: boolean;
  sound: boolean;
  autoPlayVoice: boolean;
  language: "en" | "sw" | "sh";
  fontSize: "small" | "medium" | "large";
};

const defaultSettings: UserSettings = {
  notifications: true,
  sound: true,
  autoPlayVoice: false,
  language: "en",
  fontSize: "medium",
};

/**
 * Global app settings hook
 */
export function useSettings() {
  const [settings, setSettingsState] =
    useState<UserSettings>(defaultSettings);

  const [loaded, setLoaded] = useState(false);

  /**
   * Load settings
   */
  useEffect(() => {
    const cached = getCache<UserSettings>(STORAGE_KEYS.SETTINGS);

    if (cached) {
      setSettingsState({
        ...defaultSettings,
        ...cached,
      });
    }

    setLoaded(true);
  }, []);

  /**
   * Update single setting
   */
  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    const updated = {
      ...settings,
      [key]: value,
    };

    setSettingsState(updated);
    setCache(STORAGE_KEYS.SETTINGS, updated);
  };

  /**
   * Replace all settings
   */
  const updateAllSettings = (newSettings: Partial<UserSettings>) => {
    const updated = {
      ...settings,
      ...newSettings,
    };

    setSettingsState(updated);
    setCache(STORAGE_KEYS.SETTINGS, updated);
  };

  /**
   * Reset settings
   */
  const resetSettings = () => {
    setSettingsState(defaultSettings);
    setCache(STORAGE_KEYS.SETTINGS, defaultSettings);
  };

  return {
    settings,
    loaded,
    updateSetting,
    updateAllSettings,
    resetSettings,
  };
}