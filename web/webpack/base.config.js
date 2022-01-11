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
      Atoms: `${PATHS.src}/components/atoms/`,
      Organisms: `${PATHS.src}/components/organisms/`,
      Pages: `${PATHS.src}/components/pages/`,
      Hooks: `${PATHS.src}/hooks/`,
      Routes: `${PATHS.src}/routes/`,
      Services: `${PATHS.src}/services/`,
      Api: `${PATHS.src}/services/API`,
      Store: `${PATHS.src}/store/`,
      Types: `${PATHS.src}/types/`,
      Constants: `${PATHS.src}/constants/`,
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
