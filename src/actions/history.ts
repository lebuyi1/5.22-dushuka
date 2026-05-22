"use server";

import { createAdminClient } from "@/lib/supabase/server";
import type { ApiResponse, GenerationRecord, StoreRecord } from "@/lib/types";

// 获取历史记录列表（带店铺信息）
export async function getHistoryList(): Promise<
  ApiResponse<(GenerationRecord & { store: StoreRecord })[]>
> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("generations")
      .select(`
        *,
        store:stores (*)
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("获取历史记录失败:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "获取历史记录失败",
    };
  }
}

// 获取单条生成记录详情
export async function getGenerationDetail(
  id: string
): Promise<ApiResponse<GenerationRecord & { store: StoreRecord }>> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("generations")
      .select(`
        *,
        store:stores (*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("获取记录详情失败:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "获取记录详情失败",
    };
  }
}

// 删除生成记录
export async function deleteGeneration(
  id: string
): Promise<ApiResponse<null>> {
  try {
    const supabase = createAdminClient();

    const { error } = await supabase.from("generations").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("删除记录失败:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "删除记录失败",
    };
  }
}
