'use strict';
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../../variables.env' });

 let dbURI = process.env.DATABASE;
 mongoose.connect(dbURI);
//mongoose.connect('mongodb://localhost/mean-todo-test');

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
