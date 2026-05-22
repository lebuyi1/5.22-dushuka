"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Trash2, Eye, ChevronRight } from "lucide-react";
import type { GenerationRecord, StoreRecord } from "@/lib/types";

interface HistoryItemProps {
  record: GenerationRecord & { store: StoreRecord };
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

// 历史记录条目组件
export function HistoryItem({ record, onDelete, onView }: HistoryItemProps) {
  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {record.store?.name || "未知店铺"}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">
              {record.store?.type}
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">
              {formatDate(record.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* 预览内容 */}
        <div className="space-y-2 text-sm">
          {record.titles?.slice(0, 2).map((title, i) => (
            <p key={i} className="text-muted-foreground truncate">
              {title}
            </p>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div className="flex items-center gap-1">
            <CopyButton
              text={record.titles?.join("\n") || ""}
              label="标题"
              className="text-xs h-7"
            />
            <CopyButton
              text={record.voiceover || ""}
              label="口播"
              className="text-xs h-7"
            />
          </div>
          <div className="flex items-center gap-1">
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(record.id)}
                className="text-xs h-7"
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                查看
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(record.id)}
                className="text-xs h-7 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
