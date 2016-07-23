'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./config');

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/public/static/js/'),
    filename: 'bundle.'+config.version.js+'.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {comments: false},
      compress: {
        warnings: false,
        pure_funcs: [ 'console.log', 'console.dir' ],
        screw_ie8: true
      }
    }),
    //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pt_BR|en|jp/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.less$/,
      loader: "style!css!less"
    }]
  },
  // postcss: [
  //   require('autoprefixer')
  // ]
};
