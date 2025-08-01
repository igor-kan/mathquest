/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mathquest',
  assetPrefix: '/mathquest',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
