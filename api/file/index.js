const URL = require('url');
const do_wb = require('../../src/util');
fs = require('fs');
const AWS = require('aws-sdk');

module.exports = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = URL.parse(req.url, true);
    const s3 = new AWS.S3({ endpoint: 'http://localhost:4566', s3ForcePathStyle: true });

    const getFile = (filename) => {
        s3.getObject({ Bucket: 'localstacktest', Key: filename }, function (err, data) {
            if (err) return res.status(500).send(err.message || err);
            do_wb(req, data.Body, url, res);
        });
    }
   
    if (!url.query.filename) return res.status(400).send("Must specify filename");
    if (url.query.filename){
        getFile(url.query.filename);
        // fs.readFile(url.query.filename, (err, body) => {
        //     if (err) return res.status(500).send(err.message || err);
        //     do_wb(req, body, url, res);
        // });
    }
};