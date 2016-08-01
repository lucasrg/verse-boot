module.exports = function (ctx, props) {
  return {
    tag:'span',
    class: props.checked ?  'checkbox checked' : 'checkbox unchecked',
    render: props.checked ? '&#9745;' : '&#9744;',
    events: props.events
  }
}
