module.exports = {
  App: {
    title: 'Verse Boot',
    loading: 'Loading...',
    back: 'Back'
  },
  Home: {
    title: 'Verse Boot - Home'
  },
  Item: {
    title: function (item) {
      return 'Verse Boot - Item '+item.name;
    },
    saving: 'Saving...',
    save: 'Save',
    edit: 'Edit item'
  },
  NotFound: {
    title: 'Verse Boot - Not Found',
    message: 'Oops! Page not found (404)'
  }
}
