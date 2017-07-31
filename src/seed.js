'use strict';

const Todo = require('./models/todo');

const todos = [
  'Feed the dog',
  'Walk the kids',
  'Water the trees'
];

todos.forEach((todo, index) => {
  Todo.find({'name': todo}, (err, todos) => {
    if (!err && !todos.length) {
      Todo.create({completed: false, name: todo});
    }
  });
});
