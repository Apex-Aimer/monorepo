import type { Metadata } from 'next'

import './globals.css'
import cx from 'clsx'

import { Inter } from 'next/font/google'
import { SnowplowTracker } from 'analytics/SnowplowTracker'
import { Providers } from './providers'

export const metadata: Metadata = {
  // TODO
  title: 'ApexAimer blog',
  // TODO
  description: 'Blog about ApexAimer app',
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
    <html lang="en" suppressHydrationWarning className={cx(font.variable)}>
      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        <Providers>
          {children}
          <SnowplowTracker />
        </Providers>
      </body>
    </html>
  )
}
