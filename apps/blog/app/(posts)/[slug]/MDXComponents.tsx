/* eslint-disable react/display-name */
import { Link } from '../../components/Link'
import { Image } from '../../components/Image'
// import { TOCInline } from 'pliny/ui/TOCInline'
// import { BlogNewsletterForm } from 'pliny/ui/NewsletterForm'

import { Document, MDX } from 'contentlayer/core'

declare type MDXDocument = Document & {
  body: MDX
}

interface MDXLayout {
  content: MDXDocument
  [key: string]: unknown
}

export const MDXComponents = {
  Image,
  // TOCInline,
  a: Link,
  // wrapper: Wrapper,
  // BlogNewsletterForm,
}
