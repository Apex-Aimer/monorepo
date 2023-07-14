/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  env: {
    BLOG_DOMAIN: process.env.BLOG_DOMAIN,
    MAIN_WEN_DOMAIN: process.env.MAIN_WEB_DOMAIN,
    CLOUDFLARE_IMAGES_ACCOUNT_HASH: process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH,
  },
  images: {
    domains: [process.env.BLOG_DOMAIN],
  },
  // Adding policies:
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
            value: `default-src 'self' 'https://${process.env.MAIN_WEB_DOMAIN}'; font-src 'self' 'https://fonts.googleapis.com'`,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(); battery=(); geolocation=(); microphone=(self)',
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

export default nextConfig
