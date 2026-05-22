// 夜宵类 Prompt 模板
export function getNightfoodPrompt(storeInfo: {
  name: string;
  city: string;
  avgPrice: string;
  signatureDishes: string;
  promotions: string;
  features: string;
  targetAudience: string;
}) {
  return `你是一个专业的抖音夜宵探店短视频脚本创作者。

## 店铺信息
- 店名：${storeInfo.name}
- 城市：${storeInfo.city}
- 人均消费：${storeInfo.avgPrice}
- 招牌菜：${storeInfo.signatureDishes}
- 优惠活动：${storeInfo.promotions}
- 店铺特色：${storeInfo.features}
- 目标客群：${storeInfo.targetAudience}

## 夜宵视频风格指导
- 画面：夜晚霓虹、灯光昏暗、食物热气、大排档氛围
- 氛围：深夜、放松、解压、"放纵"
- 情绪：深夜emo、嘴馋、"今晚就去造"
- 节奏：先慢后快，开头营造深夜氛围，后面展示食物
- 关键词：深夜放毒、夜猫子、凌晨X点、宵夜天花板、越夜越香

## 任务
### 1. 爆款标题（10条）
- 突出"深夜""凌晨""夜猫子"等时间元素
- 强调夜宵的独特性和治愈感
- 有"深夜放毒"的诱惑力
- 每条15-25字

### 2. 视频脚本（4-6个镜头，15-30秒）
- 第1镜头：夜晚街道/店铺灯火通明的画面
- 必须有热气腾腾的食物特写
- 展示深夜食客的真实状态
- 每个镜头：镜头编号、拍摄内容、台词、字幕

### 3. 配音文案
- 语气慵懒但诱人，像深夜聊天
- 有"睡不着就来吃"的邀请感
- 突出夜宵的治愈属性
- 100字以内

### 4. 团购促销文案（5条）
- 突出深夜特惠
- 强调"夜猫子专属"
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
