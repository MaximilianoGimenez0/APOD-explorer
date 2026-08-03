
import type { Language } from './types';

const STORAGE_KEY = 'apod_explorer_language';

export const getStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en' || stored === 'pt') {
      return stored as Language;
    }
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es' || browserLang === 'en' || browserLang === 'pt') {
      return browserLang as Language;
    }
  } catch (e) {
    console.error("Error accessing localStorage", e);
  }
  return 'es'; // Default
};

export const setStoredLanguage = (lang: Language) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};
