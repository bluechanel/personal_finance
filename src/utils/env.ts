// 环境变量验证工具
export function validateEnvironment() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'DIRECT_URL',
    'NEXTAUTH_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ 缺少必要的环境变量:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\n🔧 请在 Vercel 项目设置中添加以下环境变量:');
    console.error('   Dashboard → Project → Settings → Environment Variables');
    console.error('\n📝 参考 .env.example 文件获取变量格式说明');
    
    throw new Error(
      `缺少必要的环境变量: ${missingVars.join(', ')}. 请在 Vercel 项目设置中配置这些变量。`
    );
  }

  console.log('✅ 所有必要的环境变量已配置');
  return true;
}

// 开发环境检查
export function checkDevelopmentEnvironment() {
  if (process.env.NODE_ENV === 'development') {
    try {
      validateEnvironment();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.warn('⚠️  开发环境警告:', errorMessage);
      console.warn('💡 提示: 请复制 .env.example 为 .env 并配置环境变量');
    }
  }
}