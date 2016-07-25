module.exports = function (ctx, props) {
  return {
    tag: 'a',
    href: props.href,
    alt: props.alt,
    render: props.render,
    events: {
      click: function (e) {
        e.preventDefault();
        e.stopPropagation();
        ctx.router.go(props.href);
      }
    }
  }
}
