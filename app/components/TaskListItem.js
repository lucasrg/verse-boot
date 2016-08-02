var Link = require('./Link');
var Checkbox = require('./Checkbox');

module.exports = function (ctx, props) {
  return {
    tag:'div',
    class: 'task-list-item',
    render: [
      Checkbox(ctx, {
        checked: props.task.done
      }),
      Link(ctx, {
        href: ctx.urls.item.view(props.task),
        render: {tag:'h2', render:props.task.name}
      })
    ]
  }
}
