"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FinancialDataPrivacyConsentProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  financialDataSummary?: {
    totalAssets: number;
    totalLiabilities: number;
    monthlyIncome: number;
    monthlyExpenses: number;
  };
}

export default function FinancialDataPrivacyConsent({
  isOpen,
  onConfirm,
  onCancel,
  financialDataSummary
}: FinancialDataPrivacyConsentProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9996] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">数据隐私与使用协议</h2>
              <p className="text-blue-100 mt-1">AI财务顾问服务数据使用说明</p>
            </div>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-6">
          {/* 数据概览 */}
          {financialDataSummary && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                您的财务数据概览
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded">
                  <div className="text-gray-600">总资产</div>
                  <div className="font-semibold text-green-600">{financialDataSummary.totalAssets.toLocaleString()}元</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-gray-600">总负债</div>
                  <div className="font-semibold text-red-600">{financialDataSummary.totalLiabilities.toLocaleString()}元</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-gray-600">月收入</div>
                  <div className="font-semibold text-blue-600">{financialDataSummary.monthlyIncome.toLocaleString()}元</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-gray-600">月支出</div>
                  <div className="font-semibold text-orange-600">{financialDataSummary.monthlyExpenses.toLocaleString()}元</div>
                </div>
              </div>
            </div>
          )}

          {/* 数据使用说明 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              AI顾问如何使用您的数据
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">个性化财务建议</h4>
                  <p className="text-gray-600 text-sm">基于您的收入、支出、资产和负债数据，为您提供定制化的理财建议和投资策略。</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">风险评估分析</h4>
                  <p className="text-gray-600 text-sm">分析您的财务风险状况，识别潜在的财务问题并提供改进建议。</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">目标规划辅助</h4>
                  <p className="text-gray-600 text-sm">帮助您制定实际可行的财务目标和储蓄计划。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 隐私保障 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              隐私与安全保障
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                数据通过加密传输，确保传输过程安全
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                仅用于生成财务建议，不用于其他商业目的
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                不会永久存储您的财务数据
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                严格遵守GDPR等国际隐私保护标准
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                您可以随时停止使用AI顾问服务
              </li>
            </ul>
          </div>

          {/* 确认复选框 */}
          <div className="border-t pt-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasReadTerms}
                onChange={(e) => setHasReadTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                我已仔细阅读并理解上述条款，同意将我的财务数据用于AI财务建议服务。我了解数据的使用方式和隐私保护措施，并自愿提供这些信息以获得个性化的财务建议。
              </span>
            </label>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            disabled={!hasReadTerms}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            同意并开始使用AI顾问
          </button>
        </div>
      </div>
    </div>
  );
}