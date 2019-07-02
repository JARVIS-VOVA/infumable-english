const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  client: path.join(__dirname, '../../client'),
  src: path.join(__dirname, '../../client/src'),
  public: path.join(__dirname, '../../client/public'),
  dist: path.join(__dirname, '../../dist'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: `${PATHS.assets}js/[name].js`
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file -loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.public}/index.html`,
      filename: './index.html',
      favicon: `${PATHS.public}/favicon.png`
    })
  ]
}
