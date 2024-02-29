'use client'

import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

export const fetcher = (url) => fetch(url).then((res) => res.json())

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      {children}
    </ThemeProvider>
  )
}
