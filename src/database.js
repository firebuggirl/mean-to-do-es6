'use strict';
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../../variables.env' });

 let dbURI = process.env.DATABASE;

 if (process.env.NODE_ENV === 'production') {
 dbURI = process.env.MONGODB_URI;
}
 mongoose.connect(dbURI);


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
