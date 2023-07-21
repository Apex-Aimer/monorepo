import './globals.css'

import cx from 'clsx'
import { Metadata } from 'next'

import { Rubik, Inter } from 'next/font/google'
import { Providers } from './providers'
import { SnowplowTracker } from 'analytics/SnowplowTracker'

export const metadata: Metadata = {
  // TODO
  title: 'ApexAimer',
  // TODO
  description: 'ApexAimer app',
}

const fontRubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})

const fontInter = Inter({
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
      className={cx(fontRubik.variable, fontInter.variable, 'dark')}
    >
      <body className="antialiased dark:bg-black">
        <Providers>
          {children}
          <SnowplowTracker />
        </Providers>
      </body>
    </html>
  )
}
