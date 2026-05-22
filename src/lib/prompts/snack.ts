// 小吃类 Prompt 模板
export function getSnackPrompt(storeInfo: {
  name: string;
  city: string;
  avgPrice: string;
  signatureDishes: string;
  promotions: string;
  features: string;
  targetAudience: string;
}) {
  return `你是一个专业的抖音小吃街/小吃店短视频脚本创作者。

## 店铺信息
- 店名：${storeInfo.name}
- 城市：${storeInfo.city}
- 人均消费：${storeInfo.avgPrice}
- 招牌菜：${storeInfo.signatureDishes}
- 优惠活动：${storeInfo.promotions}
- 店铺特色：${storeInfo.features}
- 目标客群：${storeInfo.targetAudience}

## 小吃视频风格指导
- 画面：制作过程特写、出锅瞬间、咬开流心/爆汁
- 氛围：街头、热闹、人排队、烟火气
- 情绪：嘴馋、冲动消费、"路过必买"
- 节奏：快节奏，连续切换食物，让人应接不暇
- 关键词：排队、网红、老店、几块钱、路过必吃、从小吃到大

## 任务
### 1. 爆款标题（10条）
- 突出"排队""网红""老店"等元素
- 强调价格便宜、分量足
- 制造"路过不买就亏了"的冲动
- 每条15-25字

### 2. 视频脚本（4-6个镜头，15-30秒）
- 第1镜头：食物出锅/制作完成的瞬间特写
- 展示制作过程（手法娴熟/独家秘方）
- 有顾客排队/大口吃的真实画面
- 每个镜头：镜头编号、拍摄内容、台词、字幕

### 3. 配音文案
- 语气活泼，像本地人推荐宝藏小店
- 突出"便宜""好吃""排队也值"
- 有"你一定要来试试"的推荐感
- 100字以内

### 4. 团购促销文案（5条）
- 突出单品优惠
- 强调"XX元任选X样"
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
