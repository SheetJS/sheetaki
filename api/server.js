const express = require('express');
const app = express();
const data = require('./data/index');
const upload = require('./upload/index');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/data', data);
app.use('/api/upload', upload);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});