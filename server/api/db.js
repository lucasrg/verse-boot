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
  sessions: {},
  items: {
    '1': { id:1, name: 'Task 1', done: false },
    '2': { id:2, name: 'Task 2', done: false },
    '3': { id:3, name: 'Task 3', done: false },
    '4': { id:4, name: 'Task 4', done: false },
    '5': { id:5, name: 'Task 5', done: false },
    '6': { id:6, name: 'Task 6', done: false },
    '7': { id:7, name: 'Task 7', done: false },
    '8': { id:8, name: 'Task 8', done: false },
    '9': { id:9, name: 'Task 9', done: false },
    '10': { id:10, name: 'Task 10', done: false },
    '11': { id:11, name: 'Task 11', done: false },
    '12': { id:12, name: 'Task 12', done: false },
    '13': { id:13, name: 'Task 13', done: false },
    '14': { id:14, name: 'Task 14', done: false },
    '15': { id:15, name: 'Task 15', done: false }
  }
}
