"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { localeNames, LocaleKey, locales } from '@/locales';

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  const handleLocaleChange = (newLocale: LocaleKey) => {
    setLocale(newLocale);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">
        {t.nav.languageToggle}:
      </span>
      <div className="flex rounded-lg border border-gray-300 bg-white">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`px-3 py-1 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
              locale === loc
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {localeNames[loc]}
          </button>
        ))}
      </div>
    </div>
  );
}