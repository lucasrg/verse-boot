var Link = require('../components/Link');

module.exports = {
  tag:'div',
  class:'page.not-found',
  render: function (ctx) {
    return [
      {tag:'h1', render:ctx.i18n.NotFound.title},
      Link(ctx, {
        href: ctx.url.home(),
        render: [
          {tag:'img', src:ctx.url.static('images/tree_icon.png')},
          {tag:'h2', render:ctx.i18n.NotFound.message},
          {tag:'h3', render:ctx.request.url}
        ]
      })
    ]
  }
}
