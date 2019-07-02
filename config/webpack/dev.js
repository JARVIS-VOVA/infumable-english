const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    overlay: {
      port: 8080,
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ],
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
