import { allBlogPosts } from 'mdx/generated'
import { Posts } from './HomePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List of all articles in the blog',
  description:
    'Articles in the blog relates to Apex Legends game and aim to help people improve in it.',
  keywords: [
    'Apex Legends',
    'firing range',
    'warm-up',
    'aim',
    'recoil control',
    'aim tracking',
    'aim precision',
    'Apex Legends movement',
  ],
}

export default function Home() {
  return <Posts posts={allBlogPosts} />
}
