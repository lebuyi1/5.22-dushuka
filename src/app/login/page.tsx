"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyKey } from "@/actions/keys";
import { Sparkles, Loader2, KeyRound } from "lucide-react";

// 登录页面
export default function LoginPage() {
  const router = useRouter();
  const [key, setKey] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // 检查是否已登录
  React.useEffect(() => {
    const savedKey = localStorage.getItem("access_key");
    if (savedKey) {
      verifyKey(savedKey).then((res) => {
        if (res.success && res.data?.valid) {
          router.push("/generate");
        }
      });
    }
  }, [router]);

  // 验证密钥并登录
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError("请输入密钥");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await verifyKey(key.trim());
      if (res.success && res.data?.valid) {
        localStorage.setItem("access_key", key.trim());
        router.push("/generate");
      } else {
        setError("密钥无效或已过期");
      }
    } catch {
      setError("验证失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">餐饮爆款脚本</h1>
          <p className="text-sm text-muted-foreground">
            输入激活密钥开始使用
          </p>
        </div>

        {/* 登录表单 */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-red-500" />
              密钥登录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="key">激活密钥</Label>
                <Input
                  id="key"
                  placeholder="请输入你的激活密钥"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="font-mono"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    验证中...
                  </>
                ) : (
                  "开始使用"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          密钥仅限一人使用，过期后需重新获取
        </p>
      </div>
    </main>
  );
}
