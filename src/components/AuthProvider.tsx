"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, userManager } from '@/lib/userManager';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  register: (username: string, password: string, email?: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// 客户端会话存储
const SESSION_STORAGE_KEY = 'finance_app_session';

function getStoredSession(): { token: string; user: User } | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setStoredSession(token: string, user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ token, user }));
}

function removeStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查用户登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedSession = getStoredSession();
        if (storedSession) {
          // 验证存储的会话
          const validUser = await userManager.validateSession(storedSession.token);
          if (validUser) {
            setUser(validUser);
            setToken(storedSession.token);
          } else {
            // 会话无效，清理存储
            removeStoredSession();
            setUser(null);
            setToken(null);
          }
        }
      } catch (error) {
        console.error('检查认证状态失败:', error);
        removeStoredSession();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await userManager.login(username, password);
      if (result.success && result.user && result.token) {
        setUser(result.user);
        setToken(result.token);
        setStoredSession(result.token, result.user);
        return { success: true, message: result.message };
      }
      return { success: false, error: result.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: '登录失败，请重试' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string, email?: string) => {
    setIsLoading(true);
    try {
      const result = await userManager.register(username, password, email);
      if (result.success) {
        // 注册成功后自动登录
        const loginResult = await userManager.login(username, password);
        if (loginResult.success && loginResult.user && loginResult.token) {
          setUser(loginResult.user);
          setToken(loginResult.token);
          setStoredSession(loginResult.token, loginResult.user);
        }
        return { success: true, message: result.message };
      }
      return { success: false, error: result.error };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: '注册失败，请重试' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      removeStoredSession();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('登出失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    const storedSession = getStoredSession();
    if (storedSession && storedSession.token) {
      try {
        const validUser = await userManager.validateSession(storedSession.token);
        if (validUser) {
          setUser(validUser);
          // 更新存储的用户信息
          setStoredSession(storedSession.token, validUser);
        }
      } catch (error) {
        console.error('刷新用户信息失败:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}