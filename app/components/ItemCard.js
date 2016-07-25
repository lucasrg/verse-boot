module.exports = function (ctx, props) {
  return {
    tag:'div',
    class: 'item-card',
    render: {tag:'h2', render:props.item.name}
  }
}
