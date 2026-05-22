"use client";

import { TitleCard } from "@/components/title-card";
import { ScriptCard } from "@/components/script-card";
import { VoiceoverCard } from "@/components/voiceover-card";
import { PromoCard } from "@/components/promo-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Sparkles } from "lucide-react";
import type { GenerationResult } from "@/lib/types";

interface ResultPanelProps {
  result: GenerationResult | null;
  isLoading: boolean;
}

// 生成结果展示面板
export function ResultPanel({ result, isLoading }: ResultPanelProps) {
  // 加载状态
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-muted animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-red-500" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">AI 正在创作中...</p>
          <p className="text-xs text-muted-foreground">
            正在为您生成爆款内容，请稍候
          </p>
        </div>
      </div>
    );
  }

  // 空状态
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">填写店铺信息开始生成</p>
          <p className="text-xs text-muted-foreground max-w-[240px]">
            AI 将为您生成爆款标题、视频脚本、配音文案和团购文案
          </p>
        </div>
      </div>
    );
  }

  // 展示结果
  return (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
      <div className="space-y-4 pb-8">
        <TitleCard titles={result.titles} />
        <ScriptCard script={result.video_script} />
        <VoiceoverCard voiceover={result.voiceover} />
        <PromoCard promos={result.promotion_copy} />
      </div>
    </ScrollArea>
  );
}
