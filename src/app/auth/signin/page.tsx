"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { useAuth } from '@/components/AuthProvider';
import { validateUsername, validatePassword, validateEmail } from '@/utils/validation';

function SignInContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 验证输入
      if (!validateUsername(username)) {
        setError('用户名格式不正确，需要3-20个字符，支持字母、数字、下划线和中文');
        return;
      }

      if (!validatePassword(password)) {
        setError('密码强度不足，至少6个字符，包含至少两种类型的字符');
        return;
      }

      if (!isLogin && email && !validateEmail(email)) {
        setError('邮箱格式不正确');
        return;
      }

      let result;
      if (isLogin) {
        result = await login(username, password);
      } else {
        result = await register(username, password, email || undefined);
      }

      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || '操作失败');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            💰 {t.nav?.title || '个人财务分析工具'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? (t.auth?.signIn?.title || '登录您的账户') 
              : (t.auth?.register?.title || '创建新账户')
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              {t.auth?.form?.username || '用户名'}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t.auth?.form?.usernamePlaceholder || '请输入用户名'}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t.auth?.form?.password || '密码'}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t.auth?.form?.passwordPlaceholder || '请输入密码'}
              required
              disabled={isLoading}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.auth?.form?.email || '邮箱'} ({t.auth?.form?.optional || '可选'})
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.auth?.form?.emailPlaceholder || '请输入邮箱地址'}
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? (t.auth?.signIn?.signing || '登录中...') : (t.auth?.register?.registering || '注册中...')}
              </span>
            ) : (
              isLogin ? (t.auth?.signIn?.button || '登录') : (t.auth?.register?.button || '注册')
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setUsername('');
              setPassword('');
              setEmail('');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            disabled={isLoading}
          >
            {isLogin 
              ? (t.auth?.switchToRegister || '没有账户？点击注册') 
              : (t.auth?.switchToLogin || '已有账户？点击登录')
            }
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            {t.auth?.privacy || '所有数据均存储在您的本地设备中，确保您的隐私安全'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <LanguageProvider>
      <SignInContent />
    </LanguageProvider>
  );
}