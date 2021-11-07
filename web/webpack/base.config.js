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
      Img: `${PATHS.src}/assets/img/`,
      Constants: `${PATHS.src}/constants/`,
      Validations: `${PATHS.src}/lib/validations/`,
      Store: `${PATHS.src}/store/`,
      Pages: `${PATHS.src}/components/pages/`,
      Templates: `${PATHS.src}/components/templates/`,
      Containers: `${PATHS.src}/containers/`,
      Organisms: `${PATHS.src}/components/organisms/`,
      Atoms: `${PATHS.src}/components/atoms/`,
    }
  },
  entry: {
    // app: ["@babel/polyfill", `${PATHS.src}/index.js`]
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
      // {
      //   test: /\.(ts|js)x?$/,
      //   loader: 'babel-loader',
      //   exclude: '/node_modules/'
      // },
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
