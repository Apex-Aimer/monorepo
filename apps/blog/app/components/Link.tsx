/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

export function Link({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    // @ts-ignore
    return <NextLink href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}
