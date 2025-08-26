"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FinancialForm from '@/components/FinancialForm';
import NewFinancialResults from '@/components/NewFinancialResults';
import FinancialAnalysisList from '@/components/FinancialAnalysisList';
import AIChatDrawer from '@/components/AIChatDrawer';
import FinancialDataPrivacyConsent from '@/components/FinancialDataPrivacyConsent';
import { FinancialData } from '@/types/financial';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/components/AuthProvider';
import { userManager } from '@/lib/userManager';

// 页面状态枚举
type PageState = 'list' | 'form' | 'results';

function HomeContent() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [currentAnalysisTitle, setCurrentAnalysisTitle] = useState<string>('');
  const [pageState, setPageState] = useState<PageState>('list');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [hasAIPrivacyConsent, setHasAIPrivacyConsent] = useState(false);
  const { t } = useLanguage();
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();

  // 监听用户登录状态变化
  useEffect(() => {
    if (isAuthenticated) {
      // 用户已登录，显示历史记录列表
      setPageState('list');
      setFinancialData(null);
    } else {
      // 用户未登录，显示表单
      setPageState('form');
      setFinancialData(null);
    }
  }, [isAuthenticated]);

  const handleFinancialSubmit = async (data: FinancialData) => {
    setFinancialData(data);
    setPageState('results');
    
    // 如果用户已登录，保存数据
    if (isAuthenticated && user && token) {
      try {
        const result = await userManager.saveFinancialData(token, data);
        if (result.success) {
          console.log('财务数据已保存');
        }
      } catch (error) {
        console.error('保存财务数据失败:', error);
      }
    }
  };

  const handleSelectAnalysis = (data: FinancialData, title: string) => {
    setFinancialData(data);
    setCurrentAnalysisTitle(title);
    setPageState('results');
  };

  const handleNewAnalysis = () => {
    setFinancialData(null);
    setCurrentAnalysisTitle('');
    setPageState('form');
  };

  const handleBackToList = () => {
    setFinancialData(null);
    setCurrentAnalysisTitle('');
    setPageState('list');
  };

  const handleReset = () => {
    setFinancialData(null);
    setCurrentAnalysisTitle('');
    if (isAuthenticated) {
      setPageState('list');
    } else {
      setPageState('form');
    }
  };

  // AI聊天相关处理函数
  const handleAIChatOpen = () => {
    // 检查用户是否已登录
    if (!isAuthenticated) {
      // 未登录用户跳转到登录页面
      router.push('/auth/signin');
      return;
    }
    
    // 已登录用户继续正常流程
    if (!hasAIPrivacyConsent) {
      setShowPrivacyConsent(true);
    } else {
      setIsAIChatOpen(true);
    }
  };

  const handlePrivacyConfirm = () => {
    setHasAIPrivacyConsent(true);
    setShowPrivacyConsent(false);
    setIsAIChatOpen(true);
  };

  const handlePrivacyCancel = () => {
    setShowPrivacyConsent(false);
  };

  const handleAIChatClose = () => {
    setIsAIChatOpen(false);
  };

  // 计算财务数据摘要（用于隐私确认界面）
  const getFinancialDataSummary = () => {
    if (!financialData) return undefined;
    
    const totalAssets = (financialData.ownerHouseValue || 0) + (financialData.investmentProperty || 0) + (financialData.carValue || 0) + (financialData.stocksValue || 0) + (financialData.fundsValue || 0) + (financialData.cashAndDeposits || 0) + (financialData.pensionAccount || 0);
    const totalLiabilities = (financialData.mortgageBalance || 0) + (financialData.carLoanBalance || 0) + (financialData.creditCardDebt || 0) + (financialData.consumerLoans || 0);
    const monthlyIncome = ((financialData.annualSalary || 0) + (financialData.annualOtherIncome || 0)) / 12;
    const monthlyExpenses = (financialData.annualLivingExpenses || 0) / 12;
    
    return {
      totalAssets,
      totalLiabilities,
      monthlyIncome,
      monthlyExpenses
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <div></div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <UserProfile />
          </div>
        </div>
        
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💰 {t.nav.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.nav.subtitle}
          </p>
          
          {/* 用户状态提示 */}
          {isAuthenticated && user && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              已登录为 {user.username}，您的数据将自动保存
            </div>
          )}
          
          {!isAuthenticated && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              登录后可保存您的财务数据，防止数据丢失
            </div>
          )}
        </header>

        {/* 页面内容 */}
        {pageState === 'list' && isAuthenticated && (
          <FinancialAnalysisList 
            onSelectAnalysis={handleSelectAnalysis}
            onNewAnalysis={handleNewAnalysis}
          />
        )}

        {pageState === 'form' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              📊 {t.form.title}
            </h2>
            <FinancialForm onSubmit={handleFinancialSubmit} />
          </div>
        )}

        {pageState === 'results' && financialData && (
          <div className="space-y-6">
            {/* 财务信息输入表单 - 上部 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    📝 财务信息
                  </h2>
                  {currentAnalysisTitle && (
                    <p className="text-sm text-gray-600 mt-1">{currentAnalysisTitle}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {isAuthenticated && (
                    <button
                      onClick={handleBackToList}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      返回列表
                    </button>
                  )}
                  <button
                    onClick={handleReset}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    {t.results.resetButton}
                  </button>
                </div>
              </div>
              
              {/* 财务表单 - 带有当前数据 */}
              <FinancialForm 
                onSubmit={handleFinancialSubmit} 
                initialData={financialData}
              />
            </div>

            {/* 分析结果 - 下部 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  📊 {t.results.title}
                </h2>
                
                {/* AI交流提示按钮 */}
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg px-4 py-2">
                    <p className="text-sm text-purple-700 mb-2 font-medium">
                      🤖 {isAuthenticated ? '与AI交流，获取更多财务建议' : '登录后可使用AI财务顾问'}
                    </p>
                    <button
                      onClick={handleAIChatOpen}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {isAuthenticated ? '开始AI咨询' : '登录使用AI顾问'}
                    </button>
                  </div>
                </div>
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
      
      {/* AI聊天抽屉 */}
      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={handleAIChatClose}
        financialData={financialData}
        onPrivacyConfirm={() => setHasAIPrivacyConsent(true)}
        hasPrivacyConsent={hasAIPrivacyConsent}
      />
      
      {/* 隐私确认对话框 */}
      <FinancialDataPrivacyConsent
        isOpen={showPrivacyConsent}
        onConfirm={handlePrivacyConfirm}
        onCancel={handlePrivacyCancel}
        financialDataSummary={getFinancialDataSummary()}
      />
      
      {/* 页面右下角的AI助手浮动按钮（仅在results状态显示） */}
      {pageState === 'results' && financialData && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <button
            onClick={handleAIChatOpen}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-110 group"
            title={isAuthenticated ? "AI财务顾问" : "登录使用AI顾问"}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            
            {/* 提示气泡 */}
            <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isAuthenticated ? 'AI财务顾问' : '登录使用AI顾问'}
              <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
          </button>
        </div>
      )}
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
