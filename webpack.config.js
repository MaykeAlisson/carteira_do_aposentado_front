const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "source-map",
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
  plugins: [
    new HtmlWebPackPlugin ({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};