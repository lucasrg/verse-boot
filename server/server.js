'use strict';

var verse = require('verse/server');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var locale = require("locale");

var supportedLocales = require('../app/i18n/Locales');
var Html = require('./Html');
var Context = require('../app/context/Context');
var Router = require('../app/context/Router');

var app = express();
var server = require('http').Server(app);

var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 3000;
var apiHost = process.env.API_HOST || 'localhost:3000';
var publicPath = path.resolve(__dirname, 'public');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(locale(supportedLocales))

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

app.use(function (req, res) {
  var context = Context({
    path: req.path,
    userAgent: req.get('user-agent'),
    cookies: req.cookies,
    locale: res.locale.best(supportedLocales).toString()
  });

  //TODO context.api.host = apiHost;

  context.trigger = function (args) {
    if (args == 'response') {
      var html = verse.render({template: Html, context: this});
      res.status(this.response.status).send(html);
    }
  }

  Router.go(context);

});

server.listen(port, function () {
  console.info('Server running on port ' + port);
});
