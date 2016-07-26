var Link = require('../components/Link');

module.exports = {
  tag:'div',
  class:'page.internal-error',
  render: function (ctx) {
    return [
      {tag:'h1', render:ctx.i18n.InternalError.title},
      Link(ctx, {
        href: ctx.url.home(),
        render: [
          {tag:'img', src:ctx.url.static('images/tree_icon.png')},
          {tag:'h2', render:ctx.i18n.InternalError.message},
        ]
      }),
      {tag:'div', class:'stacktrace', render:ctx.response.error}
    ]
  }
}
