import nextMdx from '@next/mdx'

const withMDX = nextMdx({
  options: {},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  transpilePackages: ['ui'],
  env: {
    BLOG_DOMAIN: process.env.BLOG_DOMAIN,
    BLOG_PROD_DOMAIN: process.env.BLOG_PROD_DOMAIN,
    MAIN_WEN_DOMAIN: process.env.MAIN_WEB_DOMAIN,
    SNOWPLOW_TRACKER_ID: process.env.SNOWPLOW_TRACKER_ID,
    SNOWPLOW_COLLECTOR_URL: process.env.SNOWPLOW_COLLECTOR_URL,
    CLOUDFLARE_IMAGES_ACCOUNT_HASH: process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH,
    MEDIA_PROD_DOMAIN: process.env.MEDIA_PROD_DOMAIN,
  },
  images: {
    domains: [
      process.env.BLOG_DOMAIN,
      process.env.BLOG_PROD_DOMAIN,
      process.env.MEDIA_PROD_DOMAIN,
    ],
  },
  async headers() {
    if (!(process.env.NODE_ENV === 'production')) {
      return []
    }
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              `default-src 'self' 'unsafe-inline' ${process.env.SNOWPLOW_COLLECTOR_URL}`,
              `img-src ${process.env.MEDIA_PROD_DOMAIN}`,
              "font-src 'self' https://fonts.googleapis.com",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), geolocation=(), microphone=(self)',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
}

export default withMDX(nextConfig)
