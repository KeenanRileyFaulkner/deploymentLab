const express = require('express');
const cors = require('cors');
const path = require('path');
const {addEmail, removeEmail, useBadMethod } = require('./controller.js');
const {seed} = require('./seed.js');


const app = express();
app.use(cors());
app.use(express.json());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '987c7917deec4b63b2c22d7fddf0fae5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

//send a generic message to rollbar
rollbar.log('Hello world!');

app.use(express.static(path.join(__dirname, '../public')));

app.post(`/seed`, seed);
app.post(`/emails`, addEmail);
app.put(`/emails`, removeEmail);

app.get('/dne', useBadMethod);

const port = process.env.PORT || 4005;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})