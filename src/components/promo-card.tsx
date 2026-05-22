"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface PromoCardProps {
  promos: string[];
}

// 团购促销文案卡片组件
export function PromoCard({ promos }: PromoCardProps) {
  const allPromosText = promos.map((p, i) => `${i + 1}. ${p}`).join("\n");

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-red-500" />
            团购文案
            <Badge variant="accent" className="ml-1">
              {promos.length}条
            </Badge>
          </CardTitle>
          <CopyButton text={allPromosText} label="复制全部" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {promos.map((promo, index) => (
          <div
            key={index}
            className="group flex items-start gap-3 p-2.5 rounded-lg bg-gradient-to-r from-red-50 to-transparent hover:from-red-100 transition-colors"
          >
            <span className="text-xs text-red-500 font-bold mt-0.5">
              {index + 1}
            </span>
            <span className="text-sm flex-1 leading-relaxed font-medium">
              {promo}
            </span>
            <CopyButton
              text={promo}
              label=""
              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
