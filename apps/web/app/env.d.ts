declare module '*.md' {
  const filename: string
  const metadata: Record<string, any>
  const content: string
  export { filename, metadata }
  export default content
}
