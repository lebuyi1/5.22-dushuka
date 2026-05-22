"use server";

import { openai } from "@/lib/openai";
import { createAdminClient } from "@/lib/supabase/server";
import { getPromptByType, SYSTEM_PROMPT } from "@/lib/prompts";
import type { StoreInfo, GenerationResult, ApiResponse } from "@/lib/types";

// AI 生成脚本内容
export async function generateContent(
  storeInfo: StoreInfo
): Promise<ApiResponse<GenerationResult & { storeId: string; generationId: string }>> {
  try {
    // 1. 调用 MiMo 生成内容
    const prompt = getPromptByType(storeInfo.type, storeInfo);

    const completion = await openai.chat.completions.create({
      model: "mimo-v2.5-pro",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("AI 生成失败，请重试");
    }

    // 2. 解析 JSON 结果
    const result: GenerationResult = JSON.parse(content);

    // 3. 保存到数据库
    const supabase = createAdminClient();

    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .upsert({
        name: storeInfo.name,
        type: storeInfo.type,
        city: storeInfo.city,
        avg_price: storeInfo.avgPrice,
        signature_dishes: storeInfo.signatureDishes,
        promotions: storeInfo.promotions,
        features: storeInfo.features,
        target_audience: storeInfo.targetAudience,
      })
      .select()
      .single();

    if (storeError) {
      console.error("保存店铺失败:", storeError);
    }

    const storeId = storeData?.id || crypto.randomUUID();
    const { data: genData, error: genError } = await supabase
      .from("generations")
      .insert({
        store_id: storeId,
        titles: result.titles,
        video_script: result.video_script,
        voiceover: result.voiceover,
        promotion_copy: result.promotion_copy,
      })
      .select()
      .single();

    if (genError) {
      console.error("保存生成记录失败:", genError);
    }

    return {
      success: true,
      data: {
        ...result,
        storeId,
        generationId: genData?.id || crypto.randomUUID(),
      },
    };
  } catch (error) {
    console.error("生成内容失败:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "生成失败，请稍后重试",
    };
  }
}
