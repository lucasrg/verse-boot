var Header = require('../components/Header');
var Link = require('../components/Link');

module.exports = {
  tag:'div',
  class:'page item-page',
  listen: ['stores.Item'],
  render: function (ctx) {
    var item = ctx.stores.Item.item;
    return [
      Header,
      {tag:'div', render:[
        item.done ? {tag:'s', class:'item', render:item.name} : {tag:'span', class:'item', render:item.name},
      ]},
      {tag:'div', class:'view-actions', render:[
        Link(ctx, {
          href: ctx.urls.item.edit(item),
          render: ctx.i18n.Item.edit
        }),
        Link(ctx, {
          href: ctx.urls.home(),
          render: ctx.i18n.App.back
        })
      ]}
    ]
  }
}
