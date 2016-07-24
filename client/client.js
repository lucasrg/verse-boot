var verse = require('verse/client')
var Cookies = require('js-cookie');
var Languages = require('../app/context/Languages');
var Context = require('../app/context/Context');
var Router = require('../app/context/Router');
var App = require('../app/App');

document.addEventListener('DOMContentLoaded', function() {

  var serverSideContext = window.__app_context__ || {};

  var context = Context({
    path: location.pathname+location.search,
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

  verse.render({
    root: document.body,
    template: App,
    context:context,
    reconcile: reconcile
  });
  if (!reconcile) Router.go(context);

}, false);

window.onerror = function(errorMsg, url, lineNumber) {
  //TODO render 500 error page
  document.write("Error occured: " + errorMsg);
  return false;
}
