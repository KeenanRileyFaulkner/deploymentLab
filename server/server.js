const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
console.log(__dirname)
const port = process.env.PORT || 4005;
app.listen(port, () => {
    console.log(`Serving you on port ${port}`);
})