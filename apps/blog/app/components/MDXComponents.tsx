import { Image } from 'app/components/Image'
import { Link } from 'app/components/Link'
import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  Image: Image,
  // TOCInline,
  // BlogNewsletterForm,
  a: (props) => <Link className="underline decoration-solid" {...props} />,
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
