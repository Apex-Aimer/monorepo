'use client'

import { Spin } from 'antd'
import useSWR from 'swr'
import Image from 'next/image'
import { chunk } from 'lodash'
import clsx from 'clsx'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Modal } from 'ui'

import { fetcher } from '../providers'

function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-4">
        <Spin size="large" />
        <span className="font-prime text-text-primary text-sm">Loading</span>
      </div>
    </div>
  )
}

interface CfStreamEntry {
  uid: string
  thumbnail: string
  playback: { hls: string }
  meta: { filename: string; name: string }
  input: { width: number; height: number }
  duration: number
  created: string
  modified: string
}

interface VideoLink {
  slug: string
  metadata: {
    thumbnail: string
    hls: string
  }
}
type VideosLinksMap = Record<string, VideoLink>

function sortEntries(a: CfStreamEntry, b: CfStreamEntry) {
  return new Date(a.modified) < new Date(b.modified) ? 1 : -1
}

interface DashboardContentProps {
  streamVideos: CfStreamEntry[]
  videosLinksMap: VideosLinksMap
}

function DashboardContent({
  streamVideos,
  videosLinksMap,
}: DashboardContentProps) {
  const [processedAllVideosLinksMap, setProcessedAllVideosLinksMap] =
    useState<VideosLinksMap>(videosLinksMap)

  const [updatingData, setUpdatingData] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [currenlyActiveVideo, setCurrentlyActiveVideo] = useState<string>(null)

  const dataSource = useMemo(() => {
    if (streamVideos == null) {
      return []
    }

    const { processed, unprocessed } = streamVideos.reduce(
      (acc, item) => {
        if (processedAllVideosLinksMap[item.uid] == null) {
          acc.unprocessed.push(item)
        } else {
          acc.processed.push(item)
        }

        return acc
      },
      { processed: [] as CfStreamEntry[], unprocessed: [] as CfStreamEntry[] }
    )

    const source = chunk(
      [...processed.sort(sortEntries), ...unprocessed.sort(sortEntries)],
      2
    )

    return source
  }, [processedAllVideosLinksMap, streamVideos])

  const renderItem = (item: CfStreamEntry) => {
    const slug = processedAllVideosLinksMap[item.uid]?.slug
    const hasSlug = slug != null

    return (
      <div
        key={item.meta.name}
        className={clsx(
          'flex flex-1 overflow-hidden rounded-lg',
          'from-bg-accent/80 hover:to-bg-accent/80 to-bg-accent/30 bg-gradient-to-r',
          'cursor-pointer px-4 py-4',
          'justify-between'
        )}
        onClick={() => {
          setCurrentlyActiveVideo(item.uid)
          setModalOpen(true)
        }}
      >
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p
              className={clsx(
                'text-text-primary font-prime text-lg',
                !hasSlug && 'opacity-50'
              )}
            >
              {item.meta.name}
            </p>
            <p className={clsx('text-line text-base font-bold')}>
              {hasSlug ? slug : '--- No link ---'}
            </p>
            <p className="text-line">{`CF ID: ${item.uid}`}</p>
          </div>
        </div>
        <Image
          width={item.input.width}
          height={item.input.height}
          alt={item.meta.name}
          src={item.thumbnail}
          className="w-1/4 rounded-sm"
          style={{ aspectRatio: item.input.width / item.input.height }}
        />
      </div>
    )
  }

  const slugRef = useRef('')
  const onSlugInputChange = useCallback((text: string) => {
    slugRef.current = text
  }, [])

  const onUpdateItem = useCallback(async () => {
    setUpdatingData(true)

    const slug = slugRef.current
    const metadata = {
      thumbnail: streamVideos.find(({ uid }) => currenlyActiveVideo === uid)
        .thumbnail,
      hls: streamVideos.find(({ uid }) => currenlyActiveVideo === uid).playback
        .hls,
    }

    try {
      await fetch('/api/update-videos-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cfId: currenlyActiveVideo,
          slug,
          metadata,
        }),
      })
      setProcessedAllVideosLinksMap({
        ...processedAllVideosLinksMap,
        [currenlyActiveVideo]: {
          slug,
          metadata,
        },
      })
      setModalOpen(false)
    } catch {
      // no-op
    }
    setUpdatingData(false)
  }, [currenlyActiveVideo, processedAllVideosLinksMap, streamVideos])

  return (
    <>
      <div className="flex h-screen flex-1">
        <div className="flex flex-1 flex-col gap-4 overflow-auto px-6 py-3">
          {dataSource.map(([left, right]) => {
            return (
              <div
                className="flex flex-row gap-4"
                key={[left.uid, right?.uid ?? ''].join()}
              >
                {renderItem(left)}
                {right != null ? (
                  renderItem(right)
                ) : (
                  <div key="spacer" className="flex flex-1 px-4" />
                )}
              </div>
            )
          })}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onCloseStart={() => {
          setModalOpen(false)
        }}
        onCloseEnd={() => {
          setCurrentlyActiveVideo(null)
        }}
      >
        <div className="bg-bg-primary flex flex-col gap-8 px-6 py-8">
          <h3 className="text-text-primary font-prime text-lg font-bold">
            {currenlyActiveVideo != null &&
              streamVideos.find(({ uid }) => currenlyActiveVideo === uid).meta
                .name}
          </h3>
          <div
            className={clsx(
              'bg-bg-primary flex flex-1 items-center rounded-xl border border-white px-4 py-2'
            )}
          >
            <input
              placeholder="Slug"
              defaultValue={
                currenlyActiveVideo != null &&
                processedAllVideosLinksMap[currenlyActiveVideo]?.slug
              }
              className={clsx(
                'text-text-primary w-full appearance-none bg-transparent font-sans text-lg outline-none',
                'placeholder:text-text-primary placeholder:opacity-50'
              )}
              onChange={(evt) => {
                onSlugInputChange(evt.target.value)
              }}
            />
          </div>
          <div>
            <button
              className={clsx(
                'bg-bg-primary-inverted flex cursor-pointer select-none items-center rounded-xl px-6 py-2',
                'hover:bg-gray-200'
              )}
              onClick={onUpdateItem}
            >
              {updatingData ? (
                <Spin />
              ) : (
                <span className="font-sans text-lg text-black">Update</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function Dashboard() {
  const { data: allStreamVideos, isLoading: isAllStreamVideosLoading } = useSWR<
    CfStreamEntry[]
  >('/api/all-stream-videos', fetcher)
  const { data: allVideosLinksMap, isLoading: isAllVideosLinksLoading } =
    useSWR<VideosLinksMap>('/api/all-videos-links', fetcher)

  if (isAllStreamVideosLoading || isAllVideosLinksLoading) {
    return <Loading />
  }

  return (
    <DashboardContent
      streamVideos={allStreamVideos}
      videosLinksMap={allVideosLinksMap}
    />
  )
}
