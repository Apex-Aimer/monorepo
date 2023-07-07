import NextImage, { ImageProps } from 'next/image'

export function Image({ ...rest }: ImageProps) {
  return <NextImage {...rest} />
}
