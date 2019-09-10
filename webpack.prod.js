var baseConfig = require('./webpack.common')

module.exports = Object.assign({}, baseConfig, {
  mode: 'production'
})
