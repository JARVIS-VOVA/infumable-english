const webpack = require('webpack')
const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack');

const baseWebpackConfig = require('./base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'hidden-source-map',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    contentBase: baseWebpackConfig.externals.paths.dist,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new Dotenv(),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
