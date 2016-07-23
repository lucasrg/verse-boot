var verse = require('verse/client')
var Cookies = require('js-cookie');

document.addEventListener('DOMContentLoaded', function() {

  var context = Context({
    path: location.pathname+location.search,
    userAgent: navigator.userAgent,
    cookies: {
      session: Cookies.get('session')
    },
    locale: (window.navigator.userLanguage || window.navigator.language)
  });

  if (window.__app_context__) {
    var reconcile = true;
    context.stores = window.__app_context__;
  }

  verse.render({
    root: document.body,
    template: App,
    context:context,
    reconcile: reconcile
  });
  if (!reconcile) {
    Router.go(context);
  }

}, false);

window.onerror = function(errorMsg, url, lineNumber) {
  //TODO render 500 error page
  document.write("Error occured: " + errorMsg);
  return false;
}
