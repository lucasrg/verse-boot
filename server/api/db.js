module.exports = {
  generateId: function () {
    return new Date().getTime();
  },
  users: {
    '1': {
      id: '1',
      username: 'test',
      password: '123'
    }
  },
  authorization: {},
  artists: [
    {
      name: 'Beatles',
      members: ['John', 'Paul', 'George', 'Ringo'],
      albuns: [
        {
          name: 'Abbey Road',
          year: 1969,
          songs: [
            { track:1, name: 'Come together'},
            { track:2, name: 'Something'},
            { track:3, name: 'Maxwell\'s Silver Hammer'}
          ]
        }
      ]
    },
    {
      name: 'Rolling Stones',
      members: ['Mick', 'Keith', 'Ronnie', 'Charlie'],
      albuns: [
        {
          name: "The Rolling Stones",
          year: 1964,
          songs: [
            { track: 1, name: 'Route 66' },
            { track: 2, name: 'I Just Want to Make Love to You' },
            { track: 3, name: 'Honest I do' }
          ]
        },
        {
          name: "Aftermath",
          year: 1966,
          songs: [
            { track: 1, name: 'Paint It Black' },
            { track: 2, name: 'Stupid Girl' },
            { track: 3, name: 'Lady Jane' }
          ]
        }
      ]
    }
  ]
}
