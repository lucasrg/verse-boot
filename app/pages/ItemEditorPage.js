var Header = require('../components/Header');
var Form = require('../components/Form');
var Link = require('../components/Link');
var Checkbox = require('../components/Checkbox');

module.exports = {
  tag:'div',
  class:'page item-page',
  listen: ['stores.Item'],
  render: function (ctx) {
    var item = ctx.stores.Item.item;
    return [
      Header,
      Form(ctx,{
        listen: ['stores.Item.done', 'stores.Item.saving'],
        render: function () {
          return [
            {tag:'field', render:[
              {tag:'label', render:ctx.i18n.Item.name},
              {tag:'input', name:'name', value:item.name},
            ]},
            {tag:'field', render:[
              {tag:'label', render:ctx.i18n.Item.done},
              Checkbox(ctx, {
                checked: item.done,
                events: {
                  click: function (e) {
                    ctx.actions.Item.setDone(!item.done);
                  }
                }
              })
            ]},
            {tag:'field', class:'edit-actions', render:[
              Link(ctx, {
                href: ctx.urls.home(),
                render: ctx.i18n.App.back
              }),
              ctx.stores.Item.saving ?
                {tag:'div', render:ctx.i18n.Item.saving}
                :
                {tag:'input', type:'submit', value:ctx.i18n.Item.save}
            ]}
          ]
        },
        events: {
          submit: function (e, data) {
            ctx.actions.Item.save({
              name: data.name,
              done: item.done
            });
          }
        }
      })
    ]
  }
}
