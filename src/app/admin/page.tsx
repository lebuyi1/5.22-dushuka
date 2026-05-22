"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import {
  adminLogin,
  createKey,
  batchCreateKeys,
  listKeys,
  deleteKey,
} from "@/actions/keys";
import {
  Shield,
  Loader2,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  Key,
} from "lucide-react";

// 时长选项
const DURATION_OPTIONS = [
  { value: "1d", label: "1天" },
  { value: "7d", label: "7天" },
  { value: "30d", label: "30天" },
  { value: "perm", label: "永久" },
];

// 管理员页面
export default function AdminPage() {
  const [adminToken, setAdminToken] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  // 密钥列表
  const [keys, setKeys] = React.useState<
    Array<{
      id: string;
      key: string;
      duration: string;
      expires_at: string | null;
      used_by: string | null;
      used_at: string | null;
      created_at: string;
    }>
  >([]);
  const [isLoadingKeys, setIsLoadingKeys] = React.useState(false);

  // 创建密钥
  const [duration, setDuration] = React.useState("1d");
  const [customKey, setCustomKey] = React.useState("");
  const [batchCount, setBatchCount] = React.useState("10");
  const [isCreating, setIsCreating] = React.useState(false);
  const [createdKeys, setCreatedKeys] = React.useState<string[]>([]);

  // 管理员登录
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await adminLogin(adminToken);
    if (res.success) {
      setIsLoggedIn(true);
      loadKeys();
    } else {
      setLoginError("密码错误");
    }
  };

  // 加载密钥列表
  const loadKeys = async () => {
    setIsLoadingKeys(true);
    const res = await listKeys(adminToken);
    if (res.success && res.data) {
      setKeys(res.data);
    }
    setIsLoadingKeys(false);
  };

  // 创建单个密钥
  const handleCreateKey = async () => {
    setIsCreating(true);
    const res = await createKey(
      adminToken,
      duration,
      customKey.trim() || undefined
    );
    if (res.success && res.data) {
      setCreatedKeys([res.data.key]);
      setCustomKey("");
      loadKeys();
    }
    setIsCreating(false);
  };

  // 批量创建
  const handleBatchCreate = async () => {
    setIsCreating(true);
    const count = parseInt(batchCount) || 10;
    const res = await batchCreateKeys(adminToken, duration, count);
    if (res.success && res.data) {
      setCreatedKeys(res.data.keys);
      loadKeys();
    }
    setIsCreating(false);
  };

  // 删除密钥
  const handleDeleteKey = async (id: string) => {
    const res = await deleteKey(adminToken, id);
    if (res.success) {
      setKeys((prev) => prev.filter((k) => k.id !== id));
    }
  };

  // 复制所有新创建的密钥
  const copyAllKeys = () => {
    navigator.clipboard.writeText(createdKeys.join("\n"));
  };

  // 格式化时长
  const formatDuration = (d: string) => {
    const map: Record<string, string> = {
      "1d": "1天",
      "7d": "7天",
      "30d": "30天",
      perm: "永久",
    };
    return map[d] || d;
  };

  // 检查是否过期
  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  // 未登录 - 显示登录表单
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
        <Card className="w-full max-w-sm border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-500" />
              管理员登录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label>管理员密码</Label>
                <Input
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  placeholder="输入管理员密码"
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-500">{loginError}</p>
              )}
              <Button type="submit" variant="accent" className="w-full">
                登录
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  // 已登录 - 显示管理面板
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-base font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500" />
            密钥管理
          </h1>
          <Badge variant="secondary">
            共 {keys.length} 个密钥
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 创建密钥 */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Plus className="h-4 w-4 text-red-500" />
              创建密钥
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 时长选择 */}
              <div className="space-y-1.5">
                <Label>有效期</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 自定义密钥 */}
              <div className="space-y-1.5">
                <Label>自定义密钥（可选）</Label>
                <Input
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="留空自动生成"
                />
              </div>

              {/* 批量数量 */}
              <div className="space-y-1.5">
                <Label>批量数量</Label>
                <Input
                  type="number"
                  value={batchCount}
                  onChange={(e) => setBatchCount(e.target.value)}
                  placeholder="10"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="accent"
                onClick={handleCreateKey}
                disabled={isCreating}
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <Plus className="h-4 w-4 mr-1" />
                )}
                创建单个
              </Button>
              <Button
                variant="outline"
                onClick={handleBatchCreate}
                disabled={isCreating}
              >
                批量创建 {batchCount} 个
              </Button>
            </div>

            {/* 新创建的密钥 */}
            {createdKeys.length > 0 && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">
                    已创建 {createdKeys.length} 个密钥
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAllKeys}
                    className="text-green-700 hover:text-green-900"
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    全部复制
                  </Button>
                </div>
                <div className="space-y-1">
                  {createdKeys.map((k, i) => (
                    <div
                      key={i}
                      className="font-mono text-sm text-green-900 bg-white/50 px-2 py-1 rounded"
                    >
                      {k}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 密钥列表 */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Key className="h-4 w-4 text-red-500" />
                密钥列表
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={loadKeys}>
                刷新
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingKeys ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : keys.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                暂无密钥
              </p>
            ) : (
              <div className="space-y-2">
                {keys.map((k) => (
                  <div
                    key={k.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium">
                          {k.key}
                        </span>
                        <Badge variant="secondary">
                          {formatDuration(k.duration)}
                        </Badge>
                        {k.expires_at && isExpired(k.expires_at) ? (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-0.5" />
                            已过期
                          </Badge>
                        ) : k.used_at ? (
                          <Badge variant="accent">
                            <CheckCircle className="h-3 w-3 mr-0.5" />
                            已使用
                          </Badge>
                        ) : (
                          <Badge variant="outline">未使用</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        创建：{new Date(k.created_at).toLocaleString("zh-CN")}
                        {k.expires_at &&
                          ` · 过期：${new Date(k.expires_at).toLocaleString("zh-CN")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CopyButton text={k.key} label="" className="h-8 w-8 p-0" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteKey(k.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
