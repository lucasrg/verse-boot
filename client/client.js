var verse = require('verse/client')
var Cookies = require('js-cookie');
var Context = require('../app/context/Context');
var App = require('../app/App');

var historyInitialized = false;

document.addEventListener('DOMContentLoaded', function() {

  var serverSideContext = window.__app_context__ || {};

  var context = Context({
    userAgent: navigator.userAgent,
    cookies: {
      session: Cookies.get('session')
    },
    locale: serverSideContext.locale
  });

  if (serverSideContext.stores) {
    var reconcile = true;
    context.stores = serverSideContext.stores;
  }

  context.router.events.end = function (ctx) {
    if (historyInitialized) {
      history.replaceState({}, ctx.response.head.title, ctx.request.url);
    } else {
      historyInitialized = true;
      history.pushState({}, ctx.response.head.title, ctx.request.url);
    }
    document.title = ctx.response.head.title;
  }

  window.onpopstate = function(event) {
    if (context.router.back()) {
      history.pushState({}, document.title, location.pathname+location.search);
    }
  }

  window.onerror = function(errorMsg, url, lineNumber) {
    //TODO render 500 error page
    document.write("Error occured: " + errorMsg);
    return false;
  }

  verse.render({
    root: document.body,
    template: App,
    context:context,
    reconcile: reconcile
  });
  if (!reconcile) context.router.go(location.pathname+location.search);

}, false);
