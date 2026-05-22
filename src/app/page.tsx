import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, History, ArrowRight } from "lucide-react";

// 首页
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-white to-gray-50">
      {/* Logo 和标题 */}
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black shadow-lg">
          <Sparkles className="h-10 w-10 text-white" />
        </div>

        {/* 标题 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            餐饮爆款脚本
          </h1>
          <p className="text-lg text-muted-foreground">
            AI 帮你生成抖音爆款内容
          </p>
        </div>

        {/* 特性列表 */}
        <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-muted">爆款标题</span>
          <span className="px-3 py-1 rounded-full bg-muted">视频脚本</span>
          <span className="px-3 py-1 rounded-full bg-muted">配音文案</span>
          <span className="px-3 py-1 rounded-full bg-muted">团购文案</span>
        </div>

        {/* CTA 按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/generate">
            <Button variant="accent" size="lg" className="w-full sm:w-auto">
              <Sparkles className="mr-2 h-4 w-4" />
              开始生成
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <History className="mr-2 h-4 w-4" />
              历史记录
            </Button>
          </Link>
        </div>
      </div>

      {/* 底部说明 */}
      <p className="mt-16 text-xs text-muted-foreground text-center">
        帮助餐饮商家持续低成本生产抖音内容
      </p>
    </main>
  );
}
