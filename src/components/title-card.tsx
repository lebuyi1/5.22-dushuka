"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Type } from "lucide-react";

interface TitleCardProps {
  titles: string[];
}

// 爆款标题卡片组件
export function TitleCard({ titles }: TitleCardProps) {
  // 将所有标题合并为一个文本用于复制全部
  const allTitlesText = titles.map((t, i) => `${i + 1}. ${t}`).join("\n");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Type className="h-4 w-4 text-red-500" />
            爆款标题
            <Badge variant="accent" className="ml-1">
              {titles.length}条
            </Badge>
          </CardTitle>
          <CopyButton text={allTitlesText} label="复制全部" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {titles.map((title, index) => (
          <div
            key={index}
            className="group flex items-start gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <span className="text-xs text-muted-foreground font-mono mt-0.5 min-w-[20px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm flex-1 leading-relaxed">{title}</span>
            <CopyButton
              text={title}
              label=""
              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
