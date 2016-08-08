var Actions = require('../app/Actions');
var Stores = require('../app/Stores');
var Urls = require('../app/Urls');
var Routes = require('../app/Routes');

var Browser = require('./Browser.js');
var API = require('./API.js');
var Session = require('./Session');
var Router = require('./Router');

module.exports = function (request, i18n) {
  var ctx = { request: request };

  ctx.browser = new Browser(request.userAgent);
  ctx.api = new API(ctx, {sendDate: ctx.browser.ie});
  ctx.session = new Session(request.session);

  ctx.actions = {};
  Object.keys(Actions).forEach(function (name) {
    ctx.actions[name] = Actions[name](ctx);
  })

  ctx.stores = Stores();

  ctx.urls = Urls;
  ctx.router = Router(ctx, Routes);

  ctx.i18n = i18n;

  return ctx;
}
