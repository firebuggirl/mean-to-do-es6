'use strict';
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const express = require("express");

const parser = require('body-parser');
const router = require ('./api');
const database = require('./database');
//const seed = require('./seed');

let app = express();

app.use('/', express.static('public'));
app.use(parser.json());
app.use('/api', router);

//'port' is for Heroku deploy
//app.listen(3000 || port, () => console.log("The server is running on port 3000!"));
app.listen(process.env.PORT || 3000, () => console.log("The server is running on port 3000!"));
