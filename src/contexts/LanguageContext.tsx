"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { zh, en, Locale, LocaleKey, locales } from '@/locales';

interface LanguageContextType {
  locale: LocaleKey;
  setLocale: (locale: LocaleKey) => void;
  t: Locale;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const localeData = {
  zh,
  en,
};

interface LanguageProviderProps {
  children: ReactNode;
  defaultLocale?: LocaleKey;
}

export function LanguageProvider({ children, defaultLocale = 'zh' }: LanguageProviderProps) {
  const [locale, setLocale] = useState<LocaleKey>(defaultLocale);
  
  const t = localeData[locale];

  const value = {
    locale,
    setLocale,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}