var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'app', 'static', 'gen');
var mainPath = path.resolve(__dirname, '..', 'core', 'Client.js');
var config = require('./config');

var config = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3001',
    mainPath],
  output: {
    path: buildPath,
    filename: config.includes.js+'.'+config.version.js+'.js',
    publicPath: '/static/js/'
  },
  module: {

    loaders: [
    // {
    //   test: /\.js$/,
    //   loader: 'babel',
    //   exclude: [nodeModulesPath]
    // },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.less$/,
      loader: "style!css!less"
    }

    ]
  },

  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
