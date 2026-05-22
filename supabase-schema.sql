-- Supabase 数据库初始化脚本
-- 在 Supabase 控制台的 SQL Editor 中执行此脚本

-- 1. 店铺信息表
CREATE TABLE IF NOT EXISTS stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  avg_price TEXT,
  signature_dishes TEXT,
  promotions TEXT,
  features TEXT,
  target_audience TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 生成记录表
CREATE TABLE IF NOT EXISTS generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  titles JSONB NOT NULL,
  video_script JSONB NOT NULL,
  voiceover TEXT NOT NULL,
  promotion_copy JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 创建索引
CREATE INDEX IF NOT EXISTS idx_generations_store_id ON generations(store_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);

-- 4. 启用行级安全 (RLS)
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- 5. 创建公开访问策略 (MVP阶段，后续可添加认证)
CREATE POLICY "Allow all access on stores" ON stores
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access on generations" ON generations
  FOR ALL USING (true) WITH CHECK (true);

-- 6. 启用 Realtime (可选，用于实时更新)
ALTER PUBLICATION supabase_realtime ADD TABLE stores;
ALTER PUBLICATION supabase_realtime ADD TABLE generations;
