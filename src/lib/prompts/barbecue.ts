// 烧烤类 Prompt 模板
export function getBarbecuePrompt(storeInfo: {
  name: string;
  city: string;
  avgPrice: string;
  signatureDishes: string;
  promotions: string;
  features: string;
  targetAudience: string;
}) {
  return `你是一个专业的抖音烧烤探店短视频脚本创作者。

## 店铺信息
- 店名：${storeInfo.name}
- 城市：${storeInfo.city}
- 人均消费：${storeInfo.avgPrice}
- 招牌菜：${storeInfo.signatureDishes}
- 优惠活动：${storeInfo.promotions}
- 店铺特色：${storeInfo.features}
- 目标客群：${storeInfo.targetAudience}

## 烧烤视频风格指导
- 画面：炭火特写、肉串滋滋冒油、啤酒碰撞、烟火气息
- 氛围：烟火气、接地气、深夜食堂、朋友聚会
- 情绪：豪爽、放松、满足、"造起来"
- 节奏：快切镜头，食物特写要多
- 关键词：滋滋冒油、炭火、真香、停不下来、人均XX吃到撑

## 任务
### 1. 爆款标题（10条）
- 突出烧烤的视觉冲击（冒油、炭火、大串）
- 强调性价比（人均XX吃到撑）
- 制造深夜放毒的冲动
- 每条15-25字

### 2. 视频脚本（4-6个镜头，15-30秒）
- 第1个镜头必须是烧烤特写（冒油/炭火），前3秒视觉冲击
- 必须有食物制作过程的镜头
- 展示食客大快朵颐的真实状态
- 每个镜头：镜头编号、拍摄内容、台词、字幕

### 3. 配音文案
- 语气豪爽，像朋友推荐好店
- 突出"性价比"和"真材实料"
- 有"深夜放毒"的感染力
- 100字以内

### 4. 团购促销文案（5条）
- 突出套餐优惠力度
- 强调适合多人聚餐
- 每条15-30字

## 输出格式
严格JSON格式：

{
  "titles": ["标题1", "标题2", ...],
  "video_script": [
    {
      "镜头": "镜头1",
      "拍摄内容": "具体的拍摄指导",
      "台词": "口播台词",
      "字幕": "显示字幕"
    }
  ],
  "voiceover": "完整口播文案",
  "promotion_copy": ["文案1", "文案2", ...]
}`;
}
