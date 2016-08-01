module.exports = function (ctx, props) {
  return {
    tag:'form',
    listen: props.listen,
    class: props.class,
    render: props.render,
    events: {
      submit: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (props.events && props.events.submit) {
          var data = {};
          Object.keys(e.target.elements).forEach(function (key) {
            var el = e.target.elements[key];
            if (el.name) data[key] = el.value;
          })
          props.events.submit(e, data)
        }
      }
    }

  }
}
