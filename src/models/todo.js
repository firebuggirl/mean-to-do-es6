'use strict';

const mongoose = require('mongoose');

// todo.name
// todo.completed

const todoSchema = new mongoose.Schema({
	name: String,
	completed: Boolean //see templates/todo.html ng-click="todo.completed
});

const model = mongoose.model('Todo', todoSchema);

module.exports = model;
