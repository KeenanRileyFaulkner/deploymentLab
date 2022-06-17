const express = require('express');
const cors = require('cors');
const path = require('path');
const {addEmail, removeEmail} = require('./controller.js');
const {seed} = require('./seed.js');
const baseURL = 'https://kf017036-landing-page.herokuapp.com'


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post(`${baseURL}/seed`, seed);
app.post(`${baseURL}/emails`, addEmail);
app.put(`${baseURL}/emails`, removeEmail);

const port = process.env.PORT || 4005;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})