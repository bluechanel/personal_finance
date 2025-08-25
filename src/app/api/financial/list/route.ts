import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: '令牌不能为空' },
        { status: 400 }
      );
    }

    // 验证JWT令牌
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '无效的令牌' },
        { status: 401 }
      );
    }

    // 查找有效会话
    const session = await prisma.authSession.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!session) {
      return NextResponse.json(
        { error: '会话已过期' },
        { status: 401 }
      );
    }

    // 获取用户的所有财务分析记录
    const financialAnalyses = await prisma.userFinancialData.findMany({
      where: {
        userId: session.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        // 不返回完整的数据快照，减少传输量
      }
    });

    return NextResponse.json({
      success: true,
      analyses: financialAnalyses
    });

  } catch (error) {
    console.error('Get financial analyses error:', error);
    return NextResponse.json(
      { error: '获取财务分析历史失败' },
      { status: 500 }
    );
  }
}