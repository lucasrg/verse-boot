'use strict';

var verse = require('verse/server');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var fs = require('fs');

var Html = require('../app/Html');

var Context = require('./Context');
var Languages = require('./Languages');

var app = express();
var server = require('http').Server(app);
var superagent = require('superagent');

var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 3000;
var apiPort = process.env.API_PORT || 3010;
var apiHost = process.env.API_HOST || 'http://localhost';
var publicPath = path.resolve(__dirname, '..', 'app', 'static');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

if (isProduction) {
  var compression = require('compression')
  app.use(compression());
  app.use('/static',express.static(publicPath,{
    fallthrough: false,
    index: false
  }));
} else {
  var bundle = require('../config/webpack.bundler.js');
  var less = require('../config/less.js');
  var instant = require('instant');
  var httpProxy = require('http-proxy');
  var proxy = httpProxy.createProxyServer();

  bundle();
  less();

  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

  app.all('/static/gen/*.js', function (req, res) {
    proxy.web(req, res, { target: 'http://localhost:3001'});
  });
  app.use('/favicon.ico',express.static(publicPath+'/favicon.ico'));
  app.use(instant(path.resolve(__dirname, '..', 'app')));
}


//-------------------API SERVER--------------------------------
var apiServer = require('../api/server');
var apiProxy = require('express-http-proxy');

app.use('/api', apiProxy(apiHost+':'+apiPort, {
  forwardPath: function(req, res) {
    return '/api'+req.path;
  },
  reqAsBuffer: true
}));

apiServer.listen();
//-----------------------------------------------------------

app.use(function (req, res, next) {

  var token = req.cookies.session;

  if (token) {
    var sessionApiURL = apiHost+':'+apiPort+'/api/session/'+token;
    superagent.get(sessionApiURL).end(function (err, apiRes) {
      if (err) {
        console.error('API unreachable', err);
        return res.status(500).json({code:500, message:'API unreachable'});
      }
      if (!apiRes.body) res.clearCookie('session', { path: '/' });
      req.session = apiRes.body;
      next();
    })
  } else {
    next();
  }
})

app.use(function (req, res, next) {

  var locale = req.get('accept-language');
  var language = Languages.get(req.session.locale || locale);

  var i18n = Languages.cache[language];
  if (!i18n) {
    var i18nFilename = publicPath+'/i18n/'+language+'.js';
    var i18nData = fs.readFileSync(i18nFilename, 'utf8');
    var i18nSrc = 'module.exports ' + i18nData.substr(i18nData.indexOf('='));

    var Module = module.constructor;
    var m = new Module();
    m._compile(i18nSrc, i18nFilename);
    i18n = m.exports;
    Languages.cache[language] = i18n;

  }

  var context = Context({
    userAgent: req.get('user-agent'),
    session: req.session,
    language: language
  }, i18n);

  context.api.host = apiHost+':'+apiPort;

  context.trigger = function (args) {
    if (args == 'response') {
      try {
        if (this.response.redirect) {
          res.redirect(this.response.status, this.response.redirect)
        } else {
          var html = verse.render({template: Html, context: this});
          res.status(this.response.status).send(html);
        }
      } catch (e) {
        console.error('Error at path:', req.path);
        console.error(e.stack);
        if (this.response.status != 500) {
          this.router.error(e);
        } else {
          res.status(500).json({ error: e });
        }
      }
    }
  }

  context.router.go(req.path);

});

server.listen(port, function () {
  console.info('Server running on port ' + port);
  console.info('Public path ' + publicPath);
});
