import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    const { token, analysisId } = await request.json();

    if (!token || !analysisId) {
      return NextResponse.json(
        { error: '令牌和分析ID不能为空' },
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

    // 获取指定的财务分析记录
    const financialData = await prisma.userFinancialData.findFirst({
      where: {
        id: analysisId,
        userId: session.userId // 确保只能访问自己的数据
      }
    });

    if (!financialData) {
      return NextResponse.json(
        { error: '财务分析记录不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: financialData.dataSnapshot,
      title: financialData.title,
      createdAt: financialData.createdAt,
      updatedAt: financialData.updatedAt
    });

  } catch (error) {
    console.error('Get financial analysis error:', error);
    return NextResponse.json(
      { error: '获取财务分析失败' },
      { status: 500 }
    );
  }
}