var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    portal: path.resolve(__dirname, 'main.js'),
    admin: path.resolve(__dirname, 'admin.js'),
    'auth-login': path.resolve(__dirname, 'auth-login.js'),
    'auth-sign': path.resolve(__dirname, 'auth-sign.js')
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist/',
    filename: '[name].js'
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
      },
      {test: /\.less$/, loader: "style!css!less"},
      {test: /\.css$/, loader: "style!css"}
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
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin("[name].css")
  ]
};


if (process.env.NODE_ENV === 'production') {

} else {
  module.exports.devtool = '#source-map'
}
