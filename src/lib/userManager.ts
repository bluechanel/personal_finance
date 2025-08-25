import { FinancialData } from '@/types/financial';

// 用户数据类型定义
export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: User;
  token?: string;
}

export interface FinancialDataResponse {
  success: boolean;
  error?: string;
  data?: FinancialData;
}

export interface FinancialAnalysis {
  id: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialAnalysisDetail {
  data: FinancialData;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

// 客户端用户管理类
export class UserManager {
  // 注册新用户
  public async register(username: string, password: string, email?: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || '注册失败' };
      }

      return { success: true, message: '注册成功', user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: '网络错误，请重试' };
    }
  }

  // 用户登录
  public async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || '登录失败' };
      }

      return { 
        success: true, 
        message: '登录成功', 
        user: data.user, 
        token: data.token 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: '网络错误，请重试' };
    }
  }

  // 验证会话令牌
  public async validateSession(token: string): Promise<User | null> {
    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return null;
      }

      return data.user;
    } catch (error) {
      console.error('Session validation error:', error);
      return null;
    }
  }

  // 保存用户财务数据
  public async saveFinancialData(token: string, financialData: FinancialData, title?: string): Promise<{ success: boolean; id?: string }> {
    try {
      const response = await fetch('/api/financial/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, financialData, title }),
      });

      const data = await response.json();
      return { success: data.success, id: data.id };
    } catch (error) {
      console.error('Save financial data error:', error);
      return { success: false };
    }
  }

  // 获取用户财务数据历史记录列表
  public async getFinancialAnalysesList(token: string): Promise<FinancialAnalysis[]> {
    try {
      const response = await fetch('/api/financial/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      return data.success ? data.analyses : [];
    } catch (error) {
      console.error('Get financial analyses list error:', error);
      return [];
    }
  }

  // 获取单个财务分析详情
  public async getFinancialAnalysis(token: string, analysisId: string): Promise<FinancialAnalysisDetail | null> {
    try {
      const response = await fetch('/api/financial/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, analysisId }),
      });

      const data = await response.json();
      return data.success ? data : null;
    } catch (error) {
      console.error('Get financial analysis error:', error);
      return null;
    }
  }

  // 删除财务分析
  public async deleteFinancialAnalysis(token: string, analysisId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/financial/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, analysisId }),
      });

      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Delete financial analysis error:', error);
      return false;
    }
  }

  // 获取用户财务数据
  public async getFinancialData(token: string): Promise<FinancialData | null> {
    try {
      const response = await fetch('/api/financial/load', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return null;
      }

      return data.data;
    } catch (error) {
      console.error('Get financial data error:', error);
      return null;
    }
  }
}

// 导出单例实例
export const userManager = new UserManager();