import { fileURLToPath } from 'url'
import path from 'path'

export const mdLoaderConfigPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  './md-loader.js'
)
