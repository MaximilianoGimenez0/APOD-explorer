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

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getMonthKey = (month: number): TranslationKey => `common.months.${month as MonthNumber}`;
