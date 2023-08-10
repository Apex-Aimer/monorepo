const md2json = require('md-2-json')
const upstreamTransformer = require('metro-react-native-babel-transformer')
const yaml = require('yaml-front-matter')

// props: { filename: string, src: string }
function transform(props) {
  if (props.filename.match(/\.md$/)) {
    const metadata = yaml.loadFront(props.src)

    const content = metadata['__content']

    delete metadata['__content']

    props.src = `
export const metadata = ${JSON.stringify(metadata)};

const content = ${JSON.stringify(md2json.parse(content))};
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
