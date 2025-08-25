"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { userManager } from '@/lib/userManager';
import { FinancialData } from '@/types/financial';

interface FinancialAnalysis {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface FinancialAnalysisListProps {
  onSelectAnalysis: (data: FinancialData, title: string) => void;
  onNewAnalysis: () => void;
}

export default function FinancialAnalysisList({ onSelectAnalysis, onNewAnalysis }: FinancialAnalysisListProps) {
  const { token } = useAuth();
  const [analyses, setAnalyses] = useState<FinancialAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadAnalyses();
    }
  }, [token]);

  const loadAnalyses = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const analysesList = await userManager.getFinancialAnalysesList(token);
      setAnalyses(analysesList);
    } catch (error) {
      console.error('加载财务分析列表失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadAnalysis = async (analysisId: string) => {
    if (!token) return;
    
    setLoadingId(analysisId);
    try {
      const analysis = await userManager.getFinancialAnalysis(token, analysisId);
      if (analysis && analysis.data) {
        onSelectAnalysis(analysis.data as FinancialData, analysis.title);
      }
    } catch (error) {
      console.error('加载财务分析失败:', error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteAnalysis = async (analysisId: string) => {
    if (!token) return;
    
    if (!confirm('确定要删除这个财务分析吗？此操作无法撤销。')) {
      return;
    }
    
    setDeletingId(analysisId);
    try {
      const success = await userManager.deleteFinancialAnalysis(token, analysisId);
      if (success) {
        setAnalyses(prev => prev.filter(analysis => analysis.id !== analysisId));
      } else {
        alert('删除失败，请重试');
      }
    } catch (error) {
      console.error('删除财务分析失败:', error);
      alert('删除失败，请重试');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载财务分析历史记录...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          📊 财务分析历史
        </h2>
        <button
          onClick={onNewAnalysis}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>新建分析</span>
        </button>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📈</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">还没有财务分析记录</h3>
          <p className="text-gray-600 mb-6">开始您的第一次财务健康评估吧！</p>
          <button
            onClick={onNewAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            创建第一个财务分析
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    {analysis.title}
                  </h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>创建时间：{new Date(analysis.createdAt).toLocaleString('zh-CN')}</p>
                    <p>更新时间：{new Date(analysis.updatedAt).toLocaleString('zh-CN')}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleLoadAnalysis(analysis.id)}
                    disabled={loadingId === analysis.id}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      loadingId === analysis.id
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {loadingId === analysis.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        加载中
                      </span>
                    ) : (
                      '查看'
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleDeleteAnalysis(analysis.id)}
                    disabled={deletingId === analysis.id}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      deletingId === analysis.id
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {deletingId === analysis.id ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        删除中
                      </span>
                    ) : (
                      '删除'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}