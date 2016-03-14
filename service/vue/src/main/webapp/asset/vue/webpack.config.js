var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    //preLoaders: [{
    //  test: /\.js$/,
    //  exclude: /node_modules/,
    //  loader: 'jshint-loader'
    //}],
    loaders: [
      // 使用Babel转换ES6，排除node_modules目录下的js
      {
        test: /\.vue$/, loader: 'vue'
      },
      {test: /\.js?$/, loader: 'babel', exclude: /node_modules/},
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      // you can also include <style lang="less"> or other langauges
      less: ExtractTextPlugin.extract("css!less")
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
};


if (process.env.NODE_ENV === 'production') {

} else {
  module.exports.devtool = '#source-map'
}
