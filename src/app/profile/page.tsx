"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/AuthProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { validateEmail } from '@/utils/validation';

function ProfileContent() {
  const { user, token, isAuthenticated, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }
    
    if (user?.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user, router]);

  const handleUpdateEmail = async () => {
    if (!token) return;
    
    setError('');
    setMessage('');
    
    // 验证邮箱格式
    if (email && !validateEmail(email)) {
      setError('邮箱格式不正确');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/user/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email: email || null }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('邮箱更新成功');
        setIsEditing(false);
        // 刷新用户信息
        await refreshUser();
      } else {
        setError(data.error || '更新失败');
      }
    } catch (err) {
      console.error('Update email error:', err);
      setError('网络错误，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEmail(user?.email || '');
    setIsEditing(false);
    setError('');
    setMessage('');
  };

  if (!user) {
    return null;
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=3b82f6&color=fff`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 顶部导航 */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </button>
          <LanguageToggle />
        </div>

        {/* 个人资料卡片 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              👤 个人资料
            </h1>
            <p className="text-gray-600">
              管理您的账户信息
            </p>
          </div>

          {/* 头像和基本信息 */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src={avatarUrl}
              alt={user.username}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mb-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=3b82f6&color=fff`;
              }}
            />
            <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-500">注册时间：{new Date(user.createdAt).toLocaleDateString('zh-CN')}</p>
          </div>

          {/* 消息提示 */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm text-center">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* 账户信息 */}
          <div className="space-y-6">
            {/* 用户名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user.username}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  disabled
                />
                <div className="absolute right-3 top-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">用户名不可修改</p>
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="请输入邮箱地址（可选）"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={handleUpdateEmail}
                        disabled={isSaving}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          isSaving 
                            ? 'bg-gray-400 cursor-not-allowed text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isSaving ? '保存中...' : '保存'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        取消
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <input
                          type="email"
                          value={email || '未设置'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                          disabled
                        />
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="ml-3 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        {email ? '修改' : '添加'}
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* 邮箱用途说明 */}
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">邮箱用途说明：</p>
                    <ul className="space-y-1 text-blue-600">
                      <li>• 用于找回用户密码</li>
                      <li>• 接收定期的财务分析提醒</li>
                      <li>• 重要账户安全通知</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 账户操作 */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">账户操作</h3>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>退出登录</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <LanguageProvider>
      <ProfileContent />
    </LanguageProvider>
  );
}