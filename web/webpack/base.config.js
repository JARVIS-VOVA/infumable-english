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
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      Src: `${PATHS.src}/`,
      Components: `${PATHS.src}/components/`,
      Forms: `${PATHS.src}/components/forms/`,
      Hooks: `${PATHS.src}/hooks/`,
      Pages: `${PATHS.src}/pages/`,
      Routes: `${PATHS.src}/routes/`,
      Services: `${PATHS.src}/services/`,
      Api: `${PATHS.src}/services/API`,
      Store: `${PATHS.src}/store/`,
      Types: `${PATHS.src}/types/`,
    }
  },
  entry: {
    app: ["@babel/polyfill", `${PATHS.src}/index.tsx`]
  },
  output: {
    filename: '[name].js',
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
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
