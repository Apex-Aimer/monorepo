const { mdTransform } = require('./md-transform.js')

module.exports = function (source) {
  return mdTransform(source, this.resourcePath)
}
