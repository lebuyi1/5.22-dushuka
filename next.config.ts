/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置服务器 Actions 允许的源
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
