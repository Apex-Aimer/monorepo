'use client'

import NextImage, { ImageProps } from 'next/image'

const cloudflareLoader = ({ src }) => {
  return `https://${process.env.MAIN_WEB_PROD_DOMAIN}/cdn-cgi/imagedelivery/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${src}/public`
}

export function CloudflareImage(props: ImageProps) {
  return <NextImage loader={cloudflareLoader} {...props} />
}
