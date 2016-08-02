var Header = require('../components/Header');
var Link = require('../components/Link');
var TaskListItem = require('../components/TaskListItem');

module.exports = {
  tag:'div',
  class:'page home-page',
  listen: ['stores.Home'],
  render: function (ctx) {
    return [
      Header,
      {tag:'h1', render:ctx.i18n.Home.title},
      {tag:'div', class:'items', render:ctx.stores.Home.items.map(function (item) {
        return Link(ctx, {
          href: ctx.urls.item.view(item),
          render: TaskListItem(ctx, {task: item})
        })
      })}
    ]
  }
}
