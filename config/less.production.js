'use strict';
var less  = require('less');
var fs    = require('fs');
var writefile = require('writefile')
var CleanCSS = require('clean-css');
var config = require('./config');

function compile(lessName, changedFileName) {
  fs.readFile('../app/style/' + lessName + '.less', function (err, data) {
    var dataString = data.toString();
    if (!dataString) {
      console.info('[Less] main.less is empty.');
      return;
    }
    less.render(dataString, {
      paths: [__dirname + '/app/style/'],
      filename: lessName + '.less'
    }, function (err, output) {
      if (err) {
        console.error('[Less] ' + err.type + ' Error: ' + err.message + ' in ' + err.filename + ':' + err.index + ':' + err.line);
        return;
      }
      var outputPath = '../public/static/css/' + lessName +'.' + config.version.css + '.css';
      new CleanCSS().minify(output.css, function (error, minified) {
        if (error) {
          console.error('[CSS] failed to minify', error);
        } else {
          writefile(outputPath, minified.styles, function (err) {
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

module.exports = function () {
  compile('main');
}
