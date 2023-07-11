'use client'

import { allBlogPosts } from 'mdx/generated'
import NextImage, { ImageProps } from 'next/image'

function findPostByCoverSrc(cover: string) {
  return allBlogPosts.find((post) => {
    return post.meta.cover === cover
  })
}

const cloudflareLoader = ({ src }) => {
  return `https://${process.env.BLOG_DOMAIN}/cdn-cgi/imagedelivery/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${src}/public`
}

export function Image({ src, ...rest }: ImageProps) {
  if (typeof src === 'string') {
    const post = findPostByCoverSrc(src)

    if (post != null) {
      return (
        <NextImage
          src={post.meta.coverID}
          loader={cloudflareLoader}
          {...rest}
        />
      )
    }
  }

  return (
    <NextImage
      src={src}
      // loader={cloudflareLoader}
      {...rest}
    />
  )
}
