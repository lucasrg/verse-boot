var Actions = require('../Actions');
var Stores = require('../Stores');
var Urls = require('../Urls');

var Browser = require('./Browser.js');
var API = require('./API.js');
var Session = require('./Session');
var Router = require('./Router');
var Languages = require('./Languages');

module.exports = function (request) {
  var ctx = {};

  ctx.browser = new Browser(request.userAgent);
  ctx.api = new API(ctx, {sendDate: ctx.browser.ie});
  ctx.session = new Session(request.session);

  ctx.actions = {};
  Actions.forEach(function (name) {
    ctx.actions[name] = require('../actions/'+name+'Actions')(ctx);
  })

  ctx.stores = Stores();

  ctx.url = Urls;
  ctx.router = Router(ctx);

  if (request.session) {
    ctx.i18n = Languages.get(ctx.session.locale || request.locale);
  } else {
    ctx.i18n = Languages.get(request.locale);
  }

  ctx.request = request;

  return ctx;
}
