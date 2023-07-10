import { allBlogPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { PostPage } from './PostPage'

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

function getPostBySlug(slug: string) {
  return allBlogPosts.find((post) => post._raw.flattenedPath === slug)
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  return { title: post?.title ?? '' }
}

export const runtime = 'edge'

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = getPostBySlug(params.slug)

  // 404 if the post does not exist.
  if (!post) notFound()

  return <PostPage post={post} />
}
