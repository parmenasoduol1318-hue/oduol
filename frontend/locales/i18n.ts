// frontend/locales/i18n.ts

import { useSettingsStore } from "../store/settingsStore";
import {
  SupportedLanguage,
  t as translate,
} from "./translations";

export {
  translations,
} from "./translations";

/* ======================================================
   Get Current Language
====================================================== */

export function getCurrentLanguage(): SupportedLanguage {
  const language =
    useSettingsStore.getState().language;

  return language as SupportedLanguage;
}

/* ======================================================
   Translate
====================================================== */

export function t(
  key: string
): string {
  const language =
    getCurrentLanguage();

  return translate(
    language,
    key
  );
}

/* ======================================================
   Translate With Variables
====================================================== */

export function tf(
  key: string,
  variables: Record<
    string,
    string | number
  >
): string {
  let text = t(key);

  Object.entries(
    variables
  ).forEach(
    ([variable, value]) => {
      text = text.replace(
        new RegExp(
          `\\{${variable}\\}`,
          "g"
        ),
        String(value)
      );
    }
  );

  return text;
}

/* ======================================================
   Utility
====================================================== */

export function isRTL(): boolean {
  return false;
}

export default {
  t,
  tf,
  getCurrentLanguage,
  isRTL,
};