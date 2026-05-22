// 奶茶/咖啡类 Prompt 模板
export function getDrinkPrompt(storeInfo: {
  name: string;
  city: string;
  avgPrice: string;
  signatureDishes: string;
  promotions: string;
  features: string;
  targetAudience: string;
}) {
  return `你是一个专业的抖音奶茶/咖啡探店短视频脚本创作者。

## 店铺信息
- 店名：${storeInfo.name}
- 城市：${storeInfo.city}
- 人均消费：${storeInfo.avgPrice}
- 招牌饮品：${storeInfo.signatureDishes}
- 优惠活动：${storeInfo.promotions}
- 店铺特色：${storeInfo.features}
- 目标客群：${storeInfo.targetAudience}

## 奶茶/咖啡视频风格指导
- 画面：制作过程、杯身颜值、拉花/分层特写、吸管插入瞬间
- 氛围：清新、时尚、年轻人、打卡
- 情绪：治愈、小确幸、颜值即正义、"必须拥有"
- 节奏：中等节奏，展示细节和颜值
- 关键词：神仙颜值、好喝到哭、一口上头、回购无数次、XX元喝到

## 任务
### 1. 爆款标题（10条）
- 突出饮品颜值和口感
- 强调"便宜好喝""学生党友好"
- 有"闺蜜必喝""下午茶首选"等社交属性
- 每条15-25字

### 2. 视频脚本（4-6个镜头，15-30秒）
- 第1镜头：成品饮品特写（分层/拉花/颜值）
- 展示制作过程（选料/调配/出品）
- 有第一口喝到的反应镜头
- 每个镜头：镜头编号、拍摄内容、台词、字幕

### 3. 配音文案
- 语气清新，有少女感/年轻感
- 突出口感和颜值
- 有"推荐必点"的感觉
- 100字以内

### 4. 团购促销文案（5条）
- 突出买一送一/第二杯半价等优惠
- 强调性价比
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
