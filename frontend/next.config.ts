import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['prisma', '@prisma/client', '@prisma/adapter-pg'],
};

export default nextConfig;
