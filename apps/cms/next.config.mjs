import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename)

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform({
    configPath: path.join(__dirname, 'wrangler.toml'),
    persist: true,
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    domains: [
      'customer-xzvhmwg826li9fy3.cloudflarestream.com',
      'media.apexaimer.com',
    ],
  },
}

export default nextConfig
