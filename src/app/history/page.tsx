"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HistoryItem } from "@/components/history-item";
import { getHistoryList, deleteGeneration } from "@/actions/history";
import { verifyKey } from "@/actions/keys";
import { ArrowLeft, Sparkles, Loader2, LogOut } from "lucide-react";
import type { GenerationRecord, StoreRecord } from "@/lib/types";

// 历史记录页面
export default function HistoryPage() {
  const router = useRouter();
  const [records, setRecords] = React.useState<
    (GenerationRecord & { store: StoreRecord })[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  // 检查登录状态
  React.useEffect(() => {
    const savedKey = localStorage.getItem("access_key");
    if (!savedKey) {
      router.push("/login");
      return;
    }
    verifyKey(savedKey).then((res) => {
      if (res.success && res.data?.valid) {
        setIsAuth(true);
        loadHistory();
      } else {
        localStorage.removeItem("access_key");
        router.push("/login");
      }
      setCheckingAuth(false);
    });
  }, [router]);

  // 加载历史记录
  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const response = await getHistoryList();
      if (response.success && response.data) {
        setRecords(response.data);
      }
    } catch (err) {
      console.error("加载历史记录失败:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 删除记录
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteGeneration(id);
      if (response.success) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("删除失败:", err);
    }
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem("access_key");
    router.push("/login");
  };

  // 加载中
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 未登录
  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-base font-medium">历史记录</h1>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/generate">
              <Button variant="accent" size="sm">
                <Sparkles className="h-4 w-4 mr-1" />
                新建
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-muted-foreground">还没有生成记录</p>
            <Link href="/generate">
              <Button variant="accent">
                <Sparkles className="h-4 w-4 mr-2" />
                开始生成
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {records.map((record) => (
              <HistoryItem
                key={record.id}
                record={record}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
