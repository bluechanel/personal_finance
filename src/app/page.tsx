"use client";

import { useState } from 'react';
import FinancialForm from '@/components/FinancialForm';
import NewFinancialResults from '@/components/NewFinancialResults';
import { FinancialData } from '@/types/financial';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

function HomeContent() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const { t } = useLanguage();

  const handleFinancialSubmit = (data: FinancialData) => {
    setFinancialData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <div></div>
          <LanguageToggle />
        </div>
        
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💰 {t.nav.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.nav.subtitle}
          </p>
        </header>

        {!financialData ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              📊 {t.form.title}
            </h2>
            <FinancialForm onSubmit={handleFinancialSubmit} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {t.results.title}
                </h2>
                <button
                  onClick={() => setFinancialData(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  {t.results.resetButton}
                </button>
              </div>
              <NewFinancialResults data={financialData} />
            </div>
          </div>
        )}

        <footer className="text-center mt-12 pb-8">
          <p className="text-gray-500">
            {t.footer.privacyNotice}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider defaultLocale="zh">
      <HomeContent />
    </LanguageProvider>
  );
}
