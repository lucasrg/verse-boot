'use strict';

var verse = require('verse/server');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var Html = require('./Html');

var Languages = require('../app/context/Languages');
var Context = require('../app/context/Context');

var app = express();
var server = require('http').Server(app);

var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 3000;
var apiHost = process.env.API_HOST || ('http://localhost:'+port);
var publicPath = path.resolve(__dirname, '..', 'public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

if (isProduction) {
  var compression = require('compression')
  app.use(compression());
  app.use('/static',express.static(publicPath+'/static',{
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

  app.all('/static/js/*', function (req, res) {
    proxy.web(req, res, { target: 'http://localhost:3001'});
  });
  app.use(instant(publicPath));
  app.use('/favicon.ico',express.static(publicPath+'/static/favicon.ico'));
}

var AuthService = require('./api/services/AuthService');
app.use(function (req, res, next) {

  var token;

  var authorization = req.get('Authorization');
  if (authorization) {
    var components = authorization.split(' ');
    if (components[0] == 'Bearer') {
      token = components[1];
    }
  } else if (req.cookies.session) {
    token = req.cookies.session;
  }

  if (token) {
    AuthService.findByToken(token, function (err, session) {
      if (err || !session) res.clearCookie('session', { path: '/' });
      req.session = session;
      next();
    });
  } else {
    next();
  }
})

app.use('/api', require('./api/api'));

app.use(function (req, res, next) {
  if (res.headersSent) return;

  var context = Context({
    userAgent: req.get('user-agent'),
    session: req.session,
    locale: Languages.locale(req.get('accept-language'))
  });

  context.api.host = apiHost;

  console.log('REQUEST', req.path);

  context.trigger = function (args) {
    if (args == 'response') {
      console.log('RESPONSE', this.response);
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
          res.status(500).send({ error: e });
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
