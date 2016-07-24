'use strict';
var less  = require('less');
var fs    = require('fs');
var writefile = require('writefile')
var config = require('./config');

function compile(lessName, changedFileName) {
  fs.readFile('./app/styles/' + lessName + '.less', function (err, data) {
    var dataString = data.toString();
    if (!dataString) {
      console.info('[Less] main.less is empty.');
      return;
    }
    less.render(dataString, {
      paths: [__dirname + '/../app/styles/'],
      filename: lessName + '.less',
      sourceMap: {
        sourceMapFileInline: true
      }
    }, function (err, output) {
      if (err) {
        console.error('[Less] ' + err.type + ' Error: ' + err.message + ' in ' + err.filename + ':' + err.index + ':' + err.line);
        return;
      }
      writefile(__dirname+'/../public/static/css/' + lessName +'.' + config.version.css + '.css', output.css, function (err) {
        if (err) {
          console.error('[Less] failed to write', err);
        } else {
          if (changedFileName) {
            console.info('[Less] Changed ' + changedFileName + ', ' + lessName + '.css rendered.');
          } else {
            console.info('[Less] ' + lessName + '.css rendered.');
          }
        }
      });
    });
  });
}

var renderLess = function (changedFileName) {
  compile('main',changedFileName);
};

// Watch for css changes
var watchCallback = function (event, filename) {
  var ext = filename.split('/').pop().split('.').pop();
  if (ext !== 'less') return;
  renderLess(filename);
};

module.exports = function () {
  fs.watch('./app/styles', watchCallback);
  fs.watch('./app/styles/pages', watchCallback);
  fs.watch('./app/styles/components', watchCallback);
  renderLess();
}
