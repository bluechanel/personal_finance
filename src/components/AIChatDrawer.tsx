"use client";

import { useState, useEffect, useRef } from 'react';
import { FinancialData } from '@/types/financial';
import { useAuth } from '@/components/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  financialData?: FinancialData | null;
  onPrivacyConfirm: () => void;
  hasPrivacyConsent: boolean;
}

export default function AIChatDrawer({ 
  isOpen, 
  onClose, 
  financialData, 
  onPrivacyConfirm,
  hasPrivacyConsent
}: AIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const { t } = useLanguage();

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 初始化欢迎消息
  useEffect(() => {
    if (isOpen && messages.length === 0 && hasPrivacyConsent) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '您好！我是您的AI财务顾问。我已经了解了您的财务状况，请随时向我咨询任何财务相关的问题。比如：\n\n• 如何优化我的投资组合？\n• 我的应急基金是否充足？\n• 有什么节省开支的建议？\n• 如何制定更好的储蓄计划？',
        timestamp: Date.now()
      }]);
    }
  }, [isOpen, hasPrivacyConsent, messages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !token) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    };

    // 获取当前完整的对话历史（不包括欢迎消息）
    const conversationHistory = messages.filter(msg => msg.id !== 'welcome');
    
    // 构建完整的对话消息列表（包括当前用户消息）
    const fullConversation = [...conversationHistory, userMessage];
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    // 创建一个空的AI消息，用于流式更新
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          // 发送完整的对话历史
          messages: fullConversation.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          financialData: hasPrivacyConsent ? financialData : undefined,
          // 只在第一次对话时包含财务数据
          includeFinancialData: hasPrivacyConsent && conversationHistory.length === 0
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '请求失败');
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedContent += parsed.content;
                  // 实时更新AI消息内容
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === assistantMessage.id 
                        ? { ...msg, content: accumulatedContent }
                        : msg
                    )
                  );
                }
              } catch (e) {
                // 忽略解析错误
              }
            }
          }
        }
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : '发送消息时发生错误');
      // 移除失败的AI消息
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    // 重新初始化欢迎消息
    if (hasPrivacyConsent) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '对话已清空。我是您的AI财务顾问，请随时向我咨询财务相关的问题。',
        timestamp: Date.now()
      }]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[9999] flex flex-col border-l-2 border-gray-300">
      {/* 头部 */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          AI财务顾问
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={clearChat}
            className="text-white hover:text-gray-200 transition-colors"
            title="清空对话"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 隐私确认区域 */}
      {!hasPrivacyConsent && (
        <div className="p-4 bg-yellow-50 border-b border-yellow-200">
          <div className="text-sm text-yellow-800 mb-3">
            <p className="font-semibold mb-2">🔒 隐私提醒</p>
            <p className="mb-2">为了提供个性化的财务建议，AI顾问需要访问您的财务数据。您的数据将：</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>仅用于生成财务建议</li>
              <li>通过加密传输给OpenAI</li>
              <li>不会被永久存储</li>
              <li>严格遵守隐私保护规范</li>
            </ul>
          </div>
          <button
            onClick={onPrivacyConfirm}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            我同意并开始咨询
          </button>
        </div>
      )}

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">AI正在思考...</span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-red-800 text-sm">{error}</div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-xs mt-1"
            >
              关闭
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      {hasPrivacyConsent && (
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="向AI顾问咨询财务问题..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors self-end"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}