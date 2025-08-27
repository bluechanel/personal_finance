# 💰 个人财务分析工具

这是一个基于 Next.js 的个人财务分析工具，帮助用户管理和分析个人财务状况。

## 🚀 功能特性

- 📊 **财务分析**: 全面的个人财务健康评估
- 👤 **用户系统**: 安全的用户注册和登录
- 🔒 **数据安全**: 基于 Supabase 的云端数据存储
- 📱 **响应式设计**: 支持桌面和移动端
- 🌐 **多语言支持**: 中英文双语界面
- 📈 **历史记录**: 财务分析历史记录管理

## 🛠 技术栈

- **前端框架**: Next.js 15.5.0 (App Router)
- **样式**: Tailwind CSS 4
- **数据库**: Supabase PostgreSQL
- **ORM**: Prisma
- **认证**: 自定义 JWT 认证系统
- **图表库**: Recharts
- **类型检查**: TypeScript
- **代码质量**: ESLint

## 📦 安装和运行

### 前置要求
- Node.js 18+
- npm 或 yarn
- Supabase 项目

### 1. 克隆项目
```bash
git clone <repository-url>
cd personal-finance
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
复制 `.env.example` 为 `.env` 并配置环境变量：
```bash
cp .env.example .env
```

配置以下环境变量：
- `DATABASE_URL`: Supabase 连接池 URL
- `DIRECT_URL`: Supabase 直连 URL  
- `NEXTAUTH_SECRET`: JWT 密钥
- `OPENAI_BASE_URL`: API Base
- `OPENAI_API_KEY`: API Key  
- `OPENAI_MODEL_NAME`: 模型名称

### 4. 数据库初始化
```bash
npm run db:push
```

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📋 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查
- `npm run db:generate` - 生成 Prisma 客户端
- `npm run db:push` - 推送数据库结构
- `npm run db:studio` - 打开 Prisma Studio

## 🚀 Vercel 部署

### 1. 环境变量配置
在 Vercel 项目设置中添加以下环境变量：
```
DATABASE_URL=your_supabase_pooled_connection_string
DIRECT_URL=your_supabase_direct_connection_string  
NEXTAUTH_SECRET=your_secure_jwt_secret_key
```

### 2. 部署设置
- 构建命令: `prisma generate && npm run build`
- 安装命令: `npm install && npx prisma generate`
- 输出目录: `.next`

### 3. 自动部署
推送到 GitHub 仓库后，Vercel 会自动部署。

## 🔧 项目结构

```
src/
├── app/                 # Next.js App Router 页面
│   ├── api/            # API 路由
│   ├── auth/           # 认证页面
│   └── profile/        # 个人资料页面
├── components/         # React 组件
├── contexts/          # React Context
├── lib/               # 工具库
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
└── locales/           # 多语言配置
```

## 🛡 安全特性

- JWT 令牌认证
- bcryptjs 密码加密
- 输入验证和清理
- CORS 保护
- XSS 防护头部
- 安全的环境变量管理

## 📈 性能优化

- Next.js 图片优化
- 代码分割和懒加载
- 服务端渲染 (SSR)
- 静态生成 (SSG)
- PWA 支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
