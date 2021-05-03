const serverless = require('serverless-http');
const express = require('express');
const app = express();
const data = require('./data/index');
const upload = require('./upload/index');
const save = require('./save/index');
const file = require('./file/index');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/data', data);
app.use('/api/upload', upload);
app.use('/api/save', save);
app.use('/api/file', file);

// app.listen(port, () => {
//     console.log(`Listening on port: ${port}`);
// });
module.exports.handler = serverless(app);