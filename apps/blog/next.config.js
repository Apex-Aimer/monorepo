const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  transpilePackages: ['ui'],
}

module.exports = withContentlayer(nextConfig)
