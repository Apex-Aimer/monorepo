import { CategoryLabel } from 'app/components/CategoryLabel'
import { Container } from 'app/components/Container'
import { parseISO, format } from 'date-fns'
import Link from 'next/link'
import ScrollTopAndComment from './ScrollTopAndComment'
import { IBlogPost } from 'mdx/generated'
import { mdxComponents } from 'app/components/MDXComponents'
import { Image } from 'app/components/Image'

export function PostPage({ post }: { post: IBlogPost }) {
  const { component: MDXContent, meta } = post

  return (
    <>
      <ScrollTopAndComment />
      <article>
        <Container className="!pt-0">
          <header className="mx-auto max-w-screen-md">
            {meta.tags?.length && (
              <div className="flex justify-center">
                <CategoryLabel categories={meta.tags} />
              </div>
            )}

            <h1 className="text-text-primary mb-3 mt-2 text-center font-sans text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
              {meta.draft && (
                <span role="img" aria-label="roadwork sign">
                  🚧{' '}
                </span>
              )}
              {meta.title}
              {meta.draft && (
                <span role="img" aria-label="roadwork sign">
                  {' '}
                  🚧
                </span>
              )}
            </h1>

            <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center space-x-2 text-sm">
                    <dl>
                      <div>
                        <dt className="sr-only">Published on</dt>
                        <dd>
                          <time
                            className="text-gray-500 dark:text-gray-400"
                            dateTime={meta.lastModDate || meta.date}
                          >
                            {format(
                              parseISO(meta.lastModDate || meta.date),
                              'MMMM dd, yyyy'
                            )}
                          </time>
                        </dd>
                      </div>
                    </dl>
                    <span>· {meta.estReadingTime || '5'} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </Container>

        {meta.cover && (
          <figure>
            <div className="relative z-0 mx-auto aspect-video max-w-screen-md overflow-hidden lg:rounded-lg">
              <Image
                src={meta.cover}
                alt={meta.coverAlt || 'Thumbnail'}
                loading="eager"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {meta.coverCredits && (
              <figcaption className="mx-auto max-w-screen-md pl-1 pt-2">
                <span
                  dangerouslySetInnerHTML={{ __html: meta.coverCredits }}
                  className="font-sans text-[11px] text-slate-400 dark:text-slate-600"
                />
              </figcaption>
            )}
          </figure>
        )}

        <Container>
          <div className="prose dark:prose-invert prose-a:text-blue-600 mx-auto my-3">
            <MDXContent components={mdxComponents} />
          </div>
          <footer className="mb-7 mt-7 flex justify-center">
            <Link
              href="/"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 "
            >
              ← View all posts
            </Link>
          </footer>
        </Container>
      </article>
    </>
  )
}
