import { parse } from 'date-fns'
import { allBlogPosts } from 'mdx/generated'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const [
    {
      meta: { date },
    },
  ] = allBlogPosts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  )

  return getServerSideSitemap([
    {
      loc: `https://${process.env.BLOG_PROD_DOMAIN}`,
      lastmod: new Date(date).toISOString(),
    },
    ...allBlogPosts.map((post) => {
      return {
        loc: `https://${process.env.BLOG_PROD_DOMAIN}/${post.slug}`,
        lastmod: new Date(post.meta.date).toISOString(),
        changefreq: 'weekly' as const,
      }
    }),
  ])
}
