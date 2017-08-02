'use strict';
// import environmental variables from our variables.env file

require('dotenv').config({ path: 'variables.env' });

var express = require("express");

var parser = require('body-parser');
var router = require('./api');
var database = require('./database');
//const seed = require('./seed');

var app = express();

app.use('/', express.static('public'));
app.use(parser.json());
app.use('/api', router);

app.listen(process.env.PORT || 3000, () => console.log("The server is running on port 3000!"));
// app.listen(3000, function () {
//   return console.log("The server is running on port 3000!");
// });
