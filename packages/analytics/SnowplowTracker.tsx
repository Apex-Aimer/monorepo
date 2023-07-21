'use client'

import { useEffect } from 'react'
import { newTracker, trackPageView } from '@snowplow/browser-tracker'
import { usePathname } from 'next/navigation'

export function SnowplowTracker() {
  useEffect(() => {
    newTracker(
      process.env.SNOWPLOW_TRACKER_ID,
      process.env.SNOWPLOW_COLLECTOR_URL
    )
  }, [])

  const pathname = usePathname()

  useEffect(() => {
    /**
     * This is going to be fires twice in dev
     * because of how react 18 works
     *
     * To prove - set `reactStrictMode: false` in nextjs.config
     */
    trackPageView()
  }, [pathname])

  return null
}
