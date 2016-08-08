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
    edit: 'Edit item',
    done: 'Done',
    name: 'Name'
  },
  Auth: {
    title: 'Verse Boot - Sign In',
    username: 'Username (test)',
    password: 'Password (123)',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    errors: {
      '404': 'Username/password does not match'
    }
  },
  NotFound: {
    title: 'Verse Boot - Not Found',
    message: 'Oops! Page not found (404)'
  },
  InternalError: {
    title: 'Verse Boot - Error',
    message: 'Oops! Internal Error (500)'
  }

}
