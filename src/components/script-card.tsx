"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Video } from "lucide-react";
import type { VideoScriptItem } from "@/lib/types";

interface ScriptCardProps {
  script: VideoScriptItem[];
}

// 视频脚本卡片组件
export function ScriptCard({ script }: ScriptCardProps) {
  // 将脚本格式化为可读文本用于复制
  const formatScript = (items: VideoScriptItem[]) => {
    return items
      .map(
        (item) =>
          `【${item.镜头}】\n拍摄内容：${item.拍摄内容}\n台词：${item.台词}\n字幕：${item.字幕}`
      )
      .join("\n\n");
  };

  const allScriptText = formatScript(script);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Video className="h-4 w-4 text-red-500" />
            视频脚本
            <Badge variant="secondary">{script.length}个镜头</Badge>
          </CardTitle>
          <CopyButton text={allScriptText} label="复制脚本" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {script.map((item, index) => (
          <div key={index}>
            {index > 0 && <Separator className="mb-4" />}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {item.镜头}
                </Badge>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-muted-foreground min-w-[56px] shrink-0">
                    拍摄：
                  </span>
                  <span className="leading-relaxed">{item.拍摄内容}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground min-w-[56px] shrink-0">
                    台词：
                  </span>
                  <span className="leading-relaxed text-foreground font-medium">
                    {item.台词}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground min-w-[56px] shrink-0">
                    字幕：
                  </span>
                  <span className="leading-relaxed text-red-500">
                    {item.字幕}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
