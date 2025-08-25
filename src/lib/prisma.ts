import { PrismaClient } from '@prisma/client';

// 检查必要的环境变量
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL 环境变量未设置。请在 Vercel 项目设置中添加 DATABASE_URL 环境变量。'
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 客户端配置
const isDevelopment = process.env.NODE_ENV === 'development';

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}