/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    domains: ['ivory-indirect-elk-835.mypinata.cloud'],
  },
};

export default nextConfig;
