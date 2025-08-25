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

    // 查找会话记录
    const session = await prisma.authSession.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          }
        }
      }
    });

    if (!session) {
      return NextResponse.json(
        { error: '会话已过期' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: session.user
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json(
      { error: '会话验证失败' },
      { status: 500 }
    );
  }
}