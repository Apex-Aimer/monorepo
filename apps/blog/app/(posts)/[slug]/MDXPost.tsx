'use client'

import { getMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from './MDXComponents'

/**
 * FIXME:
 * I had to `use client` here because of
 * https://github.com/contentlayerdev/contentlayer/blob/main/packages/next-contentlayer/src/hooks/useMDXComponent.ts#L24
 * in contentlayer source code, that is prohibited use of eval
 * on Cloudflare
 */

export function MDXPost({ children }: { children: string }) {
  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = getMDXComponent(children)

  return <MDXContent components={MDXComponents} />
}
