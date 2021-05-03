const URL = require('url');
fs = require('fs');
const { getFile } = require('../s3');

module.exports = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = URL.parse(req.url, true);
   
    if (!url.query.filename) return res.status(400).send("Must specify filename");
    if (url.query.filename){
        getFile(req, res, url, url.query.filename);
    }
};