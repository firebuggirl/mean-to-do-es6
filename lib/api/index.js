'use strict';

var express = require("express");
var Todo = require('../models/todo');
// import todos from '../../mock/todos.json';

var router = express.Router();

router.get('/todos', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ todos: todos });
  });
});

router.post('/todos', function (req, res) {
  //let todo = req.body;
  var todo = new Todo(req.body).save();
  Todo.save(todo, function (err, todo) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ todo: todo, message: 'Todo created' });
  });

  // Todo.save(todo, (err, todo) => {
  //   if (err) {
  //     return res.status(500).json({message: err.message});
  //   }
  //   res.json({todo, message: 'Todo created'});
  // });
});

router.put('/todos/:id', function (req, res) {
  var id = req.params.id;

  var todo = req.body;
  if (todo && todo._id !== id) {
    return res.status(400).json({ message: 'IDs don\'t match!' });
  }
  Todo.findByIdAndUpdate(id, todo, { new: true }, function (err, todo) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ todo: todo, message: 'Todo updated' });
  });
});

router.delete('/todos/:id', function (req, res) {
  var id = req.params.id;

  Todo.findByIdAndRemove(id, function (err, todo) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'Todo deleted' });
  });
});

module.exports = router;