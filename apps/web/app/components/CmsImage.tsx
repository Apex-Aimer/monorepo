'use client'

import NextImage, { ImageProps } from 'next/image'

const cmsLoader = ({ src }) => {
  return `https://${process.env.MEDIA_PROD_DOMAIN}/${src}`
}

export function CmsImage(props: ImageProps) {
  return <NextImage loader={cmsLoader} {...props} />
}
