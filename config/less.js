'use strict';
var less  = require('less');
var fs    = require('fs');
var writefile = require('writefile')
var config = require('./config');

var publicPath = __dirname+'/../public/static/css/';
var outputFile = publicPath + config.includes.css +'.' + config.version.css + '.css';

function compile(lessMainFilename, changedFileName) {
  fs.readFile(lessMainFilename, function (err, data) {
    var dataString = data.toString();
    if (!dataString) {
      console.info('[Less] main.less is empty.');
      return;
    }
    less.render(dataString, {
      paths: [__dirname + '/../app/'],
      filename: lessMainFilename,
      sourceMap: {
        sourceMapFileInline: true
      }
    }, function (err, output) {
      if (err) {
        console.error('[Less] ' + err.type + ' Error: ' + err.message + ' in ' + err.filename + ':' + err.index + ':' + err.line);
        return;
      }
      writefile(outputFile, output.css, function (err) {
        if (err) {
          console.error('[Less] failed to write', err);
        } else {
          if (changedFileName) {
            console.info('[Less] Changed ' + changedFileName);
          } else {
            console.info('[Less] Changed Styles.less.');
          }
        }
      });
    });
  });
}

module.exports = function () {
  fs.watch('./app/Styles.less', function (event, filename) {
    compile('./app/Styles.less', filename);
  });

  fs.watch('./app/styles/', { recursive: true }, function (event, filename) {
    var ext = filename.split('/').pop().split('.').pop();
    if (ext !== 'less') return;
    compile('./app/Styles.less', filename);
  });
}
