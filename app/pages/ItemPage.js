var Link = require('../components/Link');

module.exports = {
  tag:'div',
  class:'page.item',
  listen: ['stores.Item'],
  render: function (ctx) {
    var item = ctx.stores.Item.item;
    return [
      {tag:'div', render:[
        item.done ? {tag:'s', render:item.name} : {tag:'h1', render:item.name},
      ]},
      {tag:'div', render:[
        Link(ctx, {
          href: ctx.url.item.edit(item),
          render: ctx.i18n.Item.edit
        }),
        Link(ctx, {
          href: ctx.url.home(),
          render: ctx.i18n.App.back
        })
      ]}
    ]
  }
}
