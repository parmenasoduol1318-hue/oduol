// constants/languages.ts

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇰🇪",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    rtl: true,
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
    flag: "🇳🇬",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Asụsụ Igbo",
    flag: "🇳🇬",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "Harshen Hausa",
    flag: "🇳🇬",
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
  },
  {
    code: "rw",
    name: "Kinyarwanda",
    nativeName: "Kinyarwanda",
    flag: "🇷🇼",
  },
  {
    code: "lg",
    name: "Luganda",
    nativeName: "Luganda",
    flag: "🇺🇬",
  },
  {
    code: "luo",
    name: "Luo",
    nativeName: "Dholuo",
    flag: "🇰🇪",
  },
  {
    code: "ki",
    name: "Kikuyu",
    nativeName: "Gĩkũyũ",
    flag: "🇰🇪",
  },
  {
    code: "kln",
    name: "Kalenjin",
    nativeName: "Kalenjin",
    flag: "🇰🇪",
  },
  {
    code: "mer",
    name: "Meru",
    nativeName: "Kimeru",
    flag: "🇰🇪",
  },
  {
    code: "kam",
    name: "Kamba",
    nativeName: "Kikamba",
    flag: "🇰🇪",
  },
  {
    code: "so",
    name: "Somali",
    nativeName: "Soomaali",
    flag: "🇸🇴",
  },
  {
    code: "om",
    name: "Oromo",
    nativeName: "Afaan Oromoo",
    flag: "🇪🇹",
  },
];

export const DEFAULT_LANGUAGE = "en";

export const DEFAULT_TRANSLATION_LANGUAGE = "sw";

export const SUPPORTED_LANGUAGE_CODES = LANGUAGES.map(
  (language) => language.code
);

export function getLanguage(code: string): Language | undefined {
  return LANGUAGES.find((language) => language.code === code);
}

export function getLanguageName(code: string): string {
  return getLanguage(code)?.name ?? code;
}

export function getNativeLanguageName(code: string): string {
  return getLanguage(code)?.nativeName ?? code;
}

export default LANGUAGES;