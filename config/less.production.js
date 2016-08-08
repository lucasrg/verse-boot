'use strict';
var less  = require('less');
var fs    = require('fs');
var writefile = require('writefile')
var CleanCSS = require('clean-css');
var config = require('./config');

var lessMainFilename = './app/Styles.less';
var publicPath = __dirname+'/../app/static/gen/';
var outputFile = publicPath + config.includes.css +'.' + config.version.css + '.css';

module.exports = function () {
  fs.readFile(lessMainFilename, function (err, data) {
    var dataString = data.toString();
    if (!dataString) {
      console.info('[Less] main.less is empty.');
      return;
    }
    less.render(dataString, {
      paths: [__dirname + '/../app/'],
      filename: lessMainFilename
    }, function (err, output) {
      if (err) {
        console.error('[Less] ' + err.type + ' Error: ' + err.message + ' in ' + err.filename + ':' + err.index + ':' + err.line);
        return;
      }
      new CleanCSS().minify(output.css, function (error, minified) {
        if (error) {
          console.error('[CSS] failed to minify', error);
        } else {
          writefile(outputFile, minified.styles, function (err) {
            if (err) {
              console.error('[CSS] failed to write', err);
            } else {
              console.info('[CSS] minified');
            }
          });
        }
      });
    });
  });
}
