export { zh } from './zh';
export { en } from './en';
export type { Locale } from './zh';

export const locales = ['zh', 'en'] as const;
export type LocaleKey = typeof locales[number];

export const localeNames = {
  zh: '中文',
  en: 'English',
} as const;