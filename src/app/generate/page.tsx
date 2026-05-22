"use client";

import * as React from "react";
import Link from "next/link";
import { StoreForm } from "@/components/store-form";
import { ResultPanel } from "@/components/result-panel";
import { Button } from "@/components/ui/button";
import { generateContent } from "@/actions/generate";
import { ArrowLeft, History } from "lucide-react";
import type { StoreInfo, GenerationResult } from "@/lib/types";

// 生成页面
export default function GeneratePage() {
  const [result, setResult] = React.useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // 处理生成请求
  const handleGenerate = async (storeInfo: StoreInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateContent(storeInfo);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "生成失败，请重试");
      }
    } catch (err) {
      setError("网络错误，请检查连接后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-base font-medium">生成爆款内容</h1>
          </div>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              <History className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">历史</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 错误提示 */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：表单 */}
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <StoreForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>

          {/* 右侧：结果 */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <ResultPanel result={result} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
