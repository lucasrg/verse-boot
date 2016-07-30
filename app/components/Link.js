module.exports = function (ctx, props) {
  return {
    tag: 'a',
    listen: props.listen,
    href: props.href,
    alt: props.alt,
    class: props.class,
    render: props.render,
    events: {
      click: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (props.back) {
          ctx.router.back();
        } else if (props.click) {
          props.click(e);
        } else {
          ctx.router.go(props.href);
        }
      }
    }
  }
}
