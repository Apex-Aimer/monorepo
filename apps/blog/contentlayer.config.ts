import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    tags: { type: 'list', of: { type: 'string' } },
    summary: { type: 'string' },
    layout: { type: 'string' },
    cover: { type: 'string' },
    coverAlt: { type: 'string' },
    coverCredits: { type: 'string' },
    estReadingTime: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    filePath: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [BlogPost],
})
