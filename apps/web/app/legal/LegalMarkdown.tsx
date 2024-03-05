import { PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

function withHeader(source, header) {
  return `
## ${header}

${source}
`
}

interface Props {
  title: string
  children: string
}

export function LegalMarkdown({ title, children }: Props) {
  return (
    <ReactMarkdown
      className="m-auto w-full max-w-screen-md whitespace-pre-wrap px-5 py-8 md:px-0"
      components={{
        p: ({ children }: PropsWithChildren) => (
          <p className="text-text-primary font-serif text-base">{children}</p>
        ),
        a: ({ children, href }: PropsWithChildren & { href: string }) => (
          <Link
            href={href}
            className="text-brand hover:text-brand-hover active:text-brand-press font-serif text-base"
          >
            {children}
          </Link>
        ),
        h2: ({ children }: PropsWithChildren) => (
          <h2 className="text-text-primary font-serif text-3xl font-extrabold">
            {children}
          </h2>
        ),
        h3: ({ children }: PropsWithChildren) => (
          <h3 className="text-text-primary font-serif text-2xl font-extrabold">
            {children}
          </h3>
        ),
        h4: ({ children }: PropsWithChildren) => (
          <h2 className="text-text-primary font-serif text-xl font-extrabold">
            {children}
          </h2>
        ),
        ol: ({ children }: PropsWithChildren) => (
          <ol className="list-inside list-decimal">{children}</ol>
        ),
        ul: ({ children }: PropsWithChildren) => (
          <ul className="list-inside list-disc leading-3">{children}</ul>
        ),
        li: ({ children }: PropsWithChildren) => (
          <li className="text-text-primary list-item font-serif text-base">
            {children}
          </li>
        ),
      }}
    >
      {withHeader(children, title)}
    </ReactMarkdown>
  )
}
