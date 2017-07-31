'use strict';

const express = require("express");
const Todo = require('../models/todo');
// import todos from '../../mock/todos.json';

let router = express.Router();

router.get('/todos', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({todos});
  });
});

router.post('/todos', (req, res) => {

  const todo = new Todo({ name: req.body.name, completed: req.body.completed });
  todo.save().then(function(err, todo) {
      console.log('Todo Created');
  });
  // Todo.save(todo, (err, todo) => {
  //   if (err) {
  //     return res.status(500).json({message: err.message});
  //   }
  //   res.json({todo, message: 'Todo created'});
  // });

});

router.put('/todos/:id', (req, res) => {
  let {id} = req.params;
  let todo = req.body;
  if (todo && todo._id !== id) {
    return res.status(400).json({message: `IDs don't match!`});
  }
  Todo.findByIdAndUpdate(id, todo, {new: true}, (err, todo) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({todo, message: 'Todo updated'});
  });
});

router.delete('/todos/:id', (req, res) => {
  let {id} = req.params;
  Todo.findByIdAndRemove(id, (err, todo) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({message: 'Todo deleted'});
  });
});

module.exports = router;
