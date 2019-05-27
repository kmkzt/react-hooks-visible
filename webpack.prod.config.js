const { resolve } = require('path')

const config = {
  mode: 'production',
  entry: resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.min.js',
    path: resolve('lib'),
    library: 'react-hooks-visible',
    libraryTarget: 'umd'
  },
  devtool: false,
  externals: {
    react: 'react'
  },
  plugins: [],
  optimization: {
    minimize: true
  }
}

module.exports = config
