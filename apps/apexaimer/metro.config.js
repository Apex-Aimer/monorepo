// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const exclusionList = require('metro-config/src/defaults/exclusionList')
const path = require('path')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, '../..')
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true
// Remove web apps
config.resolver.blockList = exclusionList([/.*\/blog\/.*/, /.*\/web\/.*/])

config.resolver.assetExts.push(
  // Adds support for `.riv` files for Rive animations
  'riv'
)

config.resolver.sourceExts.push('md')
config.resolver.sourceExts.push('ssml')

config.transformer.babelTransformerPath = require.resolve('./transformer.js')

module.exports = config
