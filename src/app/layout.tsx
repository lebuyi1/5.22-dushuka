import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "餐饮爆款脚本生成器",
  description: "帮助餐饮商家持续低成本生产抖音内容 - 自动生成爆款标题、视频脚本、配音文案、团购文案",
  keywords: ["抖音", "短视频", "餐饮", "脚本", "爆款", "本地生活"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
