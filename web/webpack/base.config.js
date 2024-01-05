const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  public: path.join(__dirname, '../public'),
  dist: path.join(__dirname, '../dist')
}

module.exports = {
  externals: {
    paths: PATHS
  },
  resolve: {
    alias: {
      src: `${PATHS.src}/`,
      components: `${PATHS.src}/components/`,
      img: `${PATHS.src}/assets/img/`,
      constants: `${PATHS.src}/constants/`,
      validations: `${PATHS.src}/lib/validations/`,
      store: `${PATHS.src}/store/`,
      pages: `${PATHS.src}/components/pages/`,
      layouts: `${PATHS.src}/components/layouts`,
      containers: `${PATHS.src}/containers/`,
      organisms: `${PATHS.src}/components/organisms/`,
      atoms: `${PATHS.src}/components/atoms/`,
    }
  },
  entry: {
    app: ["@babel/polyfill", `${PATHS.src}/index.js`]
  },
  output: {
    filename: '[name].js',
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.public}/index.html`,
      filename: './index.html',
      favicon: `${PATHS.public}/favicon.png`
    })
  ]
}
