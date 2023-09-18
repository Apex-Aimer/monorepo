import type { Metadata } from 'next'

import 'tailwind-custom/theme.css'
import './globals.css'
import cx from 'clsx'

import { Inter } from 'next/font/google'
import { SnowplowTracker } from 'analytics/SnowplowTracker'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.BLOG_PROD_DOMAIN}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: {
    template: '%s | ApexAimer Blog',
    default: 'Main page',
  },
  // Default values
  creator: 'Aleksei Savelev',
  openGraph: {
    images: [
      {
        url: `https://${process.env.BLOG_PROD_DOMAIN}/cdn-cgi/imagedelivery/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/cd92743c-7765-4a9a-6a83-6b5dd7908e00/public`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexAimer',
    description: 'Warm-ups to reach your peak in Apex Legends',
    creator: '@TheApexAimer',
    images: [
      `https://${process.env.BLOG_PROD_DOMAIN}/cdn-cgi/imagedelivery/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/cd92743c-7765-4a9a-6a83-6b5dd7908e00/public`,
    ],
  },
}

const font = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(font.variable, 'dark')}
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        <Providers>
          {children}
          <SnowplowTracker />
        </Providers>
      </body>
    </html>
  )
}
