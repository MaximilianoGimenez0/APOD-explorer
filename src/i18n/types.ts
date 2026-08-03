import { es } from './locales/es';

export type Language = 'es' | 'en' | 'pt';

type DeepString<T> = T extends string ? string : T extends object ? { [K in keyof T]: DeepString<T[K]> } : T;

export type TranslationDictionary = DeepString<typeof es>;

export type PathKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | (T[K] extends object ? `${K}.${PathKeys<T[K]>}` : never)
        : never;
    }[keyof T]
  : "";

export type TranslationKey = PathKeys<typeof es>;
