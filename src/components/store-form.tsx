"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESTAURANT_TYPES, TARGET_AUDIENCES } from "@/lib/types";
import type { StoreInfo, RestaurantType } from "@/lib/types";
import { Sparkles, Loader2 } from "lucide-react";

interface StoreFormProps {
  onSubmit: (data: StoreInfo) => void;
  isLoading?: boolean;
}

// 店铺信息输入表单
export function StoreForm({ onSubmit, isLoading }: StoreFormProps) {
  const [formData, setFormData] = React.useState<StoreInfo>({
    name: "",
    type: "烧烤",
    city: "",
    avgPrice: "",
    signatureDishes: "",
    promotions: "",
    features: "",
    targetAudience: "",
  });

  // 更新表单字段
  const updateField = <K extends keyof StoreInfo>(
    key: K,
    value: StoreInfo[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          店铺信息
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 店铺名称 */}
          <div className="space-y-1.5">
            <Label htmlFor="name">店铺名称 *</Label>
            <Input
              id="name"
              placeholder="例如：张三烧烤"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          {/* 餐饮类型 */}
          <div className="space-y-1.5">
            <Label>餐饮类型 *</Label>
            <Select
              value={formData.type}
              onValueChange={(v) => updateField("type", v as RestaurantType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择餐饮类型" />
              </SelectTrigger>
              <SelectContent>
                {RESTAURANT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 城市 */}
          <div className="space-y-1.5">
            <Label htmlFor="city">所在城市 *</Label>
            <Input
              id="city"
              placeholder="例如：杭州"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              required
            />
          </div>

          {/* 人均消费 */}
          <div className="space-y-1.5">
            <Label htmlFor="avgPrice">人均消费</Label>
            <Input
              id="avgPrice"
              placeholder="例如：50元"
              value={formData.avgPrice}
              onChange={(e) => updateField("avgPrice", e.target.value)}
            />
          </div>

          {/* 招牌菜 */}
          <div className="space-y-1.5">
            <Label htmlFor="signatureDishes">招牌菜/特色菜</Label>
            <Textarea
              id="signatureDishes"
              placeholder="例如：秘制烤羊腿、蒜蓉生蚝、烤茄子"
              value={formData.signatureDishes}
              onChange={(e) => updateField("signatureDishes", e.target.value)}
              rows={2}
            />
          </div>

          {/* 优惠活动 */}
          <div className="space-y-1.5">
            <Label htmlFor="promotions">当前优惠活动</Label>
            <Textarea
              id="promotions"
              placeholder="例如：双人套餐59元、啤酒买一送一"
              value={formData.promotions}
              onChange={(e) => updateField("promotions", e.target.value)}
              rows={2}
            />
          </div>

          {/* 店铺特色 */}
          <div className="space-y-1.5">
            <Label htmlFor="features">店铺特色</Label>
            <Textarea
              id="features"
              placeholder="例如：10年老店、炭火现烤、食材新鲜"
              value={formData.features}
              onChange={(e) => updateField("features", e.target.value)}
              rows={2}
            />
          </div>

          {/* 目标客群 */}
          <div className="space-y-1.5">
            <Label>目标客群</Label>
            <Select
              value={formData.targetAudience}
              onValueChange={(v) => updateField("targetAudience", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择目标客群" />
              </SelectTrigger>
              <SelectContent>
                {TARGET_AUDIENCES.map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 生成按钮 */}
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full mt-6"
            disabled={isLoading || !formData.name || !formData.city}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                正在生成...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                一键生成爆款内容
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
