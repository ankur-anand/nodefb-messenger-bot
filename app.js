const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const keys = require('./keys/key');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//index route
app.get('/', (req, res) => {
  res.send('Hello World, I am a chat bot');
});

// for fb verification
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === keys.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

module.exports = app;
