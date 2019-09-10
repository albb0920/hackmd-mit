// Compatibility patches for older nodejs versions

const [major] = process.versions.node.split('.').map((str) => { return parseInt(str, 10) })

if (major < 10) {
  Object.assign(global, require('url'))
}
