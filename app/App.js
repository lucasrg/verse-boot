var pages = {
  HomePage: require('./pages/HomePage'),
  ItemPage: require('./pages/ItemPage'),
  ItemEditorPage: require('./pages/ItemEditorPage'),
  NotFoundPage: require('./pages/NotFoundPage'),
  ErrorPage: require('./pages/ErrorPage')
}

module.exports = {
  tag:'div',
  id:'app',
  listen:['request', 'response'],
  render: function (ctx) {
    if (!ctx.response || ctx.response.redirect) {
      return {tag:'div', class:'loader', render:ctx.i18n.App.loading}
    }
    return pages[ctx.response.body] || pages['NotFoundPage'];
  },
  events: {
    render: function (e) {
      if (e.context.response) {
        var historyState = e.context.response.history;
        if (historyState && historyState.scrollPosition) {
          e.target.scrollTop = historyState.scrollPosition.y || 0;
          e.target.scrollLeft = historyState.scrollPosition.x || 0;
        }
      }
    }
  }
}
