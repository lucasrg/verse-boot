var pages = {
  HomePage: require('./pages/HomePage'),
  NotFoundPage: require('./pages/NotFoundPage')
}

module.exports = {
  tag:'div',
  id:'app',
  listen:['request', 'response'],
  render: function (ctx) {
    if (ctx.response) {
      return pages[ctx.response.body] || pages['NotFoundPage'];
    } else {
      return {tag:'div', class:'loader', render:ctx.i18n.App.loading}
    }
  }
}
