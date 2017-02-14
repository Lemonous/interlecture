var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: './engine/js/main',

  output: {
      path: path.resolve('./static/bundles/'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [
  ], // add all common plugins here

  module: {
    loaders: [
         {
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }
      ] // add all common loaders here
  },

  resolve: {
    modules: ["node_modules","."],
    extensions: ['.js', '.jsx'],
  },
}
