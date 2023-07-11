import fs from 'fs/promises'
import path from 'path'

import { loadBindings } from 'next/dist/build/swc'

const GENERATED_PATH = ['.mdx', 'generated']
const COMPONENTS_PATH = 'components'
const GENERATED_COMPONENTS_PATH = [...GENERATED_PATH, COMPONENTS_PATH]

const POSTS_DIR = 'posts'

function getSlugFromPath(path: string) {
  const match = path.match(/(.*).mdx/)

  if (match == null) {
    return ''
  }

  return match[1]
}

;(async function main() {
  const posts = await fs.readdir(POSTS_DIR)

  try {
    await fs.mkdir(path.join(...GENERATED_COMPONENTS_PATH), { recursive: true })
  } catch {
    // no-op
  }

  const bindings = await loadBindings()

  Promise.all(
    posts.map(async (postPath) => {
      const postContent = await fs.readFile(
        path.join(POSTS_DIR, postPath),
        'utf-8'
      )
      const compiled = await bindings.mdx.compile(postContent)

      await fs.writeFile(
        path.join(...GENERATED_COMPONENTS_PATH, `${postPath}.jsx`),
        compiled
      )
    })
  )

  await fs.writeFile(
    path.join(...GENERATED_PATH, 'index.ts'),
    `import type { MDXComponents } from 'mdx/types'
${posts
  .map(
    (post, index) =>
      `import post${index}, { meta as meta${index} } from './${COMPONENTS_PATH}/${post}.jsx'`
  )
  .join('\n')}

export interface IBlogPostMeta {
  title: string;
  date: string;
  lastModDate?: string;
  cover: string;
  /**
   * Cloudflare Image ID
   */
  coverID: string;
  coverAlt: string;
  coverCredits?: string;
  estReadingTime?: number;
  tags?: string[];
  draft?: boolean;
  summary?: string;
}

export interface IBlogPost {
  meta: IBlogPostMeta;
  component: React.ComponentType<{ components: MDXComponents }>;
  path: string;
  slug: string;
}

export const allBlogPosts: IBlogPost[] = [
${posts
  .map(
    (post, index) =>
      `{\n    meta: meta${index},\n    component: post${index},\n    path: '${post}',\n    slug: '${getSlugFromPath(
        post
      )}'
}`
  )
  .join(',\n')}
];
    `
  )
})()
