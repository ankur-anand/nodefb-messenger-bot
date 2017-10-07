const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;
