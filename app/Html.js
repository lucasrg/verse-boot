var App = require('./App');
var config = require('../config/config');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = function(ctx) {
  var response = ctx.response;

  var serverContext = {
    config: config,
    session: ctx.session.serialize(),
    language: ctx.request.language
  }

  if (response.reconcile) {
    serverContext.reconcile = ctx.stores;
  }

  var css = 'gen/'+config.includes.css+'.'+config.version.css+'.css';
  var js = 'gen/'+config.includes.js+'.'+config.version.js+'.js';
  var i18n = 'i18n/'+ctx.request.language+'.js';

  return {
    tag: 'html', render: [
      {tag:'head', render: [
        {tag:'link', href: ctx.urls.static(css), rel:'stylesheet', media:'all'},
        {tag:'script', src: ctx.urls.static(i18n)},
        {tag:'script', defer: isProduction ? '' : null, src: ctx.urls.static(js)},
        {tag:'meta', name:"viewport", content:"width=device-width, initial-scale=1"},
        {tag:'meta', name:"mobile-web-app-capable", content:"yes"},
        {tag:'meta', name:"apple-mobile-web-app-capable", content:"yes"},
        {tag:'title', render:response.title}
      ]},
      {tag:'body', render: App},
      {tag:'script', render:'window.__app_context__ = '+JSON.stringify(serverContext)+';'}
    ]
  }
};
