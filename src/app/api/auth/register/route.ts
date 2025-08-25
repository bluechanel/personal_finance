import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/utils/auth';
import { validatePassword, validateUsername } from '@/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();

    // 验证输入
    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }

    // 验证用户名格式
    if (!validateUsername(username)) {
      return NextResponse.json(
        { error: '用户名格式不正确，需要3-20个字符，支持字母、数字、下划线和中文' },
        { status: 400 }
      );
    }

    // 验证密码强度
    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: '密码强度不足，至少6个字符，包含至少两种类型的字符' },
        { status: 400 }
      );
    }

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '用户名已存在' },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在（如果提供了邮箱）
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: '邮箱已存在' },
          { status: 400 }
        );
      }
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        password: hashedPassword,
        email: email ? email.toLowerCase() : null,
        salt: '', // bcryptjs不需要单独存储盐值
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
      user
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}