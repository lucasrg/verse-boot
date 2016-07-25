var pages = {
  HomePage: require('./pages/HomePage')
}

module.exports = {
  tag:'div',
  id:'app',
  listen:['response'],
  render: function (ctx) {
    if (ctx.response) {
      return pages[ctx.response.body];
    } else {
      return {tag:'div', class:'loader', render:ctx.i18n.App.loading}
    }
  }
}
