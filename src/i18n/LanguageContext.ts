import { createContext } from 'react';
import type { Language, TranslationDictionary } from './types';

export interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  dictionaries: Record<Language, TranslationDictionary>;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
