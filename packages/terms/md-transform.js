const yaml = require('yaml-front-matter')

/**
 * @param String src
 * @param String filepath
 * @returns
 */
function mdTransform(src, filepath) {
  const filename = filepath
    .replace(/.*\/([\w\d\-]+\/[\w\d\-]+).md$/, '$1')
    .replace('/', '-')

  let metadata = {}
  try {
    metadata = yaml.loadFront(src, { json: true })
  } catch (e) {
    console.error(`Can't parse front matter in ${filename}`, e.message)
  }

  const content = metadata['__content']
    .trim()
    .replace(/^\n+/, '')
    .replace(/\n+$/, '')

  delete metadata['__content']

  return `
  export const filename = "${filename}";
  export const metadata = ${JSON.stringify(metadata)};
  
  const content = ${JSON.stringify(content)};
  export default content;`
}

module.exports = { mdTransform }
