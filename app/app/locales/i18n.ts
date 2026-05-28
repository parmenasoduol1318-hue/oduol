import { en, sw, fr, ar } from './translations';

export type Language = 'en' | 'sw' | 'fr' | 'ar';

const translations = { en, sw, fr, ar };

export function getTranslation(language: Language) {
  return translations[language] || translations['en'];
}

export function getLanguageName(language: Language): string {
  const names: Record<Language, string> = {
    en: 'English',
    sw: 'Swahili',
    fr: 'Français',
    ar: 'العربية',
  };
  return names[language] || 'English';
}

export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  if (language === 'ar') {
    return 'rtl';
  }
  return 'ltr';
}
