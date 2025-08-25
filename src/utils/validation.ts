// 验证用户名格式
export function validateUsername(username: string): boolean {
  if (!username || username.length < 3 || username.length > 20) {
    return false;
  }
  
  // 支持字母、数字、下划线和中文字符
  const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  return usernameRegex.test(username);
}

// 验证密码强度
export function validatePassword(password: string): boolean {
  if (!password || password.length < 6) {
    return false;
  }
  
  // 检查是否包含至少两种类型的字符
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const typesCount = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  
  return typesCount >= 2;
}

// 验证邮箱格式
export function validateEmail(email: string): boolean {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}