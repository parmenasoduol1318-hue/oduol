// frontend/hooks/useTheme.ts

import { useEffect, useState } from "react";
import { getCache, setCache } from "../lib/cache";
import { STORAGE_KEYS, APP_THEMES } from "../lib/constants";

export type Theme = "light" | "dark" | "system";

/**
 * Detect system theme
 */
function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Apply theme to document
 */
function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  let resolvedTheme: "light" | "dark" = "light";

  if (theme === "system") {
    resolvedTheme = getSystemTheme();
  } else {
    resolvedTheme = theme;
  }

  root.setAttribute("data-theme", resolvedTheme);
}

/**
 * Theme hook
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");

  /**
   * Load theme on mount
   */
  useEffect(() => {
    const saved = getCache<Theme>(STORAGE_KEYS.THEME) || "system";
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  /**
   * Listen to system changes if theme = system
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      const saved = getCache<Theme>(STORAGE_KEYS.THEME) || "system";
      if (saved === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  /**
   * Change theme
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setCache(STORAGE_KEYS.THEME, newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    isDark:
      theme === "dark" ||
      (theme === "system" && getSystemTheme() === "dark"),
  };
}