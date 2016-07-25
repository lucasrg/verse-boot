var Link = require('../components/Link');
var ItemCard = require('../components/ItemCard');

module.exports = {
  tag:'div',
  class:'page.home',
  listen: ['stores.Home'],
  render: function (ctx) {
    return [
      {tag:'h1', render:ctx.i18n.Home.title},
      {tag:'div', class:'items', render:ctx.stores.Home.items.map(function (item) {
        return Link(ctx, {
          href: ctx.url.item(item),
          render: ItemCard(ctx, {item: item})
        })
      })}
    ]
  }
}
