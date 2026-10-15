import { createContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { getStoredLanguage, setStoredLanguage } from './languageStorage';
import { es } from './locales/es';
import { en } from './locales/en';
import { pt } from './locales/pt';
import type { Language } from './types';
import type { TranslationDictionary } from './types';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  dictionaries: Record<Language, TranslationDictionary>;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  };

  const dictionaries = useMemo(() => ({ es, en, pt }), []);

  const value = useMemo(() => ({
    language,
    setLanguage,
    dictionaries
  }), [language, dictionaries]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
