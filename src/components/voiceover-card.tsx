"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Mic } from "lucide-react";

interface VoiceoverCardProps {
  voiceover: string;
}

// 配音文案卡片组件
export function VoiceoverCard({ voiceover }: VoiceoverCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Mic className="h-4 w-4 text-red-500" />
            配音文案
          </CardTitle>
          <CopyButton text={voiceover} label="复制文案" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg bg-muted/50 text-sm leading-relaxed whitespace-pre-wrap">
          {voiceover}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          字数：{voiceover.length}字
        </p>
      </CardContent>
    </Card>
  );
}
