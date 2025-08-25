import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/utils/jwt';
import { validateEmail } from '@/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

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

    // 验证邮箱格式（如果提供了邮箱）
    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      );
    }

    // 检查邮箱是否已被其他用户使用
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
          id: {
            not: session.userId
          }
        }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: '该邮箱已被其他用户使用' },
          { status: 400 }
        );
      }
    }

    // 更新用户邮箱
    const updatedUser = await prisma.user.update({
      where: {
        id: session.userId
      },
      data: {
        email: email ? email.toLowerCase() : null,
        updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('Update email error:', error);
    return NextResponse.json(
      { error: '更新邮箱失败，请稍后重试' },
      { status: 500 }
    );
  }
}