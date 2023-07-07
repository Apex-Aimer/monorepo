import { CategoryLabel } from 'app/components/CategoryLabel'
import { Container } from 'app/components/Container'
import { BlogPost } from 'contentlayer/generated'
import { parseISO, format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import ScrollTopAndComment from './ScrollTopAndComment'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from './MDXComponents'

function MDXPost({ children }: { children: string }) {
  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(children)

  return <MDXContent components={MDXComponents} />
}

export function PostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <ScrollTopAndComment />
      <article>
        <Container className="!pt-0">
          <header className="mx-auto max-w-screen-md">
            {post.tags?.length && (
              <div className="flex justify-center">
                <CategoryLabel categories={post.tags} />
              </div>
            )}

            <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
              {post.draft && (
                <span role="img" aria-label="roadwork sign">
                  🚧{' '}
                </span>
              )}
              {post.title}
              {post.draft && (
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
                            dateTime={post.lastmod || post.date}
                          >
                            {format(
                              parseISO(post.lastmod || post.date),
                              'MMMM dd, yyyy'
                            )}
                          </time>
                        </dd>
                      </div>
                    </dl>
                    <span>· {post.estReadingTime || '5'} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </Container>

        <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.coverAlt || 'Thumbnail'}
              loading="eager"
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>

        <Container>
          <div className="prose dark:prose-invert prose-a:text-blue-600 mx-auto my-3">
            {post.body && <MDXPost>{post.body.code}</MDXPost>}
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
