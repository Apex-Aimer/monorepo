import { compareDesc } from 'date-fns'
import { allBlogPosts } from 'contentlayer/generated'
import { Posts } from './HomePage'

export default function Home() {
  const posts = allBlogPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return <Posts posts={posts} />
}
