import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    const { token, financialData, title } = await request.json();

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

    // 生成默认标题（如果没有提供）
    const analysisTitle = title || `财务分析 - ${new Date().toLocaleDateString('zh-CN')}`;

    // 创建新的财务数据记录
    const savedData = await prisma.userFinancialData.create({
      data: {
        userId: session.userId,
        title: analysisTitle,
        dataSnapshot: financialData
      }
    });

    return NextResponse.json({
      success: true,
      data: savedData,
      id: savedData.id
    }, { status: 201 });

    return NextResponse.json({
      success: true,
      data: savedData
    });

  } catch (error) {
    console.error('Save financial data error:', error);
    return NextResponse.json(
      { error: '保存财务数据失败' },
      { status: 500 }
    );
  }
}