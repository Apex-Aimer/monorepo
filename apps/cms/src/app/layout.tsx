import 'tailwind-custom/theme.css'
import './globals.css'

import type { PropsWithChildren } from 'react'
import cx from 'clsx'
import type { Metadata } from 'next'

import { Rubik, Inter } from 'next/font/google'
import { Providers } from './providers'
import { WithSidebar } from './WithSidebar'

export const metadata: Metadata = {
  title: {
    template: '%s | ApexAimer CMS',
    default: 'Dashboard',
  },
  description: 'ApexAimer CMS',
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_CMS_DOMAIN}`),
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cx(
        fontRubik.variable,
        fontInter.variable,
        'min-h-screen',
        'dark'
      )}
    >
      <body className="bg-bg-primary flex min-h-screen antialiased">
        <Providers>
          <WithSidebar>{children}</WithSidebar>
        </Providers>
      </body>
    </html>
  )
}
