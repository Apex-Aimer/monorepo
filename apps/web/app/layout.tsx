import 'tailwind-custom/theme.css'
import './globals.css'

import cx from 'clsx'
import { Metadata } from 'next'

import { Rubik, Inter } from 'next/font/google'
import { Providers } from './providers'
import { SnowplowTracker } from 'analytics/SnowplowTracker'

export const metadata: Metadata = {
  title: {
    template: '%s | ApexAimer',
    default: 'Main page',
  },
  description: 'ApexAimer mobile app',
  metadataBase: new URL(`https://${process.env.MAIN_WEB_PROD_DOMAIN}`),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
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
      <body className="bg-bg-primary antialiased">
        <Providers>
          {children}
          <SnowplowTracker />
        </Providers>
      </body>
    </html>
  )
}
