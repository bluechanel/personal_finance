import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 尝试连接数据库
    await prisma.$connect();
    
    // 简单查询测试
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    return NextResponse.json({ 
      success: true, 
      message: '数据库连接成功',
      result 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: '数据库连接失败',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}