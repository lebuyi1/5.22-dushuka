# 餐饮短视频爆款脚本生成器

帮助餐饮商家持续低成本生产抖音内容的 AI 工具。

## 功能

- **爆款标题生成** - 10条强钩子标题
- **视频脚本生成** - 4-6个镜头的完整拍摄指导
- **配音文案生成** - 接地气的口播稿
- **团购文案生成** - 5条促销文案
- **一键复制** - 快速复制任意内容
- **历史记录** - 保存所有生成记录

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Supabase (PostgreSQL)
- OpenAI API

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，填入以下配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI API
OPENAI_API_KEY=sk-xxx
```

### 3. 初始化数据库

在 Supabase 控制台的 SQL Editor 中执行 `supabase-schema.sql` 脚本。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
src/
├── app/                    # 页面
│   ├── page.tsx           # 首页
│   ├── generate/page.tsx  # 生成页
│   └── history/page.tsx   # 历史页
├── components/            # 组件
│   ├── ui/               # shadcn/ui 基础组件
│   ├── store-form.tsx    # 店铺表单
│   ├── result-panel.tsx  # 结果展示
│   ├── title-card.tsx    # 标题卡片
│   ├── script-card.tsx   # 脚本卡片
│   ├── voiceover-card.tsx # 配音卡片
│   ├── promo-card.tsx    # 团购卡片
│   └── copy-button.tsx   # 复制按钮
├── lib/
│   ├── supabase/         # Supabase 客户端
│   ├── prompts/          # AI Prompt 模板
│   │   ├── barbecue.ts   # 烧烤类
│   │   ├── hotpot.ts     # 火锅类
│   │   ├── snack.ts      # 小吃类
│   │   ├── drink.ts      # 奶茶/咖啡类
│   │   ├── nightfood.ts  # 夜宵类
│   │   └── general.ts    # 通用
│   ├── openai.ts         # OpenAI 客户端
│   ├── types.ts          # 类型定义
│   └── utils.ts          # 工具函数
└── actions/
    ├── generate.ts       # AI 生成 Server Action
    └── history.ts        # 历史记录 Server Action
```

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

## 支持的餐饮类型

- 烧烤
- 火锅
- 小吃
- 奶茶/咖啡
- 夜宵
- 中餐
- 西餐
- 其他

每种类型都有专门优化的 Prompt 模板，生成更精准的内容。
