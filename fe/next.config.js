/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'k.kakaocdn.net'],
    unoptimized: true,
  },
  compiler: {
    emotion: true,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
