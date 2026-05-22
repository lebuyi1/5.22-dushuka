// 店铺信息类型
export interface StoreInfo {
  name: string;
  type: RestaurantType;
  city: string;
  avgPrice: string;
  signatureDishes: string;
  promotions: string;
  features: string;
  targetAudience: string;
}

// 餐饮类型枚举
export type RestaurantType =
  | "烧烤"
  | "火锅"
  | "小吃"
  | "奶茶/咖啡"
  | "夜宵"
  | "中餐"
  | "西餐"
  | "其他";

// AI 生成结果类型
export interface GenerationResult {
  titles: string[];
  video_script: VideoScriptItem[];
  voiceover: string;
  promotion_copy: string[];
}

// 视频脚本单个镜头
export interface VideoScriptItem {
  镜头: string;
  拍摄内容: string;
  台词: string;
  字幕: string;
}

// 数据库中的生成记录
export interface GenerationRecord {
  id: string;
  store_id: string;
  titles: string[];
  video_script: VideoScriptItem[];
  voiceover: string;
  promotion_copy: string[];
  created_at: string;
}

// 数据库中的店铺记录
export interface StoreRecord {
  id: string;
  name: string;
  type: string;
  city: string;
  avg_price: string | null;
  signature_dishes: string | null;
  promotions: string | null;
  features: string | null;
  target_audience: string | null;
  created_at: string;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 餐饮类型选项
export const RESTAURANT_TYPES: RestaurantType[] = [
  "烧烤",
  "火锅",
  "小吃",
  "奶茶/咖啡",
  "夜宵",
  "中餐",
  "西餐",
  "其他",
];

// 目标客群选项
export const TARGET_AUDIENCES = [
  "学生党",
  "上班族",
  "家庭聚餐",
  "情侣约会",
  "朋友聚会",
  "夜猫子",
  "带娃家庭",
  "商务宴请",
  "所有人群",
];
