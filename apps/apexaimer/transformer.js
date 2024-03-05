const upstreamTransformer = require('metro-react-native-babel-transformer')
// const upstreamTransformer = require('@expo/metro-config/babel-transformer')
const yaml = require('yaml-front-matter')
const { mdTransform } = require('terms/md-transform')

// props: { filename: string, src: string }
function transform(props) {
  if (props.filename.match(/\.md$/)) {
    props.src = mdTransform(props.src, props.filename)
  }

  if (props.filename.match(/\.ssml$/)) {
    const filename = props.filename
      .replace(/.*\/([\w\d\-]+\/[\w\d\-]+).ssml$/, '$1')
      .replace('/', '-')

    const content = props.src.trim().replace(/^\n+/, '').replace(/\n+$/, '')

    props.src = `
export const filename = "${filename}";

const content = ${JSON.stringify(content)};
export default content;`
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
