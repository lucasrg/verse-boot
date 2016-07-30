var verse = require('verse/client')
var Cookies = require('js-cookie');
var Context = require('../app/context/Context');
var App = require('../app/App');

var historyInitialized = false;

document.addEventListener('DOMContentLoaded', function() {

  var serverSideContext = window.__app_context__ || {};

  var context = Context({
    userAgent: navigator.userAgent,
    session: serverSideContext.session,
    locale: serverSideContext.locale
  });

  if (serverSideContext.stores) {
    var reconcile = true;
    context.stores = serverSideContext.stores;
  }


  context.router.events.go = function (oldState, newState, ctx)  {
    var app = document.getElementById('app');
    oldState.scrollPosition = app ? {x: app.scrollLeft, y: app.scrollTop} : {};
  }

  context.router.events.end = function (ctx) {
    if (ctx.response.redirect) {
      window.location.href = ctx.response.redirect;
      return;
    }

    if (ctx.response.history) {
      setTimeout(function () {
        var app = document.getElementById('app');
        var historyState = ctx.response.history;
        delete ctx.response.history;
        if (app && historyState && historyState.scrollPosition) {
          app.scrollTop = historyState.scrollPosition.y || 0;
          app.scrollLeft = historyState.scrollPosition.x || 0;
        }
      }, 0);
    }
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
      history.pushState({}, document.title, context.request.url);
    }
  }

  window.onerror = function(msg, file, line, col, error) {
    context.router.error(msg)
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
