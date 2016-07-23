var App = require('../app/App');
var config = require('../config/config');

module.exports = function(ctx) {
  var response = ctx.response;
  if (response.reconcile) {
    var reconcile = {tag:'script', render:'window.__app_context__ = '+JSON.stringify(ctx.stores)+';'}
  }
  return {
    tag: 'html', render: [
      {tag:'head', render: [
        {tag:'meta', name:"viewport", content:"width=device-width, initial-scale=1"},
        {tag:'meta', name:"mobile-web-app-capable", content:"yes"},
        {tag:'meta', name:"apple-mobile-web-app-capable", content:"yes"},
        {tag:'title', render:response.head.title},
        {tag:'link', href: ctx.url.static('css/main', config.version.css, 'css'), rel:'stylesheet', media:'all'},
        {tag:'script', src: ctx.url.static('js/bundle', config.version.js, 'js')}
      ]},
      {tag:'body', render: App},
      reconcile
    ]
  }
};
