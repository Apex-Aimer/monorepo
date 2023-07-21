/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  env: {
    BLOG_DOMAIN: process.env.BLOG_DOMAIN,
    MAIN_WEN_DOMAIN: process.env.MAIN_WEB_DOMAIN,
    MAIN_WEB_PROD_DOMAIN: process.env.MAIN_WEB_PROD_DOMAIN,
    CLOUDFLARE_IMAGES_ACCOUNT_HASH: process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
    MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
    SNOWPLOW_TRACKER_ID: process.env.SNOWPLOW_TRACKER_ID,
    SNOWPLOW_COLLECTOR_URL: process.env.SNOWPLOW_COLLECTOR_URL,
  },
  images: {
    domains: [process.env.MAIN_WEB_DOMAIN, process.env.MAIN_WEB_PROD_DOMAIN],
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
            value: `default-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.googleapis.com; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`,
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

export default nextConfig
