// 通用餐饮类 Prompt 模板
export function getGeneralPrompt(storeInfo: {
  name: string;
  city: string;
  avgPrice: string;
  signatureDishes: string;
  promotions: string;
  features: string;
  targetAudience: string;
}) {
  return `你是一个专业的抖音餐饮短视频脚本创作者，精通本地生活内容创作。

## 店铺信息
- 店名：${storeInfo.name}
- 城市：${storeInfo.city}
- 人均消费：${storeInfo.avgPrice}
- 招牌菜：${storeInfo.signatureDishes}
- 优惠活动：${storeInfo.promotions}
- 店铺特色：${storeInfo.features}
- 目标客群：${storeInfo.targetAudience}

## 任务
根据以上店铺信息，生成以下内容：

### 1. 爆款标题（10条）
要求：
- 强钩子，前3秒吸引注意力
- 本地生活风格，带有城市标签
- 抖音餐饮爆款标题风格
- 下沉市场风格，接地气
- 包含数字、悬念、冲突、好奇心元素
- 每条标题控制在15-25字

### 2. 视频脚本（4-6个镜头，总时长15-30秒）
要求：
- 每个镜头包含：镜头编号、拍摄内容（指导拍摄）、台词（口播内容）、字幕（视频字幕）
- 前3秒必须有强吸引（悬念/冲突/视觉冲击）
- 节奏快，信息密度高
- 画面感强，指导清晰
- 符合抖音探店/美食视频风格

### 3. 配音文案（完整口播稿）
要求：
- 接地气，像真人探店口吻
- 有情绪起伏，有"捡便宜"的感觉
- 口语化，不要书面语
- 有互动引导（点赞/收藏/评论）
- 控制在100字以内

### 4. 团购促销文案（5条）
要求：
- 突出性价比
- 制造紧迫感
- 适合抖音本地生活团购页面
- 包含价格/优惠信息
- 每条15-30字

## 输出格式
请严格以JSON格式输出，不要包含任何其他文字：

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
