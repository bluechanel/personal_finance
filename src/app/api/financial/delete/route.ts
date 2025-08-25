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

    // 删除指定的财务分析记录（确保只能删除自己的数据）
    const deletedRecord = await prisma.userFinancialData.deleteMany({
      where: {
        id: analysisId,
        userId: session.userId
      }
    });

    if (deletedRecord.count === 0) {
      return NextResponse.json(
        { error: '财务分析记录不存在或无权限删除' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '财务分析已删除'
    });

  } catch (error) {
    console.error('Delete financial analysis error:', error);
    return NextResponse.json(
      { error: '删除财务分析失败' },
      { status: 500 }
    );
  }
}