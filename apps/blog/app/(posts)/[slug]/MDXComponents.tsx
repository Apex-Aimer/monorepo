/* eslint-disable react/display-name */
import { Link } from '../../components/Link'
import { Image } from '../../components/Image'
// import type { MDXComponents as TMDXComponents } from 'mdx/types'
// import { TOCInline } from 'pliny/ui/TOCInline'
// import { BlogNewsletterForm } from 'pliny/ui/NewsletterForm'

export const MDXComponents = {
  Image,
  // TOCInline,
  a: (props) => <Link className="underline decoration-solid" {...props} />,
  // wrapper: Wrapper,
  // BlogNewsletterForm,
  h2: (props) => (
    <h2 className="mb-2.5 mt-4 font-sans text-2xl font-semibold" {...props} />
  ),
  p: (props) => (
    <p
      className="text-text-primary mb-5 font-sans text-base leading-7 dark:text-white"
      {...props}
    />
  ),
  ul: (props) => <ul className="mb-5 list-disc" {...props} />,
  ol: (props) => <ol className="mb-5 list-decimal" {...props} />,
  li: (props) => (
    <li
      className="text-text-primary ml-8 mt-2 font-sans dark:text-white"
      {...props}
    />
  ),
}
