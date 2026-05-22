import { getGeneralPrompt } from "./general";
import { getBarbecuePrompt } from "./barbecue";
import { getHotpotPrompt } from "./hotpot";
import { getSnackPrompt } from "./snack";
import { getDrinkPrompt } from "./drink";
import { getNightfoodPrompt } from "./nightfood";

// 根据餐饮类型获取对应的 Prompt 模板
export function getPromptByType(
  type: string,
  storeInfo: {
    name: string;
    city: string;
    avgPrice: string;
    signatureDishes: string;
    promotions: string;
    features: string;
    targetAudience: string;
  }
): string {
  const promptMap: Record<string, typeof getGeneralPrompt> = {
    "烧烤": getBarbecuePrompt,
    "火锅": getHotpotPrompt,
    "小吃": getSnackPrompt,
    "奶茶/咖啡": getDrinkPrompt,
    "夜宵": getNightfoodPrompt,
  };

  const promptFn = promptMap[type] || getGeneralPrompt;
  return promptFn(storeInfo);
}

// 系统提示词
export const SYSTEM_PROMPT = `你是一个专业的抖音餐饮短视频内容创作专家。
你精通抖音本地生活内容的创作规律，熟悉爆款短视频的节奏和文案风格。
你的任务是帮助餐饮商家生产低成本、高转化的抖音内容。
请严格按照要求的JSON格式输出，不要包含任何多余的文字。`;
