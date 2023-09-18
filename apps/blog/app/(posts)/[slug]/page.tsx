import { allBlogPosts } from 'mdx/generated'
import { notFound } from 'next/navigation'
import { PostPage } from './PostPage'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

function getPostBySlug(slug: string) {
  return allBlogPosts.find((post) => post.slug === slug)
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      images: [
        {
          url: `https://${process.env.BLOG_PROD_DOMAIN}/cdn-cgi/imagedelivery/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${post.meta.coverID}/public`,
        },
      ],
    },
    twitter: {
      ...(await parent).twitter,
      title: post.meta.title,
      description: post.meta.description,
      images: [
        `https://${process.env.BLOG_PROD_DOMAIN}/cdn-cgi/imagedelivery/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH}/${post.meta.coverID}/public`,
      ],
    },
  }
}

export const runtime = 'edge'

export default async function Page({ params }: Props) {
  // Find the post for the current page.
  const post = getPostBySlug(params.slug)

  // 404 if the post does not exist.
  if (!post) notFound()

  return <PostPage post={post} />
}
