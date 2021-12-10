const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
  devtool: "source-map",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [ 'file-loader' ]
      }
    ]
  },
  resolve: {
    alias: {
      Contexts: path.resolve(__dirname, 'src', 'contexts'),
      Services: path.resolve(__dirname, 'src', 'service'),
      Components: path.resolve(__dirname, 'src', 'infra', 'components'),
      Util: path.resolve(__dirname, 'src', 'infra', 'util'),
      Repository: path.resolve(__dirname, 'src', 'repository')
  },
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin ({
      template: "./src/index.html",
      favicon: "./public/img/favicon.svg",
      filename: "./index.html"
    }),
    new NodePolyfillPlugin()
  ]
};
