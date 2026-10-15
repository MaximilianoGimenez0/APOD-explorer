import { useContext, useCallback } from 'react';
import { LanguageContext } from './LanguageProvider';
import type { TranslationKey } from './types';

const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { language, setLanguage, dictionaries } = context;

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>): string => {
    let value = getNestedValue(dictionaries[language], key);

    if (value === undefined && language === 'pt') {
      if (process.env.NODE_ENV === 'development') console.warn(`Missing translation: ${key} in pt`);
      value = getNestedValue(dictionaries['en'], key);
    }
    if (value === undefined && (language === 'pt' || language === 'en')) {
      if (process.env.NODE_ENV === 'development') console.warn(`Missing translation: ${key} in en`);
      value = getNestedValue(dictionaries['es'], key);
    }

    if (value === undefined) {
      if (process.env.NODE_ENV === 'development') console.error(`Missing translation completely: ${key}`);
      return key as string;
    }

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = (value as string).replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      });
    }

    return value as string;
  }, [language, dictionaries]);

  return { language, setLanguage, t };
};
