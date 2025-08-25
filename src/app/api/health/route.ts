import { NextResponse } from 'next/server';
import { validateEnvironment } from '@/utils/env';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 验证环境变量
    validateEnvironment();
    
    // 测试数据库连接
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      success: true,
      message: '✅ 环境变量和数据库连接正常',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      prismaVersion: '6.14.0'
    });
    
  } catch (err) {
    console.error('Health check failed:', err);
    
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      message: '❌ 环境变量或数据库连接失败',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}