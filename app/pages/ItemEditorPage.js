var Form = require('../components/Form');
var Link = require('../components/Link');

module.exports = {
  tag:'div',
  class:'page.item',
  listen: ['stores.Item'],
  render: function (ctx) {
    var item = ctx.stores.Item.item;
    return [
      Form(ctx,{
        listen: ['stores.Item.saving'],
        render: function () {
          return [
            {tag:'input', name:'name', value:item.name},
            ctx.stores.Item.saving ?
              {tag:'div', render:ctx.i18n.Item.saving}
              :
              {tag:'input', type:'submit', value:ctx.i18n.Item.save}
          ]
        },
        events: {
          submit: function (e, data) {
            ctx.actions.Item.save(data);
          }
        }
      }),
      {tag:'div', render:Link(ctx, {
        href: ctx.url.home(),
        render: ctx.i18n.App.back
      })}
    ]
  }
}