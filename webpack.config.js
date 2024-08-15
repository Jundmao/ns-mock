const path = require('path')
const dxMock = require('.')

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    before (app) {
      dxMock(app, { root: path.join(__dirname, 'api') })
    }
  }
}