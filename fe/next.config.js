/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withTypescript = require('@zeit/next-typescript');

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
  reactStrictMode: true,
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
    [
      withTypescript,
      {
        typescriptLorderOptions: {
          transplieOnly: false,
        },
      },
    ],
  ],
  nextConfig,
);

module.exports = nextConfig;
