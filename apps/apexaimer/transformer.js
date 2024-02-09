const upstreamTransformer = require('metro-react-native-babel-transformer')
// const upstreamTransformer = require('@expo/metro-config/babel-transformer')
const yaml = require('yaml-front-matter')

// props: { filename: string, src: string }
function transform(props) {
  if (props.filename.match(/\.md$/)) {
    const filename = props.filename
      .replace(/.*\/([\w\d\-]+\/[\w\d\-]+).md$/, '$1')
      .replace('/', '-')

    let metadata = {}
    try {
      metadata = yaml.loadFront(props.src, { json: true })
    } catch (e) {
      console.error(`Can't parse front matter in ${filename}`, e.message)
    }

    const content = metadata['__content']
      .trim()
      .replace(/^\n+/, '')
      .replace(/\n+$/, '')

    delete metadata['__content']

    props.src = `
export const filename = "${filename}";
export const metadata = ${JSON.stringify(metadata)};

const content = ${JSON.stringify(content)};
export default content`
  }

  if (props.filename.match(/\.ssml$/)) {
    const filename = props.filename
      .replace(/.*\/([\w\d\-]+\/[\w\d\-]+).ssml$/, '$1')
      .replace('/', '-')

    const content = props.src.trim().replace(/^\n+/, '').replace(/\n+$/, '')

    props.src = `
export const filename = "${filename}";

const content = ${JSON.stringify(content)};
export default content`
  }

  return props
}

module.exports.transform = (props) => {
  // Then pass it to the upstream transformer.
  return upstreamTransformer.transform(
    // Transpile MD first.
    transform(props)
  )
}
