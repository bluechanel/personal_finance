import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

// 生成随机盐值
export function generateSalt(): string {
  return randomBytes(32).toString('hex');
}

// 使用bcrypt加密密码
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// 验证密码
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// 生成会话令牌
export function generateToken(): string {
  return randomBytes(64).toString('hex');
}

// 验证用户名格式
export function validateUsername(username: string): { valid: boolean; message?: string } {
  if (username.length < 3) {
    return { valid: false, message: '用户名至少需要3个字符' };
  }
  if (username.length > 20) {
    return { valid: false, message: '用户名不能超过20个字符' };
  }
  if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
    return { valid: false, message: '用户名只能包含字母、数字、下划线和中文字符' };
  }
  return { valid: true };
}

// 验证密码强度
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: '密码至少需要6个字符' };
  }
  if (password.length > 50) {
    return { valid: false, message: '密码不能超过50个字符' };
  }
  
  let score = 0;
  const checks = [
    /[a-z]/, // 小写字母
    /[A-Z]/, // 大写字母
    /[0-9]/, // 数字
    /[^a-zA-Z0-9]/, // 特殊字符
  ];
  
  checks.forEach(check => {
    if (check.test(password)) score++;
  });
  
  if (score < 2) {
    return { valid: false, message: '密码需要包含至少两种类型的字符（大小写字母、数字、特殊字符）' };
  }
  
  return { valid: true };
}

// 验证邮箱格式（可选）
export function validateEmail(email: string): { valid: boolean; message?: string } {
  if (!email) return { valid: true }; // 邮箱是可选的
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: '请输入有效的邮箱地址' };
  }
  return { valid: true };
}