'use strict';

var mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../../variables.env' });

var dbURI = process.env.DATABASE;
mongoose.connect(dbURI);
//mongoose.connect('mongodb://localhost/mean-todo-test');

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});