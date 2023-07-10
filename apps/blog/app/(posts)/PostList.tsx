import Image from 'next/image'
import Link from 'next/link'
import cx from 'clsx'
import { parseISO, format } from 'date-fns'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { CategoryLabel } from '../components/CategoryLabel'
import { BlogPost } from 'contentlayer/generated'

interface Props {
  post: BlogPost
  aspect: 'landscape' | 'custom' | 'square'
  preloadImage?: boolean
  minimal?: boolean
}

export function PostList({ post, aspect, minimal, preloadImage }: Props) {
  //   const imageProps = post?.mainImage ? null : null
  const imageProps = null
  const fontSize = 'large'
  const fontWeight = 'normal'
  return (
    <>
      <div
        className={cx(
          'group cursor-pointer',
          minimal && 'grid gap-10 md:grid-cols-2'
        )}
      >
        <div
          className={cx(
            ' overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800'
          )}
        >
          <Link
            className={cx(
              'relative block',
              aspect === 'landscape'
                ? 'aspect-video'
                : aspect === 'custom'
                ? 'aspect-video sm:aspect-[5/4]'
                : 'aspect-video sm:aspect-square'
            )}
            href={post.url}
          >
            {post.cover != null ? (
              <Image
                src={post.cover}
                // {...(post.mainImage.blurDataURL && {
                //   placeholder: 'blur',
                //   blurDataURL: post.mainImage.blurDataURL,
                // })}
                // TODO
                alt={post.coverAlt}
                priority={preloadImage ? true : false}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className={cx(minimal && 'flex items-center')}>
          <div>
            {post.tags?.length && (
              <CategoryLabel categories={post.tags} nomargin={minimal} />
            )}
            <h2
              className={cx(
                'text-xl',
                fontWeight === 'normal'
                  ? 'line-clamp-2 font-medium  tracking-normal'
                  : 'font-semibold leading-snug tracking-tight',
                'text-text-primary  mt-2  dark:text-white'
              )}
            >
              <Link href={post.url}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900"
                >
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.summary && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link href={post.url} legacyBehavior>
                    {post.summary}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <time
                className="truncate text-sm"
                dateTime={post.lastmod || post.date}
              >
                {format(parseISO(post.lastmod || post.date), 'MMMM dd, yyyy')}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
