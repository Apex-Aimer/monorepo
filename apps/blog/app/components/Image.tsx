'use client'

import { allBlogPosts } from 'mdx/generated'
import NextImage, { ImageProps } from 'next/image'

function findPostByCoverSrc(cover: string) {
  return allBlogPosts.find((post) => {
    return post.meta.cover === cover
  })
}

const cmsLoader = ({ src }: { src: string }) => {
  return `https://${process.env.MEDIA_PROD_DOMAIN}${
    src.startsWith('/') ? '' : '/'
  }${src}`
}

export function Image({ src, ...rest }: ImageProps) {
  if (typeof src === 'string') {
    const post = findPostByCoverSrc(src)

    if (post != null) {
      return <NextImage src={src} loader={cmsLoader} {...rest} />
    }
  }

  return <NextImage src={src} {...rest} />
}
