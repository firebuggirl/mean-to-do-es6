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

app.listen(3000, () => console.log("The server is running on port 3000!"));
