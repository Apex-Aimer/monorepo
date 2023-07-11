import nextMdx from '@next/mdx'

const withMDX = nextMdx({
  options: {
    // providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  transpilePackages: ['ui'],
}

export default withMDX(nextConfig)
