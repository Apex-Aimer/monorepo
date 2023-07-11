// import { compareDesc } from 'date-fns'
import { allBlogPosts } from 'mdx/generated'
import { Posts } from './HomePage'

export default function Home() {
  return <Posts posts={allBlogPosts} />
}
