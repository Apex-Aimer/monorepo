/* eslint-disable @next/next/no-img-element */
'use client'

import useSWR from 'swr'
import clsx from 'clsx'

import { fetcher } from '../providers'

interface MediaEntry {
  key: string
}

export function Gallery() {
  const { data, isLoading, mutate } = useSWR<{ objects: MediaEntry[] }>(
    '/api/media',
    fetcher
  )

  if (isLoading) {
    return null
  }

  if (data == null) {
    return null
  }

  return (
    <div className="flex flex-1">
      <div className="flex flex-row flex-wrap gap-4 px-6">
        {data.objects.map(({ key }) => {
          return (
            <div key={key}>
              <div
                className={clsx(
                  'from-bg-accent/80 to-bg-accent/30 bg-gradient-to-r',
                  'group relative rounded-md px-5 py-4'
                )}
              >
                <img
                  src={
                    process.env.NODE_ENV === 'development'
                      ? `/api/media/file/${key}`
                      : `https://${process.env.NEXT_PUBLIC_MEDIA_DOMAIN}/${key}`
                  }
                  className="h-auto w-40 rounded"
                  alt=""
                />
                <p className="font-prime text-text-primary max-w-40 pt-2 text-base">
                  {key}
                </p>
                <div
                  className={clsx(
                    'absolute -right-3 -top-3 cursor-pointer p-1 active:opacity-40'
                  )}
                  onClick={async () => {
                    try {
                      await fetch(`/api/media/file/${key}`, {
                        method: 'DELETE',
                      })
                      mutate({
                        ...data,
                        objects: data.objects.filter(({ key: k }) => k !== key),
                      })
                    } catch {
                      // no-op
                    }
                  }}
                >
                  <div
                    className={clsx(
                      'hidden rounded-lg bg-red-500 px-1 py-2 group-hover:block'
                    )}
                  >
                    <div className="h-px w-[9px] bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
