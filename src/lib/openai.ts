import OpenAI from "openai";

// 小米 MiMo 客户端（兼容 OpenAI 格式）
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
