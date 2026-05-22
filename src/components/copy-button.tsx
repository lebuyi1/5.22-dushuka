"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

// 一键复制按钮组件
export function CopyButton({ text, label = "复制", className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <>
          <Check className="mr-1 h-3.5 w-3.5 text-green-500" />
          已复制
        </>
      ) : (
        <>
          <Copy className="mr-1 h-3.5 w-3.5" />
          {label}
        </>
      )}
    </Button>
  );
}
