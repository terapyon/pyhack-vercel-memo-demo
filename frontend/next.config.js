/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 
      (process.env.VERCEL ? '/api' : 'http://localhost:8000'),
  },
  experimental: {
    // Jest用の設定
    externalDir: true,
  },
  // Vercel最適化
  output: 'standalone',
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig