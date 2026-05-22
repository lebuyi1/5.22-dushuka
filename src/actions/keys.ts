"use server";

import { createAdminClient } from "@/lib/supabase/server";
import crypto from "crypto";
import type { ApiResponse } from "@/lib/types";

// 生成随机密钥
function generateKey(duration: string): string {
  const prefix = { "1d": "DAY", "7d": "WEEK", "30d": "MONTH", "perm": "VIP" };
  const random = crypto.randomBytes(8).toString("hex").toUpperCase();
  return `${prefix[duration as keyof typeof prefix] || "KEY"}-${random}`;
}

// 根据时长计算过期时间
function calcExpiresAt(duration: string): Date | null {
  const now = new Date();
  switch (duration) {
    case "1d":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case "7d":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    case "perm":
      return null; // 永久不过期
    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }
}

// 管理员密码（你可以修改）
const ADMIN_PASSWORD = "dushuka2025";

// 管理员登录
export async function adminLogin(
  password: string
): Promise<ApiResponse<{ token: string }>> {
  if (password === ADMIN_PASSWORD) {
    return { success: true, data: { token: ADMIN_PASSWORD } };
  }
  return { success: false, error: "密码错误" };
}

// 创建密钥
export async function createKey(
  adminToken: string,
  duration: string,
  customKey?: string
): Promise<ApiResponse<{ key: string; id: string }>> {
  if (adminToken !== ADMIN_PASSWORD) {
    return { success: false, error: "无权限" };
  }

  try {
    const supabase = createAdminClient();
    const key = customKey || generateKey(duration);
    const expiresAt = calcExpiresAt(duration);

    const { data, error } = await supabase
      .from("access_keys")
      .insert({
        key,
        duration,
        expires_at: expiresAt?.toISOString() || null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data: { key: data.key, id: data.id } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "创建失败",
    };
  }
}

// 批量创建密钥
export async function batchCreateKeys(
  adminToken: string,
  duration: string,
  count: number
): Promise<ApiResponse<{ keys: string[] }>> {
  if (adminToken !== ADMIN_PASSWORD) {
    return { success: false, error: "无权限" };
  }

  try {
    const supabase = createAdminClient();
    const keys: string[] = [];

    for (let i = 0; i < count; i++) {
      const key = generateKey(duration);
      const expiresAt = calcExpiresAt(duration);

      await supabase.from("access_keys").insert({
        key,
        duration,
        expires_at: expiresAt?.toISOString() || null,
      });

      keys.push(key);
    }

    return { success: true, data: { keys } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "批量创建失败",
    };
  }
}

// 获取所有密钥列表
export async function listKeys(
  adminToken: string
): Promise<
  ApiResponse<
    Array<{
      id: string;
      key: string;
      duration: string;
      expires_at: string | null;
      used_by: string | null;
      used_at: string | null;
      created_at: string;
    }>
  >
> {
  if (adminToken !== ADMIN_PASSWORD) {
    return { success: false, error: "无权限" };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("access_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { success: true, data: data || [] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "获取列表失败",
    };
  }
}

// 删除密钥
export async function deleteKey(
  adminToken: string,
  keyId: string
): Promise<ApiResponse<null>> {
  if (adminToken !== ADMIN_PASSWORD) {
    return { success: false, error: "无权限" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("access_keys").delete().eq("id", keyId);
    if (error) throw new Error(error.message);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "删除失败",
    };
  }
}

// 用户验证密钥
export async function verifyKey(
  key: string
): Promise<ApiResponse<{ valid: boolean }>> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("access_keys")
      .select("*")
      .eq("key", key)
      .single();

    if (error || !data) {
      return { success: true, data: { valid: false } };
    }

    // 检查是否过期
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { success: true, data: { valid: false } };
    }

    // 标记为已使用（记录使用者和使用时间）
    if (!data.used_at) {
      await supabase
        .from("access_keys")
        .update({ used_by: "user", used_at: new Date().toISOString() })
        .eq("id", data.id);
    }

    return { success: true, data: { valid: true } };
  } catch (error) {
    return { success: true, data: { valid: false } };
  }
}
