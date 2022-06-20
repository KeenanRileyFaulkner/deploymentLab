const express = require('express');
const cors = require('cors');
const path = require('path');
const {addEmail, removeEmail, useBadMethod } = require('./controller.js');
const {seed} = require('./seed.js');


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post(`/seed`, seed);
app.post(`/emails`, addEmail);
app.put(`/emails`, removeEmail);

app.get('/dne', useBadMethod);

const port = process.env.PORT || 4005;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})